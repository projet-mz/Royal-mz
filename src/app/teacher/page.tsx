'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getUsersByRole } from '@/services/users';
import { getClassesByTeacher } from '@/services/classes';
import { getGradesByTeacher } from '@/services/grades';
import { useAuth } from '@/lib/context/AuthContext';
import { Student, Class, Grade } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const [studentsRes, classesRes, gradesRes] = await Promise.all([
          getUsersByRole('student'),
          getClassesByTeacher(user.id),
          getGradesByTeacher(user.id)
        ]);
        
        if (studentsRes.data) setStudents(studentsRes.data as Student[]);
        if (classesRes.data) setClasses(classesRes.data as Class[]);
        if (gradesRes.data) setGrades(gradesRes.data as Grade[]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const getStudentById = (id: string) => {
    return students.find(student => student.id === id);
  };

  const getStudentCountForClass = (classId: string) => {
    const classItem = classes.find(c => c.id === classId);
    return classItem?.students?.length || 0;
  };

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your teacher dashboard. Here you can manage your classes and students.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">Total Students</h3>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{students.length}</p>
                )}
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">My Classes</h3>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{classes.length}</p>
                )}
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">Grades Submitted</h3>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{grades.length}</p>
                )}
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">My Classes</h3>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('classes')}>
                    View All
                  </Button>
                </div>
                <div className="mt-4 space-y-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </>
                  ) : classes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No classes found.</p>
                  ) : (
                    classes.slice(0, 5).map((class_) => (
                      <div
                        key={class_.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <p className="font-medium">{class_.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {class_.grade}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {getStudentCountForClass(class_.id)} students
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recent Grades</h3>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('grades')}>
                    View All
                  </Button>
                </div>
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
          </TabsContent>
          
          <TabsContent value="classes" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">My Classes</h2>
              <Button>Add New Class</Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <>
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                </>
              ) : classes.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No classes assigned yet.</p>
                </div>
              ) : (
                classes.map((class_) => (
                  <div key={class_.id} className="rounded-lg border bg-card p-6 flex flex-col">
                    <h3 className="text-xl font-semibold">{class_.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{class_.grade}</p>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Students:</span> {getStudentCountForClass(class_.id)}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">View</Button>
                      <Button variant="outline" size="sm" className="flex-1">Attendance</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="grades" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Grades Management</h2>
              <Button>Add New Grades</Button>
            </div>
            
            <div className="rounded-lg border bg-card overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Recent Grades</h3>
              </div>
              
              {loading ? (
                <div className="p-4">
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : grades.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No grades have been submitted yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Student</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Term</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {grades.map((grade) => {
                        const student = getStudentById(grade.studentId);
                        return (
                          <tr key={grade.id} className="hover:bg-muted/50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              {student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {grade.subject?.name || 'Unknown Subject'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              Term {grade.term}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {grade.score}/{grade.maxScore}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {new Date(grade.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}   