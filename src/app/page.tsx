import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <div className="container flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to Amarck Royal
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            International School Management System
          </p>
          <div className="flex gap-4">
            <a
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Login
            </a>
            <a
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 