import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { useState } from 'react';
import { ref, set, onValue, push } from "firebase/database";
import { useRootNavigationState, Redirect } from 'expo-router';

import { auth, database } from "@/firebase";

export default function TabTwoScreen() {
  const user = auth.currentUser;
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');

  function handleDataSubmit() {
    console.log("Handling Data Submission");
    const userId = user?.uid;

    const postListRef = ref(database, 'posts');
    const newPostRef = push(postListRef);

    const postData = {
      title: text,
      content: number,
      author: userId,
      timestamp: Date.now()
    };

    set(newPostRef, postData)
      .then(() => {
        console.log("New post added successfully!");
      })
      .catch((error) => {
        console.error("Error adding new post: ", error);
      });
  }

  if (user === null) {
    const rootNavigationState = useRootNavigationState();
    if (!rootNavigationState?.key) return null;
    return <Redirect href={'/'} />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Input-1</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={onChangeText}
      />
      <Text style={styles.label}>Input-2</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={onChangeNumber}
      />
      <Button onPress={handleDataSubmit} title="Hello" />
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
