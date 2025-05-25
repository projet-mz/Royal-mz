import { SupabaseClient } from '@supabase/supabase-js';
import { UserSession, User } from '../../shared-types/src';

export class AuthManager {
  private supabase: SupabaseClient;
  private socket: any;
  private storage: Storage;
  private onSessionChange: (session: UserSession | null) => void;
  
  constructor(options: {
    supabase: SupabaseClient;
    socket: any;
    storage: Storage;
    onSessionChange?: (session: UserSession | null) => void;
  }) {
    this.supabase = options.supabase;
    this.socket = options.socket;
    this.storage = options.storage;
    this.onSessionChange = options.onSessionChange || (() => {});
    
    this.initializeAuth();
  }
  
  private initializeAuth() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.handleSignIn(session);
      } else if (event === 'SIGNED_OUT') {
        this.handleSignOut();
      }
    });
    
    this.socket.on('session_sync', (data: { action: string; session?: UserSession }) => {
      if (data.action === 'signout') {
        this.supabase.auth.signOut();
      } else if (data.action === 'update' && data.session) {
        this.storage.setItem('user_session', JSON.stringify(data.session));
        this.onSessionChange(data.session);
      }
    });
    
    this.checkExistingSession();
  }
  
  private async checkExistingSession() {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      if (data.session) {
        this.handleSignIn(data.session);
      }
    } catch (error) {
      console.error('Error checking existing session:', error);
    }
  }
  
  private async handleSignIn(session: any) {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      const userSession: UserSession = {
        id: session.session_id || Math.random().toString(36).substring(2),
        userId: session.user.id,
        token: session.access_token,
        expiresAt: new Date(session.expires_at * 1000),
        createdAt: new Date(),
        lastActiveAt: new Date(),
        platform: this.getPlatform(),
        userAgent: this.getUserAgent()
      };
      
      this.storage.setItem('user_session', JSON.stringify(userSession));
      
      this.socket.emit('authenticate', { token: session.access_token });
      
      this.onSessionChange(userSession);
      
      this.syncSession(userSession);
    } catch (error) {
      console.error('Error handling sign in:', error);
    }
  }
  
  private handleSignOut() {
    this.storage.removeItem('user_session');
    
    this.onSessionChange(null);
    
    this.syncSignOut();
  }
  
  private syncSession(session: UserSession) {
    this.socket.emit('session_sync', {
      action: 'update',
      session
    });
  }
  
  private syncSignOut() {
    this.socket.emit('session_sync', {
      action: 'signout'
    });
  }
  
  private getPlatform(): string {
    if (typeof window !== 'undefined') {
      if (window.navigator.userAgent.indexOf('ReactNative') >= 0) {
        return 'mobile';
      } else if (window.navigator.userAgent.indexOf('Electron') >= 0) {
        return 'desktop';
      } else {
        return 'web';
      }
    }
    return 'unknown';
  }
  
  private getUserAgent(): string {
    if (typeof window !== 'undefined') {
      return window.navigator.userAgent;
    }
    return 'unknown';
  }
  
  
  public async signIn(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { data: null, error };
    }
  }
  
  public async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      return { error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error };
    }
  }
  
  public async getUser(): Promise<{ data: User | null, error: any }> {
    try {
      const { data: { session }, error: sessionError } = await this.supabase.auth.getSession();
      
      if (sessionError || !session) {
        return { data: null, error: sessionError || new Error('No session found') };
      }
      
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) {
        throw error;
      }
      
      return { data: data as User, error: null };
    } catch (error) {
      console.error('Error getting user:', error);
      return { data: null, error };
    }
  }
  
  public async refreshSession() {
    try {
      const { data, error } = await this.supabase.auth.refreshSession();
      
      if (error) {
        throw error;
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Error refreshing session:', error);
      return { data: null, error };
    }
  }
  
  public getSession(): UserSession | null {
    try {
      const sessionStr = this.storage.getItem('user_session');
      
      if (!sessionStr) {
        return null;
      }
      
      return JSON.parse(sessionStr);
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }
  
  public updateSession(session: Partial<UserSession>) {
    try {
      const currentSession = this.getSession();
      
      if (!currentSession) {
        return { error: new Error('No session found') };
      }
      
      const updatedSession = {
        ...currentSession,
        ...session,
        lastActiveAt: new Date()
      };
      
      this.storage.setItem('user_session', JSON.stringify(updatedSession));
      
      this.onSessionChange(updatedSession);
      
      this.syncSession(updatedSession);
      
      return { error: null };
    } catch (error) {
      console.error('Error updating session:', error);
      return { error };
    }
  }
}
