'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/lib/context/AuthContext';
import { getChildrenOfParent } from '@/services/parents';
import { getGradesByStudent } from '@/services/grades';
import { getAttendanceByStudent } from '@/services/attendance';
import { getFeesByStudent } from '@/services/fees';
import { Skeleton } from '@/components/ui/skeleton';
import { Student, Grade, Attendance, Fee } from '@/lib/types';

export default function ParentDashboard() {
  const { user } = useAuth();
  const [children, setChildren] = useState<Student[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data: childrenData } = await getChildrenOfParent(user.id);
        if (childrenData) setChildren(childrenData as Student[]);
        
        if (childrenData && childrenData.length > 0) {
          const childIds = childrenData.map((child: Student) => child.id);
          
          const gradesPromises = childIds.map((childId: string) => getGradesByStudent(childId));
          const attendancePromises = childIds.map((childId: string) => getAttendanceByStudent(childId));
          const feesPromises = childIds.map((childId: string) => getFeesByStudent(childId));
          
          const gradesResults = await Promise.all(gradesPromises);
          const attendanceResults = await Promise.all(attendancePromises);
          const feesResults = await Promise.all(feesPromises);
          
          const allGrades = gradesResults.flatMap((result: { data: Grade[] | null }) => result.data || []);
          const allAttendance = attendanceResults.flatMap((result: { data: Attendance[] | null }) => result.data || []);
          const allFees = feesResults.flatMap((result: { data: Fee[] | null }) => result.data || []);
          
          setGrades(allGrades as Grade[]);
          setAttendance(allAttendance as Attendance[]);
          setFees(allFees as Fee[]);
        }
      } catch (error) {
        console.error('Error fetching parent dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const calculateAverageGrade = () => {
    if (grades.length === 0) return 0;
    
    const totalPercentage = grades.reduce(
      (acc, grade) => acc + (grade.score / grade.maxScore) * 100, 
      0
    );
    
    return Math.round((totalPercentage / grades.length) * 100) / 100;
  };

  const calculateAttendanceRate = () => {
    if (attendance.length === 0) return 0;
    
    const presentCount = attendance.filter(a => a.status === 'present').length;
    return Math.round((presentCount / attendance.length) * 100);
  };

  const getPendingFeesCount = () => {
    return fees.filter(f => f.status === 'pending').length;
  };

  const getStudentById = (id: string) => {
    return children.find(child => child.id === id);
  };

  return (
    <DashboardLayout role="parent">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your parent dashboard. Here you can monitor your children's progress.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Total Children</h3>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-bold">{children.length}</p>
            )}
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Average Grade</h3>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-bold">
                {calculateAverageGrade()}%
              </p>
            )}
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Attendance Rate</h3>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-bold">
                {calculateAttendanceRate()}%
              </p>
            )}
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Pending Fees</h3>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-bold">
                {getPendingFeesCount()}
              </p>
            )}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Children's Progress</h3>
            <div className="mt-4 space-y-4">
              {loading ? (
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
              ) : children.length === 0 ? (
                <p className="text-sm text-muted-foreground">No children found.</p>
              ) : (
                children.map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">
                        {child.firstName} {child.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {child.grade} - {child.class}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {child.admissionNumber}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Recent Grades</h3>
            <div className="mt-4 space-y-4">
              {loading ? (
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
              ) : grades.length === 0 ? (
                <p className="text-sm text-muted-foreground">No grades found.</p>
              ) : (
                grades.slice(0, 5).map((grade) => {
                  const student = getStudentById(grade.studentId);
                  return (
                    <div
                      key={grade.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p className="font-medium">
                          {student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Score: {grade.score}/{grade.maxScore}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Term {grade.term}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}    