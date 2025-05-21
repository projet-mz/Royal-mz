'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../../components/ui/card';

export default function ParentFeesPage() {
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState('current');
  
  const mockChildren = [
    {
      id: '1',
      name: 'Emma Johnson',
      grade: 'Primary 3',
      admissionNumber: 'P3-2024-001',
      image: '/avatars/emma.jpg'
    },
    {
      id: '2',
      name: 'Daniel Johnson',
      grade: 'Primary 1',
      admissionNumber: 'P1-2024-045',
      image: '/avatars/daniel.jpg'
    }
  ];
  
  const mockFees = [
    {
      id: '1',
      childId: '1',
      term: 'Term 2 (2023-2024)',
      isCurrent: true,
      tuitionFee: 1200,
      booksFee: 250,
      uniformFee: 150,
      transportFee: 300,
      extraCurricularFee: 200,
      totalAmount: 2100,
      amountPaid: 1500,
      balance: 600,
      dueDate: new Date('2024-04-30'),
      status: 'partial',
      payments: [
        {
          id: 'p1',
          date: new Date('2024-03-15'),
          amount: 1000,
          method: 'Bank Transfer',
          reference: 'BT-24315-001',
          status: 'confirmed'
        },
        {
          id: 'p2',
          date: new Date('2024-04-01'),
          amount: 500,
          method: 'Mobile Money',
          reference: 'MM-24401-045',
          status: 'confirmed'
        }
      ]
    },
    {
      id: '2',
      childId: '2',
      term: 'Term 2 (2023-2024)',
      isCurrent: true,
      tuitionFee: 1000,
      booksFee: 200,
      uniformFee: 150,
      transportFee: 300,
      extraCurricularFee: 150,
      totalAmount: 1800,
      amountPaid: 1800,
      balance: 0,
      dueDate: new Date('2024-04-30'),
      status: 'paid',
      payments: [
        {
          id: 'p3',
          date: new Date('2024-03-10'),
          amount: 1800,
          method: 'Bank Transfer',
          reference: 'BT-24310-002',
          status: 'confirmed'
        }
      ]
    },
    {
      id: '3',
      childId: '1',
      term: 'Term 1 (2023-2024)',
      isCurrent: false,
      tuitionFee: 1200,
      booksFee: 250,
      uniformFee: 150,
      transportFee: 300,
      extraCurricularFee: 200,
      totalAmount: 2100,
      amountPaid: 2100,
      balance: 0,
      dueDate: new Date('2023-12-15'),
      status: 'paid',
      payments: [
        {
          id: 'p4',
          date: new Date('2023-11-05'),
          amount: 1500,
          method: 'Bank Transfer',
          reference: 'BT-23105-003',
          status: 'confirmed'
        },
        {
          id: 'p5',
          date: new Date('2023-12-01'),
          amount: 600,
          method: 'Mobile Money',
          reference: 'MM-23201-046',
          status: 'confirmed'
        }
      ]
    },
    {
      id: '4',
      childId: '2',
      term: 'Term 1 (2023-2024)',
      isCurrent: false,
      tuitionFee: 1000,
      booksFee: 200,
      uniformFee: 150,
      transportFee: 300,
      extraCurricularFee: 150,
      totalAmount: 1800,
      amountPaid: 1800,
      balance: 0,
      dueDate: new Date('2023-12-15'),
      status: 'paid',
      payments: [
        {
          id: 'p6',
          date: new Date('2023-11-10'),
          amount: 1800,
          method: 'Bank Transfer',
          reference: 'BT-23110-004',
          status: 'confirmed'
        }
      ]
    }
  ];
  
  const filteredFees = mockFees.filter(fee => {
    const matchesChild = selectedChild === 'all' || fee.childId === selectedChild;
    const matchesTerm = selectedTerm === 'all' || 
                        (selectedTerm === 'current' && fee.isCurrent) || 
                        (selectedTerm === 'previous' && !fee.isCurrent);
    
    return matchesChild && matchesTerm;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-success/10 text-success';
      case 'partial':
        return 'bg-warning/10 text-warning';
      case 'unpaid':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  const totalFees = filteredFees.reduce((sum, fee) => sum + fee.totalAmount, 0);
  const totalPaid = filteredFees.reduce((sum, fee) => sum + fee.amountPaid, 0);
  const totalBalance = filteredFees.reduce((sum, fee) => sum + fee.balance, 0);
  
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Bank Transfer':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        );
      case 'Mobile Money':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'Cash':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
    }
  };

  return (
    <DashboardLayout role="parent">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">School Fees</h1>
            <p className="text-muted-foreground">
              Manage and track your children's school fees.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Make Payment
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₵{totalFees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                For {filteredFees.length} fee records
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₵{totalPaid.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((totalPaid / totalFees) * 100).toFixed(1)}% of total fees
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">₵{totalBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((totalBalance / totalFees) * 100).toFixed(1)}% of total fees
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Next Payment Due</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFees.some(fee => fee.balance > 0) ? (
                <>
                  <div className="text-2xl font-bold">
                    {new Date(Math.min(...filteredFees.filter(fee => fee.balance > 0).map(fee => fee.dueDate.getTime()))).toLocaleDateString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.ceil((new Date(Math.min(...filteredFees.filter(fee => fee.balance > 0).map(fee => fee.dueDate.getTime()))).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-success">No Pending Payments</div>
                  <p className="text-xs text-muted-foreground">
                    All fees are paid
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="all">All Children</option>
            {mockChildren.map(child => (
              <option key={child.id} value={child.id}>{child.name}</option>
            ))}
          </select>
          
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="current">Current Term</option>
            <option value="previous">Previous Terms</option>
            <option value="all">All Terms</option>
          </select>
        </div>
        
        {filteredFees.map(fee => {
          const child = mockChildren.find(c => c.id === fee.childId);
          
          return (
            <Card key={fee.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{fee.term}</CardTitle>
                    <CardDescription>
                      {child?.name || 'Unknown Child'} • {child?.grade || 'Unknown Grade'}
                    </CardDescription>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(fee.status)}`}>
                    {fee.status === 'paid' ? 'Paid' : fee.status === 'partial' ? 'Partially Paid' : 'Unpaid'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Fee Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Tuition Fee</span>
                        <span>₵{fee.tuitionFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Books &amp; Supplies</span>
                        <span>GH₵{fee.booksFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Uniform</span>
                        <span>₵{fee.uniformFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Transportation</span>
                        <span>₵{fee.transportFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Extra-curricular Activities</span>
                        <span>₵{fee.extraCurricularFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-medium pt-2 border-t">
                        <span>Total</span>
                        <span>₵{fee.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Payment Status</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Amount Paid</span>
                          <span className="text-success">₵{fee.amountPaid.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Outstanding Balance</span>
                          <span className={fee.balance > 0 ? 'text-warning' : 'text-success'}>₵{fee.balance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Due Date</span>
                          <span>{fee.dueDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-success" 
                            style={{ width: `${(fee.amountPaid / fee.totalAmount) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>{((fee.amountPaid / fee.totalAmount) * 100).toFixed(0)}% paid</span>
                          <span>₵{fee.amountPaid.toLocaleString()} of ₵{fee.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Payment History</h4>
                    {fee.payments.length > 0 ? (
                      <div className="space-y-3">
                        {fee.payments.map(payment => (
                          <div key={payment.id} className="flex items-start space-x-3 rounded-md border p-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              {getPaymentMethodIcon(payment.method)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{payment.method}</p>
                                <p className="text-sm font-medium">₵{payment.amount.toLocaleString()}</p>
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <p>{payment.date.toLocaleDateString()}</p>
                                <p>Ref: {payment.reference}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">
                        No payment records found.
                      </div>
                    )}
                    
                    {fee.balance > 0 && (
                      <div className="mt-6">
                        <Button className="w-full">Make Payment</Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/20 px-6 py-4 mt-6">
                <div className="flex justify-between items-center w-full">
                  <Button variant="outline" size="sm">Download Receipt</Button>
                  <Button variant="outline" size="sm">Payment History</Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
        
        {filteredFees.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-muted-foreground/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium">No fee records found</h3>
            <p className="mt-1 text-sm">
              Try adjusting your filters to see fee records.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
