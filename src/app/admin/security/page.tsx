'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Skeleton } from '../../../components/ui/skeleton';
import { useAuth } from '../../../lib/context/AuthContext';
import { getSecurityDashboardStats, getSecurityCheckpoints, getSecurityIncidents } from '../../../services/security-portal';
import { SecurityDashboardStats, SecurityCheckpoint, SecurityIncident } from '../../../lib/types/security';
import { Shield, UserCheck, AlertTriangle, Bell, Settings, Plus, Search, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminSecurityPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<SecurityDashboardStats | null>(null);
  const [checkpoints, setCheckpoints] = useState<SecurityCheckpoint[]>([]);
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data: statsData, error: statsError } = await getSecurityDashboardStats();
        if (statsError) throw statsError;
        
        if (statsData) {
          setStats(statsData);
        }
        
        const { data: checkpointsData, error: checkpointsError } = await getSecurityCheckpoints();
        if (checkpointsError) throw checkpointsError;
        
        if (checkpointsData) {
          setCheckpoints(checkpointsData as SecurityCheckpoint[]);
        }
        
        const { data: incidentsData, error: incidentsError } = await getSecurityIncidents('reported');
        if (incidentsError) throw incidentsError;
        
        if (incidentsData) {
          setIncidents(incidentsData as SecurityIncident[]);
        }
      } catch (error) {
        console.error('Error fetching security dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Security Management</h2>
            <p className="text-muted-foreground">
              Oversee school security operations and monitor student safety
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Security Settings
            </Button>
            <Button className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Security Center
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="checkpoints" className="flex items-center">
              <UserCheck className="mr-2 h-4 w-4" />
              Checkpoints
            </TabsTrigger>
            <TabsTrigger value="incidents" className="flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Incidents
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Students Checked In</CardTitle>
                  <UserCheck className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <div className="text-2xl font-bold">{stats?.studentsCheckedIn || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Currently on campus
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Students Checked Out</CardTitle>
                  <UserCheck className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <div className="text-2xl font-bold">{stats?.studentsCheckedOut || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Left campus today
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <div className="text-2xl font-bold">{stats?.activeIncidents || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Requiring attention
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <Bell className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <div className="text-2xl font-bold">{stats?.activeAlerts || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Security notifications
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Real-Time Student Status</CardTitle>
                  <CardDescription>
                    Live monitoring of student check-in and check-out activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        Real-time student status monitoring will appear here
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>
                    Recent security notifications and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        Security alerts will appear here
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Checkpoint Status</CardTitle>
                  <CardDescription>
                    Status of all security checkpoints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : checkpoints.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No checkpoints configured</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {checkpoints.map((checkpoint) => (
                        <div key={checkpoint.id} className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <p className="font-medium">{checkpoint.name}</p>
                            <p className="text-xs text-muted-foreground">{checkpoint.location}</p>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            checkpoint.isActive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                          }`}>
                            {checkpoint.isActive ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Security Personnel</CardTitle>
                  <CardDescription>
                    Currently on-duty security personnel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        Security personnel information will appear here
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="checkpoints" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Security Checkpoints</CardTitle>
                  <CardDescription>
                    Manage security checkpoint locations
                  </CardDescription>
                </div>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Checkpoint
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : checkpoints.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No checkpoints configured</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Add security checkpoints to monitor student check-in/out
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {checkpoints.map((checkpoint) => (
                      <div key={checkpoint.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{checkpoint.name}</h3>
                            <p className="text-sm text-muted-foreground">{checkpoint.location}</p>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            checkpoint.isActive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                          }`}>
                            {checkpoint.isActive ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className={checkpoint.isActive ? 'text-destructive' : 'text-success'}>
                            {checkpoint.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="incidents" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Security Incidents</CardTitle>
                  <CardDescription>
                    Manage and respond to security incidents
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search incidents..."
                      className="pl-8 w-[200px]"
                    />
                  </div>
                  <Button className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Report Incident
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : incidents.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No active incidents</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      There are currently no reported security incidents
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {incidents.map((incident) => (
                      <div key={incident.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{incident.incidentType}</h3>
                            <p className="text-sm text-muted-foreground">
                              Reported on {format(new Date(incident.timestamp), 'MMM d, yyyy h:mm a')}
                            </p>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                            {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                          </div>
                        </div>
                        
                        <p className="mt-2 text-sm">{incident.description}</p>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button variant="outline" size="sm">
                            Investigate
                          </Button>
                          <Button variant="outline" size="sm">
                            Resolve
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
