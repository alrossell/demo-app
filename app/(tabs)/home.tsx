import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";
import { auth, database } from "@/firebase"
import { useRootNavigationState, Redirect } from 'expo-router';

interface Post {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

const PostList: React.FC = () => {
  const user = auth.currentUser;

  if (user === null) {
    const rootNavigationState = useRootNavigationState();
    if (!rootNavigationState?.key) return null;
    return <Redirect href={'/'} />
  }
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const postListRef = ref(database, 'posts');

    onValue(postListRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsArray: Post[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setPosts(postsArray);
      } else {
        setPosts([]);
      }
    });

    return () => {
      onValue(postListRef, (snapshot) => { });
    };
  }, []);

  const renderPostItem = ({ item }: { item: Post }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text style={{ fontSize: 16, marginTop: 5 }}>{item.content}</Text>
      <Text style={{ fontSize: 14, color: '#888', marginTop: 5 }}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderPostItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PostList;
