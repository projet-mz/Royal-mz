import { supabase } from '../lib/supabase/client';
import { Announcement, UserRole } from '../lib/types';
import { sanitizeInput } from './security';

/**
 * Get all announcements
 */
export async function getAnnouncements() {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select(`
        *,
        author:author_id (*)
      `)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting announcements:', error);
    return { data: null, error };
  }
}

/**
 * Get announcement by ID
 */
export async function getAnnouncementById(id: string) {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select(`
        *,
        author:author_id (*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting announcement:', error);
    return { data: null, error };
  }
}

/**
 * Get announcements by author ID
 */
export async function getAnnouncementsByAuthor(authorId: string) {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting announcements by author:', error);
    return { data: null, error };
  }
}

/**
 * Get announcements by target audience
 */
export async function getAnnouncementsByTargetAudience(role: UserRole) {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select(`
        *,
        author:author_id (*)
      `)
      .contains('target_audience', [role])
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting announcements by target audience:', error);
    return { data: null, error };
  }
}

/**
 * Create a new announcement
 */
export async function createAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const sanitizedTitle = sanitizeInput(announcement.title);
    const sanitizedContent = sanitizeInput(announcement.content);
    
    const { data, error } = await supabase
      .from('announcements')
      .insert([{
        title: sanitizedTitle,
        content: sanitizedContent,
        author_id: announcement.authorId,
        target_audience: announcement.targetAudience,
        created_at: new Date(),
        updated_at: new Date()
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating announcement:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing announcement
 */
export async function updateAnnouncement(id: string, announcement: Partial<Announcement>) {
  try {
    const updateData: Record<string, any> = {
      updated_at: new Date()
    };
    
    if (announcement.title) updateData.title = sanitizeInput(announcement.title);
    if (announcement.content) updateData.content = sanitizeInput(announcement.content);
    if (announcement.authorId) updateData.author_id = announcement.authorId;
    if (announcement.targetAudience) updateData.target_audience = announcement.targetAudience;
    
    const { data, error } = await supabase
      .from('announcements')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating announcement:', error);
    return { data: null, error };
  }
}

/**
 * Delete an announcement
 */
export async function deleteAnnouncement(id: string) {
  try {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return { error };
  }
}

/**
 * Get recent announcements for a user
 */
export async function getRecentAnnouncementsForUser(role: UserRole, limit: number = 5) {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select(`
        *,
        author:author_id (*)
      `)
      .contains('target_audience', [role])
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting recent announcements for user:', error);
    return { data: null, error };
  }
}

/**
 * Search announcements
 */
export async function searchAnnouncements(query: string) {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select(`
        *,
        author:author_id (*)
      `)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error searching announcements:', error);
    return { data: null, error };
  }
}
