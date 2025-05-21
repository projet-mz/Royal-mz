'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { mockStudents } from '../../../data/mock';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';

const mockFees = [
  {
    id: '1',
    name: 'Tuition Fee',
    amount: 2500,
    dueDate: new Date('2024-05-15'),
    description: 'Term 2 tuition fee',
    category: 'Tuition'
  },
  {
    id: '2',
    name: 'Library Fee',
    amount: 500,
    dueDate: new Date('2024-05-15'),
    description: 'Annual library fee',
    category: 'Facilities'
  },
  {
    id: '3',
    name: 'Technology Fee',
    amount: 800,
    dueDate: new Date('2024-05-15'),
    description: 'Computer lab and technology resources',
    category: 'Facilities'
  },
  {
    id: '4',
    name: 'Sports Fee',
    amount: 600,
    dueDate: new Date('2024-05-15'),
    description: 'Sports equipment and activities',
    category: 'Extracurricular'
  },
  {
    id: '5',
    name: 'Examination Fee',
    amount: 1000,
    dueDate: new Date('2024-06-10'),
    description: 'Term 2 examination fee',
    category: 'Academic'
  }
];

const mockPayments = [
  {
    id: '1',
    studentId: '1',
    feeId: '1',
    amount: 2500,
    date: new Date('2024-04-10'),
    method: 'Bank Transfer',
    status: 'Completed',
    reference: 'REF123456'
  },
  {
    id: '2',
    studentId: '2',
    feeId: '1',
    amount: 2500,
    date: new Date('2024-04-12'),
    method: 'Mobile Money',
    status: 'Completed',
    reference: 'REF234567'
  },
  {
    id: '3',
    studentId: '3',
    feeId: '1',
    amount: 1500,
    date: new Date('2024-04-15'),
    method: 'Cash',
    status: 'Partial',
    reference: 'REF345678'
  },
  {
    id: '4',
    studentId: '4',
    feeId: '1',
    amount: 0,
    date: null,
    method: '',
    status: 'Pending',
    reference: ''
  },
  {
    id: '5',
    studentId: '1',
    feeId: '2',
    amount: 500,
    date: new Date('2024-04-10'),
    method: 'Bank Transfer',
    status: 'Completed',
    reference: 'REF123456'
  }
];

export default function AdminFeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredFees = mockFees.filter(fee => {
    const matchesSearch = fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || fee.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const feeCategories = [...new Set(mockFees.map(fee => fee.category))];
  
  const totalFees = mockFees.reduce((acc, fee) => acc + fee.amount, 0);
  const collectedAmount = mockPayments.reduce((acc, payment) => acc + payment.amount, 0);
  const collectionRate = Math.round((collectedAmount / totalFees) * 100);
  
  const paymentStatusCounts = {
    completed: mockPayments.filter(p => p.status === 'Completed').length,
    partial: mockPayments.filter(p => p.status === 'Partial').length,
    pending: mockPayments.filter(p => p.status === 'Pending').length
  };
  
  const getStudentPaymentStatus = (studentId) => {
    const studentPayments = mockPayments.filter(p => p.studentId === studentId);
    const totalPaid = studentPayments.reduce((acc, p) => acc + p.amount, 0);
    const totalToPay = mockFees.reduce((acc, f) => acc + f.amount, 0);
    
    if (totalPaid === 0) return { status: 'Unpaid', color: 'bg-destructive/20 text-destructive' };
    if (totalPaid < totalToPay) return { status: 'Partial', color: 'bg-warning/20 text-warning' };
    return { status: 'Paid', color: 'bg-success/20 text-success' };
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Fees Management</h1>
            <p className="text-muted-foreground">
              Manage school fees, payments, and financial records.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Generate Reports</Button>
            <Button className="bg-primary hover:bg-primary/90">Add New Fee</Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₵{totalFees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                For current academic term
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-success/5 to-success/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₵{collectedAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {collectionRate}% collection rate
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-warning/5 to-warning/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₵{(totalFees - collectedAmount).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {100 - collectionRate}% remaining
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-10 flex-1 rounded-full bg-muted overflow-hidden flex">
                  <div 
                    className="h-full bg-success" 
                    style={{ width: `${(paymentStatusCounts.completed / mockPayments.length) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-warning" 
                    style={{ width: `${(paymentStatusCounts.partial / mockPayments.length) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-destructive" 
                    style={{ width: `${(paymentStatusCounts.pending / mockPayments.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-success"></span>
                  <span>Paid</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-warning"></span>
                  <span>Partial</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-destructive"></span>
                  <span>Unpaid</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Input
              placeholder="Search fees..."
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="all">All Categories</option>
            {feeCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>Fee Structure</CardTitle>
            <CardDescription>
              Current academic term fees
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Fee Name</th>
                    <th className="px-4 py-3 text-left font-medium">Category</th>
                    <th className="px-4 py-3 text-left font-medium">Amount</th>
                    <th className="px-4 py-3 text-left font-medium">Due Date</th>
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFees.map((fee) => (
                    <tr key={fee.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium">{fee.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                          {fee.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">₵{fee.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">{fee.dueDate.toLocaleDateString()}</td>
                      <td className="px-4 py-3 max-w-xs truncate">{fee.description}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredFees.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        No fees found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>Payment Records</CardTitle>
            <CardDescription>
              Recent fee payments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Student</th>
                    <th className="px-4 py-3 text-left font-medium">Fee</th>
                    <th className="px-4 py-3 text-left font-medium">Amount</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-left font-medium">Method</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPayments.map((payment) => {
                    const student = mockStudents.find(s => s.id === payment.studentId);
                    const fee = mockFees.find(f => f.id === payment.feeId);
                    
                    return (
                      <tr key={payment.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="font-medium">
                            {student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {student?.admissionNumber || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-3">{fee?.name || 'Unknown Fee'}</td>
                        <td className="px-4 py-3">₵{payment.amount.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          {payment.date ? payment.date.toLocaleDateString() : 'Pending'}
                        </td>
                        <td className="px-4 py-3">{payment.method || 'N/A'}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            payment.status === 'Completed' 
                              ? 'bg-success/20 text-success' 
                              : payment.status === 'Partial' 
                                ? 'bg-warning/20 text-warning' 
                                : 'bg-destructive/20 text-destructive'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Receipt</Button>
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
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Payments</CardTitle>
              <CardDescription>
                Students with pending payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStudents.slice(0, 5).map(student => {
                  const paymentStatus = getStudentPaymentStatus(student.id);
                  
                  return (
                    <div key={student.id} className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <p className="text-sm font-medium">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {student.class} • {student.admissionNumber}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${paymentStatus.color}`}>
                          {paymentStatus.status}
                        </span>
                        <Button variant="outline" size="sm">Remind</Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Distribution of payment methods used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  const methodCounts = mockPayments.reduce((acc, payment) => {
                    if (payment.method) {
                      acc[payment.method] = (acc[payment.method] || 0) + 1;
                    }
                    return acc;
                  }, {});
                  
                  const totalWithMethod = Object.values(methodCounts).reduce((a, b) => (a as number) + (b as number), 0) as number;
                  
                  return Object.entries(methodCounts).map(([method, count]) => {
                    const percentage = Math.round(((count as number) / totalWithMethod) * 100);
                    
                    return (
                      <div key={method} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{method}</span>
                          <span className="text-sm">{percentage}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
