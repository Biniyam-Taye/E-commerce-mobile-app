import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { dummyProducts } from "@/assets/assets";
import { COLORS } from "@/constants";

const { width } = Dimensions.get('window');

export default function ProductDetails() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const product = useMemo(() => {
    if (!id) return undefined;
    return dummyProducts.find((p) => p._id === id);
  }, [id]);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-primary text-lg font-bold mb-2">Product not found</Text>
          <TouchableOpacity onPress={() => router.back()} className="bg-primary px-5 py-3 rounded-full mt-4">
            <Text className="text-white font-bold">Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const categoryLabel = typeof product.category === "string" ? product.category : (product.category as any)?.name;
  const images = product.images?.length ? product.images : [];
  const activeImage = images[activeImageIndex] ?? images[0];

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} bounces={false}>

        {/* Header & Image Section */}
        <View className="relative bg-gray-100" style={{ height: 450 }}>
          {activeImage ? (
            <Image source={{ uri: activeImage }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <View className="w-full h-full items-center justify-center">
              <Ionicons name="image-outline" size={40} color="#999" />
            </View>
          )}

          {/* Floating Header Actions */}
          <View
            className="absolute top-0 left-0 right-0 flex-row justify-between px-4"
            style={{ paddingTop: Math.max(insets.top, 20) }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-sm shadow-gray-300"
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-sm shadow-gray-300"
            >
              <Ionicons name="heart-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Card (Overlaps the image) */}
        <View className="-mt-8 pt-8 px-6 bg-white rounded-t-[32px]" style={{ minHeight: 400 }}>

          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">{categoryLabel}</Text>
            <View className="flex-row items-center bg-amber-50 px-2 py-1 rounded-md">
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text className="text-xs font-bold text-amber-600 ml-1">{product.ratings?.average ?? 0}</Text>
              <Text className="text-xs text-amber-600/60 ml-1">({product.ratings?.count ?? 0})</Text>
            </View>
          </View>

          <Text className="text-2xl font-extrabold text-primary leading-8 mb-4">{product.name}</Text>

          <View className="flex-row items-baseline mb-6">
            <Text className="text-3xl font-extrabold text-primary">${product.price}</Text>
            {product.comparePrice ? (
              <Text className="text-base text-gray-400 line-through ml-3 font-medium">${product.comparePrice}</Text>
            ) : null}
          </View>

          <Text className="text-gray-500 leading-6 mb-8">{product.description}</Text>

          {/* Sizes */}
          {product.sizes?.length ? (
            <View className="mb-8">
              <Text className="text-primary font-bold text-base mb-4">Choose Size</Text>
              <View className="flex-row flex-wrap gap-3">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <TouchableOpacity
                      key={s}
                      onPress={() => setSelectedSize(s)}
                      className={`px-5 py-3 rounded-2xl items-center justify-center border ${isSelected ? 'border-primary bg-primary shadow-sm shadow-gray-400' : 'border-gray-100 bg-gray-50'}`}
                      style={{ minWidth: 64 }}
                    >
                      <Text className={`font-bold text-base ${isSelected ? 'text-white' : 'text-primary'}`}>{s}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ) : null}

          {/* Image Gallery Thumbnails */}
          {images.length > 1 && (
            <View className="mb-8">
              <Text className="text-primary font-bold text-base mb-">Gallery</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-2 px-2">
                {images.map((img, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <TouchableOpacity
                      key={`gallery_${idx}`}
                      onPress={() => setActiveImageIndex(idx)}
                      className={`mx-2 rounded-2xl overflow-hidden border-2 ${isActive ? "border-primary" : "border-transparent"}`}
                      style={{ width: 70, height: 70 }}
                    >
                      <Image source={{ uri: img }} className="w-full h-full bg-gray-100" resizeMode="cover" />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          <View className="h-10" />
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View
        className="px-6 py-4 bg-white border-t border-gray-100 flex-row gap-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <TouchableOpacity className="flex-1 bg-gray-100 rounded-full h-14 items-center justify-center flex-row">
          <Ionicons name="cart-outline" size={20} color={COLORS.primary} />
          <Text className="text-primary font-bold text-base ml-2">Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-primary rounded-full h-14 items-center justify-center">
          <Text className="text-white font-bold text-base">Buy now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


