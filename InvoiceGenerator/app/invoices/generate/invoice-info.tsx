/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from 'zod';

import { Button } from "~/components/Button";
import CustomTextInput from "~/components/CustomTextInput";
import { InvoiceInfo, invoiceInfoSchema } from '~/schema/invoice';
import { useStore } from '~/store';



export default function GenerateInvoice() {
  const addInvoiceInfo = useStore(data => data.addInvoiceInfo);
  const formatToDDMMYYYY = (date: Date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const form = useForm<InvoiceInfo>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      invoiceNumber: '74817283471',
      date: formatToDDMMYYYY(new Date()),
      dueDate: formatToDDMMYYYY(new Date(new Date().setDate(new Date().getDate() + 14))),
    }
  });

  const onSubmit = (data: any) => {
    addInvoiceInfo(data);
    router.push('/invoices/generate/items');
  };

  return (
    <SafeAreaView edges={['bottom']} className='flex-1 p-4'>
      <Text className='mb-5 text-2xl font-bold'>Invoice Info</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        className='flex-1'
      >
        <ScrollView>
          <FormProvider {...form}>
            <View className='gap-4'>
              <CustomTextInput
                label='Invoice Number'
                name='invoiceNumber'
              />
              <CustomTextInput
                label='Date'
                name='date'
              />
              <CustomTextInput
                label='Due Date'
                name='dueDate'
              />
            </View>
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submit Button */}
      <Button
        className='mt-10'
        title='Next'
        onPress={form.handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
}
