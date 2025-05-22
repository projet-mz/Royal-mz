# Amarck Royal School Management System - Mobile Setup

This guide will help you set up the mobile application for the Amarck Royal International School Management System.

## Prerequisites

- Node.js 18 or higher
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/projet-mz/Royal-mz.git
cd Royal-mz
```

2. Install dependencies:

```bash
cd platforms/mobile
npm install
```

3. For iOS, install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

## Running the Application

### iOS

```bash
npm run ios
```

### Android

```bash
npm run android
```

## Building for Production

### iOS App Store

```bash
npm run build:ios-release
```

### Google Play Store

```bash
npm run build:android-release
```

## Features

- **Authentication**: Secure login using Supabase authentication
- **Biometric Authentication**: Native biometric authentication
- **Security Dashboard**: Real-time monitoring of student check-in/out status
- **Student Check-in/out**: Process student check-in and check-out events
- **Guardian Verification**: Verify guardians using biometric authentication
- **Incident Reporting**: Report and manage security incidents
- **Alerts**: Receive and manage security alerts

## Performance Optimization

The mobile application is optimized for sub-0.5s load times and sub-100ms response times:

- Native modules for performance-critical operations
- Optimized image loading and caching
- Efficient state management
- Lazy loading for non-critical components
- Optimized API calls for faster data retrieval
- Background data synchronization
- Offline support for critical features

## Real-Time Synchronization

The mobile application uses WebSocket connections for real-time synchronization:

- Instant updates across all platforms
- Conflict resolution for concurrent edits
- Optimistic UI updates for improved user experience
- Offline support with automatic synchronization when back online
- Background synchronization for improved performance

## Security Features

The mobile application includes advanced security features:

- Role-based access control
- Biometric authentication (Face ID, Touch ID, Fingerprint)
- Secure storage for sensitive data
- Certificate pinning for secure API communication
- Input validation and sanitization
- Rate limiting for API calls
- Audit logging for security events

## Platform-Specific Features

### iOS

- Face ID / Touch ID integration
- Apple Push Notifications
- Handoff support between iPhone and iPad
- Today Widget for quick access
- Spotlight search integration
- iCloud backup support

### Android

- Fingerprint authentication
- Material Design 3 with dynamic theming
- Android Push Notifications
- Home screen widgets
- Quick settings tiles
- Adaptive layouts for different screen sizes
