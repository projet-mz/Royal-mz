'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MainLayout } from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { UserRole } from '../../lib/types';
import { useAuth } from '../../lib/context/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Loader2 } from 'lucide-react';

import { 
  isValidStudentId, 
  isValidTeacherId, 
  isValidAdminId, 
  isValidParentId 
} from '../../lib/utils/id-formats';

const loginSchema = z.object({
  role: z.enum(['admin', 'teacher', 'student', 'parent'] as const),
  userId: z.string()
    .min(1, 'Please enter your ID')
    .refine(
      (id) => {
        if (id.startsWith('STU-')) return isValidStudentId(id);
        if (id.startsWith('TCH-')) return isValidTeacherId(id);
        if (id.startsWith('ADM-')) return isValidAdminId(id);
        if (id.startsWith('PAR-')) return isValidParentId(id);
        return false;
      },
      {
        message: 'Please enter a valid ID in the format XXX-XXXXX (e.g., STU-00001)',
      }
    ),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'admin',
      userId: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    
    const mockEmailMapping: Record<string, string> = {
      'ADM-00001': 'admin@amarckroyal.edu',
      'TCH-00001': 'teacher@amarckroyal.edu',
      'STU-00001': 'student@amarckroyal.edu',
      'PAR-00001': 'parent@amarckroyal.edu',
    };
    
    const email = mockEmailMapping[data.userId] || '';
    
    if (!email) {
      setError('Invalid ID. Please try again.');
      return;
    }
    
    const { success, error } = await login(email, data.password);
    
    if (success) {
      router.push(`/${data.role}`);
    } else {
      setError('Invalid ID or password. Please try again.');
    }
  };

  return (
    <MainLayout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="mx-auto w-full max-w-[400px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-heading font-bold">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="role"
                className="text-sm font-medium leading-none"
              >
                Role
              </label>
              <select
                id="role"
                {...register('role')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </select>
              {errors.role && (
                <p className="text-sm text-error">{errors.role.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="userId"
                className="text-sm font-medium leading-none"
              >
                School ID
              </label>
              <Input
                id="userId"
                type="text"
                placeholder="Enter your ID (e.g., STU-00001)"
                {...register('userId')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.userId && (
                <p className="text-sm text-error">{errors.userId.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.password && (
                <p className="text-sm text-error">{errors.password.message}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            <a
              href="/forgot-password"
              className="text-primary underline-offset-4 hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}                                