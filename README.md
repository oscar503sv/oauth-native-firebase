# 🔐 OAuth Native Firebase

[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)
[![Español](https://img.shields.io/badge/lang-Español-red.svg)](README.es.md)

Mobile authentication application built with React Native and Expo that implements Firebase Authentication with support for email/password login and Google Sign-In.

## 📱 Features

- ✅ Email and password authentication
- ✅ Google Sign-In (OAuth 2.0)
- ✅ New user registration
- ✅ Form validation
- ✅ Custom error handling
- ✅ User profile screen
- ✅ Secure logout

## 🛠️ Technologies Used

- **React Native** - Mobile application framework
- **Expo** - Development platform
- **Firebase Authentication** - Authentication system
- **React Navigation** - Screen navigation
- **TypeScript** - Static typing
- **Google Sign-In** - Google authentication

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Google Cloud Platform account (for Google Sign-In)
- Android Studio (to run Android emulator)
- JDK 17 or higher

> ⚠️ **Important note:** This application does **NOT** work with Expo Go because it uses native modules (`@react-native-google-signin/google-signin`). You must create a development build to test it.

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/oscar503sv/oauth-native-firebase.git
cd oauth-native-firebase
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Edit the `.env` file with your Firebase and Google credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id_here
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_web_client_id_here
```

4. **Configure Google Services files**

- **Android:** Download `google-services.json` from Firebase Console and place it in the project root
- **iOS (optional):** Download `GoogleService-Info.plist` from Firebase Console and place it in the project root

5. **Create a development build**

Since this app uses native modules, you must create a development build:

```bash
npx expo prebuild
```

This will generate the native `android/` and `ios/` folders.

## ▶️ Running the App

> ⚠️ **Important:** DO NOT use `npm start` or Expo Go. This application requires a native build.

### Run on Android (Emulator or Device)

1. **Start the Android emulator** from Android Studio or via:
```bash
emulator -avd <emulator_name>
```

2. **Run the application:**
```bash
npm run android
```

This will compile and run the app on the emulator or connected device.

### Run on iOS (macOS only)

```bash
npm run ios
```

## 📁 Project Structure

```
oauth-native-firebase/
├── src/
│   ├── config/
│   │   └── firebase.ts          # Firebase configuration
│   └── screens/
│       ├── LoginScreen.tsx      # Login screen
│       ├── RegisterScreen.tsx   # Registration screen
│       └── HomeScreen.tsx       # Home screen
├── App.tsx                      # Main component and navigation
├── index.ts                     # Entry point
├── app.json                     # Expo configuration
├── package.json                 # Project dependencies
├── .env.example                 # Environment variables template
└── README.md                    # Documentation
```

## 🔧 Firebase Configuration

1. Create a project in [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** and activate the providers:
   - Email/Password
   - Google
3. **Register your Android application:**
   - Go to project settings
   - Add an Android app
   - Use the package name: `com.oauthudb.myapp`
   - **Important:** Generate and add the **SHA-1 fingerprint**
     ```bash
     # To get the debug SHA-1:
     cd android
     ./gradlew signingReport
     ```
   - Download the `google-services.json` file and place it in the project root
4. **Register your iOS application (optional):**
   - Add an iOS app
   - Use the bundle ID: `com.oauthudb.myapp`
   - Download the `GoogleService-Info.plist` file and place it in the project root

## 🔑 Google Sign-In Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project (or create it if it doesn't exist)
3. Go to **Credentials** → **Create credentials** → **OAuth 2.0 Client ID**
4. Select **Web application**
5. Copy the **Client ID** and add it to your `.env` file as `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`

> 💡 **Tip:** The Web Client ID is automatically generated when you configure Firebase Authentication with Google. You can find it in Firebase Console → Authentication → Sign-in method → Google → Web SDK configuration.

## 📝 Available Scripts

- `npm run android` - Compile and run the app on Android
- `npm run ios` - Compile and run the app on iOS (macOS only)

## ⚠️ Important Notes

### Why doesn't it work with Expo Go?

This application uses `@react-native-google-signin/google-signin`, which is a **native module** that requires custom native code. Expo Go cannot run third-party native modules, so you must create a **development build** to test the application.

### SHA-1 Fingerprint

The SHA-1 fingerprint is **crucial** for Google Sign-In to work. Without it, Google authentication will fail. Make sure to:

1. Get the SHA-1 from your debug keystore with `./gradlew signingReport`
2. Add it to your Android app configuration in Firebase Console
3. If you create a release keystore, you must also add that SHA-1