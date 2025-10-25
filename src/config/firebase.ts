/**
 * Configuración de Firebase para la aplicación
 * Inicializa los servicios de Firebase y exporta las instancias necesarias
 */

// Importar las funciones necesarias de los SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de la aplicación Firebase
// Las credenciales se obtienen de las variables de entorno por seguridad
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Inicializar la aplicación Firebase
export const app = initializeApp(firebaseConfig);

// Inicializar Firebase Authentication y exportarlo para uso en la app
export const auth = getAuth(app);
