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
import { Loader2, User, BookOpen, Users, Home, CheckCircle2, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from '../../components/ui/particle-background';

import { 
  isValidStudentId, 
  isValidTeacherId, 
  isValidAdminId, 
  isValidParentId 
} from '../../lib/utils/id-formats';

const loginSchema = z.object({
  role: z.enum(['admin', 'teacher', 'student', 'parent', 'security'] as const),
  userId: z.string()
    .min(1, 'Please enter your ID')
    .refine(
      (id) => {
        if (id === '9013691123') return true;
        
        if (id.startsWith('STU-')) return isValidStudentId(id);
        if (id.startsWith('TCH-')) return isValidTeacherId(id);
        if (id.startsWith('ADM-')) return isValidAdminId(id);
        if (id.startsWith('PAR-')) return isValidParentId(id);
        if (id.startsWith('SEC-')) return true; // Allow security IDs
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
    security: <Shield className="h-8 w-8 mb-2" />,
  };
  
  const roleColors = {
    admin: 'from-primary-800 to-primary-600',
    teacher: 'from-secondary-800 to-secondary-600',
    student: 'from-accent-700 to-accent-500',
    parent: 'from-neutral-700 to-neutral-500',
    security: 'from-emerald-700 to-emerald-500',
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
    
    try {
      const validCredentials: Record<UserRole, Record<string, { email: string; password: string; firstName: string; lastName: string }>> = {
        'admin': {
          'ADM-00001': { email: 'admin@amarckroyal.edu', password: 'password123', firstName: 'John', lastName: 'Mensah' },
          '9013691123': { email: 'admin@amarckroyal.edu', password: '#HAHAnord1013#', firstName: 'John', lastName: 'Mensah' }
        },
        'teacher': {
          'TCH-00001': { email: 'teacher@amarckroyal.edu', password: 'password123', firstName: 'Adwoa', lastName: 'Mensah' }
        },
        'student': {
          'STU-00001': { email: 'student@amarckroyal.edu', password: 'password123', firstName: 'Kwame', lastName: 'Asante' }
        },
        'parent': {
          'PAR-00001': { email: 'parent@amarckroyal.edu', password: 'password123', firstName: 'Akosua', lastName: 'Asante' }
        },
        'security': {
          'SEC-00001': { email: 'security@amarckroyal.edu', password: 'password123', firstName: 'Samuel', lastName: 'Osei' }
        }
      };
      
      if (!validCredentials[data.role]) {
        setError(`Invalid role selected. Please try again.`);
        return;
      }
      
      if (!validCredentials[data.role][data.userId]) {
        setError(`Invalid ID for ${data.role} role. Please try again.`);
        return;
      }
      
      const userCredentials = validCredentials[data.role][data.userId];
      
      if (data.password !== userCredentials.password) {
        setError('Invalid password. Please try again.');
        return;
      }
      
      
      const mockUser = {
        id: `mock-${data.userId}`,
        email: userCredentials.email,
        firstName: userCredentials.firstName,
        lastName: userCredentials.lastName,
        role: data.role,
        avatar: null
      };
      
      localStorage.setItem('royal_mz_user', JSON.stringify(mockUser));
      
      const successElement = document.createElement('div');
      successElement.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50';
      successElement.innerHTML = `
        <div class="flex items-center">
          <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <span>Login successful! Redirecting...</span>
        </div>
      `;
      document.body.appendChild(successElement);
      
      setTimeout(() => {
        router.push(`/${data.role}`);
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
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
          className="relative z-10 mx-auto w-full max-w-[550px] overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-gray-100"
        >
          {/* Ivy League inspired header with shield emblem */}
          <div className="bg-gradient-to-r from-[#8C1515] to-[#A51C30] p-8 text-white text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M-5,5 L10,15 M-5,15 L10,25" stroke="white" strokeWidth="1" fill="none" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#pattern)" />
              </svg>
            </div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
              className="mb-4 flex justify-center"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8C1515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-heading font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Amarck Royal International School
            </motion.h1>
            <motion.p 
              className="text-sm text-white/90 mt-2 font-serif italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Veritas • Excellentia • Integritas
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
                  
                  <div className="grid grid-cols-3 gap-4">
                    {(['admin', 'teacher', 'student', 'parent', 'security'] as const).map((role, index) => (
                      <motion.button
                        key={role}
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl bg-white border-2 ${role === 'admin' ? 'border-[#8C1515]' : role === 'teacher' ? 'border-[#0076B6]' : role === 'student' ? 'border-[#B26F16]' : role === 'parent' ? 'border-[#2E7D32]' : 'border-[#4A148C]'} shadow-md hover:shadow-lg transition-all duration-300`}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: role === 'admin' ? '#8C1515' : role === 'teacher' ? '#0076B6' : role === 'student' ? '#B26F16' : role === 'parent' ? '#2E7D32' : '#4A148C',
                          color: 'white'
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className={`text-${role === 'admin' ? '[#8C1515]' : role === 'teacher' ? '[#0076B6]' : role === 'student' ? '[#B26F16]' : role === 'parent' ? '[#2E7D32]' : '[#4A148C]'} group-hover:text-white transition-colors duration-300`}>
                          {roleIcons[role]}
                        </div>
                        <span className="font-medium capitalize mt-2">{role}</span>
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
                        <h2 className="text-xl font-bold text-gray-800 capitalize flex items-center">
                          {watchRole === 'admin' ? (
                            <User className="h-5 w-5 mr-2 text-[#8C1515]" />
                          ) : watchRole === 'teacher' ? (
                            <BookOpen className="h-5 w-5 mr-2 text-[#0076B6]" />
                          ) : watchRole === 'student' ? (
                            <Users className="h-5 w-5 mr-2 text-[#B26F16]" />
                          ) : watchRole === 'parent' ? (
                            <Home className="h-5 w-5 mr-2 text-[#2E7D32]" />
                          ) : (
                            <Shield className="h-5 w-5 mr-2 text-[#4A148C]" />
                          )}
                          {watchRole} Login
                        </h2>
                        <p className="text-sm text-gray-600">Enter your credentials to continue</p>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="space-y-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label
                        htmlFor="userId"
                        className="text-sm font-medium text-gray-700 flex items-center"
                      >
                        <span className="mr-1">{watchRole === 'admin' ? 'Admin ID' : 'School ID'}</span>
                        <span className="text-xs text-gray-500 italic">(Required)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {watchRole === 'admin' ? (
                            <User className="h-5 w-5 text-gray-400" />
                          ) : watchRole === 'teacher' ? (
                            <BookOpen className="h-5 w-5 text-gray-400" />
                          ) : watchRole === 'student' ? (
                            <Users className="h-5 w-5 text-gray-400" />
                          ) : watchRole === 'parent' ? (
                            <Home className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Shield className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <Input
                          id="userId"
                          type="text"
                          placeholder={watchRole === 'admin' ? 'Enter your Admin ID' : `Enter your ${watchRole} ID (e.g., ${watchRole === 'student' ? 'STU-00001' : watchRole === 'teacher' ? 'TCH-00001' : watchRole === 'parent' ? 'PAR-00001' : watchRole === 'security' ? 'SEC-00001' : 'ADM-00001'})`}
                          {...register('userId')}
                          className="h-12 rounded-lg border-gray-300 bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-primary pl-10"
                        />
                      </div>
                      {errors.userId && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-red-500 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.userId.message}
                        </motion.p>
                      )}
                    </motion.div>
                    
                    <motion.div 
                      className="space-y-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700 flex items-center"
                      >
                        <span className="mr-1">Password</span>
                        <span className="text-xs text-gray-500 italic">(Required)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          {...register('password')}
                          className="h-12 rounded-lg border-gray-300 bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-primary pl-10"
                        />
                      </div>
                      {errors.password && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-red-500 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.password.message}
                        </motion.p>
                      )}
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <input
                        id="rememberMe"
                        type="checkbox"
                        {...register('rememberMe')}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className={`w-full h-12 rounded-lg text-white font-medium text-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                          watchRole === 'admin' ? 'bg-gradient-to-r from-[#8C1515] to-[#A51C30]' : 
                          watchRole === 'teacher' ? 'bg-gradient-to-r from-[#0076B6] to-[#00A3E0]' : 
                          watchRole === 'student' ? 'bg-gradient-to-r from-[#B26F16] to-[#E6A01E]' : 
                          watchRole === 'parent' ? 'bg-gradient-to-r from-[#2E7D32] to-[#4CAF50]' : 
                          'bg-gradient-to-r from-[#4A148C] to-[#7B1FA2]'
                        }`}
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