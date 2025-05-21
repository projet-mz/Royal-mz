'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockGrades, mockStudents, mockSubjects } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

export default function ParentGradesPage() {
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState<number | 'all'>('all');
  
  const filteredGrades = mockGrades.filter(grade => {
    const matchesChild = selectedChild === 'all' || grade.studentId === selectedChild;
    const matchesTerm = selectedTerm === 'all' || grade.term === selectedTerm;
    return matchesChild && matchesTerm;
  });
  
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
  
  const getChildAverage = (childId: string) => {
    const childGrades = mockGrades.filter(grade => grade.studentId === childId);
    if (childGrades.length === 0) return 0;
    
    return Math.round(
      (childGrades.reduce((acc, grade) => acc + (grade.score / grade.maxScore), 0) / childGrades.length) * 100
    );
  };
  
  const getChildSubjectAverages = (childId: string) => {
    const childGrades = mockGrades.filter(grade => grade.studentId === childId);
    
    const gradesBySubject = childGrades.reduce((acc, grade) => {
      const subject = mockSubjects.find(s => s.id === grade.subjectId);
      if (subject) {
        if (!acc[subject.name]) {
          acc[subject.name] = [];
        }
        acc[subject.name].push(grade);
      }
      return acc;
    }, {} as Record<string, typeof mockGrades>);
    
    return Object.entries(gradesBySubject).map(([subject, grades]) => {
      const average = grades.reduce((acc, grade) => acc + (grade.score / grade.maxScore), 0) / grades.length;
      return {
        subject,
        average: Math.round(average * 100),
        grades
      };
    }).sort((a, b) => b.average - a.average);
  };

  return (
    <DashboardLayout role="parent">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Academic Performance</h1>
            <p className="text-muted-foreground">
              Monitor your children's grades and academic progress.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">All Children</option>
              {mockStudents.map(student => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>
            
            <select
              value={selectedTerm.toString()}
              onChange={(e) => setSelectedTerm(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">All Terms</option>
              <option value="1">Term 1</option>
              <option value="2">Term 2</option>
              <option value="3">Term 3</option>
            </select>
            
            <Button variant="outline">Print Report</Button>
          </div>
        </div>
        
        {selectedChild === 'all' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockStudents.map(student => {
              const average = getChildAverage(student.id);
              const gradeInfo = getGradeInfo(average);
              
              return (
                <Card key={student.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 pb-4">
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
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Overall Average</h4>
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold">{average}%</div>
                          <div className={`text-lg font-semibold ${gradeInfo.color}`}>
                            {gradeInfo.letter}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Performance</h4>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div 
                            className={`h-full ${
                              average >= 80 ? 'bg-success' : 
                              average >= 60 ? 'bg-primary' : 
                              average >= 50 ? 'bg-warning' : 
                              'bg-destructive'
                            }`} 
                            style={{ width: `${average}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setSelectedChild(student.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <>
            {/* Selected child details */}
            {(() => {
              const student = mockStudents.find(s => s.id === selectedChild);
              if (!student) return null;
              
              const average = getChildAverage(student.id);
              const gradeInfo = getGradeInfo(average);
              const subjectAverages = getChildSubjectAverages(student.id);
              
              return (
                <>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-end gap-2">
                          <div className="text-3xl font-bold">{average}%</div>
                          <div className={`text-lg font-semibold ${gradeInfo.color}`}>
                            {gradeInfo.letter}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {student.firstName}'s overall performance
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-success/5 to-success/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Best Subject</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {subjectAverages.length > 0 ? (
                          <>
                            <div className="text-2xl font-bold">{subjectAverages[0].subject}</div>
                            <p className="text-xs text-muted-foreground">
                              {subjectAverages[0].average}% average
                            </p>
                          </>
                        ) : (
                          <div className="text-2xl font-bold">N/A</div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-warning/5 to-warning/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Needs Improvement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {subjectAverages.length > 0 ? (
                          <>
                            <div className="text-2xl font-bold">
                              {subjectAverages[subjectAverages.length - 1].subject}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {subjectAverages[subjectAverages.length - 1].average}% average
                            </p>
                          </>
                        ) : (
                          <div className="text-2xl font-bold">N/A</div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">3rd</div>
                        <p className="text-xs text-muted-foreground">
                          Out of 25 students
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance by Subject</CardTitle>
                      <CardDescription>
                        {student.firstName}'s academic performance across subjects
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {subjectAverages.map(({ subject, average, grades }) => {
                          const gradeInfo = getGradeInfo(average);
                          
                          return (
                            <div key={subject} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{subject}</div>
                                <div className="flex items-center gap-2">
                                  <span className={`font-semibold ${gradeInfo.color}`}>{gradeInfo.letter}</span>
                                  <span className="font-semibold">{average}%</span>
                                </div>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    average >= 80 ? 'bg-success' : 
                                    average >= 60 ? 'bg-primary' : 
                                    average >= 50 ? 'bg-warning' : 
                                    'bg-destructive'
                                  }`} 
                                  style={{ width: `${average}%` }}
                                />
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Based on {grades.length} assessment{grades.length !== 1 ? 's' : ''}
                              </div>
                            </div>
                          );
                        })}
                        
                        {subjectAverages.length === 0 && (
                          <div className="py-8 text-center text-muted-foreground">
                            No grades available for {student.firstName}.
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="bg-muted/50">
                      <CardTitle>Grade Details</CardTitle>
                      <CardDescription>
                        All assessments and their scores
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="px-4 py-3 text-left font-medium">Subject</th>
                              <th className="px-4 py-3 text-left font-medium">Term</th>
                              <th className="px-4 py-3 text-left font-medium">Score</th>
                              <th className="px-4 py-3 text-left font-medium">Grade</th>
                              <th className="px-4 py-3 text-left font-medium">Date</th>
                              <th className="px-4 py-3 text-left font-medium">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredGrades.map((grade) => {
                              const subject = mockSubjects.find(s => s.id === grade.subjectId);
                              const percentage = Math.round((grade.score / grade.maxScore) * 100);
                              const gradeInfo = getGradeInfo(percentage);
                              
                              return (
                                <tr key={grade.id} className="border-b hover:bg-muted/50">
                                  <td className="px-4 py-3 font-medium">
                                    {subject?.name || 'Unknown Subject'}
                                  </td>
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
                                  <td className="px-4 py-3 max-w-xs truncate">
                                    {grade.remarks}
                                  </td>
                                </tr>
                              );
                            })}
                            
                            {filteredGrades.length === 0 && (
                              <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                  No grades available for the selected term.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </>
              );
            })()}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
