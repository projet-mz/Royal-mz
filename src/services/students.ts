import { supabase } from '../lib/supabase/client';
import { Student } from '../lib/types';
import { sanitizeInput } from './security';

/**
 * Get all students with user data
 */
export async function getStudents() {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        user:id (*)
      `);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting students:', error);
    return { data: null, error };
  }
}

/**
 * Get student by ID with user data
 */
export async function getStudentById(id: string) {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        user:id (*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting student:', error);
    return { data: null, error };
  }
}

/**
 * Get students by class
 */
export async function getStudentsByClass(classId: string) {
  try {
    const { data, error } = await supabase
      .from('class_students')
      .select(`
        student_id,
        student:student_id (
          *,
          user:id (*)
        )
      `)
      .eq('class_id', classId);
      
    if (error) throw error;
    
    const students = data.map(item => item.student);
    
    return { data: students, error: null };
  } catch (error) {
    console.error('Error getting students by class:', error);
    return { data: null, error };
  }
}

/**
 * Get students by grade
 */
export async function getStudentsByGrade(grade: string) {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        user:id (*)
      `)
      .eq('grade', grade);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting students by grade:', error);
    return { data: null, error };
  }
}

/**
 * Create a new student
 */
export async function createStudent(userId: string, student: Omit<Student, 'id' | 'user'>) {
  try {
    const sanitizedAdmissionNumber = sanitizeInput(student.admissionNumber);
    
    const { data, error } = await supabase
      .from('students')
      .insert([{
        id: userId,
        grade: student.grade,
        class: student.class,
        date_of_birth: student.dateOfBirth,
        gender: student.gender,
        parent_id: student.parentId,
        admission_number: sanitizedAdmissionNumber
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating student:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing student
 */
export async function updateStudent(id: string, student: Partial<Student>) {
  try {
    const updateData: Record<string, any> = {};
    
    if (student.grade) updateData.grade = student.grade;
    if (student.class) updateData.class = student.class;
    if (student.dateOfBirth) updateData.date_of_birth = student.dateOfBirth;
    if (student.gender) updateData.gender = student.gender;
    if (student.parentId) updateData.parent_id = student.parentId;
    if (student.admissionNumber) updateData.admission_number = sanitizeInput(student.admissionNumber);
    
    const { data, error } = await supabase
      .from('students')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating student:', error);
    return { data: null, error };
  }
}

/**
 * Delete a student
 */
export async function deleteStudent(id: string) {
  try {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting student:', error);
    return { error };
  }
}

/**
 * Get student count by grade
 */
export async function getStudentCountByGrade() {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('grade');
      
    if (error) throw error;
    
    // Count students by grade
    const counts: Record<string, number> = {};
    data.forEach(student => {
      const grade = student.grade;
      counts[grade] = (counts[grade] || 0) + 1;
    });
    
    const result = Object.entries(counts).map(([grade, count]) => ({
      grade,
      count
    }));
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error getting student count by grade:', error);
    return { data: null, error };
  }
}
