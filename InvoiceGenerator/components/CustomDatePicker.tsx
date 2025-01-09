/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import { useController } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type CustomDatePickerProps = {
  name: string;
  label: string;
};

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function CustomDatePicker({ name, label }: CustomDatePickerProps) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name });

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const handleConfirm = (selectedDate: Date) => {
    setIsDateTimePickerVisible(false);
    const formattedDate = formatDate(selectedDate);
    onChange(formattedDate);
  };

  const handleCancel = () => setIsDateTimePickerVisible(false);

  const todayFormatted = formatDate(new Date());

  useEffect(() => {
    if (!value) {
      if (name === 'date') {
        onChange(todayFormatted);
      }
    }
  }, [value, onChange]);

  return (
    <View className="gap-2">
      <Text className="text-lg">{label}</Text>
      <TextInput
        value={value}
        placeholder={label}
        onPressIn={() => setIsDateTimePickerVisible(true)}
        className="p-4 border border-gray-300 rounded"
      />
      {error && <Text className="text-red-500">{error.message}</Text>}
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="date"
        display="spinner"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        minimumDate={new Date()}
      />
    </View>
  );
}
