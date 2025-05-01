import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import { Audio } from 'expo-av';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'
import { createPrankEvent } from '../services/prankService';

type PrankScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Prank() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [image, setImage] = useState(require('../assets/broken1.png'));
  const [soundFile, setSoundFile] = useState(require('../assets/banshee-ghostly.mp3'));
  const [isPlayingInitialSound, setIsPlayingInitialSound] = useState(true);

  const navigation = useNavigation<PrankScreenNavigationProp>();

  const playSound = async (file: any) => {
    const { sound } = await Audio.Sound.createAsync(file);
    setSound(sound);
    await sound.playAsync();
    return sound;
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const handleTouch = () => {
    if (isPlayingInitialSound) return;
    stopSound();
    if (image === require('../assets/broken1.png')) {
      setImage(require('../assets/broken2.png'));
      setSoundFile(require('../assets/whisper.mp3'));
    } else if (image === require('../assets/broken2.png')) {
      setImage(require('../assets/broken3.png'));
      setSoundFile(require('../assets/spooky-howling.mp3'));

    } else {
      setImage(require('../assets/broken1.png'));
      setSoundFile(require('../assets/banshee-ghostly.mp3'));
    }
    playSound(soundFile);
  };

  const savePrank = async () => {
    createPrankEvent(image, true)
  };

  useEffect(() => {
    playSound(soundFile).then(() => {
      setIsPlayingInitialSound(false);
    });
  }, [soundFile]);

  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       stopSound();
  //     };
  //   }, [sound])
  // );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleTouch}>
          <Image source={image} style={styles.crackedScreen} />
        </TouchableWithoutFeedback>
        <Text style={styles.instructions}>Touch the screen to trigger a new prank!</Text>
        <Button title="Save Prank" disabled={isPlayingInitialSound}
          onPress={savePrank}
          style={{ width: '50%' }}
        />
        <View style={{ marginVertical: 10 }} />
        <Button title="Back to Home" disabled={isPlayingInitialSound}
          style={{ width: '50%' }}
          onPress={() => {
            stopSound();
            navigation.navigate('Home');
          }} />
        {isPlayingInitialSound && (
          <View style={styles.blocker}>
            <ActivityIndicator size="large" color="red" />
            <Text style={styles.loadingText}>Preparing your prank...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',
  },
  crackedScreen: {
    width: 300,
    height: 500,
    marginTop: 20,
  },
  instructions: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  blocker: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});
