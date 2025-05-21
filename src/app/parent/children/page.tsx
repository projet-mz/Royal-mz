'use client';

import React from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockStudents, mockGrades, mockAttendance } from '../../../data/mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

export default function ParentChildrenPage() {
  return (
    <DashboardLayout role="parent">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">My Children</h1>
          <p className="text-muted-foreground">
            Monitor your children's academic progress and performance.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {mockStudents.map((student) => {
            const studentGrades = mockGrades.filter(grade => grade.studentId === student.id);
            const averageGrade = studentGrades.length > 0
              ? Math.round((studentGrades.reduce((acc, grade) => acc + (grade.score / grade.maxScore) * 100, 0) / studentGrades.length) * 100) / 100
              : 'N/A';
            
            const studentAttendance = mockAttendance.filter(a => a.studentId === student.id);
            const attendanceRate = studentAttendance.length > 0
              ? Math.round((studentAttendance.filter(a => a.status === 'present').length / studentAttendance.length) * 100)
              : 'N/A';
            
            return (
              <Card key={student.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{student.firstName} {student.lastName}</CardTitle>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {student.grade}
                    </span>
                  </div>
                  <CardDescription>
                    {student.class} • {student.admissionNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4 text-center">
                      <p className="text-sm text-muted-foreground">Average Grade</p>
                      <p className="text-2xl font-bold">
                        {typeof averageGrade === 'number' ? `${averageGrade}%` : averageGrade}
                      </p>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <p className="text-sm text-muted-foreground">Attendance</p>
                      <p className="text-2xl font-bold">
                        {typeof attendanceRate === 'number' ? `${attendanceRate}%` : attendanceRate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h4 className="text-sm font-medium">Recent Activity</h4>
                    
                    {studentGrades.slice(0, 2).map(grade => (
                      <div key={grade.id} className="flex items-center justify-between rounded-md border p-3">
                        <div>
                          <p className="text-sm font-medium">
                            {mockStudents.find(s => s.id === grade.studentId)?.firstName} received a grade
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Score: {grade.score}/{grade.maxScore} • {new Date(grade.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          (grade.score / grade.maxScore) >= 0.8 
                            ? 'bg-success/20 text-success' 
                            : (grade.score / grade.maxScore) >= 0.6 
                              ? 'bg-warning/20 text-warning' 
                              : 'bg-destructive/20 text-destructive'
                        }`}>
                          {Math.round((grade.score / grade.maxScore) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 px-6 py-4">
                  <div className="flex space-x-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">Grades</Button>
                    <Button variant="outline" size="sm" className="flex-1">Attendance</Button>
                    <Button size="sm" className="flex-1">View Profile</Button>
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
