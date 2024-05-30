import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  return (
    <ThemedView>
        <ThemedText styles={styles.text}>HELLO</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "red"
  }
});
