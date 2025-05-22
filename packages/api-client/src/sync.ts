import { 
  SyncStateVersion, 
  SyncStateChange, 
  SyncStateConflict, 
  ConflictResolutionStrategy,
  SyncStateOptions,
  SyncStateMetadata
} from '@royal-mz/shared-types';

export class SyncEngine {
  private state: any = {};
  private metadata: SyncStateMetadata;
  private options: SyncStateOptions;
  private socket: any;
  private supabase: any;
  private onStateChange: (state: any) => void;
  private storage: Storage;
  
  constructor(options: {
    initialState?: any;
    options?: Partial<SyncStateOptions>;
    socket: any;
    supabase: any;
    onStateChange: (state: any) => void;
    storage: Storage;
  }) {
    this.state = options.initialState || {};
    this.socket = options.socket;
    this.supabase = options.supabase;
    this.onStateChange = options.onStateChange;
    this.storage = options.storage;
    
    this.options = {
      conflictResolution: 'last_write_wins',
      optimisticUpdates: true,
      debounceTime: 50,
      persistLocally: true,
      ...options.options
    };
    
    this.metadata = {
      lastSyncedAt: Date.now(),
      version: {
        timestamp: Date.now(),
        clientId: this.generateClientId(),
        sequence: 0
      },
      clientId: this.generateClientId(),
      isConnected: false,
      isPending: false,
      pendingChanges: []
    };
    
    this.initializeSync();
  }
  
  private generateClientId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  
  private initializeSync() {
    if (this.options.persistLocally) {
      this.loadFromStorage();
    }
    
    this.socket.on('connect', () => {
      this.metadata.isConnected = true;
      
      if (this.metadata.pendingChanges.length > 0) {
        this.syncPendingChanges();
      }
    });
    
    this.socket.on('disconnect', () => {
      this.metadata.isConnected = false;
    });
    
    this.socket.on('state_update', (data: { state: any; version: SyncStateVersion }) => {
      this.handleRemoteUpdate(data.state, data.version);
    });
    
    this.supabase.channel('sync-changes')
      .on('broadcast', { event: 'sync' }, (payload: any) => {
        this.handleRemoteUpdate(payload.state, payload.version);
      })
      .subscribe();
  }
  
  private loadFromStorage() {
    try {
      const savedState = this.storage.getItem('sync_state');
      const savedMetadata = this.storage.getItem('sync_metadata');
      
      if (savedState) {
        this.state = JSON.parse(savedState);
      }
      
      if (savedMetadata) {
        this.metadata = JSON.parse(savedMetadata);
      }
    } catch (error) {
      console.error('Error loading state from storage:', error);
    }
  }
  
  private saveToStorage() {
    if (!this.options.persistLocally) return;
    
    try {
      this.storage.setItem('sync_state', JSON.stringify(this.state));
      this.storage.setItem('sync_metadata', JSON.stringify(this.metadata));
    } catch (error) {
      console.error('Error saving state to storage:', error);
    }
  }
  
  private handleRemoteUpdate(remoteState: any, remoteVersion: SyncStateVersion) {
    const conflicts = this.detectConflicts(remoteState, remoteVersion);
    const mergedState = this.resolveConflicts(conflicts, remoteState);
    
    this.state = mergedState;
    
    if (this.compareVersions(remoteVersion, this.metadata.version) > 0) {
      this.metadata.version = remoteVersion;
    }
    
    this.metadata.lastSyncedAt = Date.now();
    
    this.saveToStorage();
    
    this.onStateChange(this.state);
  }
  
  private detectConflicts(remoteState: any, remoteVersion: SyncStateVersion): SyncStateConflict[] {
    const conflicts: SyncStateConflict[] = [];
    
    const findConflicts = (local: any, remote: any, path: string[] = []) => {
      if (local === undefined || remote === undefined) return;
      
      if (typeof local === 'object' && typeof remote === 'object') {
        const allKeys = new Set([...Object.keys(local), ...Object.keys(remote)]);
        
        for (const key of allKeys) {
          findConflicts(local[key], remote[key], [...path, key]);
        }
      } else if (local !== remote) {
        conflicts.push({
          path,
          localValue: local,
          remoteValue: remote,
          localVersion: this.metadata.version,
          remoteVersion
        });
      }
    };
    
    findConflicts(this.state, remoteState);
    
    return conflicts;
  }
  
  private resolveConflicts(conflicts: SyncStateConflict[], remoteState: any): any {
    if (conflicts.length === 0) return remoteState;
    
    const mergedState = JSON.parse(JSON.stringify(remoteState));
    
    for (const conflict of conflicts) {
      let value;
      
      switch (this.options.conflictResolution) {
        case 'local_wins':
          value = conflict.localValue;
          break;
        case 'remote_wins':
          value = conflict.remoteValue;
          break;
        case 'last_write_wins':
          value = this.compareVersions(conflict.localVersion, conflict.remoteVersion) >= 0
            ? conflict.localValue
            : conflict.remoteValue;
          break;
        case 'merge':
          if (typeof conflict.localValue === 'object' && typeof conflict.remoteValue === 'object') {
            value = { ...conflict.remoteValue, ...conflict.localValue };
          } else {
            value = this.compareVersions(conflict.localVersion, conflict.remoteVersion) >= 0
              ? conflict.localValue
              : conflict.remoteValue;
          }
          break;
      }
      
      let current = mergedState;
      for (let i = 0; i < conflict.path.length - 1; i++) {
        const key = conflict.path[i];
        if (current[key] === undefined) {
          current[key] = {};
        }
        current = current[key];
      }
      
      current[conflict.path[conflict.path.length - 1]] = value;
    }
    
    return mergedState;
  }
  
  private compareVersions(a: SyncStateVersion, b: SyncStateVersion): number {
    if (a.timestamp !== b.timestamp) {
      return a.timestamp - b.timestamp;
    }
    
    if (a.sequence !== b.sequence) {
      return a.sequence - b.sequence;
    }
    
    return a.clientId.localeCompare(b.clientId);
  }
  
  private syncPendingChanges() {
    if (!this.metadata.isConnected || this.metadata.pendingChanges.length === 0) {
      return;
    }
    
    this.metadata.isPending = true;
    
    const newState = { ...this.state };
    
    for (const change of this.metadata.pendingChanges) {
      let current = newState;
      
      for (let i = 0; i < change.path.length - 1; i++) {
        const key = change.path[i];
        if (current[key] === undefined) {
          current[key] = {};
        }
        current = current[key];
      }
      
      const lastKey = change.path[change.path.length - 1];
      
      switch (change.operation) {
        case 'set':
          current[lastKey] = change.value;
          break;
        case 'update':
          current[lastKey] = { ...current[lastKey], ...change.value };
          break;
        case 'delete':
          delete current[lastKey];
          break;
        case 'merge':
          if (typeof current[lastKey] === 'object' && typeof change.value === 'object') {
            current[lastKey] = { ...current[lastKey], ...change.value };
          } else {
            current[lastKey] = change.value;
          }
          break;
      }
    }
    
    this.metadata.version = {
      ...this.metadata.version,
      timestamp: Date.now(),
      sequence: this.metadata.version.sequence + 1
    };
    
    this.socket.emit('sync_state', {
      room: 'global', // or specific room based on data type
      state: newState,
      version: this.metadata.version
    });
    
    this.state = newState;
    this.metadata.pendingChanges = [];
    this.metadata.isPending = false;
    this.metadata.lastSyncedAt = Date.now();
    
    this.saveToStorage();
    
    this.onStateChange(this.state);
  }
  
  
  public setState(path: string | string[], value: any) {
    const pathArray = Array.isArray(path) ? path : path.split('.');
    
    const change: SyncStateChange = {
      path: pathArray,
      operation: 'set',
      value,
      version: {
        ...this.metadata.version,
        timestamp: Date.now(),
        sequence: this.metadata.version.sequence + 1
      }
    };
    
    let current = this.state;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      const key = pathArray[i];
      if (current[key] === undefined) {
        current[key] = {};
      }
      current = current[key];
    }
    
    const lastKey = pathArray[pathArray.length - 1];
    current[lastKey] = value;
    
    this.metadata.version = change.version;
    
    if (this.options.optimisticUpdates) {
      this.onStateChange(this.state);
    }
    
    this.metadata.pendingChanges.push(change);
    
    this.saveToStorage();
    
    if (this.metadata.isConnected) {
      if (this._syncTimeout) {
        clearTimeout(this._syncTimeout);
      }
      
      this._syncTimeout = setTimeout(() => {
        this.syncPendingChanges();
        this._syncTimeout = null;
      }, this.options.debounceTime);
    }
  }
  
  private _syncTimeout: any = null;
  
  public getState(path?: string | string[]): any {
    if (!path) {
      return this.state;
    }
    
    const pathArray = Array.isArray(path) ? path : path.split('.');
    let current = this.state;
    
    for (const key of pathArray) {
      if (current === undefined || current === null) {
        return undefined;
      }
      current = current[key];
    }
    
    return current;
  }
  
  public getMetadata(): SyncStateMetadata {
    return this.metadata;
  }
  
  public isConnected(): boolean {
    return this.metadata.isConnected;
  }
  
  public isPending(): boolean {
    return this.metadata.isPending;
  }
  
  public forceSyncPendingChanges() {
    if (this._syncTimeout) {
      clearTimeout(this._syncTimeout);
      this._syncTimeout = null;
    }
    
    this.syncPendingChanges();
  }
}
