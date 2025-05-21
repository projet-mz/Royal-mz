import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockStudents, mockTeachers, mockParents, mockClasses } from '@/data/mock';

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the admin dashboard. Here you can manage all aspects of the school.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Total Students</h3>
            <p className="text-3xl font-bold">{mockStudents.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Total Teachers</h3>
            <p className="text-3xl font-bold">{mockTeachers.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Total Parents</h3>
            <p className="text-3xl font-bold">{mockParents.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Total Classes</h3>
            <p className="text-3xl font-bold">{mockClasses.length}</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Recent Students</h3>
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
            <h3 className="text-lg font-semibold">Recent Teachers</h3>
            <div className="mt-4 space-y-4">
              {mockTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {teacher.firstName} {teacher.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {teacher.specialization}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {teacher.yearsOfExperience} years
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