import { supabase } from '../lib/supabase/client';
import { supabaseAdmin } from '../lib/supabase/admin';
import { sanitizeInput, generateSecureToken } from './security';

/**
 * Get all security checkpoints
 */
export async function getSecurityCheckpoints() {
  try {
    const { data, error } = await supabase
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
export async function getSecurityCheckpointById(id: string) {
  try {
    const { data, error } = await supabase
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
export async function createSecurityCheckpoint(name: string, location: string) {
  try {
    const sanitizedName = sanitizeInput(name);
    const sanitizedLocation = sanitizeInput(location);
    
    const { data, error } = await supabase
      .from('security_checkpoints')
      .insert([{
        name: sanitizedName,
        location: sanitizedLocation,
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
export async function updateSecurityCheckpoint(id: string, name?: string, location?: string, isActive?: boolean) {
  try {
    const updateData: Record<string, any> = {};
    
    if (name !== undefined) updateData.name = sanitizeInput(name);
    if (location !== undefined) updateData.location = sanitizeInput(location);
    if (isActive !== undefined) updateData.is_active = isActive;
    
    const { data, error } = await supabase
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
export async function deleteSecurityCheckpoint(id: string) {
  try {
    const { error } = await supabase
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
 * Get all security personnel
 */
export async function getSecurityPersonnel() {
  try {
    const { data, error } = await supabase
      .from('security_personnel')
      .select(`
        *,
        user:id (*),
        checkpoint:checkpoint_id (*)
      `);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting security personnel:', error);
    return { data: null, error };
  }
}

/**
 * Get security personnel by ID
 */
export async function getSecurityPersonnelById(id: string) {
  try {
    const { data, error } = await supabase
      .from('security_personnel')
      .select(`
        *,
        user:id (*),
        checkpoint:checkpoint_id (*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting security personnel:', error);
    return { data: null, error };
  }
}

/**
 * Create a new security personnel
 */
export async function createSecurityPersonnel(
  userId: string, 
  checkpointId: string, 
  position: string, 
  shiftStart?: string, 
  shiftEnd?: string
) {
  try {
    const sanitizedPosition = sanitizeInput(position);
    
    const { data, error } = await supabase
      .from('security_personnel')
      .insert([{
        id: userId,
        checkpoint_id: checkpointId,
        position: sanitizedPosition,
        shift_start: shiftStart,
        shift_end: shiftEnd,
        is_on_duty: false
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating security personnel:', error);
    return { data: null, error };
  }
}

/**
 * Update security personnel
 */
export async function updateSecurityPersonnel(
  id: string, 
  checkpointId?: string, 
  position?: string, 
  shiftStart?: string, 
  shiftEnd?: string,
  isOnDuty?: boolean
) {
  try {
    const updateData: Record<string, any> = {};
    
    if (checkpointId !== undefined) updateData.checkpoint_id = checkpointId;
    if (position !== undefined) updateData.position = sanitizeInput(position);
    if (shiftStart !== undefined) updateData.shift_start = shiftStart;
    if (shiftEnd !== undefined) updateData.shift_end = shiftEnd;
    if (isOnDuty !== undefined) updateData.is_on_duty = isOnDuty;
    
    const { data, error } = await supabase
      .from('security_personnel')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating security personnel:', error);
    return { data: null, error };
  }
}

/**
 * Delete security personnel
 */
export async function deleteSecurityPersonnel(id: string) {
  try {
    const { error } = await supabase
      .from('security_personnel')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting security personnel:', error);
    return { error };
  }
}

/**
 * Get authorized guardians for a student
 */
export async function getAuthorizedGuardians(studentId: string) {
  try {
    const { data, error } = await supabase
      .from('authorized_guardians')
      .select(`
        *,
        guardian:guardian_id (*),
        student:student_id (*)
      `)
      .eq('student_id', studentId)
      .eq('is_active', true);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting authorized guardians:', error);
    return { data: null, error };
  }
}

/**
 * Add authorized guardian
 */
export async function addAuthorizedGuardian(
  studentId: string,
  guardianId: string,
  relationship: string,
  isPrimary: boolean = false,
  verificationPhoto?: string,
  verificationQuestions?: Record<string, string>
) {
  try {
    const sanitizedRelationship = sanitizeInput(relationship);
    
    const { data, error } = await supabase
      .from('authorized_guardians')
      .insert([{
        student_id: studentId,
        guardian_id: guardianId,
        relationship: sanitizedRelationship,
        is_primary: isPrimary,
        verification_photo: verificationPhoto,
        verification_questions: verificationQuestions,
        is_active: true
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding authorized guardian:', error);
    return { data: null, error };
  }
}

/**
 * Update authorized guardian
 */
export async function updateAuthorizedGuardian(
  id: string,
  relationship?: string,
  isPrimary?: boolean,
  verificationPhoto?: string,
  verificationQuestions?: Record<string, string>,
  isActive?: boolean
) {
  try {
    const updateData: Record<string, any> = {};
    
    if (relationship !== undefined) updateData.relationship = sanitizeInput(relationship);
    if (isPrimary !== undefined) updateData.is_primary = isPrimary;
    if (verificationPhoto !== undefined) updateData.verification_photo = verificationPhoto;
    if (verificationQuestions !== undefined) updateData.verification_questions = verificationQuestions;
    if (isActive !== undefined) updateData.is_active = isActive;
    
    const { data, error } = await supabase
      .from('authorized_guardians')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating authorized guardian:', error);
    return { data: null, error };
  }
}

/**
 * Remove authorized guardian
 */
export async function removeAuthorizedGuardian(id: string) {
  try {
    const { data, error } = await supabase
      .from('authorized_guardians')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error removing authorized guardian:', error);
    return { data: null, error };
  }
}

/**
 * Create temporary authorization
 */
export async function createTemporaryAuthorization(
  studentId: string,
  authorizedBy: string,
  delegateName: string,
  delegatePhone: string,
  relationship: string,
  validFrom: Date,
  validUntil: Date,
  delegateIdNumber?: string,
  delegatePhoto?: string,
  specialInstructions?: string
) {
  try {
    const sanitizedDelegateName = sanitizeInput(delegateName);
    const sanitizedDelegatePhone = sanitizeInput(delegatePhone);
    const sanitizedRelationship = sanitizeInput(relationship);
    const sanitizedDelegateIdNumber = delegateIdNumber ? sanitizeInput(delegateIdNumber) : null;
    const sanitizedSpecialInstructions = specialInstructions ? sanitizeInput(specialInstructions) : null;
    
    const verificationCode = generateSecureToken(6);
    
    const { data, error } = await supabase
      .from('temporary_authorizations')
      .insert([{
        student_id: studentId,
        authorized_by: authorizedBy,
        delegate_name: sanitizedDelegateName,
        delegate_id_number: sanitizedDelegateIdNumber,
        delegate_phone: sanitizedDelegatePhone,
        delegate_photo: delegatePhoto,
        relationship: sanitizedRelationship,
        verification_code: verificationCode,
        valid_from: validFrom.toISOString(),
        valid_until: validUntil.toISOString(),
        special_instructions: sanitizedSpecialInstructions,
        is_used: false
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating temporary authorization:', error);
    return { data: null, error };
  }
}

/**
 * Get temporary authorizations for a student
 */
export async function getTemporaryAuthorizations(studentId: string, includeExpired: boolean = false) {
  try {
    let query = supabase
      .from('temporary_authorizations')
      .select(`
        *,
        student:student_id (*),
        authorized_by_user:authorized_by (*)
      `)
      .eq('student_id', studentId);
      
    if (!includeExpired) {
      const now = new Date().toISOString();
      query = query.gte('valid_until', now);
    }
    
    const { data, error } = await query.order('valid_from', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting temporary authorizations:', error);
    return { data: null, error };
  }
}

/**
 * Verify temporary authorization code
 */
export async function verifyTemporaryAuthorization(code: string, studentId: string) {
  try {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('temporary_authorizations')
      .select('*')
      .eq('verification_code', code)
      .eq('student_id', studentId)
      .eq('is_used', false)
      .lte('valid_from', now)
      .gte('valid_until', now)
      .single();
      
    if (error) throw error;
    return { data, error: null, isValid: !!data };
  } catch (error) {
    console.error('Error verifying temporary authorization:', error);
    return { data: null, error, isValid: false };
  }
}

/**
 * Mark temporary authorization as used
 */
export async function markTemporaryAuthorizationAsUsed(id: string) {
  try {
    const { data, error } = await supabase
      .from('temporary_authorizations')
      .update({ is_used: true })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error marking temporary authorization as used:', error);
    return { data: null, error };
  }
}

/**
 * Record student checkpoint event (check-in or check-out)
 */
export async function recordStudentCheckpoint(
  studentId: string,
  checkpointId: string,
  personnelId: string,
  eventType: 'check_in' | 'check_out',
  verificationMethod: 'id_card' | 'guardian_verification' | 'temp_code' | 'biometric' | 'override',
  guardianId?: string,
  tempAuthorizationId?: string,
  photoCaptured?: string,
  locationData?: Record<string, any>,
  notes?: string,
  isAnomaly: boolean = false,
  anomalyReason?: string
) {
  try {
    const sanitizedNotes = notes ? sanitizeInput(notes) : null;
    const sanitizedAnomalyReason = anomalyReason ? sanitizeInput(anomalyReason) : null;
    
    const { data, error } = await supabase
      .from('student_checkpoints')
      .insert([{
        student_id: studentId,
        checkpoint_id: checkpointId,
        personnel_id: personnelId,
        event_type: eventType,
        verification_method: verificationMethod,
        guardian_id: guardianId,
        temp_authorization_id: tempAuthorizationId,
        photo_captured: photoCaptured,
        location_data: locationData,
        notes: sanitizedNotes,
        is_anomaly: isAnomaly,
        anomaly_reason: sanitizedAnomalyReason
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    if (eventType === 'check_out' && tempAuthorizationId) {
      await markTemporaryAuthorizationAsUsed(tempAuthorizationId);
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error recording student checkpoint:', error);
    return { data: null, error };
  }
}

/**
 * Get student checkpoint history
 */
export async function getStudentCheckpointHistory(
  studentId: string,
  startDate?: Date,
  endDate?: Date,
  eventType?: 'check_in' | 'check_out'
) {
  try {
    let query = supabase
      .from('student_checkpoints')
      .select(`
        *,
        student:student_id (*),
        checkpoint:checkpoint_id (*),
        personnel:personnel_id (*),
        guardian:guardian_id (*),
        temp_authorization:temp_authorization_id (*)
      `)
      .eq('student_id', studentId);
      
    if (startDate) {
      query = query.gte('timestamp', startDate.toISOString());
    }
    
    if (endDate) {
      query = query.lte('timestamp', endDate.toISOString());
    }
    
    if (eventType) {
      query = query.eq('event_type', eventType);
    }
    
    const { data, error } = await query.order('timestamp', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting student checkpoint history:', error);
    return { data: null, error };
  }
}

/**
 * Get current student status (in/out)
 */
export async function getStudentCurrentStatus(studentId: string) {
  try {
    const { data, error } = await supabase
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
          lastEvent: data[0]
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

/**
 * Report security incident
 */
export async function reportSecurityIncident(
  reportedBy: string,
  checkpointId: string,
  incidentType: string,
  severity: 'low' | 'medium' | 'high' | 'critical',
  description: string,
  involvedStudents?: string[],
  involvedGuardians?: string[]
) {
  try {
    const sanitizedIncidentType = sanitizeInput(incidentType);
    const sanitizedDescription = sanitizeInput(description);
    
    const { data, error } = await supabase
      .from('security_incidents')
      .insert([{
        reported_by: reportedBy,
        checkpoint_id: checkpointId,
        incident_type: sanitizedIncidentType,
        severity,
        description: sanitizedDescription,
        status: 'reported',
        involved_students: involvedStudents,
        involved_guardians: involvedGuardians
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error reporting security incident:', error);
    return { data: null, error };
  }
}

/**
 * Get security incidents
 */
export async function getSecurityIncidents(
  status?: 'reported' | 'investigating' | 'resolved' | 'closed',
  severity?: 'low' | 'medium' | 'high' | 'critical',
  startDate?: Date,
  endDate?: Date
) {
  try {
    let query = supabase
      .from('security_incidents')
      .select(`
        *,
        reporter:reported_by (*),
        checkpoint:checkpoint_id (*)
      `);
      
    if (status) {
      query = query.eq('status', status);
    }
    
    if (severity) {
      query = query.eq('severity', severity);
    }
    
    if (startDate) {
      query = query.gte('timestamp', startDate.toISOString());
    }
    
    if (endDate) {
      query = query.lte('timestamp', endDate.toISOString());
    }
    
    const { data, error } = await query.order('timestamp', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting security incidents:', error);
    return { data: null, error };
  }
}

/**
 * Update security incident
 */
export async function updateSecurityIncident(
  id: string,
  status?: 'reported' | 'investigating' | 'resolved' | 'closed',
  resolution?: string
) {
  try {
    const updateData: Record<string, any> = {};
    
    if (status !== undefined) updateData.status = status;
    if (resolution !== undefined) updateData.resolution = sanitizeInput(resolution);
    
    const { data, error } = await supabase
      .from('security_incidents')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating security incident:', error);
    return { data: null, error };
  }
}

/**
 * Create security alert
 */
export async function createSecurityAlert(
  triggeredBy: string,
  alertType: string,
  severity: 'info' | 'warning' | 'alert' | 'emergency',
  message: string
) {
  try {
    const sanitizedAlertType = sanitizeInput(alertType);
    const sanitizedMessage = sanitizeInput(message);
    
    const { data, error } = await supabase
      .from('security_alerts')
      .insert([{
        triggered_by: triggeredBy,
        alert_type: sanitizedAlertType,
        severity,
        message: sanitizedMessage,
        is_active: true
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating security alert:', error);
    return { data: null, error };
  }
}

/**
 * Get active security alerts
 */
export async function getActiveSecurityAlerts() {
  try {
    const { data, error } = await supabase
      .from('security_alerts')
      .select(`
        *,
        triggered_by_user:triggered_by (*)
      `)
      .eq('is_active', true)
      .order('timestamp', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting active security alerts:', error);
    return { data: null, error };
  }
}

/**
 * Resolve security alert
 */
export async function resolveSecurityAlert(
  id: string,
  resolvedBy: string,
  resolutionNotes?: string
) {
  try {
    const sanitizedResolutionNotes = resolutionNotes ? sanitizeInput(resolutionNotes) : null;
    
    const { data, error } = await supabase
      .from('security_alerts')
      .update({
        is_active: false,
        resolved_at: new Date().toISOString(),
        resolved_by: resolvedBy,
        resolution_notes: sanitizedResolutionNotes
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error resolving security alert:', error);
    return { data: null, error };
  }
}

/**
 * Get security dashboard stats
 */
export async function getSecurityDashboardStats() {
  try {
    const { data: checkedInData, error: checkedInError } = await supabase.rpc(
      'get_checked_in_students_count'
    );
    
    if (checkedInError) throw checkedInError;
    
    const { data: checkedOutData, error: checkedOutError } = await supabase.rpc(
      'get_checked_out_students_count'
    );
    
    if (checkedOutError) throw checkedOutError;
    
    const { data: activeIncidents, error: incidentsError } = await supabase
      .from('security_incidents')
      .select('count')
      .in('status', ['reported', 'investigating']);
      
    if (incidentsError) throw incidentsError;
    
    const { data: activeAlerts, error: alertsError } = await supabase
      .from('security_alerts')
      .select('count')
      .eq('is_active', true);
      
    if (alertsError) throw alertsError;
    
    return { 
      data: {
        studentsCheckedIn: checkedInData || 0,
        studentsCheckedOut: checkedOutData || 0,
        activeIncidents: activeIncidents?.[0]?.count || 0,
        activeAlerts: activeAlerts?.[0]?.count || 0
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Error getting security dashboard stats:', error);
    return { data: null, error };
  }
}
