'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockGrades, mockStudents, mockClasses, mockSubjects } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';

export default function TeacherGradesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  
  const filteredGrades = mockGrades.filter(grade => {
    const student = mockStudents.find(s => s.id === grade.studentId);
    const subject = mockSubjects.find(s => s.id === grade.subjectId);
    
    const matchesSearch = student && 
      (student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesClass = selectedClass === 'all' || 
      (student && mockClasses.find(c => c.id === selectedClass)?.students.includes(student.id));
    
    const matchesSubject = selectedSubject === 'all' || grade.subjectId === selectedSubject;
    
    return matchesSearch && matchesClass && matchesSubject;
  });
  
  const averageGrade = filteredGrades.length > 0
    ? Math.round((filteredGrades.reduce((acc, grade) => acc + (grade.score / grade.maxScore), 0) / filteredGrades.length) * 100)
    : 0;
  
  const gradeDistribution = {
    a: filteredGrades.filter(g => (g.score / g.maxScore) >= 0.8).length,
    b: filteredGrades.filter(g => (g.score / g.maxScore) >= 0.7 && (g.score / g.maxScore) < 0.8).length,
    c: filteredGrades.filter(g => (g.score / g.maxScore) >= 0.6 && (g.score / g.maxScore) < 0.7).length,
    d: filteredGrades.filter(g => (g.score / g.maxScore) >= 0.5 && (g.score / g.maxScore) < 0.6).length,
    f: filteredGrades.filter(g => (g.score / g.maxScore) < 0.5).length,
  };
  
  const getGradeInfo = (percentage: number) => {
    if (percentage >= 90) return { letter: 'A+', color: 'text-success' };
    if (percentage >= 80) return { letter: 'A', color: 'text-success' };
    if (percentage >= 75) return { letter: 'B+', color: 'text-primary' };
    if (percentage >= 70) return { letter: 'B', color: 'text-primary' };
    if (percentage >= 65) return { letter: 'C+', color: 'text-primary' };
    if (percentage >= 60) return { letter: 'C', color: 'text-warning' };
    if (percentage >= 55) return { letter: 'D+', color: 'text-warning' };
    if (percentage >= 50) return { letter: 'D', color: 'text-warning' };
    return { letter: 'F', color: 'text-destructive' };
  };

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Grades Management</h1>
            <p className="text-muted-foreground">
              Record and manage student grades and assessments.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Add New Grade
          </Button>
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
          
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="all">All Subjects</option>
            {mockSubjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold">{averageGrade}%</div>
                <div className={`text-lg font-semibold ${getGradeInfo(averageGrade).color}`}>
                  {getGradeInfo(averageGrade).letter}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Based on {filteredGrades.length} grades
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-success/5 to-success/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">A Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{gradeDistribution.a}</div>
              <p className="text-xs text-muted-foreground">
                {filteredGrades.length > 0 ? Math.round((gradeDistribution.a / filteredGrades.length) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">B Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{gradeDistribution.b}</div>
              <p className="text-xs text-muted-foreground">
                {filteredGrades.length > 0 ? Math.round((gradeDistribution.b / filteredGrades.length) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-warning/5 to-warning/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">C &amp; D Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{gradeDistribution.c + gradeDistribution.d}</div>
              <p className="text-xs text-muted-foreground">
                {filteredGrades.length > 0 ? Math.round(((gradeDistribution.c + gradeDistribution.d) / filteredGrades.length) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">F Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{gradeDistribution.f}</div>
              <p className="text-xs text-muted-foreground">
                {filteredGrades.length > 0 ? Math.round((gradeDistribution.f / filteredGrades.length) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>Grade Records</CardTitle>
            <CardDescription>
              Manage and edit student grades
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Student</th>
                    <th className="px-4 py-3 text-left font-medium">Subject</th>
                    <th className="px-4 py-3 text-left font-medium">Term</th>
                    <th className="px-4 py-3 text-left font-medium">Score</th>
                    <th className="px-4 py-3 text-left font-medium">Grade</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrades.map((grade) => {
                    const student = mockStudents.find(s => s.id === grade.studentId);
                    const subject = mockSubjects.find(s => s.id === grade.subjectId);
                    const percentage = Math.round((grade.score / grade.maxScore) * 100);
                    const gradeInfo = getGradeInfo(percentage);
                    
                    return (
                      <tr key={grade.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="font-medium">
                            {student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {student?.admissionNumber || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-3">{subject?.name || 'Unknown Subject'}</td>
                        <td className="px-4 py-3">Term {grade.term}</td>
                        <td className="px-4 py-3">
                          {grade.score}/{grade.maxScore} ({percentage}%)
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-medium ${gradeInfo.color}`}>
                            {gradeInfo.letter}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(grade.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  
                  {filteredGrades.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        No grades found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
              <CardDescription>
                Recently added grades and assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGrades.slice(0, 5).map((grade) => {
                  const student = mockStudents.find(s => s.id === grade.studentId);
                  const subject = mockSubjects.find(s => s.id === grade.subjectId);
                  const percentage = Math.round((grade.score / grade.maxScore) * 100);
                  
                  return (
                    <div key={grade.id} className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <p className="text-sm font-medium">
                          {student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {subject?.name || 'Unknown Subject'} • Term {grade.term}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        percentage >= 80 
                          ? 'bg-success/20 text-success' 
                          : percentage >= 60 
                            ? 'bg-primary/20 text-primary' 
                            : percentage >= 50 
                              ? 'bg-warning/20 text-warning' 
                              : 'bg-destructive/20 text-destructive'
                      }`}>
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
                
                {filteredGrades.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    No recent assessments found.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Students Requiring Attention</CardTitle>
              <CardDescription>
                Students with low performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  const studentGrades = filteredGrades.reduce((acc, grade) => {
                    if (!acc[grade.studentId]) {
                      acc[grade.studentId] = [];
                    }
                    acc[grade.studentId].push(grade);
                    return acc;
                  }, {} as Record<string, typeof mockGrades>);
                  
                  const studentAverages = Object.entries(studentGrades).map(([studentId, grades]) => {
                    const average = grades.reduce((acc, grade) => acc + (grade.score / grade.maxScore), 0) / grades.length;
                    return {
                      studentId,
                      average: Math.round(average * 100)
                    };
                  });
                  
                  const lowPerformers = studentAverages
                    .filter(s => s.average < 60)
                    .sort((a, b) => a.average - b.average)
                    .slice(0, 5);
                  
                  return lowPerformers.map(({ studentId, average }) => {
                    const student = mockStudents.find(s => s.id === studentId);
                    
                    return (
                      <div key={studentId} className="flex items-center justify-between rounded-md border p-3">
                        <div>
                          <p className="text-sm font-medium">
                            {student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {student?.class || 'Unknown Class'} • {student?.admissionNumber || 'N/A'}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          average >= 50 
                            ? 'bg-warning/20 text-warning' 
                            : 'bg-destructive/20 text-destructive'
                        }`}>
                          {average}% avg
                        </span>
                      </div>
                    );
                  });
                })()}
                
                {filteredGrades.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    No student data available.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
