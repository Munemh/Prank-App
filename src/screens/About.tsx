import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, Button, StyleSheet } from 'react-native';
import { RootStackParamList } from '../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const AboutScreen = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>();

  return (
    <ScrollView  style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to Prank App</Text>
      <Text style={styles.paragraph}>
        Welcome to Prank App, the ultimate prank tool for your friends! This app simulates unexpected phone glitches, including random ghost touches and screen crack effects, all designed to surprise and prank your friends.
      </Text>

      <Text style={styles.subHeader}>How to Demo and Test the Prank</Text>
      <Text style={styles.paragraph}>
        1. Sign Up or Login to the app.{'\n'}
        2. Trigger the prank by pressing the "Trigger Pranking" button.{'\n'}
        3. Watch as ghost touches and screen crack effects surprise you!
      </Text>

      <Text style={styles.subHeader}>Features</Text>
      <Text style={styles.paragraph}>
        - Ghost Touches: Random touches and swipes that seem to come from nowhere.{'\n'}
        - Screen Crack Effect: A realistic screen crack illusion.{'\n'}
        - Realistic Glitches: Random events that make the phone appear malfunctioning.
      </Text>

      <Text style={styles.subHeader}>Feedback</Text>
      <Text style={styles.paragraph}>
        We value your feedback! Contact us at Munem.habib1@gmail.com.
      </Text>

      <Button title="Back to Home" onPress={() => { navigation.navigate("Home"); }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
});

export default AboutScreen;
