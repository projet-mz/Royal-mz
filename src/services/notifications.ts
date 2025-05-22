import { supabase } from '../lib/supabase/client';
import { AlertSeverity } from '../lib/types/security';

export type NotificationType = 'security' | 'academic' | 'attendance' | 'fees' | 'announcement';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  severity: AlertSeverity;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export async function getNotifications(userId: string) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting notifications:', error);
    return { data: null, error };
  }
}

export async function createNotification(notification: Omit<Notification, 'id' | 'createdAt'>) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{
        userId: notification.userId,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        severity: notification.severity,
        isRead: false,
        actionUrl: notification.actionUrl
      }])
      .select();
      
    if (error) throw error;
    
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
      try {
        await sendPushNotification(notification);
      } catch (pushError) {
        console.error('Error sending push notification:', pushError);
      }
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error creating notification:', error);
    return { data: null, error };
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ isRead: true })
      .eq('id', notificationId)
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return { data: null, error };
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting notification:', error);
    return { error };
  }
}

async function sendPushNotification(notification: Omit<Notification, 'id' | 'createdAt'>) {
  if (Notification.permission === 'granted') {
    new Notification(notification.title, {
      body: notification.message,
      icon: '/logo.png'
    });
  } else if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/logo.png'
      });
    }
  }
}
