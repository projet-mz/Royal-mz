'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockAttendance, mockStudents, mockClasses } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';

export default function ParentAttendancePage() {
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const filteredAttendance = mockAttendance.filter(attendance => {
    const attendanceDate = new Date(attendance.date);
    const matchesChild = selectedChild === 'all' || attendance.studentId === selectedChild;
    const matchesMonth = attendanceDate.getMonth() === selectedMonth;
    const matchesYear = attendanceDate.getFullYear() === selectedYear;
    
    return matchesChild && matchesMonth && matchesYear;
  });

  const getAttendanceStats = (studentId?: string) => {
    const records = studentId 
      ? filteredAttendance.filter(a => a.studentId === studentId)
      : filteredAttendance;
    
    const presentCount = records.filter(a => a.status === 'present').length;
    const absentCount = records.filter(a => a.status === 'absent').length;
    const lateCount = records.filter(a => a.status === 'late').length;
    const totalCount = records.length;
    const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
    
    return {
      presentCount,
      absentCount,
      lateCount,
      totalCount,
      attendanceRate
    };
  };

  const stats = getAttendanceStats(selectedChild !== 'all' ? selectedChild : undefined);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <DashboardLayout role="parent">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Attendance Records</h1>
          <p className="text-muted-foreground">
            Monitor your children's attendance and punctuality.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="all">All Children</option>
            {mockStudents.map(student => (
              <option key={student.id} value={student.id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
          
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.presentCount} present out of {stats.totalCount} days
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-success/5 to-success/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.presentCount}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalCount > 0 ? Math.round((stats.presentCount / stats.totalCount) * 100) : 0}% of days
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-warning/5 to-warning/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Late</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lateCount}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalCount > 0 ? Math.round((stats.lateCount / stats.totalCount) * 100) : 0}% of days
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.absentCount}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalCount > 0 ? Math.round((stats.absentCount / stats.totalCount) * 100) : 0}% of days
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>Attendance Details</CardTitle>
            <CardDescription>
              {months[selectedMonth]} {selectedYear}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Student</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-left font-medium">Class</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
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
                        <td className="px-4 py-3">
                          {new Date(attendance.date).toLocaleDateString()}
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
                      </tr>
                    );
                  })}
                  
                  {filteredAttendance.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                        No attendance records found for the selected period.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {selectedChild !== 'all' && (
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Overview</CardTitle>
              <CardDescription>
                Attendance pattern for {
                  mockStudents.find(s => s.id === selectedChild)?.firstName || 'Selected Child'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: new Date(selectedYear, selectedMonth + 1, 0).getDate() }, (_, i) => i + 1).map(day => {
                  const date = new Date(selectedYear, selectedMonth, day);
                  const dayAttendance = mockAttendance.find(a => 
                    a.studentId === selectedChild && 
                    new Date(a.date).toDateString() === date.toDateString()
                  );
                  
                  let statusColor = 'bg-muted';
                  if (dayAttendance) {
                    statusColor = dayAttendance.status === 'present' 
                      ? 'bg-success/20' 
                      : dayAttendance.status === 'late' 
                        ? 'bg-warning/20' 
                        : 'bg-destructive/20';
                  }
                  
                  return (
                    <div 
                      key={day} 
                      className={`aspect-square rounded-md flex items-center justify-center ${statusColor} ${
                        date.getDay() === 0 || date.getDay() === 6 ? 'opacity-50' : ''
                      }`}
                    >
                      <span className="text-sm font-medium">{day}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-success/20 mr-2"></div>
                  <span className="text-sm">Present</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-warning/20 mr-2"></div>
                  <span className="text-sm">Late</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-destructive/20 mr-2"></div>
                  <span className="text-sm">Absent</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-muted mr-2"></div>
                  <span className="text-sm">No Record</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
