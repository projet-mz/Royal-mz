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
          <nav className="hidden md:flex items-center space-x-6 ml-8">
            <a href="/about" className="text-white/80 hover:text-white">About</a>
            <a href="/academics" className="text-white/80 hover:text-white">Academics</a>
            <a href="/admissions" className="text-white/80 hover:text-white">Admissions</a>
            <a href="/contact" className="text-white/80 hover:text-white">Contact</a>
          </nav>
          <div className="ml-auto flex items-center space-x-2 md:space-x-4">
            <a href="/contact" className="button-3d bg-accent text-white px-4 py-2 rounded">
              Get In Touch
            </a>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8 flex-1">
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
              <a href="/privacy" className="text-sm text-white/80 hover:text-white">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-white/80 hover:text-white">
                Terms of Service
              </a>
              <a href="/contact" className="text-sm text-white/80 hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}        