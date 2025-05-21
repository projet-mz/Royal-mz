import { supabase } from '../lib/supabase/client';
import { Class } from '../lib/types';
import { sanitizeInput } from './security';

/**
 * Get all classes with teacher data
 */
export async function getClasses() {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        teacher:teacher_id (*)
      `);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting classes:', error);
    return { data: null, error };
  }
}

/**
 * Get class by ID with teacher data
 */
export async function getClassById(id: string) {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        teacher:teacher_id (*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting class:', error);
    return { data: null, error };
  }
}

/**
 * Get classes by teacher ID
 */
export async function getClassesByTeacher(teacherId: string) {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .eq('teacher_id', teacherId);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting classes by teacher:', error);
    return { data: null, error };
  }
}

/**
 * Get classes by grade
 */
export async function getClassesByGrade(grade: string) {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        teacher:teacher_id (*)
      `)
      .eq('grade', grade);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting classes by grade:', error);
    return { data: null, error };
  }
}

/**
 * Create a new class
 */
export async function createClass(classData: Omit<Class, 'id'>) {
  try {
    const sanitizedName = sanitizeInput(classData.name);
    
    const { data, error } = await supabase
      .from('classes')
      .insert([{
        name: sanitizedName,
        grade: classData.grade,
        teacher_id: classData.teacherId
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating class:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing class
 */
export async function updateClass(id: string, classData: Partial<Class>) {
  try {
    const updateData: Record<string, any> = {};
    
    if (classData.name) updateData.name = sanitizeInput(classData.name);
    if (classData.grade) updateData.grade = classData.grade;
    if (classData.teacherId !== undefined) updateData.teacher_id = classData.teacherId;
    
    const { data, error } = await supabase
      .from('classes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating class:', error);
    return { data: null, error };
  }
}

/**
 * Delete a class
 */
export async function deleteClass(id: string) {
  try {
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting class:', error);
    return { error };
  }
}

/**
 * Add a student to a class
 */
export async function addStudentToClass(classId: string, studentId: string) {
  try {
    const { data, error } = await supabase
      .from('class_students')
      .insert([{
        class_id: classId,
        student_id: studentId
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding student to class:', error);
    return { data: null, error };
  }
}

/**
 * Remove a student from a class
 */
export async function removeStudentFromClass(classId: string, studentId: string) {
  try {
    const { error } = await supabase
      .from('class_students')
      .delete()
      .match({
        class_id: classId,
        student_id: studentId
      });
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error removing student from class:', error);
    return { error };
  }
}

/**
 * Get class count by grade
 */
export async function getClassCountByGrade() {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select('grade');
      
    if (error) throw error;
    
    const counts: Record<string, number> = {};
    data.forEach(classItem => {
      const grade = classItem.grade;
      counts[grade] = (counts[grade] || 0) + 1;
    });
    
    const result = Object.entries(counts).map(([grade, count]) => ({
      grade,
      count
    }));
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error getting class count by grade:', error);
    return { data: null, error };
  }
}
