'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockClasses, mockTeachers, mockSubjects } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

export default function AdminTimetablePage() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedDay, setSelectedDay] = useState(1); // 1 = Monday, 2 = Tuesday, etc.
  
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '8:00 AM - 8:45 AM',
    '8:50 AM - 9:35 AM',
    '9:40 AM - 10:25 AM',
    '10:30 AM - 11:15 AM',
    '11:20 AM - 12:05 PM',
    '12:05 PM - 12:50 PM', // Lunch
    '12:55 PM - 1:40 PM',
    '1:45 PM - 2:30 PM',
    '2:35 PM - 3:20 PM'
  ];
  
  const timetableData = [
    { classId: '1', day: 1, slot: 0, subjectId: '1', teacherId: '1' },
    { classId: '1', day: 1, slot: 1, subjectId: '2', teacherId: '2' },
    { classId: '1', day: 1, slot: 2, subjectId: '3', teacherId: '3' },
    { classId: '1', day: 1, slot: 3, subjectId: '4', teacherId: '4' },
    { classId: '1', day: 1, slot: 4, subjectId: '5', teacherId: '5' },
    { classId: '1', day: 1, slot: 6, subjectId: '1', teacherId: '1' },
    { classId: '1', day: 1, slot: 7, subjectId: '2', teacherId: '2' },
    { classId: '1', day: 2, slot: 0, subjectId: '3', teacherId: '3' },
    { classId: '1', day: 2, slot: 1, subjectId: '4', teacherId: '4' },
    { classId: '1', day: 2, slot: 2, subjectId: '5', teacherId: '5' },
    { classId: '1', day: 2, slot: 3, subjectId: '1', teacherId: '1' },
    { classId: '1', day: 2, slot: 4, subjectId: '2', teacherId: '2' },
    { classId: '1', day: 2, slot: 6, subjectId: '3', teacherId: '3' },
    { classId: '1', day: 2, slot: 7, subjectId: '4', teacherId: '4' },
    { classId: '2', day: 1, slot: 0, subjectId: '5', teacherId: '5' },
    { classId: '2', day: 1, slot: 1, subjectId: '1', teacherId: '1' },
    { classId: '2', day: 1, slot: 2, subjectId: '2', teacherId: '2' },
    { classId: '2', day: 1, slot: 3, subjectId: '3', teacherId: '3' },
    { classId: '2', day: 1, slot: 4, subjectId: '4', teacherId: '4' },
    { classId: '2', day: 1, slot: 6, subjectId: '5', teacherId: '5' },
    { classId: '2', day: 1, slot: 7, subjectId: '1', teacherId: '1' },
  ];
  
  const filteredTimetable = timetableData.filter(item => 
    (selectedClass === 'all' || item.classId === selectedClass) &&
    item.day === selectedDay
  );
  
  const getTimetableEntry = (classId: string, slot: number) => {
    return filteredTimetable.find(item => 
      item.classId === classId && item.slot === slot
    );
  };
  
  const getClassTimetable = (classId: string) => {
    return timeSlots.map((timeSlot, index) => {
      const entry = getTimetableEntry(classId, index);
      return {
        timeSlot,
        index,
        entry
      };
    });
  };
  
  const classesToDisplay = selectedClass === 'all' 
    ? mockClasses 
    : mockClasses.filter(c => c.id === selectedClass);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Timetable Management</h1>
            <p className="text-muted-foreground">
              Create and manage class schedules and timetables.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Generate Timetable
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
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
          
          <div className="flex space-x-1 rounded-md bg-muted p-1 w-full md:w-auto">
            {weekDays.map((day, index) => (
              <Button
                key={index}
                variant={selectedDay === index + 1 ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedDay(index + 1)}
                className="flex-1"
              >
                {day.substring(0, 3)}
              </Button>
            ))}
          </div>
          
          <div className="flex-1 md:flex-none flex justify-end gap-2">
            <Button variant="outline">Print</Button>
            <Button variant="outline">Export</Button>
          </div>
        </div>
        
        {classesToDisplay.map(class_ => (
          <Card key={class_.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex justify-between items-center">
                <CardTitle>{class_.name} - {class_.grade}</CardTitle>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              <CardDescription>
                {weekDays[selectedDay - 1]} Schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium w-1/6">Time</th>
                      <th className="px-4 py-3 text-left font-medium w-1/6">Subject</th>
                      <th className="px-4 py-3 text-left font-medium w-1/6">Teacher</th>
                      <th className="px-4 py-3 text-left font-medium w-2/6">Notes</th>
                      <th className="px-4 py-3 text-left font-medium w-1/6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getClassTimetable(class_.id).map(({ timeSlot, index, entry }) => {
                      const subject = entry ? mockSubjects.find(s => s.id === entry.subjectId) : null;
                      const teacher = entry ? mockTeachers.find(t => t.id === entry.teacherId) : null;
                      
                      if (index === 5) {
                        return (
                          <tr key={index} className="border-b bg-muted/20">
                            <td className="px-4 py-3 font-medium">{timeSlot}</td>
                            <td className="px-4 py-3 font-medium" colSpan={4}>Lunch Break</td>
                          </tr>
                        );
                      }
                      
                      return (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 font-medium">{timeSlot}</td>
                          <td className="px-4 py-3">
                            {subject ? (
                              <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                                {subject.name}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">Free Period</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {teacher ? `${teacher.firstName} ${teacher.lastName}` : '-'}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {entry ? 'Regular class' : 'No class scheduled'}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              {entry ? (
                                <>
                                  <Button variant="outline" size="sm">Edit</Button>
                                  <Button variant="outline" size="sm" className="text-destructive">Remove</Button>
                                </>
                              ) : (
                                <Button variant="outline" size="sm">Add Class</Button>
                              )}
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
        ))}
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Availability</CardTitle>
              <CardDescription>
                Teachers available for scheduling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeachers.slice(0, 5).map(teacher => (
                  <div key={teacher.id} className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="text-sm font-medium">
                        {teacher.firstName} {teacher.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {teacher.specialization} • {teacher.subjects.join(', ')}
                      </p>
                    </div>
                    <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">
                      Available
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Scheduling Conflicts</CardTitle>
              <CardDescription>
                Potential issues with the current timetable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-md border p-3 border-warning/50">
                  <div>
                    <p className="text-sm font-medium">
                      Teacher Double Booking
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Mr. Johnson is scheduled for two classes at 8:00 AM on Monday
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-warning">Resolve</Button>
                </div>
                
                <div className="flex items-center justify-between rounded-md border p-3 border-warning/50">
                  <div>
                    <p className="text-sm font-medium">
                      Room Conflict
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Room 101 has two classes scheduled at 10:30 AM on Wednesday
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-warning">Resolve</Button>
                </div>
                
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <p className="text-sm font-medium">
                      Incomplete Schedule
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Class 3B is missing Mathematics on Thursday
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Fix</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
