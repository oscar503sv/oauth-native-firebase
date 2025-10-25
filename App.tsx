/**
 * Componente principal de la aplicación
 * Configura la navegación entre pantallas usando React Navigation
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

// Crear el stack navigator para la navegación
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Pantalla de inicio de sesión (pantalla inicial) */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        {/* Pantalla de registro de nuevos usuarios */}
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ 
            title: 'Registro',
            headerBackTitle: 'Atrás',
          }} 
        />
        {/* Pantalla principal (después del login exitoso) */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            headerShown: false,
            gestureEnabled: false, // Deshabilitar gesto de retroceso
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
