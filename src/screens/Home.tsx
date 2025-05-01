import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { createPrankEvent } from '../services/prankService';
import AboutScreen from './About';
import Button from '../components/Button';
import { logout } from '../services/authService';

export function Home({ navigation, onLogoutSuccess }: any) {
  const [prankTriggered, setPrankTriggered] = useState(false);

  const triggerPrank = async () => {
    try {
      setPrankTriggered(true);
      navigation.navigate("Prank")
      // await createPrankEvent(true);
      // Alert.alert('Prank Triggered!', 'The screen crack effect has been simulated.');
    } catch (error) {
      Alert.alert('Error', 'Failed to trigger prank effect. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Prank App!</Text>
      <Button
        title="Trigger Prank" onPress={triggerPrank}
        width={200}
        height={60}
        backgroundColor="#28a745"
        textStyle={{ fontSize: 18 }}
      />
      <Button title="About Screen" onPress={() => { navigation.navigate("About") }} style={{ margin: 10 }} />
      <Button title="Logout" onPress={() => {
        logout()
        onLogoutSuccess?.()
      }} style={{ margin: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  crackedScreen: { width: 300, height: 500, marginTop: 20 },
});
