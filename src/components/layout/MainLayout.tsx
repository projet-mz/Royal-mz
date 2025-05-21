import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-background flex flex-col', className)}>
      <header className="sticky top-0 z-50 w-full border-b gradient-primary navbar-3d">
        <div className="container flex h-14 md:h-16 items-center px-4 md:px-6">
          <div className="flex items-center">
            <a className="flex items-center space-x-2" href="/">
              <span className="text-lg md:text-xl font-bold text-white">Amarck Royal</span>
            </a>
          </div>
          <div className="ml-auto flex items-center space-x-2 md:space-x-4">
            <a 
              href="/login" 
              className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 md:px-4 button-3d"
            >
              Login
            </a>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8 flex-1">
        <div className="card-3d p-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Welcome to Amarck Royal International School</h1>
          <p className="text-secondary text-lg mb-6">A premier educational institution serving students from Creche to JHS 3</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h2 className="text-xl font-heading font-semibold mb-3 text-primary">Excellence in Education</h2>
              <p className="text-secondary">Our curriculum is designed to nurture academic excellence while developing well-rounded individuals ready for the challenges of tomorrow.</p>
            </div>
            <div className="dashboard-card">
              <h2 className="text-xl font-heading font-semibold mb-3 text-primary">Modern Facilities</h2>
              <p className="text-secondary">State-of-the-art classrooms, laboratories, and recreational spaces provide an optimal learning environment for all students.</p>
            </div>
          </div>
        </div>
        {children}
      </main>
      <footer className="gradient-primary text-white py-6 md:py-8 navbar-3d">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Amarck Royal International School. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6">
              <a href="/privacy-policy" className="text-sm text-white/80 hover:text-white">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-sm text-white/80 hover:text-white">
                Terms of Service
              </a>
              <a href="/contact-us" className="text-sm text-white/80 hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}        