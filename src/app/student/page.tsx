'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/lib/context/AuthContext';
import { getGradesByStudent } from '@/services/grades';
import { getAttendanceByStudent } from '@/services/attendance';
import { getClassById } from '@/services/classes';
import { getSubjectById } from '@/services/subjects';
import { StudentInterface } from '@/components/age-calibrated/StudentInterface';
import { Skeleton } from '@/components/ui/skeleton';
import { Grade, Attendance, Class, Subject, Student } from '@/lib/types';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [classes, setClasses] = useState<Record<string, Class>>({});
  const [subjects, setSubjects] = useState<Record<string, Subject>>({});
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<Student | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const studentRes = await fetch(`/api/students/${user.id}`);
        const studentData = await studentRes.json();
        if (studentData) setStudentData(studentData as Student);
        
        const { data: gradesData } = await getGradesByStudent(user.id);
        if (gradesData) setGrades(gradesData as Grade[]);
        
        const { data: attendanceData } = await getAttendanceByStudent(user.id);
        if (attendanceData) setAttendance(attendanceData as Attendance[]);
        
        const classIds = new Set<string>();
        const subjectIds = new Set<string>();
        
        gradesData?.forEach((grade: Grade) => {
          if (grade.subjectId) subjectIds.add(grade.subjectId);
        });
        
        attendanceData?.forEach((record: Attendance) => {
          if (record.classId) classIds.add(record.classId);
        });
        
        const classesObj: Record<string, Class> = {};
        for (const classId of Array.from(classIds)) {
          const { data: classData } = await getClassById(classId);
          if (classData) classesObj[classId] = classData as Class;
        }
        setClasses(classesObj);
        
        const subjectsObj: Record<string, Subject> = {};
        for (const subjectId of Array.from(subjectIds)) {
          const { data: subjectData } = await getSubjectById(subjectId);
          if (subjectData) subjectsObj[subjectId] = subjectData as Subject;
        }
        setSubjects(subjectsObj);
      } catch (error) {
        console.error('Error fetching student dashboard data:', error);
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

  const getClassCount = () => {
    return Object.keys(classes).length;
  };

  return (
    <DashboardLayout role="student">
      {studentData && (
        <StudentInterface student={studentData}>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Student Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome to your student dashboard, {studentData.firstName}. Here you can view your grades and attendance.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="text-lg font-semibold">Total Classes</h3>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{getClassCount()}</p>
                )}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
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
                    grades.slice(0, 5).map((grade) => (
                      <div
                        key={grade.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <p className="font-medium">
                            {grade.subject?.name || subjects[grade.subjectId]?.name || 'Unknown Subject'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Score: {grade.score}/{grade.maxScore}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Term {grade.term}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">Recent Attendance</h3>
                <div className="mt-4 space-y-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </>
                  ) : attendance.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No attendance records found.</p>
                  ) : (
                    attendance.slice(0, 5).map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <p className="font-medium">
                            {classes[record.classId]?.name || 'Unknown Class'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(record.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p
                          className={`text-sm ${
                            record.status === 'present'
                              ? 'text-green-600'
                              : record.status === 'late'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </StudentInterface>
      )}
    </DashboardLayout>
  );
}  