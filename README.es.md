# 🔐 OAuth Native Firebase

[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)
[![Español](https://img.shields.io/badge/lang-Español-red.svg)](README.es.md)

Aplicación móvil de autenticación desarrollada con React Native y Expo que implementa Firebase Authentication con soporte para inicio de sesión mediante email/contraseña y Google Sign-In.

## 📱 Características

- ✅ Autenticación con email y contraseña
- ✅ Inicio de sesión con Google (OAuth 2.0)
- ✅ Registro de nuevos usuarios
- ✅ Validación de formularios
- ✅ Manejo de errores personalizado
- ✅ Pantalla de perfil de usuario
- ✅ Cierre de sesión seguro

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework para aplicaciones móviles
- **Expo** - Plataforma de desarrollo
- **Firebase Authentication** - Sistema de autenticación
- **React Navigation** - Navegación entre pantallas
- **TypeScript** - Tipado estático
- **Google Sign-In** - Autenticación con Google

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Cuenta de Firebase
- Cuenta de Google Cloud Platform (para Google Sign-In)
- Android Studio (para ejecutar el emulador de Android)
- JDK 17 o superior

> ⚠️ **Nota importante:** Esta aplicación **NO** funciona con Expo Go debido a que usa módulos nativos (`@react-native-google-signin/google-signin`). Debes crear un build de desarrollo para probarla.

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/oscar503sv/oauth-native-firebase.git
cd oauth-native-firebase
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de Firebase y Google:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain_aqui
EXPO_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id_aqui
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket_aqui
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
EXPO_PUBLIC_FIREBASE_APP_ID=tu_app_id_aqui
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=tu_measurement_id_aqui
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=tu_google_web_client_id_aqui
```

4. **Configurar archivos de Google Services**

- **Android:** Descarga `google-services.json` desde Firebase Console y colócalo en la raíz del proyecto
- **iOS (opcional):** Descarga `GoogleService-Info.plist` desde Firebase Console y colócalo en la raíz del proyecto

5. **Crear un build de desarrollo**

Como esta app usa módulos nativos, debes crear un build de desarrollo:

```bash
npx expo prebuild
```

Esto generará las carpetas nativas `android/` e `ios/`.

## ▶️ Ejecución

> ⚠️ **Importante:** NO uses `npm start` ni Expo Go. Esta aplicación requiere un build nativo.

### Ejecutar en Android (Emulador o Dispositivo)

1. **Inicia el emulador de Android** desde Android Studio o mediante:
```bash
emulator -avd <nombre_del_emulador>
```

2. **Ejecuta la aplicación:**
```bash
npm run android
```

Esto compilará y ejecutará la app en el emulador o dispositivo conectado.

### Ejecutar en iOS (Solo macOS)

```bash
npm run ios
```

## 📁 Estructura del Proyecto

```
oauth-native-firebase/
├── src/
│   ├── config/
│   │   └── firebase.ts          # Configuración de Firebase
│   └── screens/
│       ├── LoginScreen.tsx      # Pantalla de inicio de sesión
│       ├── RegisterScreen.tsx   # Pantalla de registro
│       └── HomeScreen.tsx       # Pantalla principal
├── App.tsx                      # Componente principal y navegación
├── index.ts                     # Punto de entrada
├── app.json                     # Configuración de Expo
├── package.json                 # Dependencias del proyecto
├── .env.example                 # Plantilla de variables de entorno
└── README.md                    # Documentación
```

## 🔧 Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita **Authentication** y activa los proveedores:
   - Email/Password
   - Google
3. **Registra tu aplicación Android:**
   - Ve a la configuración del proyecto
   - Agrega una aplicación Android
   - Usa el package name: `com.oauthudb.myapp`
   - **Importante:** Genera y agrega el **SHA-1 fingerprint**
     ```bash
     # Para obtener el SHA-1 de debug:
     cd android
     ./gradlew signingReport
     ```
   - Descarga el archivo `google-services.json` y colócalo en la raíz del proyecto
4. **Registra tu aplicación iOS (opcional):**
   - Agrega una aplicación iOS
   - Usa el bundle ID: `com.oauthudb.myapp`
   - Descarga el archivo `GoogleService-Info.plist` y colócalo en la raíz del proyecto

## 🔑 Configuración de Google Sign-In

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto de Firebase (o créalo si no existe)
3. Ve a **Credenciales** → **Crear credenciales** → **ID de cliente de OAuth 2.0**
4. Selecciona **Aplicación web**
5. Copia el **ID de cliente** y agrégalo a tu archivo `.env` como `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`

> 💡 **Tip:** El Web Client ID se genera automáticamente cuando configuras Firebase Authentication con Google. Puedes encontrarlo en Firebase Console → Authentication → Sign-in method → Google → Web SDK configuration.

## 📝 Scripts Disponibles

- `npm run android` - Compila y ejecuta la app en Android
- `npm run ios` - Compila y ejecuta la app en iOS (Solo macOS)

## ⚠️ Notas Importantes

### ¿Por qué no funciona con Expo Go?

Esta aplicación utiliza `@react-native-google-signin/google-signin`, que es un **módulo nativo** que requiere código nativo personalizado. Expo Go no puede ejecutar módulos nativos de terceros, por lo que debes crear un **development build** para probar la aplicación.

### SHA-1 Fingerprint

El SHA-1 fingerprint es **crucial** para que Google Sign-In funcione. Sin él, la autenticación con Google fallará. Asegúrate de:

1. Obtener el SHA-1 de tu keystore de debug con `./gradlew signingReport`
2. Agregarlo en la configuración de tu app Android en Firebase Console
3. Si creas un keystore de release, también debes agregar ese SHA-1
