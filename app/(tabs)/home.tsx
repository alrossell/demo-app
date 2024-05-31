import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

import { getAuth } from "firebase/auth";
import { useRootNavigationState, Redirect } from 'expo-router';

export default function HomeScreen() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user === null) {
    const rootNavigationState = useRootNavigationState();
    if (!rootNavigationState?.key) return null;
    return <Redirect href={'/'} />
  }

  return (
    <View>
      <Text>
        hello
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
