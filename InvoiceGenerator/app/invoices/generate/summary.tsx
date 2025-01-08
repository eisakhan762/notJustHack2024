/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/Button";
import { useStore } from "~/store";
import { generateInvoicePdf } from "~/utils/pdf";
import { Invoice } from '~/schema/invoice';
import { Link } from "expo-router";

export default function InvoiceSummary() {
  const invoice = useStore(data => data.newInvoice);
  const subTotal = useStore((data) => data.getSubtotal())
  const total = useStore((data) => data.getTotal())


  const handleGeneratePdf = () => {
    // generateInvoicePdf(invoice as Invoice, subTotal, total);
  }
  return (
    <SafeAreaView edges={['bottom']} className="flex-1 p-4">
      {/* <Text>Invoice Summary</Text> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        className="flex-1">
        <ScrollView>
          <View className="flex-1 gap-4">

            {/* Invoice Details Card */}
            {/* <View>
              <Text className="mb-2 text-lg font-semibold color-slate-500">Invoice Details</Text>
              <View className="p-4 rounded-lg bg-gray-50">
                <Text>Invoice #: INV-{invoice.invoiceNumber}</Text>
                <Text>Date: {invoice.date}</Text>
                <Text>Due Date: {invoice.dueDate}</Text>
              </View>
            </View> */}
            <View className="mb-8">
              <Text className="text-4xl font-bold">#: INV-{invoice.invoiceNumber}</Text>
              <View className="flex-row justify-between mt-4">
                <View>
                  <Text className="text-sm text-gray-500">Date</Text>
                  <Text className="text-base">{invoice.date}</Text>
                </View>
                <View>
                  <Text className="text-sm text-gray-500">Due Date</Text>
                  <Text className="text-base">{invoice.dueDate}</Text>
                </View>
              </View>
            </View>

            {invoice.sender &&
              // Sender Information
              <View>
                <Text className="mb-2 text-lg font-semibold color-slate-500">Sender</Text>

                <View className="p-4 rounded-lg bg-gray-50">
                  <Text>{invoice.sender.name}</Text>
                  <Text>{invoice.sender.address}</Text>
                  <Text>{invoice.sender.taxID}</Text>
                </View>
              </View>
            }


            {/* Recipient Information */}
            {invoice.recipient &&
              <View>
                <Text className="mb-2 text-lg font-semibold color-slate-500">Recipient</Text>
                <View className="p-4 rounded-lg bg-gray-50">
                  <Text>{invoice.recipient.name}</Text>
                  <Text>{invoice.recipient.address}</Text>
                  <Text>{invoice.recipient.taxID}</Text>
                </View>
              </View>
            }



            {/* Items Card */}
            <View>
              <Text className="mb-2 text-lg font-semibold color-slate-500">Items</Text>
              <View className="p-4 rounded-lg bg-gray-50">
                <View className="gap-3">
                  {/* header */}
                  <View className="flex-row justify-between">
                    <Text className="flex-1 font-medium">Item Name</Text>
                    <Text className="w-20 font-medium text-right">Qty</Text>
                    <Text className="w-20 font-medium text-right">Price</Text>
                    <Text className="w-24 font-medium text-right">Total</Text>
                  </View>

                  {/* Sample Items */}
                  {invoice.items?.map(item => (
                    <View key={item.name} className="flex-row justify-between">
                      <Text className="flex-1">{item.name}</Text>
                      <Text className="w-20 text-right">{item.quantity}</Text>
                      <Text className="w-20 text-right">₹{item.price}</Text>
                      <Text className="w-24 text-right">₹{Number(item.price) * Number(item.quantity)}</Text>
                    </View>
                  ))}


                  {/* <View className="flex-row justify-between">
                  <Text className="flex-1">Development Hours</Text>
                  <Text className="w-20 text-right">20</Text>
                  <Text className="w-20 text-right">$100</Text>
                  <Text className="w-24 text-right">$2,000</Text>
                </View> */}
                </View>
              </View>
            </View>

            {/* Total Card */}
            <View>
              <Text className="mb-2 text-lg font-semibold color-slate-500">Totals</Text>
              <View className="p-4 rounded-lg bg-gray-50">
                <View className="gap-2">
                  <View className="flex-row justify-between">
                    <Text>Subtotal</Text>
                    <Text>₹{subTotal}</Text>
                  </View>
                  {/* <View className="flex-row justify-between">
                  <Text>Tax (0%)</Text>
                  <Text>₹0</Text>
                </View> */}

                  <View className="flex-row justify-between pt-2 border-t">
                    <Text className="font-semibold">Total</Text>
                    <Text className="font-semibold">₹{total}</Text>
                  </View>
                </View>
              </View>
            </View>
            <Link href="/invoices/generate/success" asChild>
              <Button title="Generate Invoice" className="mt-auto" />
            </Link>
          </View>
        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}