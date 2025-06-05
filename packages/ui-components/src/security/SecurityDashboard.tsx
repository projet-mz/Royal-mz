import React, { useEffect, useState } from 'react';
import { SecurityDashboardStats, SecurityAlert, StudentCheckpoint } from '../../../shared-types/src';

interface SecurityDashboardProps {
  securityService: any;
  socket: any;
  onAlertClick?: (alert: SecurityAlert) => void;
  onCheckpointClick?: (checkpoint: StudentCheckpoint) => void;
  platform: 'web' | 'mobile' | 'desktop';
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({
  securityService,
  socket,
  onAlertClick,
  onCheckpointClick,
  platform
}) => {
  const [stats, setStats] = useState<SecurityDashboardStats | null>(null);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [checkpoints, setCheckpoints] = useState<StudentCheckpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: statsData, error: statsError } = await securityService.getSecurityDashboardStats();
        
        if (statsError) {
          throw statsError;
        }
        
        setStats(statsData);
        
        const { data: alertsData, error: alertsError } = await securityService.getActiveSecurityAlerts();
        
        if (alertsError) {
          throw alertsError;
        }
        
        setAlerts(alertsData);
        
        const { data: checkpointsData, error: checkpointsError } = await securityService.getRecentStudentCheckpoints();
        
        if (checkpointsError) {
          throw checkpointsError;
        }
        
        setCheckpoints(checkpointsData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    socket.on('security_alert', (alert: SecurityAlert) => {
      setAlerts(prev => [alert, ...prev]);
      
      setStats(prev => prev ? {
        ...prev,
        activeAlerts: prev.activeAlerts + 1
      } : null);
    });
    
    socket.on('student_checkpoint', (checkpoint: StudentCheckpoint) => {
      setCheckpoints(prev => [checkpoint, ...prev]);
      
      setStats(prev => {
        if (!prev) return null;
        
        if (checkpoint.eventType === 'check_in') {
          return {
            ...prev,
            studentsCheckedIn: prev.studentsCheckedIn + 1
          };
        } else {
          return {
            ...prev,
            studentsCheckedOut: prev.studentsCheckedOut + 1
          };
        }
      });
    });
    
    return () => {
      socket.off('security_alert');
      socket.off('student_checkpoint');
    };
  }, [securityService, socket]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (!stats) {
    return <div>No data available</div>;
  }
  
  return (
    <div className="security-dashboard">
      <div className="stats-container">
        <div className="stat-card">
          <h3>Students Checked In</h3>
          <div className="stat-value">{stats.studentsCheckedIn}</div>
          <div className="stat-label">Currently on campus</div>
        </div>
        
        <div className="stat-card">
          <h3>Students Checked Out</h3>
          <div className="stat-value">{stats.studentsCheckedOut}</div>
          <div className="stat-label">Left campus today</div>
        </div>
        
        <div className="stat-card">
          <h3>Active Incidents</h3>
          <div className={`stat-value ${stats.activeIncidents > 0 ? 'alert' : ''}`}>
            {stats.activeIncidents}
          </div>
          <div className="stat-label">Requiring attention</div>
        </div>
        
        <div className="stat-card">
          <h3>Active Alerts</h3>
          <div className={`stat-value ${stats.activeAlerts > 0 ? 'alert' : ''}`}>
            {stats.activeAlerts}
          </div>
          <div className="stat-label">Security notifications</div>
        </div>
      </div>
      
      <div className="data-container">
        <div className="alerts-container">
          <h3>Active Alerts</h3>
          {alerts.length === 0 ? (
            <div className="empty-state">No active alerts</div>
          ) : (
            <div className="alerts-list">
              {alerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`alert-item severity-${alert.severity}`}
                  onClick={() => onAlertClick && onAlertClick(alert)}
                >
                  <div className="alert-title">{alert.title}</div>
                  <div className="alert-message">{alert.message}</div>
                  <div className="alert-timestamp">
                    {new Date(alert.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="checkpoints-container">
          <h3>Recent Check-ins/outs</h3>
          {checkpoints.length === 0 ? (
            <div className="empty-state">No recent check-ins/outs</div>
          ) : (
            <div className="checkpoints-list">
              {checkpoints.map(checkpoint => (
                <div 
                  key={checkpoint.id} 
                  className={`checkpoint-item event-${checkpoint.eventType}`}
                  onClick={() => onCheckpointClick && onCheckpointClick(checkpoint)}
                >
                  <div className="checkpoint-student">
                    {checkpoint.student?.firstName} {checkpoint.student?.lastName}
                  </div>
                  <div className="checkpoint-event">
                    {checkpoint.eventType === 'check_in' ? 'Checked In' : 'Checked Out'}
                  </div>
                  <div className="checkpoint-timestamp">
                    {new Date(checkpoint.timestamp).toLocaleString()}
                  </div>
                  <div className="checkpoint-method">
                    Via {checkpoint.verificationMethod.replace('_', ' ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
