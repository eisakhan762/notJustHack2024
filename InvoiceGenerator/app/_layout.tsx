/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import '../global.css';

import { Stack } from 'expo-router';
import { persist } from 'zustand/middleware';
import { useStore } from '~/store';
import { ActivityIndicator } from 'react-native';

export default function Layout() {
  const [hydrationFinished, setHydrationFinished] = useState(false);

  useEffect(() => {
    const unsub = useStore.persist.onFinishHydration((state: any) => {
      console.log("hydration finished", state);
      setHydrationFinished(true);
    })
    return () => unsub();
  }, [])
  if (!hydrationFinished) {
    return <ActivityIndicator />
  }
  return <Stack screenOptions={{headerShown: false}} >
    <Stack.Screen name='index' options={{headerShown: false, animation: "fade"}}/>
    <Stack.Screen name='(tabs)' options={{headerShown: false, animation: "fade"}}/>
    <Stack.Screen name='onboarding' options={{headerShown: false, animation: "fade"}}/>
    <Stack.Screen name='invoices/generate' options={{headerShown: false}}/>
  </Stack>
}
