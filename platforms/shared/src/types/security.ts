import { User } from './user';

export type SecurityCheckpointStatus = 'active' | 'inactive';
export type SecurityPersonnelStatus = 'on_duty' | 'off_duty';
export type StudentCheckpointEventType = 'check_in' | 'check_out';
export type VerificationMethod = 'id_card' | 'guardian_verification' | 'temp_code' | 'biometric' | 'override';
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'reported' | 'investigating' | 'resolved' | 'closed';
export type AlertSeverity = 'info' | 'warning' | 'alert' | 'emergency';

export interface SecurityCheckpoint {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SecurityPersonnel {
  id: string;
  user: User;
  checkpointId: string;
  checkpoint?: SecurityCheckpoint;
  position: string;
  shiftStart?: string;
  shiftEnd?: string;
  isOnDuty: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthorizedGuardian {
  id: string;
  studentId: string;
  student?: User;
  guardianId: string;
  guardian?: User;
  relationship: string;
  isPrimary: boolean;
  verificationPhoto?: string;
  verificationQuestions?: Record<string, string>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemporaryAuthorization {
  id: string;
  studentId: string;
  student?: User;
  authorizedBy: string;
  authorizedByUser?: User;
  delegateName: string;
  delegateIdNumber?: string;
  delegatePhone: string;
  delegatePhoto?: string;
  relationship: string;
  verificationCode: string;
  validFrom: Date;
  validUntil: Date;
  specialInstructions?: string;
  isUsed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentCheckpoint {
  id: string;
  studentId: string;
  student?: User;
  checkpointId: string;
  checkpoint?: SecurityCheckpoint;
  personnelId: string;
  personnel?: SecurityPersonnel;
  eventType: StudentCheckpointEventType;
  timestamp: Date;
  guardianId?: string;
  guardian?: User;
  tempAuthorizationId?: string;
  tempAuthorization?: TemporaryAuthorization;
  verificationMethod: VerificationMethod;
  photoCaptured?: string;
  locationData?: Record<string, any>;
  notes?: string;
  isAnomaly: boolean;
  anomalyReason?: string;
}

export interface SecurityIncident {
  id: string;
  reportedBy: string;
  reporter?: User;
  checkpointId: string;
  checkpoint?: SecurityCheckpoint;
  incidentType: string;
  severity: IncidentSeverity;
  description: string;
  timestamp: Date;
  status: IncidentStatus;
  resolution?: string;
  involvedStudents?: string[];
  involvedGuardians?: string[];
}

export interface SecurityAlert {
  id: string;
  triggeredBy: string;
  triggeredByUser?: User;
  alertType: string;
  severity: AlertSeverity;
  message: string;
  timestamp: Date;
  isActive: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
  resolvedByUser?: User;
  resolutionNotes?: string;
}

export interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  policyType: string;
  isActive: boolean;
  createdBy: string;
  createdByUser?: User;
  createdAt: Date;
  updatedAt: Date;
  policyData: Record<string, any>;
}

export interface SecurityDashboardStats {
  studentsCheckedIn: number;
  studentsCheckedOut: number;
  activeIncidents: number;
  activeAlerts: number;
}

export interface StudentStatus {
  status: 'in' | 'out' | 'unknown';
  lastEvent: StudentCheckpoint | null;
}
