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
import { getChildrenOfParent } from '../../../services/parents';
import { createTemporaryAuthorization, getTemporaryAuthorizations } from '../../../services/security-portal';
import { Student } from '../../../lib/types';
import { TemporaryAuthorization } from '../../../lib/types/security';
import { Shield, Clock, UserPlus, Calendar, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { format, addHours } from 'date-fns';

export default function ParentSecurityPage() {
  const { user } = useAuth();
  const [children, setChildren] = useState<Student[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [tempAuthorizations, setTempAuthorizations] = useState<TemporaryAuthorization[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('authorizations');
  
  const [delegateName, setDelegateName] = useState('');
  const [delegatePhone, setDelegatePhone] = useState('');
  const [delegateIdNumber, setDelegateIdNumber] = useState('');
  const [relationship, setRelationship] = useState('');
  const [validHours, setValidHours] = useState(4);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data: childrenData } = await getChildrenOfParent(user.id);
        if (childrenData) {
          setChildren(childrenData as Student[]);
          
          if (childrenData.length > 0) {
            setSelectedChild(childrenData[0].id);
            
            const { data: authData } = await getTemporaryAuthorizations(childrenData[0].id);
            if (authData) {
              setTempAuthorizations(authData as TemporaryAuthorization[]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching parent security data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const handleChildChange = async (childId: string) => {
    setSelectedChild(childId);
    setLoading(true);
    
    try {
      const { data: authData } = await getTemporaryAuthorizations(childId);
      if (authData) {
        setTempAuthorizations(authData as TemporaryAuthorization[]);
      } else {
        setTempAuthorizations([]);
      }
    } catch (error) {
      console.error('Error fetching temporary authorizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAuthorization = async () => {
    if (!user || !selectedChild) {
      setError('Missing user or child information');
      return;
    }
    
    if (!delegateName || !delegatePhone || !relationship) {
      setError('Please fill in all required fields');
      return;
    }
    
    setFormLoading(true);
    setError(null);
    
    try {
      const validFrom = new Date();
      const validUntil = addHours(validFrom, validHours);
      
      const { data, error: authError } = await createTemporaryAuthorization(
        selectedChild,
        user.id,
        delegateName,
        delegatePhone,
        relationship,
        validFrom,
        validUntil,
        delegateIdNumber || undefined,
        undefined, // delegatePhoto
        specialInstructions || undefined
      );
      
      if (authError) throw authError;
      
      if (data) {
        setTempAuthorizations(prev => [data as TemporaryAuthorization, ...prev]);
      }
      
      setDelegateName('');
      setDelegatePhone('');
      setDelegateIdNumber('');
      setRelationship('');
      setValidHours(4);
      setSpecialInstructions('');
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating temporary authorization:', error);
      setError('Failed to create temporary authorization');
    } finally {
      setFormLoading(false);
    }
  };

  const getSelectedChildName = () => {
    if (!selectedChild) return '';
    const child = children.find(c => c.id === selectedChild);
    return child ? `${child.firstName} ${child.lastName}` : '';
  };

  const isAuthorizationActive = (auth: TemporaryAuthorization) => {
    const now = new Date();
    const validUntil = new Date(auth.validUntil);
    return !auth.isUsed && validUntil > now;
  };

  return (
    <DashboardLayout role="parent">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Security Management</h2>
            <p className="text-muted-foreground">
              Manage pickup authorizations and monitor your child's security status
            </p>
          </div>
        </div>
        
        {children.length === 0 && !loading ? (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center p-6">
                <div className="text-center">
                  <AlertTriangle className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No children found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You don't have any children registered in the system.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Child Selection</CardTitle>
                <CardDescription>
                  Select a child to manage their security settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {children.map((child) => (
                      <Button
                        key={child.id}
                        variant={selectedChild === child.id ? "default" : "outline"}
                        className="h-auto py-4 justify-start"
                        onClick={() => handleChildChange(child.id)}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{child.firstName} {child.lastName}</span>
                          <span className="text-xs text-muted-foreground">{child.grade} - {child.class}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Tabs defaultValue="authorizations" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="authorizations" className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Pickup Authorizations
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Check-in/out History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="authorizations" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Temporary Authorization</CardTitle>
                    <CardDescription>
                      Authorize someone to pick up your child from school
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p>{error}</p>
                      </div>
                    )}
                    
                    {success && (
                      <div className="bg-success/10 text-success p-3 rounded-md flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p>Temporary authorization created successfully!</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="delegateName">Delegate Name (Required)</Label>
                        <Input
                          id="delegateName"
                          placeholder="Full name of the person picking up your child"
                          value={delegateName}
                          onChange={(e) => setDelegateName(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="delegatePhone">Delegate Phone (Required)</Label>
                        <Input
                          id="delegatePhone"
                          placeholder="Phone number"
                          value={delegatePhone}
                          onChange={(e) => setDelegatePhone(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="delegateIdNumber">Delegate ID Number (Optional)</Label>
                        <Input
                          id="delegateIdNumber"
                          placeholder="ID card number or other identification"
                          value={delegateIdNumber}
                          onChange={(e) => setDelegateIdNumber(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="relationship">Relationship to Child (Required)</Label>
                        <Input
                          id="relationship"
                          placeholder="e.g. Grandparent, Aunt, Family Friend"
                          value={relationship}
                          onChange={(e) => setRelationship(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="validHours">Valid for (hours)</Label>
                        <Input
                          id="validHours"
                          type="number"
                          min={1}
                          max={24}
                          value={validHours}
                          onChange={(e) => setValidHours(parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                        <Input
                          id="specialInstructions"
                          placeholder="Any special instructions for pickup"
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleCreateAuthorization}
                      className="w-full mt-4"
                      disabled={formLoading || !selectedChild || !delegateName || !delegatePhone || !relationship}
                    >
                      {formLoading ? (
                        <>
                          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          Create Authorization
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Active Authorizations</CardTitle>
                    <CardDescription>
                      Current temporary pickup authorizations for {getSelectedChildName()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    ) : tempAuthorizations.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No active authorizations found</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {tempAuthorizations.map((auth) => (
                          <div
                            key={auth.id}
                            className={`border rounded-lg p-4 ${
                              isAuthorizationActive(auth) ? 'border-primary/50' : 'border-muted'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{auth.delegateName}</h3>
                                <p className="text-sm text-muted-foreground">{auth.relationship}</p>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                auth.isUsed
                                  ? 'bg-secondary/20 text-secondary'
                                  : isAuthorizationActive(auth)
                                    ? 'bg-success/20 text-success'
                                    : 'bg-destructive/20 text-destructive'
                              }`}>
                                {auth.isUsed
                                  ? 'Used'
                                  : isAuthorizationActive(auth)
                                    ? 'Active'
                                    : 'Expired'}
                              </div>
                            </div>
                            
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Phone: </span>
                                {auth.delegatePhone}
                              </div>
                              {auth.delegateIdNumber && (
                                <div>
                                  <span className="text-muted-foreground">ID: </span>
                                  {auth.delegateIdNumber}
                                </div>
                              )}
                              <div>
                                <span className="text-muted-foreground">Valid from: </span>
                                {format(new Date(auth.validFrom), 'MMM d, yyyy h:mm a')}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Valid until: </span>
                                {format(new Date(auth.validUntil), 'MMM d, yyyy h:mm a')}
                              </div>
                            </div>
                            
                            {auth.specialInstructions && (
                              <div className="mt-2 text-sm">
                                <span className="text-muted-foreground">Instructions: </span>
                                {auth.specialInstructions}
                              </div>
                            )}
                            
                            <div className="mt-3 flex items-center">
                              <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                Verification Code: {auth.verificationCode}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Check-in/out History</CardTitle>
                    <CardDescription>
                      Recent security checkpoint activity for {getSelectedChildName()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">Check-in/out history will appear here</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
