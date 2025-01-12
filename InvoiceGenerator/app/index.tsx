/* eslint-disable prettier/prettier */
import { Stack, Link } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import { useStore } from '~/store';




export default function Home() {
  const existingNewInvoice = useStore(data => data.newInvoice);
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View className='justify-center flex-1 gap-8 p-4'>

        <View className='items-center gap-2'>
          <Text className='text-4xl font-bold'>Seth Ji</Text>
          <Text className='text-lg text-center text-gray-600'>
            Create and manage you business with Seth Ji.
          </Text>
        </View>
        <Link href={{ pathname: '/invoices/generate' }} asChild>
          <Button title={existingNewInvoice? "Resume Invoice" :"New Invoice"} />
        </Link>
      </View>

      {/* <Container>
        
      </Container> */}
    </>
  );
}
