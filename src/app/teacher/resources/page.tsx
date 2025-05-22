'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { ResourceForm } from '../../../components/forms/ResourceForm';
import { useAuth } from '../../../lib/context/AuthContext';
import { getResourcesByTeacher, getAssignmentsByTeacher } from '../../../services/resources';
import { mockSubjects } from '../../../data/mock';
import Link from 'next/link';
import { FileText, Video, Headphones, Image, Link as LinkIcon, Package, Plus } from 'lucide-react';

export default function TeacherResourcesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('resources');
  const [showForm, setShowForm] = useState(false);
  const [resources, setResources] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data: resourcesData } = await getResourcesByTeacher(user.id);
        if (resourcesData) setResources(resourcesData);
        
        const { data: assignmentsData } = await getAssignmentsByTeacher(user.id);
        if (assignmentsData) setAssignments(assignmentsData);
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
  
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Learning Management</h1>
            <p className="text-muted-foreground">
              Create and manage learning resources and assignments.
            </p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="mr-2 h-4 w-4" />
            {showForm ? 'Cancel' : 'Add Resource'}
          </Button>
        </div>
        
        {showForm && (
          <ResourceForm />
        )}
        
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
                <p className="text-muted-foreground">No resources found.</p>
                <p className="text-muted-foreground">Click the "Add Resource" button to create your first resource.</p>
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
                            {getSubjectName(resource.subjectId)} • {resource.gradeLevel}
                          </CardDescription>
                        </div>
                        {getFileIcon(resource.fileType)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          resource.isPublished 
                            ? 'bg-success/20 text-success' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {resource.isPublished ? 'Published' : 'Draft'}
                        </span>
                        {resource.fileUrl && (
                          <Link 
                            href={resource.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            View Resource
                          </Link>
                        )}
                      </div>
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
                <p className="text-muted-foreground">No assignments found.</p>
                <p className="text-muted-foreground">Click the "Add Assignment" button to create your first assignment.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {assignments.map((assignment: any) => (
                  <Card key={assignment.id}>
                    <CardHeader>
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription>
                        {getSubjectName(assignment.subjectId)} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {assignment.description}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          assignment.isPublished 
                            ? 'bg-success/20 text-success' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {assignment.isPublished ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Max Score: {assignment.maxScore}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
