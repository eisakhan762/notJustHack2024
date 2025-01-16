/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "~/components/Button";
import CustomTextInput from "~/components/CustomTextInput";
import { BusinessEntity, businessEntitySchema } from '~/schema/invoice';
import { useStore } from '~/store'




export default function ProfileScreen() {
  const setProfile = useStore(data => data.setProfile);
  const setOnBoardingCompleted = useStore((data) => data.setOnboardingCompleted)
  const profile = useStore((data) => data.profile);
  const form = useForm<BusinessEntity>({
    resolver: zodResolver(businessEntitySchema),
    defaultValues: {
      name: profile?.name,
      address: profile?.address,
      taxID: profile?.taxID,
    }
  });

  const onSubmit = (data: any) => {
    setProfile(data);
    setOnBoardingCompleted()
    router.replace('/')
  };

  return (
    <SafeAreaView edges={['bottom']} className='flex-1 p-4'>
      <Text className='mb-5 text-2xl font-bold'>My Profile</Text>
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
        title='Save'
        onPress={form.handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
}
