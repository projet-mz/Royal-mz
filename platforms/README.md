# Amarck Royal School Management System - Cross-Platform Implementation

This directory contains the cross-platform implementation of the Amarck Royal International School Management System, supporting iOS, Android, desktop, and web platforms.

## Directory Structure

- `shared/`: Shared TypeScript library with business logic, data services, and types
- `electron/`: Desktop application built with Electron
- `mobile/`: Mobile application built with React Native for iOS and Android
- `ios/`: iOS-specific native modules
- `android/`: Android-specific native modules

## Shared Library

The shared library contains all the business logic, data services, and type definitions that are used across all platforms. This ensures consistency in functionality and data handling.

### Building the Shared Library

```bash
cd shared
npm install
npm run build
```

## Desktop Application (Electron)

The desktop application is built with Electron and provides a native desktop experience while leveraging the shared core library for business logic and data services.

### Building and Running the Desktop Application

```bash
cd electron
npm install
npm run dev  # For development
npm run build  # For production build
```

## Mobile Application (React Native)

The mobile application is built with React Native and provides a native mobile experience for iOS and Android while using the shared core library for business logic and data services.

### Building and Running the Mobile Application

```bash
cd mobile
npm install
```

#### For iOS:

```bash
cd ios
pod install
cd ..
npm run ios
```

#### For Android:

```bash
npm run android
```

## Security Features

The implementation ensures that all security features work consistently across platforms:

1. **Authentication**: Supabase authentication is used across all platforms
2. **Biometric Authentication**: Native biometric authentication for iOS and Android
3. **Real-Time Updates**: Supabase's real-time features for security events
4. **Security Dashboard**: Comprehensive security dashboard across all platforms

## Testing

To test the implementation, follow these steps for each platform:

1. **Web**: Run the Next.js application and test all security features
2. **Desktop**: Build and run the Electron application
3. **iOS**: Build and run the React Native application on an iOS simulator or device
4. **Android**: Build and run the React Native application on an Android emulator or device
