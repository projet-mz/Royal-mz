'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Skeleton } from '../../../components/ui/skeleton';
import { useAuth } from '../../../lib/context/AuthContext';
import { getStudentById } from '../../../services/students';
import { getAuthorizedGuardians, getStudentCurrentStatus, recordStudentCheckpoint } from '../../../services/security-portal';
import { Student } from '../../../lib/types';
import { AuthorizedGuardian, StudentStatus } from '../../../lib/types/security';
import { UserCheck, UserX, Search, Camera, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function CheckInOutPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'check-in' | 'check-out'>('check-in');
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [studentStatus, setStudentStatus] = useState<StudentStatus | null>(null);
  const [guardians, setGuardians] = useState<AuthorizedGuardian[]>([]);
  const [selectedGuardian, setSelectedGuardian] = useState<string | null>(null);
  const [verificationMethod, setVerificationMethod] = useState<'id_card' | 'guardian_verification' | 'temp_code' | 'biometric' | 'override'>('id_card');
  const [tempCode, setTempCode] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
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
    setStudentStatus(null);
    setGuardians([]);
    
    try {
      const { data: studentData, error: studentError } = await getStudentById(studentId);
      
      if (studentError) throw studentError;
      
      if (!studentData) {
        setError('Student not found');
        return;
      }
      
      setStudent(studentData as Student);
      
      const { data: statusData, error: statusError } = await getStudentCurrentStatus(studentData.id);
      
      if (statusError) throw statusError;
      
      if (statusData) {
        const status = statusData.status === 'in' || statusData.status === 'out' ? 
          statusData.status : 'unknown';
          
        setStudentStatus({
          status: status as 'in' | 'out' | 'unknown',
          lastEvent: statusData.lastEvent
        });
      }
      
      if (activeTab === 'check-out') {
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

  const handleCheckInOut = async () => {
    if (!student || !user) {
      setError('Missing student or security personnel information');
      return;
    }
    
    if (activeTab === 'check-out') {
      if (verificationMethod === 'guardian_verification' && !selectedGuardian) {
        setError('Please select an authorized guardian');
        return;
      }
      
      if (verificationMethod === 'temp_code' && !tempCode) {
        setError('Please enter the temporary authorization code');
        return;
      }
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: recordError } = await recordStudentCheckpoint(
        student.id,
        'checkpoint-id', // This would be the actual checkpoint ID in production
        user.id,
        activeTab === 'check-in' ? 'check_in' : 'check_out',
        verificationMethod,
        verificationMethod === 'guardian_verification' ? selectedGuardian || undefined : undefined,
        verificationMethod === 'temp_code' ? tempCode || undefined : undefined,
        undefined, // photoCaptured
        undefined, // locationData
        notes || undefined
      );
      
      if (recordError) throw recordError;
      
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        setStudentId('');
        setStudent(null);
        setStudentStatus(null);
        setGuardians([]);
        setSelectedGuardian(null);
        setVerificationMethod('id_card');
        setTempCode('');
        setNotes('');
      }, 3000);
    } catch (error) {
      console.error('Error recording checkpoint event:', error);
      setError('An error occurred while recording the checkpoint event');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'check-in' | 'check-out');
    setStudent(null);
    setStudentStatus(null);
    setGuardians([]);
    setSelectedGuardian(null);
    setVerificationMethod('id_card');
    setTempCode('');
    setNotes('');
    setError(null);
  };

  return (
    <DashboardLayout role="security">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Check-in/out</h2>
          <p className="text-muted-foreground">
            Process student arrivals and departures with secure verification
          </p>
        </div>
        
        <Tabs defaultValue="check-in" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="check-in" className="flex items-center">
              <UserCheck className="mr-2 h-4 w-4" />
              Check-in
            </TabsTrigger>
            <TabsTrigger value="check-out" className="flex items-center">
              <UserX className="mr-2 h-4 w-4" />
              Check-out
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="check-in" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Check-in</CardTitle>
                <CardDescription>
                  Record student arrival at school
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
                  
                  <div>
                    <Label>Verification Method</Label>
                    <div className="flex mt-1 space-x-2">
                      <Button
                        variant={verificationMethod === 'id_card' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setVerificationMethod('id_card')}
                      >
                        ID Card
                      </Button>
                      <Button
                        variant={verificationMethod === 'biometric' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setVerificationMethod('biometric')}
                      >
                        Biometric
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
                    <p>Student successfully checked in!</p>
                  </div>
                )}
                
                {student && (
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{student.firstName} {student.lastName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {student.grade} - {student.class} | {student.admissionNumber}
                        </p>
                      </div>
                      
                      {studentStatus && (
                        <Badge className={studentStatus.status === 'in' ? 'bg-success' : 'bg-secondary'}>
                          {studentStatus.status === 'in' ? 'Checked In' : 'Checked Out'}
                        </Badge>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Input
                        id="notes"
                        placeholder="Add any notes about this check-in"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        onClick={handleCheckInOut} 
                        className="w-full"
                        disabled={loading || (studentStatus?.status === 'in')}
                      >
                        {loading ? (
                          <>
                            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Processing...
                          </>
                        ) : studentStatus?.status === 'in' ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Already Checked In
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Check In Student
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="check-out" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Check-out</CardTitle>
                <CardDescription>
                  Record student departure with guardian verification
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
                  
                  <div>
                    <Label>Verification Method</Label>
                    <div className="flex flex-wrap mt-1 gap-2">
                      <Button
                        variant={verificationMethod === 'guardian_verification' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setVerificationMethod('guardian_verification')}
                      >
                        Guardian
                      </Button>
                      <Button
                        variant={verificationMethod === 'temp_code' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setVerificationMethod('temp_code')}
                      >
                        Temp Code
                      </Button>
                      <Button
                        variant={verificationMethod === 'override' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setVerificationMethod('override')}
                      >
                        Override
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
                    <p>Student successfully checked out!</p>
                  </div>
                )}
                
                {student && (
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{student.firstName} {student.lastName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {student.grade} - {student.class} | {student.admissionNumber}
                        </p>
                      </div>
                      
                      {studentStatus && (
                        <Badge className={studentStatus.status === 'in' ? 'bg-success' : 'bg-secondary'}>
                          {studentStatus.status === 'in' ? 'Checked In' : 'Checked Out'}
                        </Badge>
                      )}
                    </div>
                    
                    {verificationMethod === 'guardian_verification' && (
                      <div>
                        <Label>Select Authorized Guardian</Label>
                        <div className="mt-2 space-y-2">
                          {guardians.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No authorized guardians found</p>
                          ) : (
                            guardians.map((guardian) => (
                              <div 
                                key={guardian.id} 
                                className={`p-3 border rounded-md cursor-pointer ${
                                  selectedGuardian === guardian.guardianId ? 'border-primary bg-primary/5' : ''
                                }`}
                                onClick={() => setSelectedGuardian(guardian.guardianId)}
                              >
                                <div className="flex justify-between">
                                  <div>
                                    <p className="font-medium">
                                      {guardian.guardian?.firstName} {guardian.guardian?.lastName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {guardian.relationship} {guardian.isPrimary && '(Primary)'}
                                    </p>
                                  </div>
                                  {selectedGuardian === guardian.guardianId && (
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                    
                    {verificationMethod === 'temp_code' && (
                      <div>
                        <Label htmlFor="tempCode">Temporary Authorization Code</Label>
                        <Input
                          id="tempCode"
                          placeholder="Enter the temporary code"
                          value={tempCode}
                          onChange={(e) => setTempCode(e.target.value)}
                        />
                      </div>
                    )}
                    
                    {verificationMethod === 'override' && (
                      <div className="bg-warning/10 p-3 rounded-md">
                        <p className="text-sm font-medium text-warning">
                          Security Override
                        </p>
                        <p className="text-sm text-muted-foreground">
                          You are using a security override. This will be logged and requires justification.
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <Label htmlFor="notes">Notes (Required for Override)</Label>
                      <Input
                        id="notes"
                        placeholder="Add notes about this check-out"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        required={verificationMethod === 'override'}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        onClick={handleCheckInOut} 
                        className="w-full"
                        disabled={
                          loading || 
                          (studentStatus?.status === 'out') || 
                          (verificationMethod === 'guardian_verification' && !selectedGuardian) ||
                          (verificationMethod === 'temp_code' && !tempCode) ||
                          (verificationMethod === 'override' && !notes)
                        }
                      >
                        {loading ? (
                          <>
                            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Processing...
                          </>
                        ) : studentStatus?.status === 'out' ? (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Already Checked Out
                          </>
                        ) : (
                          <>
                            <UserX className="mr-2 h-4 w-4" />
                            Check Out Student
                          </>
                        )}
                      </Button>
                    </div>
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
