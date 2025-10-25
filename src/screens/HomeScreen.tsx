import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Pantalla principal de la aplicación
 * Muestra información del usuario autenticado y permite cerrar sesión
 */
export default function HomeScreen({ navigation }: any) {
  // Obtener el usuario actualmente autenticado
  const user = auth.currentUser;

  /**
   * Maneja el cierre de sesión del usuario
   * Muestra una confirmación antes de proceder
   */
  const handleLogout = async () => {
    // Mostrar alerta de confirmación
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              // Cerrar sesión en Firebase
              await signOut(auth);
              navigation.replace('Login');
            } catch (error: any) {
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con saludo y email del usuario */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Bienvenido! 👋</Text>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        {/* Tarjeta de confirmación de login exitoso */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎉 Login Exitoso</Text>
          <Text style={styles.cardText}>
            Has iniciado sesión correctamente con Firebase Authentication.
          </Text>
        </View>

        {/* Tarjeta con información del perfil del usuario */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📱 Tu Perfil</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID:</Text>
            <Text style={styles.infoValue} numberOfLines={1}>
              {user?.uid}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Verificado:</Text>
            <Text style={styles.infoValue}>
              {user?.emailVerified ? '✅ Sí' : '❌ No'}
            </Text>
          </View>
        </View>
      </View>

      {/* Botón para cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para los componentes de la pantalla principal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 30,
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  cardText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    width: 80,
  },
  infoValue: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    margin: 20,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
