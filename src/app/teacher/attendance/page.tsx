'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockAttendance, mockStudents, mockClasses } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('all');
  
  const filteredAttendance = mockAttendance.filter(attendance => {
    const student = mockStudents.find(s => s.id === attendance.studentId);
    const matchesSearch = student && 
      (student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDate = new Date(attendance.date).toISOString().split('T')[0] === selectedDate;
    const matchesClass = selectedClass === 'all' || attendance.classId === selectedClass;
    
    return matchesSearch && matchesDate && matchesClass;
  });

  const presentCount = filteredAttendance.filter(a => a.status === 'present').length;
  const absentCount = filteredAttendance.filter(a => a.status === 'absent').length;
  const lateCount = filteredAttendance.filter(a => a.status === 'late').length;
  const totalCount = filteredAttendance.length;
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Attendance</h1>
            <p className="text-muted-foreground">
              Track and manage student attendance records.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Take Attendance
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceRate}%</div>
              <p className="text-xs text-muted-foreground">
                {presentCount} present out of {totalCount} students
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-success/5 to-success/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{presentCount}</div>
              <p className="text-xs text-muted-foreground">
                {totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0}% of students
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-warning/5 to-warning/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Late</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lateCount}</div>
              <p className="text-xs text-muted-foreground">
                {totalCount > 0 ? Math.round((lateCount / totalCount) * 100) : 0}% of students
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{absentCount}</div>
              <p className="text-xs text-muted-foreground">
                {totalCount > 0 ? Math.round((absentCount / totalCount) * 100) : 0}% of students
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Input
              placeholder="Search students..."
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
          
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full md:w-auto"
            />
            
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
        </div>
        
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Student</th>
                    <th className="px-4 py-3 text-left font-medium">Class</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((attendance) => {
                    const student = mockStudents.find(s => s.id === attendance.studentId);
                    const class_ = mockClasses.find(c => c.id === attendance.classId);
                    
                    return (
                      <tr key={attendance.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="font-medium">
                            {student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {student?.admissionNumber || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-3">{class_?.name || 'Unknown Class'}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            attendance.status === 'present' 
                              ? 'bg-success/20 text-success' 
                              : attendance.status === 'late' 
                                ? 'bg-warning/20 text-warning' 
                                : 'bg-destructive/20 text-destructive'
                          }`}>
                            {attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
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
      </div>
    </DashboardLayout>
  );
}
