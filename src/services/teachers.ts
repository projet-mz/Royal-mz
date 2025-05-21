import { supabase } from '../lib/supabase/client';
import { Teacher } from '../lib/types';
import { sanitizeInput } from './security';

/**
 * Get all teachers with user data
 */
export async function getTeachers() {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .select(`
        *,
        user:id (*)
      `);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting teachers:', error);
    return { data: null, error };
  }
}

/**
 * Get teacher by ID with user data
 */
export async function getTeacherById(id: string) {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .select(`
        *,
        user:id (*),
        subjects:teacher_subjects(subject),
        qualifications:teacher_qualifications(qualification)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting teacher:', error);
    return { data: null, error };
  }
}

/**
 * Get teachers by subject
 */
export async function getTeachersBySubject(subject: string) {
  try {
    const { data, error } = await supabase
      .from('teacher_subjects')
      .select(`
        teacher_id,
        teacher:teacher_id (
          *,
          user:id (*)
        )
      `)
      .eq('subject', subject);
      
    if (error) throw error;
    
    const teachers = data.map(item => item.teacher);
    
    return { data: teachers, error: null };
  } catch (error) {
    console.error('Error getting teachers by subject:', error);
    return { data: null, error };
  }
}

/**
 * Create a new teacher
 */
export async function createTeacher(userId: string, teacher: Omit<Teacher, 'id' | 'user'>) {
  try {
    const sanitizedSpecialization = sanitizeInput(teacher.specialization);
    
    const { data, error } = await supabase
      .from('teachers')
      .insert([{
        id: userId,
        years_of_experience: teacher.yearsOfExperience,
        specialization: sanitizedSpecialization
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    if (teacher.subjects && teacher.subjects.length > 0) {
      const subjectInserts = teacher.subjects.map(subject => ({
        teacher_id: userId,
        subject: sanitizeInput(subject)
      }));
      
      const { error: subjectError } = await supabase
        .from('teacher_subjects')
        .insert(subjectInserts);
        
      if (subjectError) throw subjectError;
    }
    
    if (teacher.qualifications && teacher.qualifications.length > 0) {
      const qualificationInserts = teacher.qualifications.map(qualification => ({
        teacher_id: userId,
        qualification: sanitizeInput(qualification)
      }));
      
      const { error: qualificationError } = await supabase
        .from('teacher_qualifications')
        .insert(qualificationInserts);
        
      if (qualificationError) throw qualificationError;
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error creating teacher:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing teacher
 */
export async function updateTeacher(id: string, teacher: Partial<Teacher>) {
  try {
    const updateData: Record<string, any> = {};
    
    if (teacher.yearsOfExperience !== undefined) updateData.years_of_experience = teacher.yearsOfExperience;
    if (teacher.specialization) updateData.specialization = sanitizeInput(teacher.specialization);
    
    const { data, error } = await supabase
      .from('teachers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    if (teacher.subjects) {
      const { error: deleteError } = await supabase
        .from('teacher_subjects')
        .delete()
        .eq('teacher_id', id);
        
      if (deleteError) throw deleteError;
      
      if (teacher.subjects.length > 0) {
        const subjectInserts = teacher.subjects.map(subject => ({
          teacher_id: id,
          subject: sanitizeInput(subject)
        }));
        
        const { error: subjectError } = await supabase
          .from('teacher_subjects')
          .insert(subjectInserts);
          
        if (subjectError) throw subjectError;
      }
    }
    
    if (teacher.qualifications) {
      const { error: deleteError } = await supabase
        .from('teacher_qualifications')
        .delete()
        .eq('teacher_id', id);
        
      if (deleteError) throw deleteError;
      
      if (teacher.qualifications.length > 0) {
        const qualificationInserts = teacher.qualifications.map(qualification => ({
          teacher_id: id,
          qualification: sanitizeInput(qualification)
        }));
        
        const { error: qualificationError } = await supabase
          .from('teacher_qualifications')
          .insert(qualificationInserts);
          
        if (qualificationError) throw qualificationError;
      }
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error updating teacher:', error);
    return { data: null, error };
  }
}

/**
 * Delete a teacher
 */
export async function deleteTeacher(id: string) {
  try {
    const { error: subjectError } = await supabase
      .from('teacher_subjects')
      .delete()
      .eq('teacher_id', id);
      
    if (subjectError) throw subjectError;
    
    const { error: qualificationError } = await supabase
      .from('teacher_qualifications')
      .delete()
      .eq('teacher_id', id);
      
    if (qualificationError) throw qualificationError;
    
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return { error: null };
  } catch (error) {
    console.error('Error deleting teacher:', error);
    return { error };
  }
}

/**
 * Add a subject to a teacher
 */
export async function addSubjectToTeacher(teacherId: string, subject: string) {
  try {
    const { data, error } = await supabase
      .from('teacher_subjects')
      .insert([{
        teacher_id: teacherId,
        subject: sanitizeInput(subject)
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding subject to teacher:', error);
    return { data: null, error };
  }
}

/**
 * Remove a subject from a teacher
 */
export async function removeSubjectFromTeacher(teacherId: string, subject: string) {
  try {
    const { error } = await supabase
      .from('teacher_subjects')
      .delete()
      .match({
        teacher_id: teacherId,
        subject
      });
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error removing subject from teacher:', error);
    return { error };
  }
}

/**
 * Add a qualification to a teacher
 */
export async function addQualificationToTeacher(teacherId: string, qualification: string) {
  try {
    const { data, error } = await supabase
      .from('teacher_qualifications')
      .insert([{
        teacher_id: teacherId,
        qualification: sanitizeInput(qualification)
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding qualification to teacher:', error);
    return { data: null, error };
  }
}

/**
 * Remove a qualification from a teacher
 */
export async function removeQualificationFromTeacher(teacherId: string, qualification: string) {
  try {
    const { error } = await supabase
      .from('teacher_qualifications')
      .delete()
      .match({
        teacher_id: teacherId,
        qualification
      });
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error removing qualification from teacher:', error);
    return { error };
  }
}
