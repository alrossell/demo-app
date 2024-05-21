
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          tabBarStyle: {
            display: "none"
          }
        }}
      />
      <Tabs.Screen
        name="other"
        options={{
          title: 'Other',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'other' : 'other-outline'} color={color} />
          ),
          tabBarStyle: {
            display: "none"
          }
        }}
      />
    </Tabs>
  );
}
