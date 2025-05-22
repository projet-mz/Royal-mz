# Amarck Royal School Management System - Web Setup

This guide will help you set up the web application for the Amarck Royal International School Management System.

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/projet-mz/Royal-mz.git
cd Royal-mz
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

You can obtain these values from your Supabase project dashboard.

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Features

- **Admin Dashboard**: Comprehensive overview of school metrics and management functions
- **Teacher Portal**: Efficient class management and student performance tracking
- **Student Portal**: Age-appropriate interfaces for different grade levels
- **Parent Portal**: Multi-child dashboard for monitoring academic progress
- **Security Portal**: Advanced security features for student check-in/out

## Performance Optimization

The web application is optimized for sub-0.5s load times and sub-100ms response times:

- Server-side rendering for fast initial load
- Code splitting for reduced bundle size
- Image optimization for faster loading
- Caching for improved performance
- Lazy loading for non-critical components
- Prefetching for improved navigation
- Optimized API calls for faster data retrieval

## Real-Time Synchronization

The web application uses WebSocket connections for real-time synchronization:

- Instant updates across all platforms
- Conflict resolution for concurrent edits
- Optimistic UI updates for improved user experience
- Offline support with automatic synchronization when back online
- Background synchronization for improved performance

## Security Features

The web application includes advanced security features:

- Role-based access control
- WebAuthn for biometric authentication
- Content Security Policy (CSP) for XSS protection
- CSRF protection
- Input validation and sanitization
- Rate limiting for API calls
- Audit logging for security events
