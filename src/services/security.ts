import { supabase } from '../lib/supabase/client';
import { supabaseAdmin } from '../lib/supabase/admin';

/**
 * Log a security event
 */
export async function logSecurityEvent(
  userId: string,
  eventType: 'login' | 'logout' | 'failed_login' | 'password_reset' | 'profile_update' | 'permission_change',
  details: Record<string, any>,
  ipAddress?: string
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('security_logs')
      .insert([{
        user_id: userId,
        event_type: eventType,
        details,
        ip_address: ipAddress,
        timestamp: new Date()
      }]);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error logging security event:', error);
    return { data: null, error };
  }
}

/**
 * Get security logs with optional filtering
 */
export async function getSecurityLogs(
  userId?: string, 
  eventType?: string, 
  startDate?: Date, 
  endDate?: Date
) {
  try {
    let query = supabaseAdmin
      .from('security_logs')
      .select('*')
      .order('timestamp', { ascending: false });
      
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    if (eventType) {
      query = query.eq('event_type', eventType);
    }
    
    if (startDate) {
      query = query.gte('timestamp', startDate.toISOString());
    }
    
    if (endDate) {
      query = query.lte('timestamp', endDate.toISOString());
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting security logs:', error);
    return { data: null, error };
  }
}

/**
 * Create security policy for a table
 */
export async function createSecurityPolicy(
  tableName: string,
  policyName: string,
  operation: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE',
  check: string
) {
  try {
    const { data, error } = await supabaseAdmin.rpc('create_policy', {
      table_name: tableName,
      policy_name: policyName,
      operation: operation,
      check_expression: check
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error creating security policy for ${tableName}:`, error);
    return { data: null, error };
  }
}

/**
 * Encrypt sensitive data
 */
export function encryptData(data: string, key: string): string {
  return btoa(data); // Simple base64 encoding for demonstration
}

/**
 * Decrypt sensitive data
 */
export function decryptData(encryptedData: string, key: string): string {
  return atob(encryptedData); // Simple base64 decoding for demonstration
}

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
