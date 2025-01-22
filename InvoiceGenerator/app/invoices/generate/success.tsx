/* eslint-disable prettier/prettier */
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { shareAsync } from "expo-sharing";
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet, Modal, Share, TouchableOpacity } from "react-native";

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
              <View className="items-center justify-center flex-1 bg-black/50">
                <View className="p-6 bg-white rounded-lg shadow-lg w-80">
                  {/* Cancel Icon */}
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 10,
                    }}
                  >
                    <Ionicons name="close-circle" size={28} color="#FF6347" />
                  </TouchableOpacity>

                  <Text className="mb-4 text-lg font-bold text-center">Share Invoice</Text>

                  {/* Icon Actions */}
                  <View className="flex-row justify-around mt-4">
                    <TouchableOpacity
                      onPress={shareAsText}
                      className="items-center"
                    >
                      <MaterialCommunityIcons name="text-box-outline" size={40} color="#6200ea" />
                      <Text className="mt-2 text-sm text-gray-700">Send as Text</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={shareAsPdf}
                      className="items-center"
                    >
                      <MaterialCommunityIcons name="file-pdf-box" size={40} color="#e63946" />
                      <Text className="mt-2 text-sm text-gray-700">Send as PDF</Text>
                    </TouchableOpacity>
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
