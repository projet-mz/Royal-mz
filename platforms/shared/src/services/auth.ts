import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '../types/user';

export class AuthService {
  private supabase: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
  }

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { data: null, error };
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error };
    }
  }

  async getSession() {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error getting session:', error);
      return { data: null, error };
    }
  }

  async getUser(): Promise<{ data: User | null, error: any }> {
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
        
      if (error) throw error;
      return { data: data as User, error: null };
    } catch (error) {
      console.error('Error getting user:', error);
      return { data: null, error };
    }
  }
}
