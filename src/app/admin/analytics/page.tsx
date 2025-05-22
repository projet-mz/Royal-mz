'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { PerformanceChart } from '../../../components/data-display/PerformanceChart';
import { mockGrades, mockStudents, mockSubjects, mockClasses, mockAttendance, mockFees } from '../../../data/mock';

export default function AdminAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'term' | 'year'>('term');
  
  const gradeDistribution = [
    { name: 'A', value: mockGrades.filter(g => (g.score / g.maxScore) >= 0.8).length },
    { name: 'B', value: mockGrades.filter(g => (g.score / g.maxScore) >= 0.7 && (g.score / g.maxScore) < 0.8).length },
    { name: 'C', value: mockGrades.filter(g => (g.score / g.maxScore) >= 0.6 && (g.score / g.maxScore) < 0.7).length },
    { name: 'D', value: mockGrades.filter(g => (g.score / g.maxScore) >= 0.5 && (g.score / g.maxScore) < 0.6).length },
    { name: 'F', value: mockGrades.filter(g => (g.score / g.maxScore) < 0.5).length },
  ];
  
  const attendanceData = [
    { name: 'Present', value: mockAttendance.filter(a => a.status === 'present').length },
    { name: 'Absent', value: mockAttendance.filter(a => a.status === 'absent').length },
    { name: 'Late', value: mockAttendance.filter(a => a.status === 'late').length },
  ];
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  
  const feeCollectionByMonth = monthNames.map(month => {
    const monthIndex = monthNames.indexOf(month);
    const feesInMonth = mockFees.filter((fee) => fee.dueDate && fee.dueDate.getMonth() === monthIndex && fee.dueDate.getFullYear() === currentYear);
    const amountCollected = feesInMonth.reduce((sum: number, fee) => sum + fee.amount, 0);
    return { name: month, amount: amountCollected };
  });
  
  const subjectPerformance = mockSubjects.map(subject => {
    const subjectGrades = mockGrades.filter(g => g.subjectId === subject.id);
    const averageScore = subjectGrades.length > 0
      ? Math.round((subjectGrades.reduce((sum, g) => sum + (g.score / g.maxScore), 0) / subjectGrades.length) * 100)
      : 0;
    return { name: subject.name, score: averageScore };
  }).sort((a, b) => b.score - a.score);
  
  const gradeEnrollment = Array.from(new Set(mockStudents.map(s => s.grade))).map(grade => {
    const studentsInGrade = mockStudents.filter(s => s.grade === grade);
    return { name: grade, count: studentsInGrade.length };
  });
  
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive data insights and visualizations for school management.
            </p>
          </div>
          <div>
            <Tabs defaultValue={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as any)}>
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="term">Term</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>Grade distribution across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={gradeDistribution}
                variant="pie"
                nameKey="name"
                dataKey="value"
                height={300}
                colors={['#4ade80', '#22c55e', '#facc15', '#f97316', '#ef4444']}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Student attendance statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={attendanceData}
                variant="pie"
                nameKey="name"
                dataKey="value"
                height={300}
                colors={['#4ade80', '#ef4444', '#facc15']}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Fee Collection Trends</CardTitle>
              <CardDescription>Monthly fee collection for {currentYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={feeCollectionByMonth}
                variant="bar"
                xAxisKey="name"
                yAxisKey="amount"
                dataKey="amount"
                height={300}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>Average scores by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={subjectPerformance.slice(0, 10)}
                variant="bar"
                xAxisKey="name"
                yAxisKey="score"
                dataKey="score"
                height={300}
              />
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Enrollment Distribution</CardTitle>
              <CardDescription>Student enrollment by grade level</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart
                data={gradeEnrollment}
                variant="bar"
                xAxisKey="name"
                yAxisKey="count"
                dataKey="count"
                height={300}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
