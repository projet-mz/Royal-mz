/**
 * Sync state version
 */
export interface SyncStateVersion {
  timestamp: number;
  clientId: string;
  sequence: number;
}

/**
 * Sync state operation
 */
export type SyncOperation = 'set' | 'update' | 'delete' | 'merge';

/**
 * Sync state change
 */
export interface SyncStateChange {
  path: string[];
  operation: SyncOperation;
  value: any;
  version: SyncStateVersion;
}

/**
 * Sync state conflict
 */
export interface SyncStateConflict {
  path: string[];
  localValue: any;
  remoteValue: any;
  localVersion: SyncStateVersion;
  remoteVersion: SyncStateVersion;
}

/**
 * Sync state conflict resolution strategy
 */
export type ConflictResolutionStrategy = 'local_wins' | 'remote_wins' | 'last_write_wins' | 'merge';

/**
 * Sync state options
 */
export interface SyncStateOptions {
  conflictResolution: ConflictResolutionStrategy;
  optimisticUpdates: boolean;
  debounceTime: number;
  persistLocally: boolean;
}

/**
 * Sync state metadata
 */
export interface SyncStateMetadata {
  lastSyncedAt: number;
  version: SyncStateVersion;
  clientId: string;
  isConnected: boolean;
  isPending: boolean;
  pendingChanges: SyncStateChange[];
}

/**
 * User session
 */
export interface UserSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  lastActiveAt: Date;
  platform: string;
  userAgent: string;
}

/**
 * Security dashboard stats
 */
export interface SecurityDashboardStats {
  studentsCheckedIn: number;
  studentsCheckedOut: number;
  activeIncidents: number;
  activeAlerts: number;
}

/**
 * Security alert
 */
export interface SecurityAlert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string | Date;
  isResolved: boolean;
  resolvedAt?: string | Date;
  resolvedBy?: string;
  createdBy?: string;
}

/**
 * Student checkpoint
 */
export interface StudentCheckpoint {
  id: string;
  studentId: string;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  checkpointId: string;
  eventType: 'check_in' | 'check_out';
  timestamp: string | Date;
  verificationMethod: VerificationMethod;
  guardianId?: string;
  guardian?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  notes?: string;
}

/**
 * Verification method
 */
export type VerificationMethod = 'id_card' | 'biometric' | 'guardian_verification' | 'temp_code' | 'override';

/**
 * Security checkpoint
 */
export interface SecurityCheckpoint {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Authorized guardian
 */
export interface AuthorizedGuardian {
  id: string;
  studentId: string;
  guardianId: string;
  relationship: string;
  isActive: boolean;
  guardian?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}

/**
 * Temporary authorization
 */
export interface TemporaryAuthorization {
  id: string;
  studentId: string;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  authorizedBy: string;
  delegateName: string;
  delegatePhone: string;
  delegateIdNumber?: string;
  relationship: string;
  validFrom: string | Date;
  validUntil: string | Date;
  specialInstructions?: string;
  verificationCode?: string;
  isUsed: boolean;
  usedAt?: string | Date;
  createdAt: string | Date;
}
