/* eslint-disable prettier/prettier */
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "~/components/Button";

export default function Welcome() {
  return (
    <View className="justify-center flex-1 p-8 bg-gray-50">
      <View className="items-center gap-4">
        {/* App Title */}
        <Text className="text-4xl font-bold text-center text-blue-600">
          Welcome to Seth Ji
        </Text>
        {/* Subtitle */}
        <Text className="text-lg text-center text-gray-600">
          Manage your business stock, invoices, and insights effortlessly.
        </Text>
      </View>

      {/* Feature Highlights */}
      <View className="gap-6 mt-8">
        <Text className="text-lg font-semibold text-gray-800">
          Key Features:
        </Text>
        <Text className="text-base text-gray-700">- Stock Management</Text>
        <Text className="text-base text-gray-700">
          - Generate PDF & Text Invoices
        </Text>
        <Text className="text-base text-gray-700">
          - Monthly Sales Insights
        </Text>
        <Text className="text-base text-gray-700">
          - Track Trending & Low Stock Items
        </Text>
        <Text className="text-base text-gray-700">- And many more...</Text>
      </View>
      <Button className="mt-4" title="Get Started" onPress={() => router.push("/onboarding/profile")} />
    </View>
  );
}
