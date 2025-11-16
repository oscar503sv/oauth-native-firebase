import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { GoogleSignin, statusCodes,} from '@react-native-google-signin/google-signin';
import { auth } from '../config/firebase';

// Configuración de Google Sign-In con el Web Client ID desde variables de entorno
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

/**
 * Pantalla de inicio de sesión
 * Permite autenticación con email/contraseña y Google Sign-In
 */
export default function LoginScreen({ navigation }: any) {
  // Estados locales para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Maneja el inicio de sesión con email y contraseña
   */
  const handleEmailLogin = async () => {
    // Validación de campos requeridos
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      // Autenticación con Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error: any) {
      let errorMessage = 'Error al iniciar sesión';
      
      // Manejo de errores específicos de Firebase
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico inválido';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuario no encontrado';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja el inicio de sesión con Google
   */
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Primero, cerrar cualquier sesión de Google existente para forzar la selección de cuenta
      await GoogleSignin.signOut();
      
      // Verificar si el dispositivo soporta Google Play Services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Obtener el token de ID del usuario
      // Al usar signIn después de signOut, siempre mostrará el selector de cuenta
      const signInResult = await GoogleSignin.signIn();

      // Intentar obtener el token de ID (versión nueva del módulo v13+)
      let idToken = signInResult.data?.idToken;
      if (!idToken) {
        // Si se usa una versión anterior de google-signin, usar el estilo anterior
        idToken = (signInResult as any).idToken;
      }
      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Crear credencial de Google con el token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Autenticar al usuario con la credencial en Firebase
      await signInWithCredential(auth, googleCredential);
      
      // Navegar a la pantalla Home si es exitoso
      navigation.replace('Home');
      
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      
      // Manejo de errores específicos de Google Sign-In
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Usuario canceló el proceso de inicio de sesión
        Alert.alert('Cancelado', 'Inicio de sesión cancelado por el usuario');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('En progreso', 'Operación de inicio de sesión ya en progreso');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services no disponible o desactualizado');
      } else {
        Alert.alert('Error', 'Error al iniciar sesión con Google: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Text style={styles.subtitle}>Para iniciar sesión, completa los campos</Text>
      
      {/* Campo de entrada para email */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        editable={!loading}
      />
      
      {/* Campo de entrada para contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        editable={!loading}
      />
      
      {/* Botón de inicio de sesión con email */}
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleEmailLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar sesión con email</Text>
        )}
      </TouchableOpacity>
      
      {/* Divisor entre métodos de autenticación */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>O</Text>
        <View style={styles.dividerLine} />
      </View>
      
      {/* Botón de inicio de sesión con Google */}
      <TouchableOpacity 
        style={styles.googleButton} 
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>
      
      {/* Enlace para ir a la pantalla de registro */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('Register')}
        disabled={loading}
      >
        <Text style={styles.link}>¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para los componentes de la pantalla de login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  googleButton: {
    backgroundColor: '#DB4437',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  link: {
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15,
  },
  linkBold: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
