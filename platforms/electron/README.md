# Amarck Royal School Management System - Desktop Application

This directory contains the Electron desktop application for the Amarck Royal International School Management System.

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

1. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the Electron application in development mode with hot reloading.

### Production Mode

```bash
npm start
```

This will start the Electron application in production mode.

## Building for Distribution

### All Platforms

```bash
npm run build
```

### Windows

```bash
npm run build:win
```

### macOS

```bash
npm run build:mac
```

### Linux

```bash
npm run build:linux
```

## Features

The desktop application includes the following security features:

1. **Authentication**: Secure login using Supabase authentication
2. **Security Dashboard**: Real-time monitoring of student check-in/out status
3. **Student Check-in/out**: Process student check-in and check-out events
4. **Guardian Verification**: Verify guardians using ID verification
5. **Incident Reporting**: Report and manage security incidents
6. **Alerts**: Receive and manage security alerts

## Architecture

The application follows a modular architecture:

1. **Main Process**: Handles the application lifecycle and IPC communication
2. **Renderer Process**: Implements the user interface using React
3. **Preload Script**: Provides a secure bridge between processes
4. **Shared Library**: Uses the shared TypeScript library for business logic
