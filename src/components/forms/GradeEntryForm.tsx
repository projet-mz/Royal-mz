'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const gradeSchema = z.object({
  classId: z.string().min(1, 'Class is required'),
  subjectId: z.string().min(1, 'Subject is required'),
  assessmentType: z.enum(['exam', 'quiz', 'assignment', 'project', 'midterm']),
  assessmentName: z.string().min(2, 'Assessment name is required'),
  maxScore: z.number().min(1, 'Maximum score must be at least 1'),
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
      score: z.number().min(0, 'Score must be a positive number').max(z.number().optional(), 'Score cannot exceed maximum score'),
      comment: z.string().optional(),
    })
  ),
});

type GradeFormValues = z.infer<typeof gradeSchema>;

const mockClasses = [
  { id: '1', name: 'Primary 1A' },
  { id: '2', name: 'Primary 2B' },
  { id: '3', name: 'JHS 1A' },
  { id: '4', name: 'JHS 2B' },
];

const mockSubjects = [
  { id: '1', name: 'Mathematics' },
  { id: '2', name: 'English' },
  { id: '3', name: 'Science' },
  { id: '4', name: 'Social Studies' },
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

export interface GradeEntryFormProps {
  initialData?: Partial<GradeFormValues>;
  onSubmit: (data: GradeFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function GradeEntryForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: GradeEntryFormProps) {
  const [selectedClassId, setSelectedClassId] = useState<string>(initialData?.classId || '');
  
  const getStudentsForClass = (classId: string) => {
    return mockStudents.filter(student => student.classId === classId);
  };
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<GradeFormValues>({
    resolver: zodResolver(gradeSchema),
    defaultValues: {
      classId: initialData?.classId || '',
      subjectId: initialData?.subjectId || '',
      assessmentType: initialData?.assessmentType || 'exam',
      assessmentName: initialData?.assessmentName || '',
      maxScore: initialData?.maxScore || 100,
      date: initialData?.date || new Date().toISOString().split('T')[0],
      students: initialData?.students || [],
    },
  });
  
  const { fields, replace } = useFieldArray({
    control,
    name: 'students',
  });
  
  const watchClassId = watch('classId');
  const watchMaxScore = watch('maxScore');
  
  React.useEffect(() => {
    if (watchClassId && watchClassId !== selectedClassId) {
      setSelectedClassId(watchClassId);
      const studentsForClass = getStudentsForClass(watchClassId);
      
      const studentEntries = studentsForClass.map(student => ({
        id: student.id,
        name: student.name,
        score: 0,
        comment: '',
      }));
      
      replace(studentEntries);
    }
  }, [watchClassId, selectedClassId, replace]);
  
  const handleFormSubmit = (data: GradeFormValues) => {
    onSubmit(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Grade Entry</CardTitle>
        <CardDescription>
          Enter grades for students in a class.
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
              <Label htmlFor="subjectId">Subject <span className="text-destructive">*</span></Label>
              <select
                id="subjectId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('subjectId')}
              >
                <option value="">Select Subject</option>
                {mockSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              {errors.subjectId && (
                <p className="text-xs text-destructive">{errors.subjectId.message as string}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assessmentType">Assessment Type <span className="text-destructive">*</span></Label>
              <select
                id="assessmentType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('assessmentType')}
              >
                <option value="exam">Exam</option>
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
                <option value="project">Project</option>
                <option value="midterm">Midterm</option>
              </select>
              {errors.assessmentType && (
                <p className="text-xs text-destructive">{errors.assessmentType.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assessmentName">Assessment Name <span className="text-destructive">*</span></Label>
              <Input
                id="assessmentName"
                placeholder="Enter assessment name"
                {...register('assessmentName')}
              />
              {errors.assessmentName && (
                <p className="text-xs text-destructive">{errors.assessmentName.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxScore">Maximum Score <span className="text-destructive">*</span></Label>
              <Input
                id="maxScore"
                type="number"
                placeholder="Enter maximum score"
                {...register('maxScore', { valueAsNumber: true })}
              />
              {errors.maxScore && (
                <p className="text-xs text-destructive">{errors.maxScore.message as string}</p>
              )}
            </div>
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
          
          {fields.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Student Grades</h3>
                <div className="text-sm text-muted-foreground">
                  Maximum Score: {watchMaxScore}
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Student</th>
                      <th className="px-4 py-3 text-left font-medium">Score</th>
                      <th className="px-4 py-3 text-left font-medium">Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <tr key={field.id} className="border-t">
                        <td className="px-4 py-3">
                          <input type="hidden" {...register(`students.${index}.id` as const)} />
                          <input type="hidden" {...register(`students.${index}.name` as const)} />
                          {field.name}
                        </td>
                        <td className="px-4 py-3 w-32">
                          <Input
                            type="number"
                            min={0}
                            max={watchMaxScore}
                            {...register(`students.${index}.score` as const, { valueAsNumber: true })}
                          />
                          {errors.students?.[index]?.score && (
                            <p className="text-xs text-destructive mt-1">
                              {errors.students[index]?.score?.message as string}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            placeholder="Optional comment"
                            {...register(`students.${index}.comment` as const)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {watchClassId && fields.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No students found in this class.</p>
            </div>
          )}
          
          {!watchClassId && (
            <div className="p-8 text-center border rounded-md bg-muted/10">
              <p className="text-muted-foreground">Please select a class to view students.</p>
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
            disabled={isLoading || fields.length === 0}
            className="ml-auto"
          >
            {isLoading ? 'Saving...' : 'Save Grades'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
