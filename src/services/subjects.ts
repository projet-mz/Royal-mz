import { supabase } from '../lib/supabase/client';
import { Subject } from '../lib/types';
import { sanitizeInput } from './security';

/**
 * Get all subjects
 */
export async function getSubjects() {
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('*');
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting subjects:', error);
    return { data: null, error };
  }
}

/**
 * Get subject by ID
 */
export async function getSubjectById(id: string) {
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting subject:', error);
    return { data: null, error };
  }
}

/**
 * Get subjects by grade
 */
export async function getSubjectsByGrade(grade: string) {
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('grade', grade);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting subjects by grade:', error);
    return { data: null, error };
  }
}

/**
 * Get subjects by class
 */
export async function getSubjectsByClass(classId: string) {
  try {
    const { data, error } = await supabase
      .from('class_subjects')
      .select(`
        subject,
        subject_details:subjects!inner(*)
      `)
      .eq('class_id', classId);
      
    if (error) throw error;
    
    const subjects = data.map(item => item.subject_details);
    
    return { data: subjects, error: null };
  } catch (error) {
    console.error('Error getting subjects by class:', error);
    return { data: null, error };
  }
}

/**
 * Create a new subject
 */
export async function createSubject(subject: Omit<Subject, 'id'>) {
  try {
    const sanitizedName = sanitizeInput(subject.name);
    const sanitizedCode = sanitizeInput(subject.code);
    const sanitizedDescription = sanitizeInput(subject.description);
    
    const { data, error } = await supabase
      .from('subjects')
      .insert([{
        name: sanitizedName,
        code: sanitizedCode,
        description: sanitizedDescription,
        grade: subject.grade
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating subject:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing subject
 */
export async function updateSubject(id: string, subject: Partial<Subject>) {
  try {
    const updateData: Record<string, any> = {};
    
    if (subject.name) updateData.name = sanitizeInput(subject.name);
    if (subject.code) updateData.code = sanitizeInput(subject.code);
    if (subject.description) updateData.description = sanitizeInput(subject.description);
    if (subject.grade) updateData.grade = subject.grade;
    
    const { data, error } = await supabase
      .from('subjects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating subject:', error);
    return { data: null, error };
  }
}

/**
 * Delete a subject
 */
export async function deleteSubject(id: string) {
  try {
    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting subject:', error);
    return { error };
  }
}

/**
 * Add a subject to a class
 */
export async function addSubjectToClass(classId: string, subject: string) {
  try {
    const { data, error } = await supabase
      .from('class_subjects')
      .insert([{
        class_id: classId,
        subject: sanitizeInput(subject)
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding subject to class:', error);
    return { data: null, error };
  }
}

/**
 * Remove a subject from a class
 */
export async function removeSubjectFromClass(classId: string, subject: string) {
  try {
    const { error } = await supabase
      .from('class_subjects')
      .delete()
      .match({
        class_id: classId,
        subject
      });
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error removing subject from class:', error);
    return { error };
  }
}
