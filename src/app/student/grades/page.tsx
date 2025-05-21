'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockGrades, mockSubjects } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

export default function StudentGradesPage() {
  const [selectedTerm, setSelectedTerm] = useState<number | 'all'>('all');
  
  const filteredGrades = mockGrades.filter(grade => 
    selectedTerm === 'all' || grade.term === selectedTerm
  );
  
  const overallAverage = filteredGrades.length > 0
    ? Math.round((filteredGrades.reduce((acc, grade) => acc + (grade.score / grade.maxScore), 0) / filteredGrades.length) * 100)
    : 0;
  
  const gradesBySubject = filteredGrades.reduce((acc, grade) => {
    const subject = mockSubjects.find(s => s.id === grade.subjectId);
    if (subject) {
      if (!acc[subject.name]) {
        acc[subject.name] = [];
      }
      acc[subject.name].push(grade);
    }
    return acc;
  }, {} as Record<string, typeof mockGrades>);
  
  const subjectAverages = Object.entries(gradesBySubject).map(([subject, grades]) => {
    const average = grades.reduce((acc, grade) => acc + (grade.score / grade.maxScore), 0) / grades.length;
    return {
      subject,
      average: Math.round(average * 100),
      grades
    };
  }).sort((a, b) => b.average - a.average);
  
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
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">My Grades</h1>
            <p className="text-muted-foreground">
              View your academic performance and grades.
            </p>
          </div>
          <div className="flex items-center gap-2">
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
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold">{overallAverage}%</div>
                <div className={`text-lg font-semibold ${getGradeInfo(overallAverage).color}`}>
                  {getGradeInfo(overallAverage).letter}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Based on {filteredGrades.length} grades
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-success/5 to-success/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Highest Grade</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredGrades.length > 0 ? (
                <>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-bold">
                      {Math.max(...filteredGrades.map(g => Math.round((g.score / g.maxScore) * 100)))}%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {mockSubjects.find(s => s.id === filteredGrades.reduce((prev, current) => 
                      (prev.score / prev.maxScore) > (current.score / current.maxScore) ? prev : current
                    ).subjectId)?.name || 'Unknown Subject'}
                  </p>
                </>
              ) : (
                <div className="text-3xl font-bold">N/A</div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-warning/5 to-warning/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Lowest Grade</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredGrades.length > 0 ? (
                <>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-bold">
                      {Math.min(...filteredGrades.map(g => Math.round((g.score / g.maxScore) * 100)))}%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {mockSubjects.find(s => s.id === filteredGrades.reduce((prev, current) => 
                      (prev.score / prev.maxScore) < (current.score / current.maxScore) ? prev : current
                    ).subjectId)?.name || 'Unknown Subject'}
                  </p>
                </>
              ) : (
                <div className="text-3xl font-bold">N/A</div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{Object.keys(gradesBySubject).length}</div>
              <p className="text-xs text-muted-foreground">
                {selectedTerm === 'all' ? 'Across all terms' : `In Term ${selectedTerm}`}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance by Subject</CardTitle>
            <CardDescription>
              {selectedTerm === 'all' ? 'All terms' : `Term ${selectedTerm}`}
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
                  No grades available for the selected term.
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
      </div>
    </DashboardLayout>
  );
}
