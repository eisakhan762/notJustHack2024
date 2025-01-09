/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'
import { useController } from 'react-hook-form';

type CustomTextInputProps = {
  label: string;
  name: string;
} & TextInputProps;

const CustomTextInput = ({ label, name, ...props }: CustomTextInputProps) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error }
  } = useController({ name })

  return (
    <View className='gap-2'>
      <Text className='text-lg'>{label}</Text>
      <TextInput onChangeText={onChange}
        value={value?.toString()}
        onBlur={onBlur} {...props} className={`rounded border border-gray-300 p-4 ${props?.className}`}
      />
      {error?.message &&
        <Text className='text-red-500'>{error?.message}</Text>
      }
    </View>
  )
}

export default CustomTextInput
