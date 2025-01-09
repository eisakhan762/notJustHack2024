/* eslint-disable prettier/prettier */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { shareAsync } from "expo-sharing";
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

import { Button } from "~/components/Button";
import { Invoice } from "~/schema/invoice";
import { useStore } from "~/store";
import { generateInvoicePdf } from "~/utils/pdf";


export default function Success() {
  const invoice = useStore((data) => data.newInvoice);
  const subTotal = useStore((data) => data.getSubtotal());
  const total = useStore((data) => data.getTotal());
  const animation = useRef<LottieView>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGeneratePdf();
    }, 500); // Ensures the loader is shown for at least 2.5 seconds

    return () => clearTimeout(timer); // Cleanup timeout when component unmounts
  }, []);

  const handleGeneratePdf = async () => {
    const uri = await generateInvoicePdf(invoice as Invoice, subTotal, total);
    if (uri) {
      setPdfUri(uri);
      animation.current?.play();
    } else {
      console.error("Failed to generate PDF");
    }
    setIsLoading(false); // Ends loading state
  };

  const handleShare = async () => {
    if (!pdfUri) {
      return;
    }
    await shareAsync(pdfUri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <View className="items-center justify-center flex-1 p-4">
      <LottieView
        loop={false}
        ref={animation}
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#eee',
          zIndex: -100,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../../assets/party.json')}
      />
      {isLoading ? (
        <View className="items-center gap-4 mb-8">
          <ActivityIndicator size={80} color="#6200ea" />
          <Text className="text-2xl font-bold text-center">Just a moment...</Text>
          <Text className="text-center text-gray-600">Hang tight while we craft your invoice. This won’t take long!</Text>
        </View>
      ) : (
        <>
          <View className="items-center gap-4 mb-8">
            <MaterialCommunityIcons name="check-circle" size={80} color="#5bc05c" />
            <Text className="text-2xl font-bold text-center">Your Invoice is Ready!</Text>
            <Text className="text-center text-gray-600">
              Everything’s set! You can now share your invoice or return to the home screen.
            </Text>
          </View>
          <View className="w-full gap-4">
            <Button title="Share Invoice" onPress={handleShare} />
            <Button
              title="Return to Home"
              onPress={() => {
                router.replace("/");
              }}
              variant="secondary"
            />
          </View>
        </>
      )}
    </View>
  );
}
