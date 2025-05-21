import { supabase } from '../lib/supabase/client';
import { UserRole } from '../lib/types';
import { logSecurityEvent } from './security';

/**
 * Sign up a new user with email and password
 */
export async function signUp(
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string, 
  role: UserRole
) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role,
        },
      },
    });

    if (error) throw error;
    
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: data.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
          role,
          created_at: new Date(),
          updated_at: new Date()
        }]);
        
      if (profileError) throw profileError;
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error signing up:', error);
    return { data: null, error };
  }
}

/**
 * Sign in a user with email and password
 */
export async function signIn(email: string, password: string, ipAddress?: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Failed login attempt:', error.message);
      throw error;
    }
    
    if (data?.session?.user) {
      await logSecurityEvent(
        data.session.user.id,
        'login',
        { email },
        ipAddress
      );
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error signing in:', error);
    return { data: null, error };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(userId?: string, ipAddress?: string) {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (userId) {
      await logSecurityEvent(
        userId,
        'logout',
        { timestamp: new Date().toISOString() },
        ipAddress
      );
    }
    
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
}

/**
 * Get the current session
 */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting session:', error);
    return { data: null, error };
  }
}

/**
 * Get the current user with profile data
 */
export async function getUser() {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return { data: null, error: sessionError || new Error('No session found') };
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting user:', error);
    return { data: null, error };
  }
}

/**
 * Reset password for a user
 */
export async function resetPassword(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { data: null, error };
  }
}

/**
 * Update password for the current user
 */
export async function updatePassword(password: string, userId?: string, ipAddress?: string) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    
    if (error) throw error;
    
    if (userId) {
      await logSecurityEvent(
        userId,
        'password_reset',
        { timestamp: new Date().toISOString() },
        ipAddress
      );
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error updating password:', error);
    return { data: null, error };
  }
}
