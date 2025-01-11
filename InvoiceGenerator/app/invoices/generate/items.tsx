/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import { invoiceItemSchema } from '~/schema/invoice';
import { useStore } from '~/store';


const itemsSchema = z.object({
  items: invoiceItemSchema.array(),
});

type Items = z.infer<typeof itemsSchema>;

export default function GenerateInvoice() {
  const addItems = useStore((data) => data.addItems);
  const form = useForm<Items>({
    resolver: zodResolver(itemsSchema),
    defaultValues: {
      items: [{
        name: "Example",
        quantity: "1",
        price: "100",

      }]
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });
  console.log(fields);


  const onSubmit = (data: any) => {
    addItems(data.items);
    router.push('/invoices/generate/summary');
  };

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 p-4">
      {/* <Text className="mb-5 text-2xl font-bold">Items</Text> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        className="flex-1">
        <ScrollView>
          <FormProvider {...form}>
            <View className='gap-3'>
              {fields.map((_, index) => (
                <View key={`items.${index}.id`} className='gap-3 p-4 rounded-lg shadow bg-gray-50'>
                  <View className='flex-row justify-between'>
                  <Text className='text-lg font-semibold'>Item {index + 1}</Text>
                  <EvilIcons className='p-2' name="trash" size={26} color="red" onPress={() => remove(index)} />
                  </View>
                  <CustomTextInput
                    name={`items.${index}.name`} label='Name' />
                  <View className='flex-row gap-3'>
                    <View className='flex-1'>

                      <CustomTextInput
                        name={`items.${index}.price`}
                        label='Price'
                        keyboardType="decimal-pad"
                        onChangeText={(value) => {
                          if (/^\d*\.?\d*$/.test(value)) {
                            form.setValue(`items.${index}.price`, value);
                          }
                        }}
                      />
                    </View>
                    <View className='flex-1'>
                      <CustomTextInput
                        name={`items.${index}.quantity`}
                        label='Quantity'
                        keyboardType="decimal-pad"
                        onChangeText={(value) => {
                          if (/^\d*\.?\d*$/.test(value)) {
                            form.setValue(`items.${index}.quantity`, value);
                          }
                        }}

                      />
                    </View>

                    <View className="items-center justify-center flex-1">
                      <Text className="text-lg text-center">Total</Text>
                      <Text className="mt-2 text-lg font-bold text-center">
                        ₹{(
                          (Number(form.watch(`items.${index}.price`)) || 0) *
                          (Number(form.watch(`items.${index}.quantity`)) || 0)
                        ).toFixed(2)}

                      </Text>
                    </View>


                  </View>
                </View>
              ))}
            </View>
            <Button title='Add Item'
              className='mt-3'
              variant='link'
              onPress={() => {
                append({
                  name: '',
                  quantity: "1",
                  price: "0",
                });
                // const currentItems = form.getValues();
                // form.setValue(`items.${currentItems.items.length}`, {
                //   name: '',
                //   quantity: 1,
                //   price: 0,
                // })
              }} />
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submit Button */}
      <Button className="mt-10" title="Next" onPress={form.handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
}
