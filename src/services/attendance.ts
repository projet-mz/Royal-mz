import { supabase } from '../lib/supabase/client';
import { Attendance } from '../lib/types';
import { sanitizeInput } from './security';

/**
 * Get all attendance records
 */
export async function getAttendance() {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        student:student_id (*),
        class:class_id (*)
      `);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting attendance records:', error);
    return { data: null, error };
  }
}

/**
 * Get attendance by ID
 */
export async function getAttendanceById(id: string) {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        student:student_id (*),
        class:class_id (*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting attendance record:', error);
    return { data: null, error };
  }
}

/**
 * Get attendance by student ID
 */
export async function getAttendanceByStudent(studentId: string) {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        class:class_id (*)
      `)
      .eq('student_id', studentId)
      .order('date', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting attendance by student:', error);
    return { data: null, error };
  }
}

/**
 * Get attendance by class ID
 */
export async function getAttendanceByClass(classId: string, date?: string) {
  try {
    let query = supabase
      .from('attendance')
      .select(`
        *,
        student:student_id (*)
      `)
      .eq('class_id', classId);
      
    if (date) {
      query = query.eq('date', date);
    }
    
    const { data, error } = await query.order('date', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting attendance by class:', error);
    return { data: null, error };
  }
}

/**
 * Get attendance by date
 */
export async function getAttendanceByDate(date: string) {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        student:student_id (*),
        class:class_id (*)
      `)
      .eq('date', date);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting attendance by date:', error);
    return { data: null, error };
  }
}

/**
 * Create a new attendance record
 */
export async function createAttendance(attendance: Omit<Attendance, 'id'>) {
  try {
    const sanitizedRemarks = attendance.remarks ? sanitizeInput(attendance.remarks) : null;
    
    const { data, error } = await supabase
      .from('attendance')
      .insert([{
        student_id: attendance.studentId,
        class_id: attendance.classId,
        date: attendance.date,
        status: attendance.status,
        remarks: sanitizedRemarks
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating attendance record:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing attendance record
 */
export async function updateAttendance(id: string, attendance: Partial<Attendance>) {
  try {
    const updateData: Record<string, any> = {};
    
    if (attendance.studentId) updateData.student_id = attendance.studentId;
    if (attendance.classId) updateData.class_id = attendance.classId;
    if (attendance.date) updateData.date = attendance.date;
    if (attendance.status) updateData.status = attendance.status;
    if (attendance.remarks !== undefined) {
      updateData.remarks = attendance.remarks ? sanitizeInput(attendance.remarks) : null;
    }
    
    const { data, error } = await supabase
      .from('attendance')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating attendance record:', error);
    return { data: null, error };
  }
}

/**
 * Delete an attendance record
 */
export async function deleteAttendance(id: string) {
  try {
    const { error } = await supabase
      .from('attendance')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting attendance record:', error);
    return { error };
  }
}

/**
 * Bulk create attendance records for a class
 */
export async function bulkCreateAttendance(
  classId: string,
  date: string,
  records: { studentId: string; status: 'present' | 'absent' | 'late'; remarks?: string }[]
) {
  try {
    const insertData = records.map(record => ({
      student_id: record.studentId,
      class_id: classId,
      date,
      status: record.status,
      remarks: record.remarks ? sanitizeInput(record.remarks) : null
    }));
    
    const { data, error } = await supabase
      .from('attendance')
      .insert(insertData)
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error bulk creating attendance records:', error);
    return { data: null, error };
  }
}

/**
 * Get attendance statistics for a student
 */
export async function getStudentAttendanceStats(studentId: string, startDate?: string, endDate?: string) {
  try {
    let query = supabase
      .from('attendance')
      .select('status')
      .eq('student_id', studentId);
      
    if (startDate) {
      query = query.gte('date', startDate);
    }
    
    if (endDate) {
      query = query.lte('date', endDate);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    
    const total = data.length;
    const present = data.filter(record => record.status === 'present').length;
    const absent = data.filter(record => record.status === 'absent').length;
    const late = data.filter(record => record.status === 'late').length;
    
    const stats = {
      total,
      present,
      absent,
      late,
      presentPercentage: total > 0 ? (present / total) * 100 : 0,
      absentPercentage: total > 0 ? (absent / total) * 100 : 0,
      latePercentage: total > 0 ? (late / total) * 100 : 0
    };
    
    return { data: stats, error: null };
  } catch (error) {
    console.error('Error getting student attendance statistics:', error);
    return { data: null, error };
  }
}

/**
 * Get attendance statistics for a class
 */
export async function getClassAttendanceStats(classId: string, date?: string) {
  try {
    let query = supabase
      .from('attendance')
      .select('status')
      .eq('class_id', classId);
      
    if (date) {
      query = query.eq('date', date);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    
    const total = data.length;
    const present = data.filter(record => record.status === 'present').length;
    const absent = data.filter(record => record.status === 'absent').length;
    const late = data.filter(record => record.status === 'late').length;
    
    const stats = {
      total,
      present,
      absent,
      late,
      presentPercentage: total > 0 ? (present / total) * 100 : 0,
      absentPercentage: total > 0 ? (absent / total) * 100 : 0,
      latePercentage: total > 0 ? (late / total) * 100 : 0
    };
    
    return { data: stats, error: null };
  } catch (error) {
    console.error('Error getting class attendance statistics:', error);
    return { data: null, error };
  }
}
