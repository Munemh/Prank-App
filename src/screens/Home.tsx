import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import { createPrankEvent } from '../services/prankService';

export function Home({ navigation }: any) {
  const [prankTriggered, setPrankTriggered] = useState(false);

  const triggerPrank = async () => {
    try {
      setPrankTriggered(true);
      // Save prank event to DB
      await createPrankEvent(true);
      Alert.alert('Prank Triggered!', 'The screen crack effect has been simulated.');
    } catch (error) {
      Alert.alert('Error', 'Failed to trigger prank effect. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Prank App!</Text>
      <Button title="Trigger Prank" onPress={triggerPrank} />
      {prankTriggered && (
        <Image
          source={require('../assets/cracked-screen.png')} // Your cracked screen image here
          style={styles.crackedScreen}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  crackedScreen: { width: 300, height: 500, marginTop: 20 },
});
