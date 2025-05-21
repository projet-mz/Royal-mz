'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Skeleton } from '../../../components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { useAuth } from '../../../lib/context/AuthContext';
import { 
  getSecurityIncidents, 
  reportSecurityIncident, 
  updateSecurityIncident 
} from '../../../services/security-portal';
import { SecurityIncident, IncidentSeverity, IncidentStatus } from '../../../lib/types/security';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Plus, 
  Search, 
  Shield, 
  User 
} from 'lucide-react';

export default function IncidentsPage() {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<IncidentStatus>('reported');
  const [isReporting, setIsReporting] = useState(false);
  const [incidentType, setIncidentType] = useState('');
  const [severity, setSeverity] = useState<IncidentSeverity>('medium');
  const [description, setDescription] = useState('');
  const [resolution, setResolution] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<SecurityIncident | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchIncidents(activeTab);
  }, [activeTab]);

  const fetchIncidents = async (status?: IncidentStatus) => {
    setLoading(true);
    try {
      const { data, error } = await getSecurityIncidents(status);
      
      if (error) throw error;
      
      if (data) {
        setIncidents(data as SecurityIncident[]);
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
      setError('Failed to load security incidents');
    } finally {
      setLoading(false);
    }
  };

  const handleReportIncident = async () => {
    if (!user || !incidentType || !description) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      const { data, error } = await reportSecurityIncident(
        user.id,
        'checkpoint-1', // This would be the actual checkpoint ID in production
        incidentType,
        severity,
        description
      );
      
      if (error) throw error;
      
      if (data) {
        setIncidents([data as SecurityIncident, ...incidents]);
        setSuccess('Incident reported successfully');
        resetForm();
      }
    } catch (error) {
      console.error('Error reporting incident:', error);
      setError('Failed to report incident');
    }
  };

  const handleUpdateIncident = async (id: string, status: IncidentStatus) => {
    try {
      const { data, error } = await updateSecurityIncident(
        id,
        status,
        status === 'resolved' || status === 'closed' ? resolution : undefined
      );
      
      if (error) throw error;
      
      if (data) {
        setIncidents(incidents.map(incident => 
          incident.id === id ? data as SecurityIncident : incident
        ));
        setSuccess(`Incident ${status} successfully`);
        setSelectedIncident(null);
        setResolution('');
      }
    } catch (error) {
      console.error('Error updating incident:', error);
      setError('Failed to update incident');
    }
  };

  const resetForm = () => {
    setIncidentType('');
    setSeverity('medium');
    setDescription('');
    setIsReporting(false);
  };

  const getSeverityBadge = (severity: IncidentSeverity) => {
    switch (severity) {
      case 'low':
        return <Badge className="bg-blue-500">Low</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">High</Badge>;
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: IncidentStatus) => {
    switch (status) {
      case 'reported':
        return <Badge className="bg-blue-500">Reported</Badge>;
      case 'investigating':
        return <Badge className="bg-yellow-500">Investigating</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500">Resolved</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Closed</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="security">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Security Incidents</h2>
            <p className="text-muted-foreground">
              Report and manage security incidents
            </p>
          </div>
          <Button 
            onClick={() => {
              setIsReporting(true);
              setSelectedIncident(null);
              setError(null);
              setSuccess(null);
            }}
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Report Incident
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
        
        {isReporting && (
          <Card>
            <CardHeader>
              <CardTitle>Report Security Incident</CardTitle>
              <CardDescription>
                Report a new security incident for immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="incidentType">Incident Type</Label>
                  <Input
                    id="incidentType"
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                    placeholder="Enter incident type (e.g., Unauthorized Access)"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Severity</Label>
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    <Button
                      type="button"
                      variant={severity === 'low' ? 'default' : 'outline'}
                      className="justify-center"
                      onClick={() => setSeverity('low')}
                    >
                      Low
                    </Button>
                    <Button
                      type="button"
                      variant={severity === 'medium' ? 'default' : 'outline'}
                      className="justify-center"
                      onClick={() => setSeverity('medium')}
                    >
                      Medium
                    </Button>
                    <Button
                      type="button"
                      variant={severity === 'high' ? 'default' : 'outline'}
                      className="justify-center"
                      onClick={() => setSeverity('high')}
                    >
                      High
                    </Button>
                    <Button
                      type="button"
                      variant={severity === 'critical' ? 'default' : 'outline'}
                      className="justify-center"
                      onClick={() => setSeverity('critical')}
                    >
                      Critical
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a detailed description of the incident"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  />
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={handleReportIncident}
                    className="flex-1"
                  >
                    Report Incident
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
        
        {selectedIncident && (
          <Card>
            <CardHeader>
              <CardTitle>Update Incident Status</CardTitle>
              <CardDescription>
                Change the status of the selected incident
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{selectedIncident.incidentType}</p>
                  <p className="text-sm text-muted-foreground">{selectedIncident.description}</p>
                </div>
                
                <div>
                  <Label>Current Status: {getStatusBadge(selectedIncident.status)}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
                    {selectedIncident.status === 'reported' && (
                      <Button
                        onClick={() => handleUpdateIncident(selectedIncident.id, 'investigating')}
                      >
                        Mark as Investigating
                      </Button>
                    )}
                    
                    {(selectedIncident.status === 'reported' || selectedIncident.status === 'investigating') && (
                      <Button
                        onClick={() => handleUpdateIncident(selectedIncident.id, 'resolved')}
                      >
                        Mark as Resolved
                      </Button>
                    )}
                    
                    {selectedIncident.status !== 'closed' && (
                      <Button
                        onClick={() => handleUpdateIncident(selectedIncident.id, 'closed')}
                      >
                        Close Incident
                      </Button>
                    )}
                  </div>
                </div>
                
                {(selectedIncident.status === 'reported' || selectedIncident.status === 'investigating') && (
                  <div>
                    <Label htmlFor="resolution">Resolution Notes</Label>
                    <textarea
                      id="resolution"
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      placeholder="Provide resolution details"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    />
                  </div>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => setSelectedIncident(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Tabs defaultValue="reported" value={activeTab} onValueChange={(value) => setActiveTab(value as IncidentStatus)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reported">Reported</TabsTrigger>
            <TabsTrigger value="investigating">Investigating</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : incidents.length === 0 ? (
              <div className="text-center py-12 border rounded-md">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No {activeTab} incidents</h3>
                <p className="text-muted-foreground mt-2">
                  There are no incidents with this status
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <Card key={incident.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-medium">{incident.incidentType}</h3>
                            {getSeverityBadge(incident.severity)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(incident.timestamp).toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(incident.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedIncident(incident);
                              setIsReporting(false);
                              setError(null);
                              setSuccess(null);
                            }}
                          >
                            Update Status
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm">{incident.description}</p>
                      </div>
                      
                      {incident.resolution && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium">Resolution:</p>
                          <p className="text-sm text-muted-foreground">{incident.resolution}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t flex items-center text-sm text-muted-foreground">
                        <User className="h-4 w-4 mr-1" />
                        <span>Reported by: {incident.reporter?.firstName} {incident.reporter?.lastName}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
