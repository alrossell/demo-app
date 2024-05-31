import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native';
import { useRouter, useRootNavigationState, Redirect } from 'expo-router';
import { getAuth, signOut } from "firebase/auth";

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { auth } from '../../firebase.js';

export default function OtherScreen() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  if (user === null) {
    const rootNavigationState = useRootNavigationState();
    if (!rootNavigationState?.key) return null;
    return <Redirect href={'/'} />
  }

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      router.push('/');
    }).catch((error) => {
      // TODO: Add error handling
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
