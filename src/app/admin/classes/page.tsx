'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockClasses, mockTeachers, mockStudents } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredClasses = mockClasses.filter(class_ => 
    class_.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    class_.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Classes</h1>
            <p className="text-muted-foreground">
              Manage and view all classes in the school.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Add New Class
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
          <select
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="all">All Grades</option>
            <option value="Creche">Creche</option>
            <option value="KG">Kindergarten</option>
            <option value="Primary">Primary</option>
            <option value="JHS">Junior High School</option>
          </select>
          <Button variant="outline">Filter</Button>
        </div>
        
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>Class List</CardTitle>
            <CardDescription>
              Total Classes: {filteredClasses.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Class Name</th>
                    <th className="px-4 py-3 text-left font-medium">Grade</th>
                    <th className="px-4 py-3 text-left font-medium">Teacher</th>
                    <th className="px-4 py-3 text-left font-medium">Students</th>
                    <th className="px-4 py-3 text-left font-medium">Subjects</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClasses.map((class_) => {
                    const teacher = mockTeachers.find(t => t.id === class_.teacherId);
                    
                    return (
                      <tr key={class_.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3 font-medium">{class_.name}</td>
                        <td className="px-4 py-3">{class_.grade}</td>
                        <td className="px-4 py-3">
                          {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unassigned'}
                        </td>
                        <td className="px-4 py-3">
                          {class_.students.length} students
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {class_.subjects.slice(0, 2).map((subject, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                              >
                                {subject}
                              </span>
                            ))}
                            {class_.subjects.length > 2 && (
                              <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                                +{class_.subjects.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((class_) => {
            const teacher = mockTeachers.find(t => t.id === class_.teacherId);
            const classStudents = mockStudents.filter(s => class_.students.includes(s.id));
            
            return (
              <Card key={class_.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{class_.name}</CardTitle>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {class_.grade}
                    </span>
                  </div>
                  <CardDescription>
                    Teacher: {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unassigned'}
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
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Students ({class_.students.length})</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {classStudents.map((student) => (
                          <div key={student.id} className="flex items-center justify-between">
                            <span className="text-sm">{student.firstName} {student.lastName}</span>
                            <span className="text-xs text-muted-foreground">{student.admissionNumber}</span>
                          </div>
                        ))}
                        {classStudents.length === 0 && (
                          <p className="text-sm text-muted-foreground">No students assigned</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button variant="outline" size="sm" className="flex-1">Timetable</Button>
                      <Button variant="outline" size="sm" className="flex-1">Students</Button>
                      <Button size="sm" className="flex-1">Manage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
