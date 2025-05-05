import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';

const logo = require('../assets/logo.png');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to sign in');
      navigation.navigate('OxygenLevel');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Sign in to your account</Text>
      <Text style={styles.subtitle}>
        Or{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
          create a new account
        </Text>
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign in</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 16 },
  logo: { width: 120, height: 120, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a202c' },
  subtitle: { fontSize: 14, color: '#4b5563', marginBottom: 16 },
  link: { color: '#4f46e5', fontWeight: 'bold' },
  input: { width: '100%', maxWidth: 350, backgroundColor: '#f9fafb', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#d1d5db', color: '#1a202c' },
  button: { width: '100%', maxWidth: 350, backgroundColor: '#4f46e5', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: '#dc2626', marginBottom: 8 },
});

export default LoginScreen; 