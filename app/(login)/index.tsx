import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText'

import { auth, database } from '../../firebase.js'
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(' ');

  const router = useRouter();
  const auth = getAuth();

  // TODO: why is this breaking things
  const db = database;

  function handleLogin() {
    console.log("Handling Login")

    signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
        const user = userCredential.user;
        router.push('(tabs)/home');
      })
      .catch((error) => {
        setErrorText("Incorrect Password/Email");
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleLogin} title="Login" />
      <Text style={styles.label}>{errorText}</Text>
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

export default LoginScreen;

