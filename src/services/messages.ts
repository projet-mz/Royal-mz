import { supabase } from '../lib/supabase/client';
import { Message } from '../lib/types';
import { sanitizeInput } from './security';

/**
 * Get all messages
 */
export async function getMessages() {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id (*),
        receiver:receiver_id (*)
      `)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting messages:', error);
    return { data: null, error };
  }
}

/**
 * Get message by ID
 */
export async function getMessageById(id: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id (*),
        receiver:receiver_id (*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting message:', error);
    return { data: null, error };
  }
}

/**
 * Get messages by sender ID
 */
export async function getMessagesBySender(senderId: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        receiver:receiver_id (*)
      `)
      .eq('sender_id', senderId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting messages by sender:', error);
    return { data: null, error };
  }
}

/**
 * Get messages by receiver ID
 */
export async function getMessagesByReceiver(receiverId: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id (*)
      `)
      .eq('receiver_id', receiverId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting messages by receiver:', error);
    return { data: null, error };
  }
}

/**
 * Get conversation between two users
 */
export async function getConversation(userId1: string, userId2: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting conversation:', error);
    return { data: null, error };
  }
}

/**
 * Create a new message
 */
export async function createMessage(message: Omit<Message, 'id' | 'createdAt' | 'updatedAt' | 'read'>) {
  try {
    const sanitizedContent = sanitizeInput(message.content);
    
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        sender_id: message.senderId,
        receiver_id: message.receiverId,
        content: sanitizedContent,
        read: false,
        created_at: new Date(),
        updated_at: new Date()
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating message:', error);
    return { data: null, error };
  }
}

/**
 * Mark a message as read
 */
export async function markMessageAsRead(id: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .update({
        read: true,
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error marking message as read:', error);
    return { data: null, error };
  }
}

/**
 * Mark all messages as read for a receiver
 */
export async function markAllMessagesAsRead(receiverId: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .update({
        read: true,
        updated_at: new Date()
      })
      .eq('receiver_id', receiverId)
      .eq('read', false)
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error marking all messages as read:', error);
    return { data: null, error };
  }
}

/**
 * Delete a message
 */
export async function deleteMessage(id: string) {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting message:', error);
    return { error };
  }
}

/**
 * Get unread message count for a user
 */
export async function getUnreadMessageCount(userId: string) {
  try {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('receiver_id', userId)
      .eq('read', false);
      
    if (error) throw error;
    return { count, error: null };
  } catch (error) {
    console.error('Error getting unread message count:', error);
    return { count: 0, error };
  }
}

/**
 * Get recent conversations for a user
 */
export async function getRecentConversations(userId: string) {
  try {
    const { data, error } = await supabase.rpc('get_recent_conversations', {
      user_id: userId
    });
    
    if (error) throw error;
    
    const conversationsWithUsers = await Promise.all(
      data.map(async (conversation: any) => {
        const otherUserId = conversation.sender_id === userId ? conversation.receiver_id : conversation.sender_id;
        
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', otherUserId)
          .single();
          
        if (userError) throw userError;
        
        return {
          ...conversation,
          otherUser: userData
        };
      })
    );
    
    return { data: conversationsWithUsers, error: null };
  } catch (error) {
    console.error('Error getting recent conversations:', error);
    return { data: null, error };
  }
}
