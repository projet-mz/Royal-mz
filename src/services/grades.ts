import { supabase } from '../lib/supabase/client';
import { Grade } from '../lib/types';
import { sanitizeInput } from './security';
import { getClassesByTeacher } from './classes';

/**
 * Get all grades
 */
export async function getGrades() {
  try {
    const { data, error } = await supabase
      .from('grades')
      .select(`
        *,
        student:student_id (*),
        subject:subject_id (*)
      `);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting grades:', error);
    return { data: null, error };
  }
}

/**
 * Get grade by ID
 */
export async function getGradeById(id: string) {
  try {
    const { data, error } = await supabase
      .from('grades')
      .select(`
        *,
        student:student_id (*),
        subject:subject_id (*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting grade:', error);
    return { data: null, error };
  }
}

/**
 * Get grades by student ID
 */
export async function getGradesByStudent(studentId: string, term?: number) {
  try {
    let query = supabase
      .from('grades')
      .select(`
        *,
        subject:subject_id (*)
      `)
      .eq('student_id', studentId);
      
    if (term !== undefined) {
      query = query.eq('term', term);
    }
    
    const { data, error } = await query.order('date', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting grades by student:', error);
    return { data: null, error };
  }
}

/**
 * Get grades by subject ID
 */
export async function getGradesBySubject(subjectId: string, term?: number) {
  try {
    let query = supabase
      .from('grades')
      .select(`
        *,
        student:student_id (*)
      `)
      .eq('subject_id', subjectId);
      
    if (term !== undefined) {
      query = query.eq('term', term);
    }
    
    const { data, error } = await query.order('score', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting grades by subject:', error);
    return { data: null, error };
  }
}

/**
 * Create a new grade
 */
export async function createGrade(grade: Omit<Grade, 'id'>) {
  try {
    const sanitizedRemarks = grade.remarks ? sanitizeInput(grade.remarks) : null;
    
    const { data, error } = await supabase
      .from('grades')
      .insert([{
        student_id: grade.studentId,
        subject_id: grade.subjectId,
        term: grade.term,
        score: grade.score,
        max_score: grade.maxScore,
        remarks: sanitizedRemarks,
        date: grade.date
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating grade:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing grade
 */
export async function updateGrade(id: string, grade: Partial<Grade>) {
  try {
    const updateData: Record<string, any> = {};
    
    if (grade.studentId) updateData.student_id = grade.studentId;
    if (grade.subjectId) updateData.subject_id = grade.subjectId;
    if (grade.term !== undefined) updateData.term = grade.term;
    if (grade.score !== undefined) updateData.score = grade.score;
    if (grade.maxScore !== undefined) updateData.max_score = grade.maxScore;
    if (grade.remarks !== undefined) {
      updateData.remarks = grade.remarks ? sanitizeInput(grade.remarks) : null;
    }
    if (grade.date) updateData.date = grade.date;
    
    const { data, error } = await supabase
      .from('grades')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating grade:', error);
    return { data: null, error };
  }
}

/**
 * Delete a grade
 */
export async function deleteGrade(id: string) {
  try {
    const { error } = await supabase
      .from('grades')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting grade:', error);
    return { error };
  }
}

/**
 * Bulk create grades for a subject
 */
export async function bulkCreateGrades(
  subjectId: string,
  term: number,
  date: string,
  records: { studentId: string; score: number; maxScore: number; remarks?: string }[]
) {
  try {
    const insertData = records.map(record => ({
      student_id: record.studentId,
      subject_id: subjectId,
      term,
      score: record.score,
      max_score: record.maxScore,
      remarks: record.remarks ? sanitizeInput(record.remarks) : null,
      date
    }));
    
    const { data, error } = await supabase
      .from('grades')
      .insert(insertData)
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error bulk creating grades:', error);
    return { data: null, error };
  }
}

/**
 * Get student performance statistics
 */
export async function getStudentPerformanceStats(studentId: string, term?: number) {
  try {
    let query = supabase
      .from('grades')
      .select(`
        *,
        subject:subject_id (*)
      `)
      .eq('student_id', studentId);
      
    if (term !== undefined) {
      query = query.eq('term', term);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    
    const totalGrades = data.length;
    let totalPercentage = 0;
    
    data.forEach(grade => {
      const percentage = (grade.score / grade.max_score) * 100;
      totalPercentage += percentage;
    });
    
    const averagePercentage = totalGrades > 0 ? totalPercentage / totalGrades : 0;
    
    const subjectStats: Record<string, { total: number; average: number }> = {};
    
    data.forEach(grade => {
      const subjectName = grade.subject.name;
      const percentage = (grade.score / grade.max_score) * 100;
      
      if (!subjectStats[subjectName]) {
        subjectStats[subjectName] = { total: 0, average: 0 };
      }
      
      subjectStats[subjectName].total += 1;
      subjectStats[subjectName].average += percentage;
    });
    
    Object.keys(subjectStats).forEach(subject => {
      subjectStats[subject].average = subjectStats[subject].average / subjectStats[subject].total;
    });
    
    const stats = {
      totalGrades,
      averagePercentage,
      subjectStats
    };
    
    return { data: stats, error: null };
  } catch (error) {
    console.error('Error getting student performance statistics:', error);
    return { data: null, error };
  }
}

/**
 * Get class performance statistics
 */
export async function getClassPerformanceStats(classId: string, term?: number) {
  try {
    const { data: students, error: studentsError } = await supabase
      .from('class_students')
      .select('student_id')
      .eq('class_id', classId);
      
    if (studentsError) throw studentsError;
    
    const studentIds = students.map(s => s.student_id);
    
    let query = supabase
      .from('grades')
      .select(`
        *,
        subject:subject_id (*)
      `)
      .in('student_id', studentIds);
      
    if (term !== undefined) {
      query = query.eq('term', term);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    
    const totalGrades = data.length;
    let totalPercentage = 0;
    
    data.forEach(grade => {
      const percentage = (grade.score / grade.max_score) * 100;
      totalPercentage += percentage;
    });
    
    const averagePercentage = totalGrades > 0 ? totalPercentage / totalGrades : 0;
    
    const subjectStats: Record<string, { total: number; average: number }> = {};
    
    data.forEach(grade => {
      const subjectName = grade.subject.name;
      const percentage = (grade.score / grade.max_score) * 100;
      
      if (!subjectStats[subjectName]) {
        subjectStats[subjectName] = { total: 0, average: 0 };
      }
      
      subjectStats[subjectName].total += 1;
      subjectStats[subjectName].average += percentage;
    });
    
    Object.keys(subjectStats).forEach(subject => {
      subjectStats[subject].average = subjectStats[subject].average / subjectStats[subject].total;
    });
    
    const stats = {
      totalGrades,
      averagePercentage,
      subjectStats
    };
    
    return { data: stats, error: null };
  } catch (error) {
    console.error('Error getting class performance statistics:', error);
    return { data: null, error };
  }
}

/**
 * Get grades by teacher ID
 * This function gets all grades for classes taught by a specific teacher
 */
export async function getGradesByTeacher(teacherId: string) {
  try {
    const { data: classes, error: classesError } = await getClassesByTeacher(teacherId);
    
    if (classesError) throw classesError;
    if (!classes || classes.length === 0) return { data: [], error: null };
    
    const classIds = classes.map(c => c.id);
    
    const { data: classStudents, error: studentsError } = await supabase
      .from('class_students')
      .select('student_id, class_id')
      .in('class_id', classIds);
      
    if (studentsError) throw studentsError;
    if (!classStudents || classStudents.length === 0) return { data: [], error: null };
    
    const studentIds = Array.from(new Set(classStudents.map(cs => cs.student_id)));
    
    const { data, error } = await supabase
      .from('grades')
      .select(`
        *,
        student:student_id (*),
        subject:subject_id (*)
      `)
      .in('student_id', studentIds)
      .order('date', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting grades by teacher:', error);
    return { data: null, error };
  }
}
