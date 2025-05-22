import { supabase } from '../lib/supabase/client';

export interface Resource {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  fileType: 'document' | 'video' | 'audio' | 'image' | 'link' | 'other';
  subjectId: string;
  gradeLevel: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  subjectId: string;
  classId: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
  maxScore: number;
  resourceIds: string[];
  isPublished: boolean;
}

export async function getResourcesBySubject(subjectId: string) {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('subjectId', subjectId)
      .eq('isPublished', true)
      .order('createdAt', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting resources:', error);
    return { data: null, error };
  }
}

export async function getResourcesByTeacher(teacherId: string) {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('teacherId', teacherId)
      .order('createdAt', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting resources:', error);
    return { data: null, error };
  }
}

export async function createResource(resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const { data, error } = await supabase
      .from('resources')
      .insert([{
        title: resource.title,
        description: resource.description,
        fileUrl: resource.fileUrl,
        fileType: resource.fileType,
        subjectId: resource.subjectId,
        gradeLevel: resource.gradeLevel,
        teacherId: resource.teacherId,
        isPublished: resource.isPublished
      }])
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating resource:', error);
    return { data: null, error };
  }
}

export async function getAssignmentsByClass(classId: string) {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('classId', classId)
      .eq('isPublished', true)
      .order('dueDate', { ascending: true });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting assignments:', error);
    return { data: null, error };
  }
}

export async function getAssignmentsByTeacher(teacherId: string) {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('teacherId', teacherId)
      .order('createdAt', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting assignments:', error);
    return { data: null, error };
  }
}

export async function createAssignment(assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .insert([{
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate,
        subjectId: assignment.subjectId,
        classId: assignment.classId,
        teacherId: assignment.teacherId,
        maxScore: assignment.maxScore,
        resourceIds: assignment.resourceIds,
        isPublished: assignment.isPublished
      }])
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating assignment:', error);
    return { data: null, error };
  }
}
