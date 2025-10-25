/**
 * Punto de entrada principal de la aplicación
 * Registra el componente raíz de la app con Expo
 */

import { registerRootComponent } from 'expo';
import App from './App';

// Registrar el componente principal de la aplicación
// Esto configura el entorno apropiadamente tanto para Expo Go como para builds nativos
registerRootComponent(App);
