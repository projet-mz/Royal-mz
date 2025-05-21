'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getUsersByRole } from '@/services/users';
import { getClasses } from '@/services/classes';
import { getRecentAnnouncementsForUser } from '@/services/announcements';
import { Student, Teacher, Parent, Class, Announcement } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecurityMonitor } from '@/components/security/SecurityMonitor';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [studentsRes, teachersRes, parentsRes, classesRes, announcementsRes, consultationsRes] = await Promise.all([
          getUsersByRole('student'),
          getUsersByRole('teacher'),
          getUsersByRole('parent'),
          getClasses(),
          getRecentAnnouncementsForUser('admin', 5),
          supabase.from('consultations').select('*').eq('status', 'new')
        ]);
        
        if (studentsRes.data) setStudents(studentsRes.data as Student[]);
        if (teachersRes.data) setTeachers(teachersRes.data as Teacher[]);
        if (parentsRes.data) setParents(parentsRes.data as Parent[]);
        if (classesRes.data) setClasses(classesRes.data as Class[]);
        if (announcementsRes.data) setAnnouncements(announcementsRes.data as Announcement[]);
        if (consultationsRes.data) setConsultations(consultationsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the admin dashboard. Here you can manage all aspects of the school.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">Total Students</h3>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{students.length}</p>
                )}
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">Total Teachers</h3>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{teachers.length}</p>
                )}
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">Total Parents</h3>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{parents.length}</p>
                )}
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">Total Classes</h3>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{classes.length}</p>
                )}
              </div>
              <Link href="/admin/consultations" className="rounded-lg border bg-card p-6 hover:bg-accent/10 transition-colors">
                <h3 className="text-lg font-semibold">New Consultations</h3>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="flex items-center">
                    <p className="text-3xl font-bold">{consultations.length}</p>
                    {consultations.length > 0 && (
                      <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                        {consultations.length}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">Recent Students</h3>
                <div className="mt-4 space-y-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </>
                  ) : students.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No students found.</p>
                  ) : (
                    students.slice(0, 5).map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <p className="font-medium">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {student.grade} - {student.class}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {student.admissionNumber}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">Recent Teachers</h3>
                <div className="mt-4 space-y-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </>
                  ) : teachers.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No teachers found.</p>
                  ) : (
                    teachers.slice(0, 5).map((teacher) => (
                      <div
                        key={teacher.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <p className="font-medium">
                            {teacher.firstName} {teacher.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {teacher.specialization}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {teacher.yearsOfExperience} years
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <SecurityMonitor showFilters={true} />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">Student Enrollment</h3>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto h-12 w-12 text-muted-foreground"
                    >
                      <path d="M3 3v18h18" />
                      <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Analytics data will be displayed here
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto h-12 w-12 text-muted-foreground"
                    >
                      <path d="M12 2v20" />
                      <path d="M2 5h20" />
                      <path d="M2 19h20" />
                      <path d="M2 12h20" />
                      <path d="M19 5v14" />
                      <path d="M5 5v14" />
                    </svg>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Performance data will be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}           