import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockStudents, mockGrades, mockAttendance, mockFees } from '@/data/mock';

export default function ParentDashboard() {
  return (
    <DashboardLayout role="parent">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your parent dashboard. Here you can monitor your children's progress.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Total Children</h3>
            <p className="text-3xl font-bold">{mockStudents.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Average Grade</h3>
            <p className="text-3xl font-bold">
              {Math.round(
                (mockGrades.reduce((acc, grade) => acc + (grade.score / grade.maxScore) * 100, 0) /
                  mockGrades.length) *
                  100
              ) / 100}
              %
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Attendance Rate</h3>
            <p className="text-3xl font-bold">
              {Math.round(
                (mockAttendance.filter((a) => a.status === 'present').length /
                  mockAttendance.length) *
                  100
              )}
              %
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Pending Fees</h3>
            <p className="text-3xl font-bold">
              {mockFees.filter((f) => f.status === 'pending').length}
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Children's Progress</h3>
            <div className="mt-4 space-y-4">
              {mockStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {student.grade} - {student.class}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {student.admissionNumber}
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