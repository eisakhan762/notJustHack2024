/* eslint-disable prettier/prettier */
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "~/components/Button";
import CustomDatePicker from "~/components/CustomDatePicker";
import CustomTextInput from "~/components/CustomTextInput";
import { InvoiceInfo, invoiceInfoSchema } from "~/schema/invoice";
import { useStore } from "~/store";

export default function GenerateInvoice() {
  const addInvoiceInfo = useStore((data) => data.addInvoiceInfo);

  const form = useForm<InvoiceInfo>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      invoiceNumber: `${String(new Date().getDate()).padStart(2, "0")}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getHours()).padStart(2, "0")}${String(new Date().getMinutes()).padStart(2, "0")}${String(new Date().getSeconds()).padStart(2, "0")}`,
      // date: new Date().toLocaleDateString(),
      // dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
    },
  });

  const onSubmit = (data: InvoiceInfo) => {
    addInvoiceInfo(data);
    router.push("/invoices/generate/recipient");
  };

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 p-4">
      <Text className="mb-5 text-2xl font-bold">Invoice Info</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="flex-1"
      >
        <ScrollView>
          <FormProvider {...form}>
            <View className="gap-4">
              <CustomTextInput label="Invoice Number" name="invoiceNumber" />
              {/* <CustomTextInput label="Date" name="date" /> */}
              <CustomDatePicker name="dueDate" label="Due Date (Optional)" />
              <CustomDatePicker name="date" label="Date" />
            </View>
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>

      <Button className="mt-10" title="Next" onPress={form.handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
}
