import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signUp, login } from '../services/authService';

export function Login({ type, navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    try {
      if (type === 'login') {
        await login(email, password);
        Alert.alert('Login Successful');
        // Navigate to home screen or dashboard
      } else if (type === 'signup') {
        await signUp(email, password, name);
        Alert.alert('Signup Successful');
        navigation.navigate('Login');  // Redirect to login after successful signup
      }
    } catch (error) {
      Alert.alert(`${type === 'login' ? 'Login' : 'Signup'} Failed`, (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{type === 'login' ? 'Login' : 'Signup'}</Text>
      {type === 'signup' && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={type === 'login' ? 'Login' : 'Signup'} onPress={handleAuth} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate(type === 'login' ? 'Signup' : 'Login')}>
        {type === 'login' ? 'Don\'t have an account? Sign up' : 'Already have an account? Login'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 8 },
  link: { marginTop: 15, color: '#007AFF', textAlign: 'center' },
});
