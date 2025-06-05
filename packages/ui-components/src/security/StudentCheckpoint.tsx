import React, { useState, useEffect } from 'react';
import { 
  Student, 
  SecurityCheckpoint, 
  AuthorizedGuardian,
  VerificationMethod
} from '../../../shared-types/src';

interface StudentCheckpointProps {
  securityService: any;
  biometricAuth: any;
  onCheckpointComplete?: (result: any) => void;
  platform: 'web' | 'mobile' | 'desktop';
}

export const StudentCheckpoint: React.FC<StudentCheckpointProps> = ({
  securityService,
  biometricAuth,
  onCheckpointComplete,
  platform
}) => {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [checkpoints, setCheckpoints] = useState<SecurityCheckpoint[]>([]);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState('');
  const [eventType, setEventType] = useState<'check_in' | 'check_out'>('check_in');
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>('id_card');
  const [guardians, setGuardians] = useState<AuthorizedGuardian[]>([]);
  const [selectedGuardian, setSelectedGuardian] = useState('');
  const [tempCode, setTempCode] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  
  useEffect(() => {
    const fetchCheckpoints = async () => {
      try {
        const { data, error } = await securityService.getSecurityCheckpoints();
        
        if (error) {
          throw error;
        }
        
        setCheckpoints(data);
        
        if (data.length > 0) {
          setSelectedCheckpoint(data[0].id);
        }
      } catch (err) {
        setError('Failed to fetch checkpoints: ' + (err instanceof Error ? err.message : String(err)));
      }
    };
    
    const checkBiometric = async () => {
      const { available } = await biometricAuth.isBiometricAvailable();
      setBiometricAvailable(available);
    };
    
    fetchCheckpoints();
    checkBiometric();
  }, [securityService, biometricAuth]);
  
  const handleStudentSearch = async () => {
    if (!studentId) {
      setError('Please enter a student ID');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data: studentData, error: studentError } = await securityService.getStudentById(studentId);
      
      if (studentError) {
        throw studentError;
      }
      
      if (!studentData) {
        throw new Error('Student not found');
      }
      
      setStudent(studentData);
      
      const { data: guardiansData, error: guardiansError } = await securityService.getAuthorizedGuardians(studentId);
      
      if (guardiansError) {
        throw guardiansError;
      }
      
      setGuardians(guardiansData);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStudent(null);
      setGuardians([]);
    }finally {
      setLoading(false);
    }
  };
  
  const handleVerificationMethodChange = (method: VerificationMethod) => {
    setVerificationMethod(method);
    
    if (method !== 'guardian_verification') {
      setSelectedGuardian('');
    }
    
    if (method !== 'temp_code') {
      setTempCode('');
    }
  };
  
  const handleBiometricAuth = async () => {
    try {
      const { success, error } = await biometricAuth.authenticate('Verify your identity');
      
      if (!success) {
        throw new Error(error || 'Biometric authentication failed');
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    }
  };
  
  const handleSubmit = async () => {
    if (!student) {
      setError('Please search for a student first');
      return;
    }
    
    if (!selectedCheckpoint) {
      setError('Please select a checkpoint');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      if (verificationMethod === 'biometric') {
        const success = await handleBiometricAuth();
        
        if (!success) {
          return;
        }
      } else if (verificationMethod === 'guardian_verification' && !selectedGuardian) {
        throw new Error('Please select a guardian');
      } else if (verificationMethod === 'temp_code' && !tempCode) {
        throw new Error('Please enter a temporary code');
      }
      
      const checkpointData = {
        studentId: student.id,
        checkpointId: selectedCheckpoint,
        eventType,
        verificationMethod,
        guardianId: verificationMethod === 'guardian_verification' ? selectedGuardian : undefined,
        tempAuthorizationCode: verificationMethod === 'temp_code' ? tempCode : undefined,
        notes: notes || undefined
      };
      
      const { data, error } = await securityService.createStudentCheckpoint(checkpointData);
      
      if (error) {
        throw error;
      }
      
      setStudent(null);
      setStudentId('');
      setSelectedGuardian('');
      setTempCode('');
      setNotes('');
      
      if (onCheckpointComplete) {
        onCheckpointComplete(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="student-checkpoint">
      <h2>Student Check-in/out</h2>
      
      {error && (
        <div className="error-message">{error}</div>
      )}
      
      <div className="search-section">
        <div className="input-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            id="studentId"
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter student ID"
            disabled={loading}
          />
        </div>
        
        <button 
          onClick={handleStudentSearch}
          disabled={loading || !studentId}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {student && (
        <div className="student-info">
          <h3>Student Information</h3>
          <div className="info-row">
            <span className="label">Name:</span>
            <span className="value">{student.firstName} {student.lastName}</span>
          </div>
          <div className="info-row">
            <span className="label">Grade:</span>
            <span className="value">{student.grade}</span>
          </div>
          <div className="info-row">
            <span className="label">Class:</span>
            <span className="value">{student.class}</span>
          </div>
        </div>
      )}
      
      {student && (
        <div className="checkpoint-form">
          <div className="form-section">
            <h3>Checkpoint Details</h3>
            
            <div className="input-group">
              <label htmlFor="checkpoint">Checkpoint</label>
              <select
                id="checkpoint"
                value={selectedCheckpoint}
                onChange={(e) => setSelectedCheckpoint(e.target.value)}
                disabled={loading}
              >
                {checkpoints.map(checkpoint => (
                  <option key={checkpoint.id} value={checkpoint.id}>
                    {checkpoint.name} ({checkpoint.location})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="input-group">
              <label>Event Type</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="eventType"
                    value="check_in"
                    checked={eventType === 'check_in'}
                    onChange={() => setEventType('check_in')}
                    disabled={loading}
                  />
                  Check In
                </label>
                <label>
                  <input
                    type="radio"
                    name="eventType"
                    value="check_out"
                    checked={eventType === 'check_out'}
                    onChange={() => setEventType('check_out')}
                    disabled={loading}
                  />
                  Check Out
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Verification Method</h3>
            
            <div className="verification-methods">
              <button
                className={verificationMethod === 'id_card' ? 'active' : ''}
                onClick={() => handleVerificationMethodChange('id_card')}
                disabled={loading}
              >
                ID Card
              </button>
              
              {biometricAvailable && (
                <button
                  className={verificationMethod === 'biometric' ? 'active' : ''}
                  onClick={() => handleVerificationMethodChange('biometric')}
                  disabled={loading}
                >
                  Biometric
                </button>
              )}
              
              {guardians.length > 0 && (
                <button
                  className={verificationMethod === 'guardian_verification' ? 'active' : ''}
                  onClick={() => handleVerificationMethodChange('guardian_verification')}
                  disabled={loading}
                >
                  Guardian
                </button>
              )}
              
              <button
                className={verificationMethod === 'temp_code' ? 'active' : ''}
                onClick={() => handleVerificationMethodChange('temp_code')}
                disabled={loading}
              >
                Temp Code
              </button>
              
              <button
                className={verificationMethod === 'override' ? 'active' : ''}
                onClick={() => handleVerificationMethodChange('override')}
                disabled={loading}
              >
                Override
              </button>
            </div>
            
            {verificationMethod === 'guardian_verification' && (
              <div className="input-group">
                <label htmlFor="guardian">Select Guardian</label>
                <select
                  id="guardian"
                  value={selectedGuardian}
                  onChange={(e) => setSelectedGuardian(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select a guardian</option>
                  {guardians.map(guardian => (
                    <option key={guardian.id} value={guardian.guardianId}>
                      {guardian.guardian?.firstName} {guardian.guardian?.lastName} ({guardian.relationship})
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {verificationMethod === 'temp_code' && (
              <div className="input-group">
                <label htmlFor="tempCode">Temporary Code</label>
                <input
                  id="tempCode"
                  type="text"
                  value={tempCode}
                  onChange={(e) => setTempCode(e.target.value)}
                  placeholder="Enter temporary code"
                  disabled={loading}
                />
              </div>
            )}
          </div>
          
          <div className="form-section">
            <div className="input-group">
              <label htmlFor="notes">Notes (Optional)</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any additional notes"
                disabled={loading}
              />
            </div>
          </div>
          
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Submit ${eventType === 'check_in' ? 'Check In' : 'Check Out'}`}
          </button>
        </div>
      )}
    </div>
  );
};
