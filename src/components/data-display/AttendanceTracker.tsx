'use client';

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWeekend } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface StudentAttendance {
  id: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  records: AttendanceRecord[];
}

export interface AttendanceTrackerProps {
  students: StudentAttendance[];
  title?: string;
  description?: string;
  currentMonth?: Date;
  onStatusChange?: (studentId: string, date: Date, status: 'present' | 'absent' | 'late' | 'excused') => void;
  onAddNote?: (studentId: string, date: Date, note: string) => void;
  readOnly?: boolean;
}

export function AttendanceTracker({
  students,
  title = 'Attendance Tracker',
  description,
  currentMonth = new Date(),
  onStatusChange,
  onAddNote,
  readOnly = false,
}: AttendanceTrackerProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(currentMonth);
  const [viewMode, setViewMode] = useState<'calendar' | 'summary'>('calendar');
  
  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  const daysOfMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const getAttendanceStatus = (studentId: string, date: Date) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return null;
    
    const record = student.records.find(r => isSameDay(new Date(r.date), date));
    return record ? record.status : null;
  };
  
  const getStatusColor = (status: 'present' | 'absent' | 'late' | 'excused' | null) => {
    switch (status) {
      case 'present':
        return 'bg-success/10 text-success';
      case 'absent':
        return 'bg-destructive/10 text-destructive';
      case 'late':
        return 'bg-warning/10 text-warning';
      case 'excused':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  const getStatusIcon = (status: 'present' | 'absent' | 'late' | 'excused' | null) => {
    switch (status) {
      case 'present':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'absent':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'late':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'excused':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  const calculateStudentStats = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return { present: 0, absent: 0, late: 0, excused: 0, total: 0, percentage: 0 };
    
    const records = student.records.filter(r => {
      const recordDate = new Date(r.date);
      return recordDate >= monthStart && recordDate <= monthEnd && !isWeekend(recordDate);
    });
    
    const present = records.filter(r => r.status === 'present').length;
    const absent = records.filter(r => r.status === 'absent').length;
    const late = records.filter(r => r.status === 'late').length;
    const excused = records.filter(r => r.status === 'excused').length;
    
    const weekdays = daysOfMonth.filter(day => !isWeekend(day)).length;
    
    return {
      present,
      absent,
      late,
      excused,
      total: weekdays,
      percentage: Math.round((present / weekdays) * 100),
    };
  };
  
  const handleStatusChange = (studentId: string, date: Date) => {
    if (readOnly || !onStatusChange) return;
    
    const currentStatus = getAttendanceStatus(studentId, date);
    let newStatus: 'present' | 'absent' | 'late' | 'excused';
    
    switch (currentStatus) {
      case 'present':
        newStatus = 'late';
        break;
      case 'late':
        newStatus = 'absent';
        break;
      case 'absent':
        newStatus = 'excused';
        break;
      case 'excused':
        newStatus = 'present';
        break;
      default:
        newStatus = 'present';
    }
    
    onStatusChange(studentId, date, newStatus);
  };
  
  const renderCalendarView = () => {
    return (
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-[800px] px-4 sm:px-0">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 sm:p-3 border bg-muted/50 text-left sticky left-0 z-10 bg-background">
                  <span className="font-medium">Student</span>
                </th>
                {daysOfMonth.map((day, index) => (
                  <th 
                    key={index} 
                    className={`p-1 sm:p-2 border text-center ${isWeekend(day) ? 'bg-muted/20' : 'bg-muted/50'}`}
                  >
                    <div className="font-medium">{format(day, 'd')}</div>
                    <div className="text-xs text-muted-foreground hidden sm:block">{format(day, 'EEE')}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="p-2 sm:p-3 border sticky left-0 z-10 bg-background">
                    <div className="font-medium truncate max-w-[150px]">{student.firstName} {student.lastName}</div>
                    <div className="text-xs text-muted-foreground">{student.admissionNumber}</div>
                  </td>
                  {daysOfMonth.map((day, dayIndex) => {
                    const status = getAttendanceStatus(student.id, day);
                    const statusColor = getStatusColor(status);
                    const isWeekendDay = isWeekend(day);
                    
                    return (
                      <td 
                        key={dayIndex} 
                        className={`p-1 sm:p-2 border text-center ${isWeekendDay ? 'bg-muted/10' : ''}`}
                        onClick={() => !isWeekendDay && handleStatusChange(student.id, day)}
                        style={{ cursor: readOnly || isWeekendDay ? 'default' : 'pointer' }}
                      >
                        {!isWeekendDay && (
                          <div className={`inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full ${statusColor}`}>
                            {getStatusIcon(status)}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  const renderSummaryView = () => {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {students.reduce((sum, student) => sum + calculateStudentStats(student.id).present, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total present days across all students
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {students.reduce((sum, student) => sum + calculateStudentStats(student.id).absent, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total absent days across all students
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Late</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {students.reduce((sum, student) => sum + calculateStudentStats(student.id).late, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total late days across all students
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Excused</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {students.reduce((sum, student) => sum + calculateStudentStats(student.id).excused, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total excused days across all students
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance Summary</CardTitle>
            <CardDescription>
              Attendance statistics for {format(selectedMonth, 'MMMM yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Student</th>
                    <th className="px-4 py-3 text-left font-medium">Present</th>
                    <th className="px-4 py-3 text-left font-medium">Absent</th>
                    <th className="px-4 py-3 text-left font-medium">Late</th>
                    <th className="px-4 py-3 text-left font-medium">Excused</th>
                    <th className="px-4 py-3 text-left font-medium">Attendance Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const stats = calculateStudentStats(student.id);
                    
                    return (
                      <tr key={student.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="font-medium">{student.firstName} {student.lastName}</div>
                          <div className="text-xs text-muted-foreground">{student.admissionNumber}</div>
                        </td>
                        <td className="px-4 py-3 text-success">
                          {stats.present} days
                        </td>
                        <td className="px-4 py-3 text-destructive">
                          {stats.absent} days
                        </td>
                        <td className="px-4 py-3 text-warning">
                          {stats.late} days
                        </td>
                        <td className="px-4 py-3 text-primary">
                          {stats.excused} days
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                              <div 
                                className={`h-full ${stats.percentage >= 90 ? 'bg-success' : stats.percentage >= 75 ? 'bg-primary' : stats.percentage >= 60 ? 'bg-warning' : 'bg-destructive'}`} 
                                style={{ width: `${stats.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{stats.percentage}%</span>
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
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            {title && <CardTitle className="text-xl">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              size="sm"
              className="flex-1 sm:flex-none h-9"
              onClick={() => setViewMode('calendar')}
            >
              Calendar
            </Button>
            <Button
              variant={viewMode === 'summary' ? 'default' : 'outline'}
              size="sm"
              className="flex-1 sm:flex-none h-9"
              onClick={() => setViewMode('summary')}
            >
              Summary
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto h-9"
            onClick={() => {
              const newDate = new Date(selectedMonth);
              newDate.setMonth(newDate.getMonth() - 1);
              setSelectedMonth(newDate);
            }}
          >
            <span className="hidden sm:inline">Previous Month</span>
            <span className="sm:hidden">Prev</span>
          </Button>
          <div className="text-lg font-medium">
            {format(selectedMonth, 'MMMM yyyy')}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto h-9"
            onClick={() => {
              const newDate = new Date(selectedMonth);
              newDate.setMonth(newDate.getMonth() + 1);
              setSelectedMonth(newDate);
            }}
          >
            <span className="hidden sm:inline">Next Month</span>
            <span className="sm:hidden">Next</span>
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-success/10"></div>
            <span className="text-xs text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-destructive/10"></div>
            <span className="text-xs text-muted-foreground">Absent</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-warning/10"></div>
            <span className="text-xs text-muted-foreground">Late</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-primary/10"></div>
            <span className="text-xs text-muted-foreground">Excused</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'calendar' ? renderCalendarView() : renderSummaryView()}
      </CardContent>
    </Card>
  );
}
