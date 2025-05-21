import { supabase } from '../lib/supabase/client';
import { Schedule } from '../lib/types';
import { sanitizeInput } from './security';

/**
 * Get all schedules
 */
export async function getSchedules() {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select(`
        *,
        class:class_id (*),
        teacher:teacher_id (*)
      `);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting schedules:', error);
    return { data: null, error };
  }
}

/**
 * Get schedule by ID
 */
export async function getScheduleById(id: string) {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select(`
        *,
        class:class_id (*),
        teacher:teacher_id (*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting schedule:', error);
    return { data: null, error };
  }
}

/**
 * Get schedules by class ID
 */
export async function getSchedulesByClass(classId: string) {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select(`
        *,
        teacher:teacher_id (*)
      `)
      .eq('class_id', classId)
      .order('week_day', { ascending: true })
      .order('start_time', { ascending: true });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting schedules by class:', error);
    return { data: null, error };
  }
}

/**
 * Get schedules by teacher ID
 */
export async function getSchedulesByTeacher(teacherId: string) {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select(`
        *,
        class:class_id (*)
      `)
      .eq('teacher_id', teacherId)
      .order('week_day', { ascending: true })
      .order('start_time', { ascending: true });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting schedules by teacher:', error);
    return { data: null, error };
  }
}

/**
 * Create a new schedule
 */
export async function createSchedule(schedule: Omit<Schedule, 'id'>) {
  try {
    const sanitizedSubject = sanitizeInput(schedule.subject);
    
    const { data, error } = await supabase
      .from('schedules')
      .insert([{
        class_id: schedule.classId,
        week_day: schedule.weekDay,
        start_time: schedule.startTime,
        end_time: schedule.endTime,
        subject: sanitizedSubject,
        teacher_id: schedule.teacherId
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating schedule:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing schedule
 */
export async function updateSchedule(id: string, schedule: Partial<Schedule>) {
  try {
    const updateData: Record<string, any> = {};
    
    if (schedule.classId) updateData.class_id = schedule.classId;
    if (schedule.weekDay !== undefined) updateData.week_day = schedule.weekDay;
    if (schedule.startTime) updateData.start_time = schedule.startTime;
    if (schedule.endTime) updateData.end_time = schedule.endTime;
    if (schedule.subject) updateData.subject = sanitizeInput(schedule.subject);
    if (schedule.teacherId !== undefined) updateData.teacher_id = schedule.teacherId;
    
    const { data, error } = await supabase
      .from('schedules')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating schedule:', error);
    return { data: null, error };
  }
}

/**
 * Delete a schedule
 */
export async function deleteSchedule(id: string) {
  try {
    const { error } = await supabase
      .from('schedules')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting schedule:', error);
    return { error };
  }
}

/**
 * Check for schedule conflicts
 */
export async function checkScheduleConflicts(
  classId: string,
  weekDay: number,
  startTime: string,
  endTime: string,
  excludeId?: string
) {
  try {
    let query = supabase
      .from('schedules')
      .select('*')
      .eq('class_id', classId)
      .eq('week_day', weekDay)
      .or(`start_time.lte.${endTime},end_time.gte.${startTime}`);
      
    if (excludeId) {
      query = query.neq('id', excludeId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return { 
      hasConflict: data.length > 0,
      conflicts: data,
      error: null
    };
  } catch (error) {
    console.error('Error checking schedule conflicts:', error);
    return { 
      hasConflict: false,
      conflicts: [],
      error
    };
  }
}

/**
 * Get teacher availability
 */
export async function getTeacherAvailability(teacherId: string, weekDay: number) {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select('start_time, end_time')
      .eq('teacher_id', teacherId)
      .eq('week_day', weekDay)
      .order('start_time', { ascending: true });
      
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error getting teacher availability:', error);
    return { data: null, error };
  }
}
