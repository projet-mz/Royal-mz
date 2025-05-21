'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockSubjects } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

export default function StudentTimetablePage() {
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
  
  const studentTimetable = [
    { day: 1, slot: 0, subjectId: '1', room: '101', teacherId: '1' },
    { day: 1, slot: 1, subjectId: '2', room: '102', teacherId: '2' },
    { day: 1, slot: 2, subjectId: '3', room: '103', teacherId: '3' },
    { day: 1, slot: 3, subjectId: '4', room: '104', teacherId: '4' },
    { day: 1, slot: 4, subjectId: '5', room: '105', teacherId: '5' },
    { day: 1, slot: 6, subjectId: '1', room: '101', teacherId: '1' },
    { day: 1, slot: 7, subjectId: '2', room: '102', teacherId: '2' },
    { day: 2, slot: 0, subjectId: '3', room: '103', teacherId: '3' },
    { day: 2, slot: 1, subjectId: '4', room: '104', teacherId: '4' },
    { day: 2, slot: 2, subjectId: '5', room: '105', teacherId: '5' },
    { day: 2, slot: 3, subjectId: '1', room: '101', teacherId: '1' },
    { day: 2, slot: 4, subjectId: '2', room: '102', teacherId: '2' },
    { day: 2, slot: 6, subjectId: '3', room: '103', teacherId: '3' },
    { day: 2, slot: 7, subjectId: '4', room: '104', teacherId: '4' },
    { day: 3, slot: 0, subjectId: '5', room: '105', teacherId: '5' },
    { day: 3, slot: 1, subjectId: '1', room: '101', teacherId: '1' },
    { day: 3, slot: 2, subjectId: '2', room: '102', teacherId: '2' },
    { day: 3, slot: 3, subjectId: '3', room: '103', teacherId: '3' },
    { day: 3, slot: 4, subjectId: '4', room: '104', teacherId: '4' },
    { day: 3, slot: 6, subjectId: '5', room: '105', teacherId: '5' },
    { day: 3, slot: 7, subjectId: '1', room: '101', teacherId: '1' },
    { day: 4, slot: 0, subjectId: '2', room: '102', teacherId: '2' },
    { day: 4, slot: 1, subjectId: '3', room: '103', teacherId: '3' },
    { day: 4, slot: 2, subjectId: '4', room: '104', teacherId: '4' },
    { day: 4, slot: 3, subjectId: '5', room: '105', teacherId: '5' },
    { day: 4, slot: 4, subjectId: '1', room: '101', teacherId: '1' },
    { day: 4, slot: 6, subjectId: '2', room: '102', teacherId: '2' },
    { day: 4, slot: 7, subjectId: '3', room: '103', teacherId: '3' },
    { day: 5, slot: 0, subjectId: '4', room: '104', teacherId: '4' },
    { day: 5, slot: 1, subjectId: '5', room: '105', teacherId: '5' },
    { day: 5, slot: 2, subjectId: '1', room: '101', teacherId: '1' },
    { day: 5, slot: 3, subjectId: '2', room: '102', teacherId: '2' },
    { day: 5, slot: 4, subjectId: '3', room: '103', teacherId: '3' },
  ];
  
  const filteredTimetable = studentTimetable.filter(item => item.day === selectedDay);
  
  const getTimetableEntry = (slot: number) => {
    return filteredTimetable.find(item => item.slot === slot);
  };
  
  const getDayTimetable = () => {
    return timeSlots.map((timeSlot, index) => {
      const entry = getTimetableEntry(index);
      return {
        timeSlot,
        index,
        entry
      };
    });
  };
  
  const getSubjectColor = (subjectId: string) => {
    const colors = [
      'bg-primary/10 text-primary',
      'bg-secondary/10 text-secondary-foreground',
      'bg-accent/10 text-accent-foreground',
      'bg-success/10 text-success',
      'bg-warning/10 text-warning',
      'bg-destructive/10 text-destructive',
      'bg-muted text-muted-foreground'
    ];
    
    const colorIndex = parseInt(subjectId) % colors.length;
    return colors[colorIndex];
  };
  
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const todayAdjusted = today === 0 ? 5 : today; // Map Sunday to Friday for demo purposes
  const todaysClasses = studentTimetable.filter(item => item.day === todayAdjusted);
  
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  
  const timeSlotToMinutes = (timeSlot: string) => {
    const startTime = timeSlot.split(' - ')[0];
    const [hourStr, minuteStr] = startTime.split(':');
    let hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    
    if (startTime.includes('PM') && hour < 12) {
      hour += 12;
    }
    
    return hour * 60 + minute;
  };
  
  const upcomingClasses = todaysClasses
    .filter(item => {
      const slotTime = timeSlotToMinutes(timeSlots[item.slot]);
      return slotTime > currentTimeInMinutes;
    })
    .sort((a, b) => {
      const aTime = timeSlotToMinutes(timeSlots[a.slot]);
      const bTime = timeSlotToMinutes(timeSlots[b.slot]);
      return aTime - bTime;
    })
    .slice(0, 3);

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">My Timetable</h1>
            <p className="text-muted-foreground">
              View your weekly class schedule.
            </p>
          </div>
          <Button variant="outline">Download PDF</Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="col-span-full md:col-span-1 lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Schedule</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysClasses.length > 0 ? (
                  todaysClasses
                    .sort((a, b) => a.slot - b.slot)
                    .map(item => {
                      const subject = mockSubjects.find(s => s.id === item.subjectId);
                      const timeSlot = timeSlots[item.slot];
                      const colorClass = getSubjectColor(item.subjectId);
                      
                      if (item.slot === 5) return null;
                      
                      return (
                        <div key={`${item.day}-${item.slot}`} className="flex items-center space-x-4">
                          <div className="flex-none w-24 text-sm text-muted-foreground">
                            {timeSlot.split(' - ')[0]}
                          </div>
                          <div className={`flex-1 rounded-md p-3 ${colorClass}`}>
                            <div className="font-medium">{subject?.name || 'Unknown Subject'}</div>
                            <div className="text-xs opacity-80">Room {item.room}</div>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No classes scheduled for today.
                  </div>
                )}
                
                {/* Lunch break */}
                <div className="flex items-center space-x-4">
                  <div className="flex-none w-24 text-sm text-muted-foreground">
                    {timeSlots[5].split(' - ')[0]}
                  </div>
                  <div className="flex-1 rounded-md p-3 bg-muted/50">
                    <div className="font-medium">Lunch Break</div>
                    <div className="text-xs text-muted-foreground">45 minutes</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Class</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingClasses.length > 0 ? (
                (() => {
                  const nextClass = upcomingClasses[0];
                  const subject = mockSubjects.find(s => s.id === nextClass.subjectId);
                  const timeSlot = timeSlots[nextClass.slot];
                  
                  return (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{subject?.name || 'Unknown Subject'}</div>
                      <div className="text-sm text-muted-foreground">
                        Starts at {timeSlot.split(' - ')[0]}
                      </div>
                      <div className="text-sm">Room {nextClass.room}</div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">View Materials</Button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="py-4 text-center text-muted-foreground">
                  No more classes today.
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weekDays.map((day, index) => {
                  const dayClasses = studentTimetable.filter(item => item.day === index + 1);
                  const uniqueSubjects = Array.from(new Set(dayClasses.map(item => item.subjectId)));
                  
                  return (
                    <div key={index} className="flex items-center justify-between py-1 border-b last:border-0">
                      <span className="font-medium">{day}</span>
                      <span className="text-sm text-muted-foreground">
                        {uniqueSubjects.length} subjects
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex space-x-1 rounded-md bg-muted p-1">
          {weekDays.map((day, index) => (
            <Button
              key={index}
              variant={selectedDay === index + 1 ? "default" : "ghost"}
              onClick={() => setSelectedDay(index + 1)}
              className="flex-1"
            >
              {day}
            </Button>
          ))}
        </div>
        
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>{weekDays[selectedDay - 1]} Schedule</CardTitle>
            <CardDescription>
              Your classes for {weekDays[selectedDay - 1]}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium w-1/6">Time</th>
                    <th className="px-4 py-3 text-left font-medium w-1/6">Subject</th>
                    <th className="px-4 py-3 text-left font-medium w-1/6">Room</th>
                    <th className="px-4 py-3 text-left font-medium w-2/6">Materials</th>
                    <th className="px-4 py-3 text-left font-medium w-1/6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getDayTimetable().map(({ timeSlot, index, entry }) => {
                    const subject = entry ? mockSubjects.find(s => s.id === entry.subjectId) : null;
                    
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
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${entry ? getSubjectColor(entry.subjectId) : ''}`}>
                              {subject.name}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Free Period</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {entry ? `Room ${entry.room}` : '-'}
                        </td>
                        <td className="px-4 py-3">
                          {entry ? (
                            <div className="flex space-x-2">
                              <span className="text-xs bg-muted px-2 py-1 rounded">Textbook</span>
                              <span className="text-xs bg-muted px-2 py-1 rounded">Worksheets</span>
                              <span className="text-xs bg-muted px-2 py-1 rounded">Slides</span>
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {entry && (
                            <Button variant="outline" size="sm">View</Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
