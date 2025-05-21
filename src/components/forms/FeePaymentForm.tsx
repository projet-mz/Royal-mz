'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const feePaymentSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  feeType: z.enum(['tuition', 'examination', 'transportation', 'uniform', 'books', 'extracurricular', 'other']),
  amount: z.number().min(1, 'Amount must be at least 1'),
  paymentDate: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, {
    message: 'Please enter a valid date',
  }),
  paymentMethod: z.enum(['cash', 'bank_transfer', 'mobile_money', 'check', 'card', 'other']),
  referenceNumber: z.string().optional(),
  term: z.enum(['first', 'second', 'third']),
  academicYear: z.string().min(4, 'Academic year is required'),
  notes: z.string().optional(),
});

type FeePaymentFormValues = z.infer<typeof feePaymentSchema>;

const mockStudents = [
  { id: '1', name: 'John Doe', grade: 'Primary 1A', balance: 1200 },
  { id: '2', name: 'Jane Smith', grade: 'Primary 1A', balance: 800 },
  { id: '3', name: 'Michael Johnson', grade: 'Primary 1A', balance: 1500 },
  { id: '4', name: 'Emily Brown', grade: 'Primary 2B', balance: 1000 },
  { id: '5', name: 'David Wilson', grade: 'Primary 2B', balance: 950 },
  { id: '6', name: 'Sarah Taylor', grade: 'JHS 1A', balance: 1800 },
  { id: '7', name: 'James Anderson', grade: 'JHS 1A', balance: 1600 },
  { id: '8', name: 'Olivia Martinez', grade: 'JHS 2B', balance: 2000 },
  { id: '9', name: 'William Thompson', grade: 'JHS 2B', balance: 1750 },
];

const feeTypes = [
  { id: 'tuition', name: 'Tuition Fee', amount: 1000 },
  { id: 'examination', name: 'Examination Fee', amount: 200 },
  { id: 'transportation', name: 'Transportation Fee', amount: 300 },
  { id: 'uniform', name: 'Uniform Fee', amount: 150 },
  { id: 'books', name: 'Books and Supplies', amount: 250 },
  { id: 'extracurricular', name: 'Extracurricular Activities', amount: 100 },
  { id: 'other', name: 'Other Fees', amount: 0 },
];

export interface FeePaymentFormProps {
  initialData?: Partial<FeePaymentFormValues>;
  onSubmit: (data: FeePaymentFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function FeePaymentForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: FeePaymentFormProps) {
  const getCurrentAcademicYear = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    return `${currentYear}-${nextYear}`;
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FeePaymentFormValues>({
    resolver: zodResolver(feePaymentSchema),
    defaultValues: {
      studentId: initialData?.studentId || '',
      feeType: initialData?.feeType || 'tuition',
      amount: initialData?.amount || 0,
      paymentDate: initialData?.paymentDate || new Date().toISOString().split('T')[0],
      paymentMethod: initialData?.paymentMethod || 'cash',
      referenceNumber: initialData?.referenceNumber || '',
      term: initialData?.term || 'first',
      academicYear: initialData?.academicYear || getCurrentAcademicYear(),
      notes: initialData?.notes || '',
    },
  });
  
  const watchStudentId = watch('studentId');
  const watchFeeType = watch('feeType');
  
  const selectedStudent = mockStudents.find(student => student.id === watchStudentId);
  
  const selectedFeeType = feeTypes.find(fee => fee.id === watchFeeType);
  
  React.useEffect(() => {
    if (selectedFeeType && selectedFeeType.id !== 'other') {
      setValue('amount', selectedFeeType.amount);
    }
  }, [watchFeeType, setValue, selectedFeeType]);
  
  const handleFormSubmit = (data: FeePaymentFormValues) => {
    onSubmit(data);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
    }).format(amount);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fee Payment</CardTitle>
        <CardDescription>
          Record a fee payment for a student.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studentId">Student <span className="text-destructive">*</span></Label>
            <select
              id="studentId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('studentId')}
            >
              <option value="">Select Student</option>
              {mockStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} - {student.grade}
                </option>
              ))}
            </select>
            {errors.studentId && (
              <p className="text-xs text-destructive">{errors.studentId.message as string}</p>
            )}
          </div>
          
          {selectedStudent && (
            <div className="p-4 border rounded-md bg-muted/10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{selectedStudent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStudent.grade}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                  <p className="font-medium text-destructive">{formatCurrency(selectedStudent.balance)}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="feeType">Fee Type <span className="text-destructive">*</span></Label>
              <select
                id="feeType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('feeType')}
              >
                {feeTypes.map((fee) => (
                  <option key={fee.id} value={fee.id}>
                    {fee.name} {fee.id !== 'other' ? `(${formatCurrency(fee.amount)})` : ''}
                  </option>
                ))}
              </select>
              {errors.feeType && (
                <p className="text-xs text-destructive">{errors.feeType.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount <span className="text-destructive">*</span></Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₵</span>
                <Input
                  id="amount"
                  type="number"
                  className="pl-8"
                  {...register('amount', { valueAsNumber: true })}
                />
              </div>
              {errors.amount && (
                <p className="text-xs text-destructive">{errors.amount.message as string}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentDate">Payment Date <span className="text-destructive">*</span></Label>
              <Input
                id="paymentDate"
                type="date"
                {...register('paymentDate')}
              />
              {errors.paymentDate && (
                <p className="text-xs text-destructive">{errors.paymentDate.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method <span className="text-destructive">*</span></Label>
              <select
                id="paymentMethod"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('paymentMethod')}
              >
                <option value="cash">Cash</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="check">Check</option>
                <option value="card">Card Payment</option>
                <option value="other">Other</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-xs text-destructive">{errors.paymentMethod.message as string}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="referenceNumber">Reference Number</Label>
            <Input
              id="referenceNumber"
              placeholder="Enter reference number (optional)"
              {...register('referenceNumber')}
            />
            {errors.referenceNumber && (
              <p className="text-xs text-destructive">{errors.referenceNumber.message as string}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="term">Term <span className="text-destructive">*</span></Label>
              <select
                id="term"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('term')}
              >
                <option value="first">First Term</option>
                <option value="second">Second Term</option>
                <option value="third">Third Term</option>
              </select>
              {errors.term && (
                <p className="text-xs text-destructive">{errors.term.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="academicYear">Academic Year <span className="text-destructive">*</span></Label>
              <Input
                id="academicYear"
                placeholder="e.g. 2023-2024"
                {...register('academicYear')}
              />
              {errors.academicYear && (
                <p className="text-xs text-destructive">{errors.academicYear.message as string}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter additional notes (optional)"
              {...register('notes')}
            />
            {errors.notes && (
              <p className="text-xs text-destructive">{errors.notes.message as string}</p>
            )}
          </div>
          
          {watchStudentId && watchFeeType && (
            <div className="p-4 border rounded-md bg-primary/5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Payment Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedFeeType?.name} for {selectedStudent?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Amount to Pay</p>
                  <p className="font-medium text-primary">{formatCurrency(watch('amount'))}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isLoading}
            className="ml-auto"
          >
            {isLoading ? 'Processing...' : 'Record Payment'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
