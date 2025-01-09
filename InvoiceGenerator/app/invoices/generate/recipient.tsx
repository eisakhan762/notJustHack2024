/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "~/components/Button";
import CustomTextInput from "~/components/CustomTextInput";
import { BusinessEntity, businessEntitySchema } from '~/schema/invoice';
import { useStore } from '~/store';



export default function GenerateInvoice() {
  const addRecipientInfo = useStore(data => data.addRecipientInfo);
  const recipient = useStore((data) => data.newInvoice?.recipient);
  const form = useForm<BusinessEntity>({
    resolver: zodResolver(businessEntitySchema),
    defaultValues: {
      name: recipient?.name || "Customer Name",
      address: recipient?.address || "Customer Address",
      taxID: recipient?.taxID || "Tax ID (Optional)",
    }
  });

  const onSubmit = (data: any) => {
    addRecipientInfo(data);
    router.push('/invoices/generate/invoice-info');
  };

  return (
    <SafeAreaView edges={['bottom']} className='flex-1 p-4'>
      <Text className='mb-5 text-2xl font-bold'>Recipient Info</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        className='flex-1'
      >
        <ScrollView>
          <FormProvider {...form}>
            <View className='gap-4'>
              <CustomTextInput name='name' label='Name' />
              <CustomTextInput name='address' label='Address' multiline />
              <CustomTextInput name='taxID' label='Tax ID' />
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
