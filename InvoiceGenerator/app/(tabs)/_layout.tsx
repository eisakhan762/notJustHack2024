/* eslint-disable prettier/prettier */
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return <Tabs screenOptions={{
    // tabBarShowLabel: false,
    tabBarActiveTintColor: '#166534',
  }}>
    <Tabs.Screen name='index' options={{ title: 'Invoices', tabBarIcon: ({ color, size }) => <FontAwesome6 name="file-invoice-dollar" size={size} color={color} /> }} />
    <Tabs.Screen name='profile' options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <FontAwesome6 name="user-astronaut" size={size} color={color} /> }} />
  </Tabs>
}