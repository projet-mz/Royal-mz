# Amarck Royal School Management System - Mobile Application

This directory contains the React Native mobile application for the Amarck Royal International School Management System, supporting iOS and Android platforms.

## Prerequisites

- Node.js 18 or higher
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS)

## Installation

1. Install dependencies:

```bash
npm install
```

2. For iOS, install CocoaPods dependencies:

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

The mobile application includes the following security features:

1. **Authentication**: Secure login using Supabase authentication
2. **Biometric Authentication**: Native biometric authentication
3. **Security Dashboard**: Real-time monitoring of student check-in/out status
4. **Student Check-in/out**: Process student check-in and check-out events
5. **Guardian Verification**: Verify guardians using biometric authentication
6. **Incident Reporting**: Report and manage security incidents
7. **Alerts**: Receive and manage security alerts

## Native Modules

The application includes native modules for iOS and Android:

### iOS (Swift)

- `BiometricAuth`: Implements biometric authentication using Face ID or Touch ID

### Android (Kotlin)

- `BiometricAuth`: Implements biometric authentication using fingerprint sensors
