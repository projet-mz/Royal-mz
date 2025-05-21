'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockClasses, mockSubjects } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';

const mockAssignments = [
  {
    id: '1',
    title: 'Mathematics Problem Set',
    description: 'Complete problems 1-20 in Chapter 5',
    subjectId: '1',
    classId: '1',
    dueDate: new Date('2024-04-15'),
    status: 'pending',
    maxScore: 100,
  },
  {
    id: '2',
    title: 'Science Lab Report',
    description: 'Write a report on the photosynthesis experiment',
    subjectId: '2',
    classId: '1',
    dueDate: new Date('2024-04-20'),
    status: 'submitted',
    maxScore: 50,
  },
  {
    id: '3',
    title: 'English Essay',
    description: 'Write a 500-word essay on the theme of identity in the novel',
    subjectId: '3',
    classId: '1',
    dueDate: new Date('2024-04-25'),
    status: 'graded',
    score: 85,
    maxScore: 100,
  },
];

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mockSubjects.find(s => s.id === assignment.subjectId)?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} remaining`;
    } else if (diffDays < 0) {
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} overdue`;
    } else {
      return 'Due today';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/20 text-warning';
      case 'submitted':
        return 'bg-primary/20 text-primary';
      case 'graded':
        return 'bg-success/20 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Assignments</h1>
            <p className="text-muted-foreground">
              View and manage your assignments from all classes.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Input
              placeholder="Search assignments..."
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="graded">Graded</option>
          </select>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssignments.map((assignment) => {
            const subject = mockSubjects.find(s => s.id === assignment.subjectId);
            const class_ = mockClasses.find(c => c.id === assignment.classId);
            
            return (
              <Card key={assignment.id} className="overflow-hidden">
                <CardHeader className={`pb-4 ${
                  assignment.status === 'pending' 
                    ? 'bg-gradient-to-r from-warning/5 to-warning/10' 
                    : assignment.status === 'submitted' 
                      ? 'bg-gradient-to-r from-primary/5 to-primary/10' 
                      : 'bg-gradient-to-r from-success/5 to-success/10'
                }`}>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{assignment.title}</CardTitle>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(assignment.status)}`}>
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </span>
                  </div>
                  <CardDescription>
                    {subject?.name || 'Unknown Subject'} • {class_?.name || 'Unknown Class'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                      <p className="text-sm">{assignment.description}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Due Date</h4>
                        <p className="text-sm">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        new Date(assignment.dueDate) < new Date() && assignment.status === 'pending'
                          ? 'bg-destructive/20 text-destructive'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {getDaysRemaining(assignment.dueDate)}
                      </span>
                    </div>
                    
                    {assignment.status === 'graded' && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Score</h4>
                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full bg-success" 
                              style={{ width: `${((assignment.score || 0) / assignment.maxScore) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {assignment.score}/{assignment.maxScore}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 px-6 py-4">
                  <div className="flex space-x-2 w-full">
                    {assignment.status === 'pending' ? (
                      <Button className="w-full">Submit Assignment</Button>
                    ) : (
                      <Button variant="outline" className="w-full">View Details</Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
