'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockClasses, mockSubjects } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';

export default function TeacherMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  
  const mockMaterials = [
    {
      id: '1',
      title: 'Mathematics Fundamentals',
      description: 'Basic mathematics concepts for primary students',
      subjectId: '1',
      classId: '1',
      type: 'Lesson Plan',
      format: 'PDF',
      size: '2.4 MB',
      uploadDate: new Date('2024-03-15'),
      downloads: 45,
      tags: ['mathematics', 'primary', 'fundamentals']
    },
    {
      id: '2',
      title: 'Science Experiment Guide',
      description: 'Step-by-step guide for conducting basic science experiments',
      subjectId: '2',
      classId: '1',
      type: 'Worksheet',
      format: 'PDF',
      size: '3.1 MB',
      uploadDate: new Date('2024-03-20'),
      downloads: 32,
      tags: ['science', 'experiments', 'primary']
    },
    {
      id: '3',
      title: 'English Grammar Rules',
      description: 'Comprehensive guide to English grammar for primary students',
      subjectId: '3',
      classId: '1',
      type: 'Reference',
      format: 'PDF',
      size: '1.8 MB',
      uploadDate: new Date('2024-03-25'),
      downloads: 38,
      tags: ['english', 'grammar', 'primary']
    },
    {
      id: '4',
      title: 'History Timeline Presentation',
      description: 'Visual timeline of major historical events',
      subjectId: '4',
      classId: '2',
      type: 'Presentation',
      format: 'PPTX',
      size: '5.2 MB',
      uploadDate: new Date('2024-03-10'),
      downloads: 27,
      tags: ['history', 'timeline', 'visual']
    },
    {
      id: '5',
      title: 'Geography Map Activities',
      description: 'Interactive map activities for geography lessons',
      subjectId: '5',
      classId: '2',
      type: 'Activity',
      format: 'PDF',
      size: '4.3 MB',
      uploadDate: new Date('2024-03-05'),
      downloads: 19,
      tags: ['geography', 'maps', 'interactive']
    },
    {
      id: '6',
      title: 'Mathematics Practice Problems',
      description: 'Collection of practice problems for mathematics',
      subjectId: '1',
      classId: '3',
      type: 'Worksheet',
      format: 'PDF',
      size: '1.5 MB',
      uploadDate: new Date('2024-04-01'),
      downloads: 12,
      tags: ['mathematics', 'practice', 'problems']
    },
    {
      id: '7',
      title: 'Science Vocabulary List',
      description: 'Essential science vocabulary for primary students',
      subjectId: '2',
      classId: '3',
      type: 'Reference',
      format: 'DOCX',
      size: '0.8 MB',
      uploadDate: new Date('2024-04-05'),
      downloads: 8,
      tags: ['science', 'vocabulary', 'primary']
    },
    {
      id: '8',
      title: 'Reading Comprehension Exercises',
      description: 'Exercises to improve reading comprehension skills',
      subjectId: '3',
      classId: '4',
      type: 'Worksheet',
      format: 'PDF',
      size: '2.1 MB',
      uploadDate: new Date('2024-04-10'),
      downloads: 15,
      tags: ['english', 'reading', 'comprehension']
    }
  ];
  
  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'all' || material.subjectId === selectedSubject;
    const matchesClass = selectedClass === 'all' || material.classId === selectedClass;
    
    return matchesSearch && matchesSubject && matchesClass;
  });
  
  const getMaterialTypeIcon = (type) => {
    switch (type) {
      case 'Lesson Plan':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'Worksheet':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'Presentation':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      case 'Reference':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'Activity':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };
  
  const getFormatIcon = (format) => {
    switch (format) {
      case 'PDF':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'DOCX':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'PPTX':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };
  
  const recentUploads = [...mockMaterials]
    .sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
    .slice(0, 3);
  
  const popularMaterials = [...mockMaterials]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 3);

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Teaching Materials</h1>
            <p className="text-muted-foreground">
              Manage and share your teaching resources.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Upload New Material
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockMaterials.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {Array.from(new Set(mockMaterials.map(m => m.subjectId))).length} subjects
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentUploads.map(material => (
                  <div key={material.id} className="flex items-center justify-between">
                    <div className="truncate text-sm">{material.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {material.uploadDate.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Popular Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {popularMaterials.map(material => (
                  <div key={material.id} className="flex items-center justify-between">
                    <div className="truncate text-sm">{material.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {material.downloads} downloads
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Input
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="all">All Subjects</option>
            {mockSubjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
          
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="all">All Classes</option>
            {mockClasses.map(class_ => (
              <option key={class_.id} value={class_.id}>{class_.name}</option>
            ))}
          </select>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMaterials.map(material => {
            const subject = mockSubjects.find(s => s.id === material.subjectId);
            const class_ = mockClasses.find(c => c.id === material.classId);
            
            return (
              <Card key={material.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                      <CardDescription>
                        {subject?.name || 'Unknown Subject'} • {class_?.name || 'Unknown Class'}
                      </CardDescription>
                    </div>
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                      {getMaterialTypeIcon(material.type)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {material.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Type</p>
                      <p>{material.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Format</p>
                      <div className="flex items-center gap-1">
                        {getFormatIcon(material.format)}
                        <span>{material.format}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Size</p>
                      <p>{material.size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Uploaded</p>
                      <p>{material.uploadDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {material.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 px-6 py-4">
                  <div className="flex justify-between items-center w-full">
                    <div className="text-xs text-muted-foreground">
                      {material.downloads} downloads
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button size="sm">Download</Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
          
          {filteredMaterials.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 text-muted-foreground/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium">No materials found</h3>
              <p className="mt-1 text-sm">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button className="mt-4">Upload New Material</Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
