'use client';

import React from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockClasses, mockSubjects } from '../../../data/mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

export default function StudentClassesPage() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">My Classes</h1>
          <p className="text-muted-foreground">
            View all your enrolled classes and subjects.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockClasses.map((class_) => (
            <Card key={class_.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{class_.name}</CardTitle>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {class_.grade}
                  </span>
                </div>
                <CardDescription>
                  {class_.subjects.length} Subjects
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {class_.subjects.map((subjectName, index) => {
                        const subject = mockSubjects.find(s => s.name === subjectName);
                        return (
                          <span 
                            key={index}
                            className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                          >
                            {subjectName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Schedule</h4>
                    <div className="rounded-md border p-3 bg-muted/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">
                            {class_.schedule ? new Date(0, 0, class_.schedule.weekDay + 1).toLocaleDateString('en-US', { weekday: 'long' }) : 'N/A'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {class_.schedule ? `${class_.schedule.startTime} - ${class_.schedule.endTime}` : 'No schedule available'}
                          </p>
                        </div>
                        <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded">
                          {class_.schedule?.subject || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">Materials</Button>
                    <Button variant="outline" size="sm" className="flex-1">Assignments</Button>
                    <Button size="sm" className="flex-1">View Details</Button>
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
