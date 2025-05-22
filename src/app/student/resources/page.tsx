'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { useAuth } from '../../../lib/context/AuthContext';
import { getResourcesBySubject, getAssignmentsByClass } from '../../../services/resources';
import { getStudentById } from '../../../services/students';
import { getClassById } from '../../../services/classes';
import { mockSubjects } from '../../../data/mock';
import Link from 'next/link';
import { FileText, Video, Headphones, Image, Link as LinkIcon, Package, Calendar, Clock } from 'lucide-react';
import { StudentInterface } from '../../../components/age-calibrated/StudentInterface';

export default function StudentResourcesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('resources');
  const [resources, setResources] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data: studentData } = await getStudentById(user.id);
        if (studentData) {
          setStudent(studentData);
          
          const { data: classData } = await getClassById(studentData.classId);
          
          if (classData) {
            const { data: assignmentsData } = await getAssignmentsByClass(classData.id);
            if (assignmentsData) setAssignments(assignmentsData);
          }
          
          const allResources: any[] = [];
          for (const subject of mockSubjects) {
            const { data: subjectResources } = await getResourcesBySubject(subject.id);
            if (subjectResources) {
              const filteredResources = subjectResources.filter(
                (r: any) => r.gradeLevel === studentData.grade
              );
              allResources.push(...filteredResources);
            }
          }
          setResources(allResources);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'document':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'video':
        return <Video className="h-6 w-6 text-red-500" />;
      case 'audio':
        return <Headphones className="h-6 w-6 text-purple-500" />;
      case 'image':
        return <Image className="h-6 w-6 text-green-500" />;
      case 'link':
        return <LinkIcon className="h-6 w-6 text-yellow-500" />;
      default:
        return <Package className="h-6 w-6 text-gray-500" />;
    }
  };
  
  const getSubjectName = (subjectId: string) => {
    const subject = mockSubjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown Subject';
  };
  
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };
  
  return (
    <DashboardLayout role="student">
      {student && (
        <StudentInterface student={student}>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-heading font-bold">Learning Resources</h1>
              <p className="text-muted-foreground">
                Access learning materials and assignments.
              </p>
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab as any}>
              <TabsList>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="resources" className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">Loading resources...</div>
                ) : resources.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No resources available for your grade level.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {resources.map((resource: any) => (
                      <Card key={resource.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{resource.title}</CardTitle>
                              <CardDescription>
                                {getSubjectName(resource.subjectId)}
                              </CardDescription>
                            </div>
                            {getFileIcon(resource.fileType)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {resource.description}
                          </p>
                          {resource.fileUrl && (
                            <div className="mt-4">
                              <Link 
                                href={resource.fileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                View Resource
                              </Link>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="assignments" className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">Loading assignments...</div>
                ) : assignments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No assignments available.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {assignments.map((assignment: any) => (
                      <Card key={assignment.id} className={
                        new Date(assignment.dueDate) < new Date() 
                          ? 'border-destructive/50' 
                          : new Date(assignment.dueDate).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000 
                            ? 'border-warning/50' 
                            : ''
                      }>
                        <CardHeader>
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>
                            {getSubjectName(assignment.subjectId)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {assignment.description}
                          </p>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span className={
                                new Date(assignment.dueDate) < new Date() 
                                  ? 'text-destructive' 
                                  : new Date(assignment.dueDate).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000 
                                    ? 'text-warning' 
                                    : ''
                              }>
                                {getDaysUntilDue(assignment.dueDate)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </StudentInterface>
      )}
    </DashboardLayout>
  );
}
