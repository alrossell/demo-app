import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";

import { useRootNavigationState, Redirect } from 'expo-router';
import { auth, database } from '@/firebase';

export default function HomeScreen() {
  const user = auth.currentUser;

  if (user === null) {
    const rootNavigationState = useRootNavigationState();
    if (!rootNavigationState?.key) return null;
    return <Redirect href={'/'} />
  }


  const userId = user?.uid;

  const starCountRef = ref(database, 'users/' + userId);

  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });

  return (
    <View>
      <Text>
        hello
      </Text>
    </View>
  );
}

