import React, { useState, useEffect } from 'react';
import { Student, TemporaryAuthorization } from '@royal-mz/shared-types';

interface ParentAuthorizationProps {
  securityService: any;
  userId: string;
  platform: 'web' | 'mobile' | 'desktop';
  onAuthorizationCreated?: (authorization: TemporaryAuthorization) => void;
}

export const ParentAuthorization: React.FC<ParentAuthorizationProps> = ({
  securityService,
  userId,
  platform,
  onAuthorizationCreated
}) => {
  const [children, setChildren] = useState<Student[]>([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [delegateName, setDelegateName] = useState('');
  const [delegatePhone, setDelegatePhone] = useState('');
  const [delegateIdNumber, setDelegateIdNumber] = useState('');
  const [relationship, setRelationship] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authorizations, setAuthorizations] = useState<TemporaryAuthorization[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: childrenData, error: childrenError } = await securityService.getParentChildren(userId);
        
        if (childrenError) {
          throw childrenError;
        }
        
        setChildren(childrenData);
        
        const { data: authData, error: authError } = await securityService.getParentAuthorizations(userId);
        
        if (authError) {
          throw authError;
        }
        
        setAuthorizations(authData);
      } catch (err) {
        setError(err.message);
      }
    };
    
    fetchData();
  }, [securityService, userId]);
  
  const handleCreateAuthorization = async () => {
    if (!selectedChild) {
      setError('Please select a child');
      return;
    }
    
    if (!delegateName) {
      setError('Please enter delegate name');
      return;
    }
    
    if (!delegatePhone) {
      setError('Please enter delegate phone number');
      return;
    }
    
    if (!relationship) {
      setError('Please enter relationship');
      return;
    }
    
    if (!validFrom || !validUntil) {
      setError('Please enter valid date range');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const authorizationData = {
        studentId: selectedChild,
        authorizedBy: userId,
        delegateName,
        delegatePhone,
        delegateIdNumber: delegateIdNumber || undefined,
        relationship,
        validFrom: new Date(validFrom).toISOString(),
        validUntil: new Date(validUntil).toISOString(),
        specialInstructions: specialInstructions || undefined
      };
      
      const { data, error } = await securityService.createTemporaryAuthorization(authorizationData);
      
      if (error) {
        throw error;
      }
      
      setAuthorizations(prev => [data, ...prev]);
      
      setSelectedChild('');
      setDelegateName('');
      setDelegatePhone('');
      setDelegateIdNumber('');
      setRelationship('');
      setValidFrom('');
      setValidUntil('');
      setSpecialInstructions('');
      
      if (onAuthorizationCreated) {
        onAuthorizationCreated(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  return (
    <div className="parent-authorization">
      <h2>Temporary Pickup Authorization</h2>
      
      {error && (
        <div className="error-message">{error}</div>
      )}
      
      <div className="authorization-form">
        <div className="form-section">
          <h3>Create New Authorization</h3>
          
          <div className="input-group">
            <label htmlFor="child">Select Child</label>
            <select
              id="child"
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              disabled={loading}
            >
              <option value="">Select a child</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.firstName} {child.lastName}
                </option>
              ))}
            </select>
          </div>
          
          <div className="input-group">
            <label htmlFor="delegateName">Delegate Name</label>
            <input
              id="delegateName"
              type="text"
              value={delegateName}
              onChange={(e) => setDelegateName(e.target.value)}
              placeholder="Enter delegate's full name"
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="delegatePhone">Delegate Phone</label>
            <input
              id="delegatePhone"
              type="tel"
              value={delegatePhone}
              onChange={(e) => setDelegatePhone(e.target.value)}
              placeholder="Enter delegate's phone number"
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="delegateIdNumber">Delegate ID Number (Optional)</label>
            <input
              id="delegateIdNumber"
              type="text"
              value={delegateIdNumber}
              onChange={(e) => setDelegateIdNumber(e.target.value)}
              placeholder="Enter delegate's ID number"
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="relationship">Relationship</label>
            <input
              id="relationship"
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="Enter relationship to child"
              disabled={loading}
            />
          </div>
          
          <div className="date-range">
            <div className="input-group">
              <label htmlFor="validFrom">Valid From</label>
              <input
                id="validFrom"
                type="datetime-local"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                disabled={loading}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="validUntil">Valid Until</label>
              <input
                id="validUntil"
                type="datetime-local"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="specialInstructions">Special Instructions (Optional)</label>
            <textarea
              id="specialInstructions"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Enter any special instructions"
              disabled={loading}
            />
          </div>
          
          <button
            className="create-button"
            onClick={handleCreateAuthorization}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Authorization'}
          </button>
        </div>
      </div>
      
      <div className="authorizations-list">
        <h3>Existing Authorizations</h3>
        
        {authorizations.length === 0 ? (
          <div className="empty-state">No authorizations found</div>
        ) : (
          <div className="list">
            {authorizations.map(auth => (
              <div key={auth.id} className="authorization-item">
                <div className="auth-header">
                  <div className="auth-student">
                    For: {auth.student?.firstName} {auth.student?.lastName}
                  </div>
                  <div className={`auth-status ${auth.isUsed ? 'used' : ''}`}>
                    {auth.isUsed ? 'Used' : 'Active'}
                  </div>
                </div>
                
                <div className="auth-details">
                  <div className="auth-delegate">
                    Delegate: {auth.delegateName} ({auth.relationship})
                  </div>
                  <div className="auth-contact">
                    Phone: {auth.delegatePhone}
                  </div>
                  {auth.delegateIdNumber && (
                    <div className="auth-id">
                      ID: {auth.delegateIdNumber}
                    </div>
                  )}
                  <div className="auth-validity">
                    Valid: {formatDate(auth.validFrom)} to {formatDate(auth.validUntil)}
                  </div>
                  {auth.specialInstructions && (
                    <div className="auth-instructions">
                      Instructions: {auth.specialInstructions}
                    </div>
                  )}
                  {auth.verificationCode && (
                    <div className="auth-code">
                      Code: {auth.verificationCode}
                    </div>
                  )}
                  {auth.isUsed && auth.usedAt && (
                    <div className="auth-used-at">
                      Used at: {formatDate(auth.usedAt.toString())}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
