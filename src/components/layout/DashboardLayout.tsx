'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { UserRole } from '../../lib/types';
import { useAuth } from '../../lib/context/AuthContext';
import { NotificationBell } from '../ui/notifications';

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
  role: UserRole | 'security';
}

export function DashboardLayout({ children, className, role }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const adminNavItems = [
    { title: 'Dashboard', href: '/admin', icon: 'Home' },
    { title: 'Students', href: '/admin/students', icon: 'Users' },
    { title: 'Teachers', href: '/admin/teachers', icon: 'Users' },
    { title: 'Classes', href: '/admin/classes', icon: 'BookOpen' },
    { title: 'Timetable', href: '/admin/timetable', icon: 'Calendar' },
    { title: 'Fees', href: '/admin/fees', icon: 'DollarSign' },
    { title: 'Security Portal', href: '/admin/security', icon: 'Shield' },
    { title: 'Consultations', href: '/admin/consultations', icon: 'MessageSquare' },
    { title: 'Settings', href: '/admin/settings', icon: 'Settings' },
  ];
  
  const teacherNavItems = [
    { title: 'Dashboard', href: '/teacher', icon: 'Home' },
    { title: 'My Classes', href: '/teacher/classes', icon: 'Users' },
    { title: 'Attendance', href: '/teacher/attendance', icon: 'CheckSquare' },
    { title: 'Grades', href: '/teacher/grades', icon: 'Award' },
    { title: 'Timetable', href: '/teacher/timetable', icon: 'Calendar' },
    { title: 'Materials', href: '/teacher/materials', icon: 'FileText' },
  ];
  
  const studentNavItems = [
    { title: 'Dashboard', href: '/student', icon: 'Home' },
    { title: 'Classes', href: '/student/classes', icon: 'BookOpen' },
    { title: 'Assignments', href: '/student/assignments', icon: 'FileText' },
    { title: 'Grades', href: '/student/grades', icon: 'Award' },
    { title: 'Timetable', href: '/student/timetable', icon: 'Calendar' },
    { title: 'Materials', href: '/student/materials', icon: 'Folder' },
  ];
  
  const parentNavItems = [
    { title: 'Dashboard', href: '/parent', icon: 'Home' },
    { title: 'Children', href: '/parent/children', icon: 'Users' },
    { title: 'Grades', href: '/parent/grades', icon: 'Award' },
    { title: 'Attendance', href: '/parent/attendance', icon: 'CheckSquare' },
    { title: 'Fees', href: '/parent/fees', icon: 'DollarSign' },
    { title: 'Security', href: '/parent/security', icon: 'Shield' },
    { title: 'Communication', href: '/parent/messages', icon: 'MessageSquare' },
  ];
  
  const securityNavItems = [
    { title: 'Dashboard', href: '/security', icon: 'Home' },
    { title: 'Checkpoints', href: '/security/checkpoints', icon: 'Shield' },
    { title: 'Student Check-in/out', href: '/security/check-in-out', icon: 'UserCheck' },
    { title: 'Guardian Verification', href: '/security/guardians', icon: 'Users' },
    { title: 'Incidents', href: '/security/incidents', icon: 'AlertTriangle' },
    { title: 'Alerts', href: '/security/alerts', icon: 'Bell' },
    { title: 'Reports', href: '/security/reports', icon: 'FileText' },
  ];
  
  const navItems = role === 'admin' 
    ? adminNavItems 
    : role === 'teacher' 
      ? teacherNavItems 
      : role === 'student' 
        ? studentNavItems 
        : role === 'security'
          ? securityNavItems
          : parentNavItems;
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <header className="sticky top-0 z-50 w-full border-b gradient-primary text-primary-foreground navbar-3d">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-primary-foreground md:hidden button-3d"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            
            <Link href="/" className="ml-2 md:ml-0 flex items-center space-x-2">
              <span className="text-lg md:text-xl font-heading font-bold">Amarck Royal</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-2 md:space-x-4">
            <span className="hidden sm:inline-block font-medium">
              {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
            </span>
            <NotificationBell />
            <button
              onClick={() => logout()}
              className="rounded-md bg-primary-foreground/10 px-3 py-2 md:px-4 md:py-2 text-sm font-medium hover:bg-primary-foreground/20 button-3d"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      
      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-25" 
            onClick={closeMobileMenu}
            aria-hidden="true"
          ></div>
          
          {/* Mobile menu panel */}
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-cream pt-5 pb-4 sidebar-3d">
            <div className="px-4 pb-2 border-b gradient-primary text-white">
              <span className="text-lg font-medium">
                {role.charAt(0).toUpperCase() + role.slice(1)} Menu
              </span>
            </div>
            <div className="mt-5 h-full flex-1 overflow-y-auto px-2">
              <nav className="grid gap-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground button-3d",
                      pathname === item.href 
                        ? "gradient-accent text-accent-foreground" 
                        : "bg-white text-secondary"
                    )}
                    onClick={closeMobileMenu}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto grid flex-1 gap-6 md:gap-12 md:grid-cols-[240px_1fr]">
        {/* Desktop sidebar navigation */}
        <aside className="hidden py-6 md:block">
          <div className="rounded-lg overflow-hidden sidebar-3d">
            <div className="gradient-primary text-white p-4 font-medium">
              Navigation
            </div>
            <nav className="grid items-start gap-2 bg-cream p-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground button-3d",
                    pathname === item.href 
                      ? "gradient-accent text-accent-foreground" 
                      : "bg-white text-secondary"
                  )}
                >
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        
        <main className="flex w-full flex-1 flex-col overflow-hidden py-4 md:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}                                                                                        