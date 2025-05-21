import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockGrades, mockAttendance, mockClasses } from '@/data/mock';

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your student dashboard. Here you can view your grades and attendance.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <h3 className="text-lg font-semibold">Total Classes</h3>
            <p className="text-3xl font-bold">{mockClasses.length}</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
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
                      {mockClasses.find((c) => c.subjects.includes(grade.subjectId))?.name}
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
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Recent Attendance</h3>
            <div className="mt-4 space-y-4">
              {mockAttendance.map((attendance) => (
                <div
                  key={attendance.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {mockClasses.find((c) => c.id === attendance.classId)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(attendance.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p
                    className={`text-sm ${
                      attendance.status === 'present'
                        ? 'text-green-600'
                        : attendance.status === 'late'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
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