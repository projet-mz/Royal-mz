'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
import { Loader2, User, BookOpen, Users, Home, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from '../../components/ui/particle-background';

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
        if (id === '9013691123') return true;
        
        if (id.startsWith('STU-')) return isValidStudentId(id);
        if (id.startsWith('TCH-')) return isValidTeacherId(id);
        if (id.startsWith('ADM-')) return isValidAdminId(id);
        if (id.startsWith('PAR-')) return isValidParentId(id);
        return false;
      },
      {
        message: 'Please enter a valid ID',
      }
    ),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'role' | 'credentials'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'admin',
      userId: '',
      password: '',
      rememberMe: false,
    },
  });
  
  useEffect(() => {
    if (selectedRole) {
      setValue('role', selectedRole);
    }
  }, [selectedRole, setValue]);
  
  const watchRole = watch('role');
  
  const roleIcons = {
    admin: <User className="h-8 w-8 mb-2" />,
    teacher: <BookOpen className="h-8 w-8 mb-2" />,
    student: <Users className="h-8 w-8 mb-2" />,
    parent: <Home className="h-8 w-8 mb-2" />,
  };
  
  const roleColors = {
    admin: 'from-primary-800 to-primary-600',
    teacher: 'from-secondary-800 to-secondary-600',
    student: 'from-accent-700 to-accent-500',
    parent: 'from-neutral-700 to-neutral-500',
  };
  
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setValue('role', role);
    
    if (role === 'admin') {
      setValue('userId', '9013691123');
      setValue('password', '#HAHAnord1013#');
    } else {
      setValue('userId', '');
      setValue('password', '');
    }
    
    setStep('credentials');
  };
  
  const handleBackToRoles = () => {
    setStep('role');
  };

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    
    if (data.role === 'admin' && data.userId === '9013691123' && data.password === '#HAHAnord1013#') {
      const { success, error } = await login('admin@amarckroyal.edu', data.password);
      
      if (success) {
        router.push(`/${data.role}`);
      } else {
        setError('Authentication failed. Please try again.');
      }
      return;
    }
    
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
      <div 
        className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-white to-neutral-50"
        style={{
          backgroundImage: 'url("/images/school-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Particle background effect */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm">
          <ParticleBackground mousePosition={mousePosition} />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto w-full max-w-[500px] overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl"
        >
          <div className="bg-gradient-to-r from-primary-700 to-secondary-700 p-6 text-white text-center">
            <motion.h1 
              className="text-3xl font-heading font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Amarck Royal International School
            </motion.h1>
            <motion.p 
              className="text-sm text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Excellence in Education
            </motion.p>
          </div>
          
          <div className="p-8 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
            
            <AnimatePresence mode="wait">
              {step === 'role' ? (
                <motion.div
                  key="role-selection"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Select Your Role</h2>
                    <p className="text-sm text-gray-600">Choose your role to access the portal</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {(['admin', 'teacher', 'student', 'parent'] as const).map((role) => (
                      <motion.button
                        key={role}
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-b ${roleColors[role]} text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {roleIcons[role]}
                        <span className="font-medium capitalize">{role}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="credentials-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex items-center space-x-3 mb-6">
                      <motion.button
                        type="button"
                        onClick={handleBackToRoles}
                        className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                      </motion.button>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 capitalize">{watchRole} Login</h2>
                        <p className="text-sm text-gray-600">Enter your credentials to continue</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label
                        htmlFor="userId"
                        className="text-sm font-medium text-gray-700"
                      >
                        {watchRole === 'admin' ? 'Admin ID' : 'School ID'}
                      </label>
                      <Input
                        id="userId"
                        type="text"
                        placeholder={watchRole === 'admin' ? 'Enter your Admin ID' : 'Enter your ID (e.g., STU-00001)'}
                        {...register('userId')}
                        className="h-12 rounded-lg border-gray-300 bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-primary"
                      />
                      {errors.userId && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-red-500"
                        >
                          {errors.userId.message}
                        </motion.p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register('password')}
                        className="h-12 rounded-lg border-gray-300 bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-primary"
                      />
                      {errors.password && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-red-500"
                        >
                          {errors.password.message}
                        </motion.p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="rememberMe"
                        type="checkbox"
                        {...register('rememberMe')}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full h-12 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium text-lg shadow-md hover:shadow-lg transition-all duration-300" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          'Login'
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="pt-4 border-t border-gray-200 mt-6 flex justify-between text-sm">
              <a
                href="/forgot-password"
                className="text-primary hover:text-primary-700 transition-colors"
              >
                Forgot password?
              </a>
              <div className="space-x-4">
                <a
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-of-service"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/contact-us"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}                                                                    