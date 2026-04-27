import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { dummyProducts } from "@/assets/assets";
import { COLORS } from "@/constants";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = useMemo(() => {
    if (!id) return undefined;
    return dummyProducts.find((p) => p._id === id);
  }, [id]);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
        <View className="px-4 py-3 flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text className="text-base font-bold text-primary ml-2">Product</Text>
        </View>

        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-primary text-lg font-bold mb-2">Product not found</Text>
          <Text className="text-gray-500 text-center mb-6">
            This product may have been removed or the link is invalid.
          </Text>
          <TouchableOpacity onPress={() => router.back()} className="bg-primary px-5 py-3 rounded-full">
            <Text className="text-white font-bold">Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const categoryLabel = typeof product.category === "string" ? product.category : product.category?.name;
  const images = product.images?.length ? product.images : [];
  const activeImage = images[activeImageIndex] ?? images[0];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="px-4 py-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text className="text-base font-bold text-primary ml-2" numberOfLines={1}>
            {product.name}
          </Text>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="heart-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4">
          <View className="rounded-2xl overflow-hidden bg-gray-100">
            {activeImage ? (
              <Image source={{ uri: activeImage }} className="w-full h-80" resizeMode="cover" />
            ) : (
              <View className="w-full h-80 items-center justify-center">
                <Ionicons name="image-outline" size={36} color="#999" />
                <Text className="text-gray-500 mt-2">No image</Text>
              </View>
            )}
          </View>

          {images.length > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 -mx-1">
              {images.map((img, idx) => {
                const isActive = idx === activeImageIndex;
                return (
                  <TouchableOpacity
                    key={`${product._id}_${idx}`}
                    onPress={() => setActiveImageIndex(idx)}
                    className={`mx-1 rounded-xl overflow-hidden border ${isActive ? "border-primary" : "border-gray-200"}`}
                    style={{ width: 64, height: 64 }}
                  >
                    <Image source={{ uri: img }} className="w-full h-full" resizeMode="cover" />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          <View className="mt-4">
            <Text className="text-xs text-gray-500 mb-1">{categoryLabel}</Text>
            <Text className="text-2xl font-bold text-primary">{product.name}</Text>

            <View className="flex-row items-center mt-2">
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text className="text-sm font-bold ml-1 text-primary">{product.ratings.average}</Text>
              <Text className="text-sm text-gray-400 ml-1">({product.ratings.count})</Text>
            </View>

            <View className="flex-row items-baseline mt-3">
              <Text className="text-2xl font-bold text-primary">${product.price}</Text>
              {product.comparePrice ? (
                <Text className="text-sm text-gray-400 line-through ml-2">${product.comparePrice}</Text>
              ) : null}
            </View>

            <Text className="text-gray-600 mt-4 leading-5">{product.description}</Text>

            {product.sizes?.length ? (
              <View className="mt-5">
                <Text className="text-primary font-bold mb-2">Sizes</Text>
                <View className="flex-row flex-wrap">
                  {product.sizes.map((s) => (
                    <View key={s} className="border border-gray-200 rounded-full px-4 py-2 mr-2 mb-2">
                      <Text className="text-primary font-medium">{s}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}

            <View className="h-6" />
          </View>
        </View>
      </ScrollView>

      <View className="px-4 py-3 border-t border-gray-100 bg-white">
        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 border border-gray-200 rounded-full py-3 items-center">
            <Text className="text-primary font-bold">Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-primary rounded-full py-3 items-center">
            <Text className="text-white font-bold">Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

