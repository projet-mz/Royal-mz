import { supabase } from '../lib/supabase/client';
import { Parent } from '../lib/types';
import { sanitizeInput } from './security';

/**
 * Get all parents with user data
 */
export async function getParents() {
  try {
    const { data, error } = await supabase
      .from('parents')
      .select(`
        *,
        user:id (*)
      `);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting parents:', error);
    return { data: null, error };
  }
}

/**
 * Get parent by ID with user data
 */
export async function getParentById(id: string) {
  try {
    const { data, error } = await supabase
      .from('parents')
      .select(`
        *,
        user:id (*),
        children:students(*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting parent:', error);
    return { data: null, error };
  }
}

/**
 * Get parent by student ID
 */
export async function getParentByStudentId(studentId: string) {
  try {
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('parent_id')
      .eq('id', studentId)
      .single();
      
    if (studentError) throw studentError;
    
    if (!student.parent_id) {
      return { data: null, error: null };
    }
    
    const { data, error } = await supabase
      .from('parents')
      .select(`
        *,
        user:id (*)
      `)
      .eq('id', student.parent_id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting parent by student ID:', error);
    return { data: null, error };
  }
}

/**
 * Create a new parent
 */
export async function createParent(userId: string, parent: Omit<Parent, 'id' | 'user'>) {
  try {
    const sanitizedPhoneNumber = sanitizeInput(parent.phoneNumber);
    const sanitizedAddress = sanitizeInput(parent.address);
    
    const { data, error } = await supabase
      .from('parents')
      .insert([{
        id: userId,
        phone_number: sanitizedPhoneNumber,
        address: sanitizedAddress
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating parent:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing parent
 */
export async function updateParent(id: string, parent: Partial<Parent>) {
  try {
    const updateData: Record<string, any> = {};
    
    if (parent.phoneNumber) updateData.phone_number = sanitizeInput(parent.phoneNumber);
    if (parent.address) updateData.address = sanitizeInput(parent.address);
    
    const { data, error } = await supabase
      .from('parents')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating parent:', error);
    return { data: null, error };
  }
}

/**
 * Delete a parent
 */
export async function deleteParent(id: string) {
  try {
    const { error: updateError } = await supabase
      .from('students')
      .update({ parent_id: null })
      .eq('parent_id', id);
      
    if (updateError) throw updateError;
    
    const { error } = await supabase
      .from('parents')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return { error: null };
  } catch (error) {
    console.error('Error deleting parent:', error);
    return { error };
  }
}

/**
 * Get children of a parent
 */
export async function getChildrenOfParent(parentId: string) {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        user:id (*)
      `)
      .eq('parent_id', parentId);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting children of parent:', error);
    return { data: null, error };
  }
}

/**
 * Link a student to a parent
 */
export async function linkStudentToParent(studentId: string, parentId: string) {
  try {
    const { data, error } = await supabase
      .from('students')
      .update({ parent_id: parentId })
      .eq('id', studentId)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error linking student to parent:', error);
    return { data: null, error };
  }
}

/**
 * Unlink a student from a parent
 */
export async function unlinkStudentFromParent(studentId: string) {
  try {
    const { data, error } = await supabase
      .from('students')
      .update({ parent_id: null })
      .eq('id', studentId)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error unlinking student from parent:', error);
    return { data: null, error };
  }
}
