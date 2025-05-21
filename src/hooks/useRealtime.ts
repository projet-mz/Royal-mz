import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/client';

/**
 * Hook for real-time data subscription
 * @param table The table to subscribe to
 * @param column Optional column for filtering
 * @param value Optional value for filtering
 * @returns Object containing data, loading state, and error
 */
export function useRealtimeSubscription<T>(
  table: string,
  column?: string,
  value?: string
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    
    const fetchData = async () => {
      try {
        let query = supabase.from(table).select('*');
        
        if (column && value) {
          query = query.eq(column, value);
        }
        
        const { data: initialData, error: initialError } = await query;
        
        if (initialError) {
          throw initialError;
        }
        
        setData(initialData as T[]);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    const subscription = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table,
          ...(column && value ? { filter: `${column}=eq.${value}` } : {})
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setData((prev) => [...prev, payload.new as T]);
          } else if (payload.eventType === 'UPDATE') {
            setData((prev) =>
              prev.map((item: any) =>
                item.id === payload.new.id ? payload.new : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setData((prev) =>
              prev.filter((item: any) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [table, column, value]);

  return { data, loading, error };
}

/**
 * Hook for real-time notifications
 * @param userId The user ID to subscribe to notifications for
 * @returns Object containing notifications, loading state, and error
 */
export function useRealtimeNotifications(userId: string) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    
    const fetchNotifications = async () => {
      try {
        const { data: initialData, error: initialError } = await supabase
          .from('announcements')
          .select('*')
          .contains('target_audience', [userId])
          .order('created_at', { ascending: false });
        
        if (initialError) {
          throw initialError;
        }
        
        setNotifications(initialData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
    
    const subscription = supabase
      .channel('announcements-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'announcements',
          filter: `target_audience=cs.{${userId}}`
        },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  return { notifications, loading, error };
}

/**
 * Hook for real-time messages
 * @param userId The user ID to subscribe to messages for
 * @returns Object containing messages, loading state, and error
 */
export function useRealtimeMessages(userId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    
    const fetchMessages = async () => {
      try {
        const { data: initialData, error: initialError } = await supabase
          .from('messages')
          .select('*')
          .eq('receiver_id', userId)
          .order('created_at', { ascending: false });
        
        if (initialError) {
          throw initialError;
        }
        
        setMessages(initialData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
    
    const subscription = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`
        },
        (payload) => {
          setMessages((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  return { messages, loading, error };
}

/**
 * Hook for real-time attendance updates
 * @param classId The class ID to subscribe to attendance updates for
 * @param date Optional date for filtering
 * @returns Object containing attendance data, loading state, and error
 */
export function useRealtimeAttendance(classId: string, date?: string) {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    
    const fetchAttendance = async () => {
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
        
        const { data: initialData, error: initialError } = await query;
        
        if (initialError) {
          throw initialError;
        }
        
        setAttendance(initialData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAttendance();
    
    const subscription = supabase
      .channel('attendance-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'attendance',
          filter: `class_id=eq.${classId}${date ? `,date=eq.${date}` : ''}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAttendance((prev) => [...prev, payload.new]);
          } else if (payload.eventType === 'UPDATE') {
            setAttendance((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setAttendance((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [classId, date]);

  return { attendance, loading, error };
}
