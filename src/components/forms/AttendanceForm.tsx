'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const attendanceSchema = z.object({
  classId: z.string().min(1, 'Class is required'),
  date: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, {
    message: 'Please enter a valid date',
  }),
  students: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      status: z.enum(['present', 'absent', 'late', 'excused']),
      notes: z.string().optional(),
    })
  ),
});

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

const mockClasses = [
  { id: '1', name: 'Primary 1A' },
  { id: '2', name: 'Primary 2B' },
  { id: '3', name: 'JHS 1A' },
  { id: '4', name: 'JHS 2B' },
];

const mockStudents = [
  { id: '1', name: 'John Doe', classId: '1' },
  { id: '2', name: 'Jane Smith', classId: '1' },
  { id: '3', name: 'Michael Johnson', classId: '1' },
  { id: '4', name: 'Emily Brown', classId: '2' },
  { id: '5', name: 'David Wilson', classId: '2' },
  { id: '6', name: 'Sarah Taylor', classId: '3' },
  { id: '7', name: 'James Anderson', classId: '3' },
  { id: '8', name: 'Olivia Martinez', classId: '4' },
  { id: '9', name: 'William Thompson', classId: '4' },
];

export interface AttendanceFormProps {
  initialData?: Partial<AttendanceFormValues>;
  onSubmit: (data: AttendanceFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function AttendanceForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: AttendanceFormProps) {
  const [selectedClassId, setSelectedClassId] = useState<string>(initialData?.classId || '');
  
  const getStudentsForClass = (classId: string) => {
    return mockStudents.filter(student => student.classId === classId);
  };
  
  const getStatusColor = (status: 'present' | 'absent' | 'late' | 'excused') => {
    switch (status) {
      case 'present':
        return 'bg-success/10 text-success';
      case 'absent':
        return 'bg-destructive/10 text-destructive';
      case 'late':
        return 'bg-warning/10 text-warning';
      case 'excused':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      classId: initialData?.classId || '',
      date: initialData?.date || new Date().toISOString().split('T')[0],
      students: initialData?.students || [],
    },
  });
  
  const watchClassId = watch('classId');
  const watchDate = watch('date');
  
  React.useEffect(() => {
    if (watchClassId && watchClassId !== selectedClassId) {
      setSelectedClassId(watchClassId);
      const studentsForClass = getStudentsForClass(watchClassId);
      
      const studentEntries = studentsForClass.map(student => ({
        id: student.id,
        name: student.name,
        status: 'present' as const,
        notes: '',
      }));
      
      setValue('students', studentEntries);
    }
  }, [watchClassId, selectedClassId, setValue]);
  
  const handleFormSubmit = (data: AttendanceFormValues) => {
    onSubmit(data);
  };
  
  const handleStatusChange = (index: number) => {
    const currentStatus = watch(`students.${index}.status`);
    let newStatus: 'present' | 'absent' | 'late' | 'excused';
    
    switch (currentStatus) {
      case 'present':
        newStatus = 'late';
        break;
      case 'late':
        newStatus = 'absent';
        break;
      case 'absent':
        newStatus = 'excused';
        break;
      case 'excused':
        newStatus = 'present';
        break;
      default:
        newStatus = 'present';
    }
    
    setValue(`students.${index}.status`, newStatus);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Attendance Entry</CardTitle>
        <CardDescription>
          Record attendance for students in a class.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classId">Class <span className="text-destructive">*</span></Label>
              <select
                id="classId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('classId')}
              >
                <option value="">Select Class</option>
                {mockClasses.map((class_) => (
                  <option key={class_.id} value={class_.id}>
                    {class_.name}
                  </option>
                ))}
              </select>
              {errors.classId && (
                <p className="text-xs text-destructive">{errors.classId.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date <span className="text-destructive">*</span></Label>
              <Input
                id="date"
                type="date"
                {...register('date')}
              />
              {errors.date && (
                <p className="text-xs text-destructive">{errors.date.message as string}</p>
              )}
            </div>
          </div>
          
          {watchClassId && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Student Attendance</h3>
                <div className="text-sm text-muted-foreground">
                  {watchDate ? format(new Date(watchDate), 'EEEE, MMMM d, yyyy') : 'Today'}
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-success/10"></div>
                  <span className="text-xs text-muted-foreground">Present</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-warning/10"></div>
                  <span className="text-xs text-muted-foreground">Late</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-destructive/10"></div>
                  <span className="text-xs text-muted-foreground">Absent</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-primary/10"></div>
                  <span className="text-xs text-muted-foreground">Excused</span>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Student</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watch('students')?.map((student, index) => (
                      <tr key={student.id} className="border-t">
                        <td className="px-4 py-3">
                          <input type="hidden" {...register(`students.${index}.id` as const)} />
                          <input type="hidden" {...register(`students.${index}.name` as const)} />
                          {student.name}
                        </td>
                        <td className="px-4 py-3 w-32">
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${getStatusColor(student.status)}`}
                              onClick={() => handleStatusChange(index)}
                            >
                              {student.status === 'present' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              {student.status === 'absent' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                              {student.status === 'late' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                              {student.status === 'excused' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                            </button>
                            <select
                              className="flex h-8 rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...register(`students.${index}.status` as const)}
                            >
                              <option value="present">Present</option>
                              <option value="late">Late</option>
                              <option value="absent">Absent</option>
                              <option value="excused">Excused</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            placeholder="Optional notes"
                            {...register(`students.${index}.notes` as const)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {!watchClassId && (
            <div className="p-8 text-center border rounded-md bg-muted/10">
              <p className="text-muted-foreground">Please select a class to record attendance.</p>
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
            disabled={isLoading || !watchClassId}
            className="ml-auto"
          >
            {isLoading ? 'Saving...' : 'Save Attendance'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
