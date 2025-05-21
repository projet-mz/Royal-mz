'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Skeleton } from '../../../components/ui/skeleton';
import { useAuth } from '../../../lib/context/AuthContext';
import { 
  getActiveSecurityAlerts, 
  createSecurityAlert, 
  resolveSecurityAlert 
} from '../../../services/security-portal';
import { SecurityAlert, AlertSeverity } from '../../../lib/types/security';
import { 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  Clock, 
  Plus, 
  Shield, 
  User, 
  X 
} from 'lucide-react';

export default function AlertsPage() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [severity, setSeverity] = useState<AlertSeverity>('warning');
  const [message, setMessage] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const { data, error } = await getActiveSecurityAlerts();
      
      if (error) throw error;
      
      if (data) {
        setAlerts(data as SecurityAlert[]);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
      setError('Failed to load security alerts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlert = async () => {
    if (!user || !alertType || !message) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      const { data, error } = await createSecurityAlert(
        user.id,
        alertType,
        severity,
        message
      );
      
      if (error) throw error;
      
      if (data) {
        setAlerts([data as SecurityAlert, ...alerts]);
        setSuccess('Alert created successfully');
        resetForm();
      }
    } catch (error) {
      console.error('Error creating alert:', error);
      setError('Failed to create alert');
    }
  };

  const handleResolveAlert = async (id: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await resolveSecurityAlert(
        id,
        user.id,
        resolutionNotes || undefined
      );
      
      if (error) throw error;
      
      setAlerts(alerts.filter(alert => alert.id !== id));
      setSuccess('Alert resolved successfully');
      setSelectedAlert(null);
      setResolutionNotes('');
    } catch (error) {
      console.error('Error resolving alert:', error);
      setError('Failed to resolve alert');
    }
  };

  const resetForm = () => {
    setAlertType('');
    setSeverity('warning');
    setMessage('');
    setIsCreating(false);
  };

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'info':
        return <Badge className="bg-blue-500">Info</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Warning</Badge>;
      case 'alert':
        return <Badge className="bg-orange-500">Alert</Badge>;
      case 'emergency':
        return <Badge className="bg-red-500">Emergency</Badge>;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case 'info':
        return 'text-blue-500';
      case 'warning':
        return 'text-yellow-500';
      case 'alert':
        return 'text-orange-500';
      case 'emergency':
        return 'text-red-500';
      default:
        return '';
    }
  };

  return (
    <DashboardLayout role="security">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Security Alerts</h2>
            <p className="text-muted-foreground">
              Create and manage security alerts
            </p>
          </div>
          <Button 
            onClick={() => {
              setIsCreating(true);
              setSelectedAlert(null);
              setError(null);
              setSuccess(null);
            }}
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Alert
          </Button>
        </div>
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p>{error}</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-destructive" 
                onClick={() => setError(null)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}
        
        {success && (
          <div className="bg-success/10 text-success p-3 rounded-md flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p>{success}</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-success" 
                onClick={() => setSuccess(null)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}
        
        {isCreating && (
          <Card>
            <CardHeader>
              <CardTitle>Create Security Alert</CardTitle>
              <CardDescription>
                Create a new security alert to notify relevant personnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="alertType">Alert Type</Label>
                  <Input
                    id="alertType"
                    value={alertType}
                    onChange={(e) => setAlertType(e.target.value)}
                    placeholder="Enter alert type (e.g., Unauthorized Access)"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Severity</Label>
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    <Button
                      type="button"
                      variant={severity === 'info' ? 'default' : 'outline'}
                      className="justify-center"
                      onClick={() => setSeverity('info')}
                    >
                      Info
                    </Button>
                    <Button
                      type="button"
                      variant={severity === 'warning' ? 'default' : 'outline'}
                      className="justify-center"
                      onClick={() => setSeverity('warning')}
                    >
                      Warning
                    </Button>
                    <Button
                      type="button"
                      variant={severity === 'alert' ? 'default' : 'outline'}
                      className="justify-center"
                      onClick={() => setSeverity('alert')}
                    >
                      Alert
                    </Button>
                    <Button
                      type="button"
                      variant={severity === 'emergency' ? 'default' : 'outline'}
                      className="justify-center"
                      onClick={() => setSeverity('emergency')}
                    >
                      Emergency
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide a detailed message for this alert"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  />
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={handleCreateAlert}
                    className="flex-1"
                  >
                    Create Alert
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {selectedAlert && (
          <Card>
            <CardHeader>
              <CardTitle>Resolve Alert</CardTitle>
              <CardDescription>
                Provide resolution details for this alert
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{selectedAlert.alertType}</p>
                  <p className="text-sm text-muted-foreground">{selectedAlert.message}</p>
                </div>
                
                <div>
                  <Label htmlFor="resolutionNotes">Resolution Notes</Label>
                  <textarea
                    id="resolutionNotes"
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    placeholder="Provide details on how this alert was resolved"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  />
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={() => handleResolveAlert(selectedAlert.id)}
                    className="flex-1"
                  >
                    Resolve Alert
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAlert(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-12 border rounded-md">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Active Alerts</h3>
              <p className="text-muted-foreground mt-2">
                There are no active security alerts at this time
              </p>
            </div>
          ) : (
            alerts.map((alert) => (
              <Card key={alert.id} className={`border-l-4 border-l-${alert.severity === 'emergency' ? 'red' : alert.severity === 'alert' ? 'orange' : alert.severity === 'warning' ? 'yellow' : 'blue'}-500`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium">{alert.alertType}</h3>
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAlert(alert);
                          setIsCreating(false);
                          setError(null);
                          setSuccess(null);
                        }}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Resolve
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-1" />
                    <span>Created by: {alert.triggeredByUser?.firstName} {alert.triggeredByUser?.lastName}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
