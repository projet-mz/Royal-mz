import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockStudents, mockClasses, mockGrades } from '@/data/mock';

export default function TeacherDashboard() {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your teacher dashboard. Here you can manage your classes and students.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Total Students</h3>
            <p className="text-3xl font-bold">{mockStudents.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Total Classes</h3>
            <p className="text-3xl font-bold">{mockClasses.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Grades Submitted</h3>
            <p className="text-3xl font-bold">{mockGrades.length}</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">My Classes</h3>
            <div className="mt-4 space-y-4">
              {mockClasses.map((class_) => (
                <div
                  key={class_.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{class_.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {class_.grade}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {class_.students.length} students
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Recent Grades</h3>
            <div className="mt-4 space-y-4">
              {mockGrades.map((grade) => (
                <div
                  key={grade.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {mockStudents.find((s) => s.id === grade.studentId)?.firstName}{' '}
                      {mockStudents.find((s) => s.id === grade.studentId)?.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Score: {grade.score}/{grade.maxScore}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Term {grade.term}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 