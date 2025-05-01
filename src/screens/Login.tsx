import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signUp, login } from '../services/authService';

export function Login({ navigation, route, onLoginSuccess, type }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (type === 'signup' && !name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validate()) return;

    try {
      if (type === 'login') {
        await login(email, password);
        Alert.alert('Login Successful');
        onLoginSuccess();
      } else if (type === 'signup') {
        await signUp(email, password, name);
        Alert.alert('Signup Successful');
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert(`${type === 'login' ? 'Login' : 'Signup'} Failed`, (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{type === 'login' ? 'Login' : 'Signup'}</Text>

      {type === 'signup' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <Button title={type === 'login' ? 'Login' : 'Signup'} onPress={handleAuth} />
      <Text
        style={styles.link}
        onPress={() => {
          navigation.navigate(type === 'login' ? 'Signup' : 'Login');
        }}>
        {type === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 4, borderRadius: 8 },
  errorText: { color: 'red', marginBottom: 8, marginLeft: 4 },
  link: { marginTop: 15, color: '#007AFF', textAlign: 'center' },
});
