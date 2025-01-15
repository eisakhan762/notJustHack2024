/* eslint-disable prettier/prettier */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { shareAsync } from "expo-sharing";
import LottieView from 'lottie-react-native';
import React,{ useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet, Modal, Share } from "react-native";

import { Button } from "~/components/Button";
import { Invoice } from "~/schema/invoice";
import { useStore } from "~/store";
import { generateInvoicePdf, generateInvoiceText } from "~/utils/pdf";


export default function Success() {
  const invoice = useStore((data) => data.newInvoice);
  const subTotal = useStore((data) => data.getSubtotal());
  const total = useStore((data) => data.getTotal());
  const animation = useRef<LottieView>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGeneratePdf();
      // generateInvoiceText(invoice as Invoice, subTotal, total)
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleGeneratePdf = async () => {
    const uri = await generateInvoicePdf(invoice as Invoice, subTotal, total);
    if (uri) {
      setPdfUri(uri);
      animation.current?.play();
    } else {
      console.error("Failed to generate PDF");
    }
    setIsLoading(false);
  };

  const shareAsPdf = async () => {
    if (!pdfUri) {
      return;
    }
    await shareAsync(pdfUri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const shareAsText = async () => {
    if (!pdfUri) {
      return;
    }
    const text = await generateInvoiceText(invoice as Invoice, subTotal, total);
    console.log(text);
    
    await Share.share({
      message: text,
    })
  }

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
          <View className="items-center justify-center flex-1 gap-4 mb-8">
            <MaterialCommunityIcons name="check-circle" size={80} color="#5bc05c" />
            <Text className="text-2xl font-bold text-center">Your Invoice is Ready!</Text>
            <Text className="text-center text-gray-600">
              Everything’s set! You can now share your invoice or return to the home screen.
            </Text>
          </View>
          <View className="w-full gap-4">
            <Button title="Share Invoice" onPress={() => setModalVisible(true)} />
            <Modal
              animationType="slide"
              transparent
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View className="items-center justify-center flex-1">
                <View className="p-6 bg-white rounded-lg shadow-lg w-80">
                  <View className="flex justify-between">
                  <Button
                    title="Send as text"
                    variant="link"
                    onPress={shareAsText}
                    className="mt-4"
                  />
                  <Button
                    title="Send as pdf"
                    variant="link"
                    onPress={shareAsPdf}
                    className="mt-4"
                  />
                  </View>
                </View>
              </View>
            </Modal>
            <Button
              title="Return to Home"

              onPress={() => {
                router.replace("/");
              }}
              variant="link"
            />
          </View>
        </>
      )}
    </View>
  );
}
