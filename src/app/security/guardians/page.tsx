'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Skeleton } from '../../../components/ui/skeleton';
import { Badge } from '../../../components/ui/badge';
import { useAuth } from '../../../lib/context/AuthContext';
import { getStudentById } from '../../../services/students';
import { getAuthorizedGuardians, verifyTemporaryAuthorization } from '../../../services/security-portal';
import { Student } from '../../../lib/types';
import { AuthorizedGuardian, TemporaryAuthorization } from '../../../lib/types/security';
import { 
  Users, 
  Search, 
  UserCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Camera, 
  Shield 
} from 'lucide-react';

export default function GuardiansPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'authorized' | 'temporary'>('authorized');
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [guardians, setGuardians] = useState<AuthorizedGuardian[]>([]);
  const [tempCode, setTempCode] = useState('');
  const [tempAuthorization, setTempAuthorization] = useState<TemporaryAuthorization | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!studentId) {
      setError('Please enter a student ID or admission number');
      return;
    }
    
    setSearchLoading(true);
    setError(null);
    setStudent(null);
    setGuardians([]);
    setTempAuthorization(null);
    
    try {
      const { data: studentData, error: studentError } = await getStudentById(studentId);
      
      if (studentError) throw studentError;
      
      if (!studentData) {
        setError('Student not found');
        return;
      }
      
      setStudent(studentData as Student);
      
      if (activeTab === 'authorized') {
        const { data: guardiansData, error: guardiansError } = await getAuthorizedGuardians(studentData.id);
        
        if (guardiansError) throw guardiansError;
        
        if (guardiansData) {
          setGuardians(guardiansData as AuthorizedGuardian[]);
        }
      }
    } catch (error) {
      console.error('Error searching for student:', error);
      setError('An error occurred while searching for the student');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleVerifyTempCode = async () => {
    if (!student || !tempCode) {
      setError('Please enter a temporary authorization code');
      return;
    }
    
    setVerifyLoading(true);
    setError(null);
    setTempAuthorization(null);
    
    try {
      const { data, isValid, error: verifyError } = await verifyTemporaryAuthorization(tempCode, student.id);
      
      if (verifyError) throw verifyError;
      
      if (!isValid || !data) {
        setError('Invalid or expired temporary authorization code');
        return;
      }
      
      setTempAuthorization(data as TemporaryAuthorization);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error verifying temporary code:', error);
      setError('An error occurred while verifying the temporary code');
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'authorized' | 'temporary');
    setStudent(null);
    setGuardians([]);
    setTempAuthorization(null);
    setTempCode('');
    setStudentId('');
    setError(null);
    setSuccess(false);
  };

  return (
    <DashboardLayout role="security">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Guardian Verification</h2>
          <p className="text-muted-foreground">
            Verify authorized guardians and temporary authorizations
          </p>
        </div>
        
        <Tabs defaultValue="authorized" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="authorized" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Authorized Guardians
            </TabsTrigger>
            <TabsTrigger value="temporary" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Temporary Authorizations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="authorized" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Authorized Guardians</CardTitle>
                <CardDescription>
                  View guardians authorized to pick up a student
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="studentId">Student ID or Admission Number</Label>
                    <div className="flex mt-1">
                      <Input
                        id="studentId"
                        placeholder="Enter student ID or admission number"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSearch} 
                        className="ml-2"
                        disabled={searchLoading || !studentId}
                      >
                        {searchLoading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
                
                {student && (
                  <div className="border rounded-md p-4 mb-4">
                    <h3 className="text-lg font-semibold">{student.firstName} {student.lastName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {student.grade} - {student.class} | {student.admissionNumber}
                    </p>
                  </div>
                )}
                
                {student && guardians.length === 0 && (
                  <div className="text-center py-8 border rounded-md">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No authorized guardians found for this student</p>
                  </div>
                )}
                
                {student && guardians.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Authorized Guardians</h3>
                    <div className="space-y-3">
                      {guardians.map((guardian) => (
                        <div key={guardian.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{guardian.guardian?.firstName} {guardian.guardian?.lastName}</h4>
                              <p className="text-sm text-muted-foreground">
                                Relationship: {guardian.relationship}
                              </p>
                              {guardian.isPrimary && (
                                <Badge className="mt-1 bg-primary">Primary Guardian</Badge>
                              )}
                            </div>
                            <div>
                              {guardian.isActive ? (
                                <Badge className="bg-success">Active</Badge>
                              ) : (
                                <Badge className="bg-destructive">Inactive</Badge>
                              )}
                            </div>
                          </div>
                          
                          {guardian.verificationPhoto && (
                            <div className="mt-3 border-t pt-3">
                              <p className="text-sm font-medium mb-1">Verification Photo</p>
                              <div className="h-24 w-24 bg-muted rounded-md flex items-center justify-center">
                                <Camera className="h-8 w-8 text-muted-foreground" />
                              </div>
                            </div>
                          )}
                          
                          {guardian.verificationQuestions && (
                            <div className="mt-3 border-t pt-3">
                              <p className="text-sm font-medium mb-1">Verification Questions</p>
                              <div className="space-y-1">
                                {Object.entries(guardian.verificationQuestions).map(([question, answer], idx) => (
                                  <div key={idx} className="text-sm">
                                    <span className="font-medium">{question}:</span> {answer}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="temporary" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Temporary Authorizations</CardTitle>
                <CardDescription>
                  Verify temporary authorization codes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="studentId">Student ID or Admission Number</Label>
                    <div className="flex mt-1">
                      <Input
                        id="studentId"
                        placeholder="Enter student ID or admission number"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSearch} 
                        className="ml-2"
                        disabled={searchLoading || !studentId}
                      >
                        {searchLoading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
                
                {success && (
                  <div className="bg-success/10 text-success p-3 rounded-md flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Temporary authorization verified successfully!</p>
                  </div>
                )}
                
                {student && (
                  <div className="border rounded-md p-4 mb-4">
                    <h3 className="text-lg font-semibold">{student.firstName} {student.lastName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {student.grade} - {student.class} | {student.admissionNumber}
                    </p>
                  </div>
                )}
                
                {student && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tempCode">Temporary Authorization Code</Label>
                      <div className="flex mt-1">
                        <Input
                          id="tempCode"
                          placeholder="Enter the temporary code"
                          value={tempCode}
                          onChange={(e) => setTempCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          onClick={handleVerifyTempCode} 
                          className="ml-2"
                          disabled={verifyLoading || !tempCode}
                        >
                          {verifyLoading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          ) : (
                            <Shield className="h-4 w-4" />
                          )}
                          Verify
                        </Button>
                      </div>
                    </div>
                    
                    {tempAuthorization && (
                      <div className="border rounded-md p-4 bg-success/5 border-success">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Temporary Authorization</h4>
                            <p className="text-sm">
                              <span className="font-medium">Delegate:</span> {tempAuthorization.delegateName}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Relationship:</span> {tempAuthorization.relationship}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Phone:</span> {tempAuthorization.delegatePhone}
                            </p>
                            {tempAuthorization.delegateIdNumber && (
                              <p className="text-sm">
                                <span className="font-medium">ID Number:</span> {tempAuthorization.delegateIdNumber}
                              </p>
                            )}
                            <p className="text-sm">
                              <span className="font-medium">Valid Until:</span> {new Date(tempAuthorization.validUntil).toLocaleString()}
                            </p>
                            {tempAuthorization.specialInstructions && (
                              <p className="text-sm mt-2">
                                <span className="font-medium">Special Instructions:</span><br />
                                {tempAuthorization.specialInstructions}
                              </p>
                            )}
                          </div>
                          <Badge className={tempAuthorization.isUsed ? 'bg-secondary' : 'bg-success'}>
                            {tempAuthorization.isUsed ? 'Used' : 'Valid'}
                          </Badge>
                        </div>
                        
                        {tempAuthorization.delegatePhoto && (
                          <div className="mt-3 border-t pt-3">
                            <p className="text-sm font-medium mb-1">Delegate Photo</p>
                            <div className="h-24 w-24 bg-muted rounded-md flex items-center justify-center">
                              <Camera className="h-8 w-8 text-muted-foreground" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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
