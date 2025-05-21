'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockClasses, mockStudents } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';

export default function TeacherClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredClasses = mockClasses.filter(class_ => 
    class_.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    class_.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">My Classes</h1>
            <p className="text-muted-foreground">
              Manage and view all classes you are teaching.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Create Lesson Plan
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search classes..."
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
          <Button variant="outline">Filter</Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((class_) => (
            <Card key={class_.id} className="overflow-hidden">
              <CardHeader className="bg-primary/5 pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{class_.name}</CardTitle>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {class_.grade}
                  </span>
                </div>
                <CardDescription>
                  {class_.students.length} Students
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {class_.subjects.map((subject, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Students</h4>
                    <div className="space-y-2">
                      {class_.students.map((studentId) => {
                        const student = mockStudents.find(s => s.id === studentId);
                        return student ? (
                          <div key={student.id} className="flex items-center justify-between">
                            <span className="text-sm">{student.firstName} {student.lastName}</span>
                            <span className="text-xs text-muted-foreground">{student.admissionNumber}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">Attendance</Button>
                    <Button variant="outline" size="sm" className="flex-1">Grades</Button>
                    <Button size="sm" className="flex-1">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
