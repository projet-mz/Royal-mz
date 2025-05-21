import { SupabaseClient } from '@supabase/supabase-js';
import { 
  SecurityCheckpoint, 
  SecurityPersonnel,
  AuthorizedGuardian,
  TemporaryAuthorization,
  StudentCheckpoint,
  SecurityIncident,
  SecurityAlert,
  SecurityDashboardStats,
  StudentStatus
} from '../types/security';

export class SecurityPortalService {
  private supabase: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
  }

  /**
   * Get all security checkpoints
   */
  async getSecurityCheckpoints() {
    try {
      const { data, error } = await this.supabase
        .from('security_checkpoints')
        .select('*')
        .order('name');
        
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error getting security checkpoints:', error);
      return { data: null, error };
    }
  }

  /**
   * Get security checkpoint by ID
   */
  async getSecurityCheckpointById(id: string) {
    try {
      const { data, error } = await this.supabase
        .from('security_checkpoints')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error getting security checkpoint:', error);
      return { data: null, error };
    }
  }

  /**
   * Create a new security checkpoint
   */
  async createSecurityCheckpoint(name: string, location: string) {
    try {
      const { data, error } = await this.supabase
        .from('security_checkpoints')
        .insert([{
          name: name,
          location: location,
          is_active: true
        }])
        .select()
        .single();
        
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating security checkpoint:', error);
      return { data: null, error };
    }
  }

  /**
   * Update a security checkpoint
   */
  async updateSecurityCheckpoint(id: string, name?: string, location?: string, isActive?: boolean) {
    try {
      const updateData: Record<string, any> = {};
      
      if (name !== undefined) updateData.name = name;
      if (location !== undefined) updateData.location = location;
      if (isActive !== undefined) updateData.is_active = isActive;
      
      const { data, error } = await this.supabase
        .from('security_checkpoints')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating security checkpoint:', error);
      return { data: null, error };
    }
  }

  /**
   * Delete a security checkpoint
   */
  async deleteSecurityCheckpoint(id: string) {
    try {
      const { error } = await this.supabase
        .from('security_checkpoints')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting security checkpoint:', error);
      return { error };
    }
  }

  /**
   * Get security dashboard stats
   */
  async getSecurityDashboardStats() {
    try {
      const { data: checkedInData, error: checkedInError } = await this.supabase
        .from('student_checkpoints')
        .select('student_id')
        .eq('event_type', 'check_in')
        .order('timestamp', { ascending: false })
        .limit(1000);
      
      if (checkedInError) throw checkedInError;
      
      const { data: checkedOutData, error: checkedOutError } = await this.supabase
        .from('student_checkpoints')
        .select('student_id')
        .eq('event_type', 'check_out')
        .order('timestamp', { ascending: false })
        .limit(1000);
      
      if (checkedOutError) throw checkedOutError;
      
      const { data: activeIncidents, error: incidentsError } = await this.supabase
        .from('security_incidents')
        .select('id')
        .in('status', ['reported', 'investigating']);
      
      if (incidentsError) throw incidentsError;
      
      const { data: activeAlerts, error: alertsError } = await this.supabase
        .from('security_alerts')
        .select('id')
        .eq('is_active', true);
      
      if (alertsError) throw alertsError;
      
      const studentStatus = new Map<string, string>();
      
      checkedOutData?.forEach(item => {
        studentStatus.set(item.student_id, 'out');
      });
      
      checkedInData?.forEach(item => {
        studentStatus.set(item.student_id, 'in');
      });
      
      const studentsCheckedIn = Array.from(studentStatus.values()).filter(status => status === 'in').length;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data: todayCheckouts, error: todayCheckoutsError } = await this.supabase
        .from('student_checkpoints')
        .select('student_id')
        .eq('event_type', 'check_out')
        .gte('timestamp', today.toISOString());
      
      if (todayCheckoutsError) throw todayCheckoutsError;
      
      const studentsCheckedOut = todayCheckouts?.length || 0;
      
      return { 
        data: {
          studentsCheckedIn,
          studentsCheckedOut,
          activeIncidents: activeIncidents?.length || 0,
          activeAlerts: activeAlerts?.length || 0
        }, 
        error: null 
      };
    } catch (error) {
      console.error('Error getting security dashboard stats:', error);
      return { data: null, error };
    }
  }

  /**
   * Get current student status (in/out)
   */
  async getStudentCurrentStatus(studentId: string): Promise<{ data: StudentStatus | null, error: any }> {
    try {
      const { data, error } = await this.supabase
        .from('student_checkpoints')
        .select('*')
        .eq('student_id', studentId)
        .order('timestamp', { ascending: false })
        .limit(1);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        return { 
          data: { 
            status: data[0].event_type === 'check_in' ? 'in' : 'out',
            lastEvent: data[0] as unknown as StudentCheckpoint
          }, 
          error: null 
        };
      } else {
        return { data: { status: 'unknown', lastEvent: null }, error: null };
      }
    } catch (error) {
      console.error('Error getting student current status:', error);
      return { data: null, error };
    }
  }
}
