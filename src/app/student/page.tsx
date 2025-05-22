'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/lib/context/AuthContext';
import { getGradesByStudent } from '@/services/grades';
import { getAttendanceByStudent } from '@/services/attendance';
import { getClassById } from '@/services/classes';
import { getSubjectById } from '@/services/subjects';
import { getStudentAchievements, getStudentLeaderboard } from '@/services/achievements';
import { StudentInterface } from '@/components/age-calibrated/StudentInterface';
import { Skeleton } from '@/components/ui/skeleton';
import { Grade, Attendance, Class, Subject, Student } from '@/lib/types';
import { Award, Trophy, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [classes, setClasses] = useState<Record<string, Class>>({});
  const [subjects, setSubjects] = useState<Record<string, Subject>>({});
  const [achievements, setAchievements] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
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
        
        const { data: achievementsData } = await getStudentAchievements(user.id);
        if (achievementsData) setAchievements(achievementsData);
        
        const { data: leaderboardData } = await getStudentLeaderboard(5);
        if (leaderboardData) setLeaderboard(leaderboardData);
        
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
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary" />
                  Your Achievements
                </h3>
                <div className="mt-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </>
                  ) : achievements.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No achievements yet. Keep up the good work!</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {achievements.slice(0, 4).map((achievement: any) => (
                        <div key={achievement.id} className="flex flex-col items-center p-3 border rounded-lg bg-muted/20">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <Star className="h-6 w-6 text-primary" />
                          </div>
                          <p className="text-sm font-medium text-center">{achievement.achievement.name}</p>
                          <p className="text-xs text-muted-foreground text-center mt-1">{achievement.achievement.description}</p>
                          <p className="text-xs text-primary mt-2">+{achievement.pointsEarned} points</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {achievements.length > 4 && (
                    <div className="mt-4 text-center">
                      <Link href="/student/achievements" passHref>
                        <Button variant="link" size="sm">View All Achievements</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-primary" />
                  Leaderboard
                </h3>
                <div className="mt-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </>
                  ) : leaderboard.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Leaderboard data not available.</p>
                  ) : (
                    <div className="space-y-4">
                      {leaderboard.map((student: any, index: number) => (
                        <div key={student.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                              index === 0 ? 'bg-yellow-100 text-yellow-600' :
                              index === 1 ? 'bg-gray-100 text-gray-600' :
                              index === 2 ? 'bg-amber-100 text-amber-600' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{student.firstName} {student.lastName}</p>
                              <p className="text-xs text-muted-foreground">{student.grade} • {student.class}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-primary mr-1" />
                            <span className="font-medium">{student.achievementPoints}</span>
                          </div>
                        </div>
                      ))}
                    </div>
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