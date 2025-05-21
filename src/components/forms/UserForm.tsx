'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const baseUserSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, {
    message: 'Please enter a valid date',
  }),
});

const studentSchema = baseUserSchema.extend({
  admissionNumber: z.string().min(3, 'Admission number must be at least 3 characters'),
  grade: z.string().min(1, 'Grade is required'),
  className: z.string().min(1, 'Class is required'),
  parentId: z.string().optional(),
});

const teacherSchema = baseUserSchema.extend({
  employeeId: z.string().min(3, 'Employee ID must be at least 3 characters'),
  qualification: z.string().min(2, 'Qualification must be at least 2 characters'),
  specialization: z.string().min(2, 'Specialization must be at least 2 characters'),
  yearsOfExperience: z.number().min(0, 'Years of experience must be a positive number'),
  subjects: z.array(z.string()).min(1, 'At least one subject is required'),
});

const parentSchema = baseUserSchema.extend({
  occupation: z.string().optional(),
  relationship: z.enum(['father', 'mother', 'guardian']),
  alternateContact: z.string().optional(),
  children: z.array(z.string()).optional(),
});

const adminSchema = baseUserSchema.extend({
  employeeId: z.string().min(3, 'Employee ID must be at least 3 characters'),
  role: z.enum(['principal', 'vice_principal', 'administrator', 'accountant', 'other']),
  department: z.string().optional(),
});

type UserType = 'student' | 'teacher' | 'parent' | 'admin';

export interface UserFormProps {
  userType: UserType;
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function UserForm({
  userType,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: UserFormProps) {
  const getSchema = () => {
    switch (userType) {
      case 'student':
        return studentSchema;
      case 'teacher':
        return teacherSchema;
      case 'parent':
        return parentSchema;
      case 'admin':
        return adminSchema;
      default:
        return baseUserSchema;
    }
  };
  
  const getTitle = () => {
    const action = initialData ? 'Edit' : 'Add New';
    switch (userType) {
      case 'student':
        return `${action} Student`;
      case 'teacher':
        return `${action} Teacher`;
      case 'parent':
        return `${action} Parent`;
      case 'admin':
        return `${action} Administrator`;
      default:
        return `${action} User`;
    }
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(getSchema()),
    defaultValues: initialData || {},
  });
  
  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };
  
  const renderFormFields = () => {
    const commonFields = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
            <Input
              id="firstName"
              placeholder="Enter first name"
              {...register('firstName')}
              error={errors.firstName?.message as string}
            />
            {errors.firstName && (
              <p className="text-xs text-destructive">{errors.firstName.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
            <Input
              id="lastName"
              placeholder="Enter last name"
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="text-xs text-destructive">{errors.lastName.message as string}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number <span className="text-destructive">*</span></Label>
            <Input
              id="phoneNumber"
              placeholder="Enter phone number"
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-destructive">{errors.phoneNumber.message as string}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Address <span className="text-destructive">*</span></Label>
          <Input
            id="address"
            placeholder="Enter address"
            {...register('address')}
          />
          {errors.address && (
            <p className="text-xs text-destructive">{errors.address.message as string}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender <span className="text-destructive">*</span></Label>
            <select
              id="gender"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('gender')}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-destructive">{errors.gender.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth <span className="text-destructive">*</span></Label>
            <Input
              id="dateOfBirth"
              type="date"
              {...register('dateOfBirth')}
            />
            {errors.dateOfBirth && (
              <p className="text-xs text-destructive">{errors.dateOfBirth.message as string}</p>
            )}
          </div>
        </div>
      </>
    );
    
    switch (userType) {
      case 'student':
        return (
          <>
            {commonFields}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="admissionNumber">Admission Number <span className="text-destructive">*</span></Label>
                <Input
                  id="admissionNumber"
                  placeholder="Enter admission number"
                  {...register('admissionNumber')}
                />
                {errors.admissionNumber && (
                  <p className="text-xs text-destructive">{errors.admissionNumber.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="grade">Grade <span className="text-destructive">*</span></Label>
                <select
                  id="grade"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register('grade')}
                >
                  <option value="">Select Grade</option>
                  <option value="Creche">Creche</option>
                  <option value="KG1">KG1</option>
                  <option value="KG2">KG2</option>
                  <option value="Primary 1">Primary 1</option>
                  <option value="Primary 2">Primary 2</option>
                  <option value="Primary 3">Primary 3</option>
                  <option value="Primary 4">Primary 4</option>
                  <option value="Primary 5">Primary 5</option>
                  <option value="Primary 6">Primary 6</option>
                  <option value="JHS 1">JHS 1</option>
                  <option value="JHS 2">JHS 2</option>
                  <option value="JHS 3">JHS 3</option>
                </select>
                {errors.grade && (
                  <p className="text-xs text-destructive">{errors.grade.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="className">Class <span className="text-destructive">*</span></Label>
                <Input
                  id="className"
                  placeholder="Enter class name"
                  {...register('className')}
                />
                {errors.className && (
                  <p className="text-xs text-destructive">{errors.className.message as string}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parentId">Parent/Guardian</Label>
              <select
                id="parentId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('parentId')}
              >
                <option value="">Select Parent/Guardian</option>
                <option value="1">John Doe (Father)</option>
                <option value="2">Jane Smith (Mother)</option>
                <option value="3">Robert Johnson (Guardian)</option>
              </select>
              {errors.parentId && (
                <p className="text-xs text-destructive">{errors.parentId.message as string}</p>
              )}
            </div>
          </>
        );
        
      case 'teacher':
        return (
          <>
            {commonFields}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID <span className="text-destructive">*</span></Label>
                <Input
                  id="employeeId"
                  placeholder="Enter employee ID"
                  {...register('employeeId')}
                />
                {errors.employeeId && (
                  <p className="text-xs text-destructive">{errors.employeeId.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience <span className="text-destructive">*</span></Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  placeholder="Enter years of experience"
                  {...register('yearsOfExperience', { valueAsNumber: true })}
                />
                {errors.yearsOfExperience && (
                  <p className="text-xs text-destructive">{errors.yearsOfExperience.message as string}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification <span className="text-destructive">*</span></Label>
                <Input
                  id="qualification"
                  placeholder="Enter qualification"
                  {...register('qualification')}
                />
                {errors.qualification && (
                  <p className="text-xs text-destructive">{errors.qualification.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization <span className="text-destructive">*</span></Label>
                <Input
                  id="specialization"
                  placeholder="Enter specialization"
                  {...register('specialization')}
                />
                {errors.specialization && (
                  <p className="text-xs text-destructive">{errors.specialization.message as string}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subjects">Subjects <span className="text-destructive">*</span></Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Mathematics', 'English', 'Science', 'Social Studies', 'ICT', 'French', 'Religious Studies', 'Creative Arts', 'Physical Education'].map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`subject-${subject}`}
                      value={subject}
                      {...register('subjects')}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor={`subject-${subject}`} className="text-sm font-normal">
                      {subject}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.subjects && (
                <p className="text-xs text-destructive">{errors.subjects.message as string}</p>
              )}
            </div>
          </>
        );
        
      case 'parent':
        return (
          <>
            {commonFields}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship <span className="text-destructive">*</span></Label>
                <select
                  id="relationship"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register('relationship')}
                >
                  <option value="">Select Relationship</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="guardian">Guardian</option>
                </select>
                {errors.relationship && (
                  <p className="text-xs text-destructive">{errors.relationship.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  placeholder="Enter occupation"
                  {...register('occupation')}
                />
                {errors.occupation && (
                  <p className="text-xs text-destructive">{errors.occupation.message as string}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alternateContact">Alternate Contact</Label>
              <Input
                id="alternateContact"
                placeholder="Enter alternate contact"
                {...register('alternateContact')}
              />
              {errors.alternateContact && (
                <p className="text-xs text-destructive">{errors.alternateContact.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="children">Children</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {['Emma Johnson (P3)', 'Daniel Johnson (P1)', 'Sarah Williams (KG2)', 'Michael Brown (JHS1)'].map((child) => (
                  <div key={child} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`child-${child}`}
                      value={child}
                      {...register('children')}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor={`child-${child}`} className="text-sm font-normal">
                      {child}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.children && (
                <p className="text-xs text-destructive">{errors.children.message as string}</p>
              )}
            </div>
          </>
        );
        
      case 'admin':
        return (
          <>
            {commonFields}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID <span className="text-destructive">*</span></Label>
                <Input
                  id="employeeId"
                  placeholder="Enter employee ID"
                  {...register('employeeId')}
                />
                {errors.employeeId && (
                  <p className="text-xs text-destructive">{errors.employeeId.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role <span className="text-destructive">*</span></Label>
                <select
                  id="role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register('role')}
                >
                  <option value="">Select Role</option>
                  <option value="principal">Principal</option>
                  <option value="vice_principal">Vice Principal</option>
                  <option value="administrator">Administrator</option>
                  <option value="accountant">Accountant</option>
                  <option value="other">Other</option>
                </select>
                {errors.role && (
                  <p className="text-xs text-destructive">{errors.role.message as string}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="Enter department"
                {...register('department')}
              />
              {errors.department && (
                <p className="text-xs text-destructive">{errors.department.message as string}</p>
              )}
            </div>
          </>
        );
        
      default:
        return commonFields;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>
          Enter the details for the {userType}.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-4">
          {renderFormFields()}
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
            {isLoading ? 'Saving...' : initialData ? 'Update' : 'Save'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
