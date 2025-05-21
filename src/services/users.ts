import { supabase } from '../lib/supabase/client';
import { User, UserRole } from '../lib/types';
import { encryptData, sanitizeInput } from './security';

/**
 * Get all users
 */
export async function getUsers() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting users:', error);
    return { data: null, error };
  }
}

/**
 * Get users by role
 */
export async function getUsersByRole(role: UserRole) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', role);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error getting ${role}s:`, error);
    return { data: null, error };
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting user:', error);
    return { data: null, error };
  }
}

/**
 * Create a new user
 */
export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const sanitizedFirstName = sanitizeInput(user.firstName);
    const sanitizedLastName = sanitizeInput(user.lastName);
    
    const { data, error } = await supabase
      .from('users')
      .insert([{
        email: user.email,
        first_name: sanitizedFirstName,
        last_name: sanitizedLastName,
        role: user.role,
        avatar: user.avatar
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating user:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing user
 */
export async function updateUser(id: string, user: Partial<User>) {
  try {
    const updateData: Record<string, any> = {
      updated_at: new Date()
    };
    
    if (user.email) updateData.email = user.email;
    if (user.firstName) updateData.first_name = sanitizeInput(user.firstName);
    if (user.lastName) updateData.last_name = sanitizeInput(user.lastName);
    if (user.role) updateData.role = user.role;
    if (user.avatar) updateData.avatar = user.avatar;
    
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating user:', error);
    return { data: null, error };
  }
}

/**
 * Delete a user
 */
export async function deleteUser(id: string) {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { error };
  }
}

/**
 * Search users by name or email
 */
export async function searchUsers(query: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error searching users:', error);
    return { data: null, error };
  }
}

/**
 * Get user count by role
 */
export async function getUserCountByRole() {
  try {
    // Get all users
    const { data, error } = await supabase
      .from('users')
      .select('role');
      
    if (error) throw error;
    
    // Count users by role
    const counts: Record<string, number> = {};
    data.forEach(user => {
      const role = user.role;
      counts[role] = (counts[role] || 0) + 1;
    });
    
    const result = Object.entries(counts).map(([role, count]) => ({
      role,
      count
    }));
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error getting user count by role:', error);
    return { data: null, error };
  }
}
