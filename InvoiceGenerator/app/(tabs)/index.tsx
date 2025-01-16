/* eslint-disable prettier/prettier */
import { Stack, Link, router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { Button } from '~/components/Button';
import { useStore } from '~/store';




export default function Home() {
  const existingNewInvoice = useStore(data => data.newInvoice);
  const startNewInvoice = useStore((data) => data.startNewInvoice)

  const onNewInvoice = () => {
    startNewInvoice();
    router.push('/invoices/generate')
  }

  const onResumeInvoice = () => {
    router.push('/invoices/generate')
  }
  return (
    <>
      <View className='justify-center flex-1 gap-8 p-4'>

        <View className='items-center gap-2'>
          <Text className='text-4xl font-bold'>Seth Ji</Text>
          <Text className='text-lg text-center text-gray-600'>
            Create and manage you business with Seth Ji.
          </Text>
        </View>
        <Button title="New Invoice" onPress={onNewInvoice} />
        {existingNewInvoice &&
          <Button variant='link' title="Resume Invoice" onPress={onResumeInvoice} />
        }
      </View>

      {/* <Container>
        
      </Container> */}
    </>
  );
}
