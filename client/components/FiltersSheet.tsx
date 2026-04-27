import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, Platform } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, CATEGORIES } from "@/constants";

export type SortOption = "newest" | "price_asc" | "price_desc";

export type FiltersState = {
  sort: SortOption;
  category: string; // "All" | category name
  minPrice: string;
  maxPrice: string;
};

type Props = {
  visible: boolean;
  title?: string;
  showCategory?: boolean;
  value: FiltersState;
  onChange: (next: FiltersState) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
};

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className={`px-4 py-2 rounded-full border ${
        selected ? "bg-primary border-primary" : "bg-white border-border"
      }`}
    >
      <Text className={`font-medium ${selected ? "text-white" : "text-primary"}`}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function FiltersSheet({
  visible,
  title = "Filters",
  showCategory = true,
  value,
  onChange,
  onClose,
  onReset,
  onApply,
}: Props) {
  const categories = ["All", ...CATEGORIES.map((c) => c.name)];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1">
        <TouchableOpacity activeOpacity={1} onPress={onClose} className="flex-1 bg-black/40" />

        <View
          className="bg-white rounded-t-3xl px-5 pt-5 pb-6"
          style={{
            paddingBottom: Platform.OS === "ios" ? 28 : 18,
          }}
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-primary text-xl font-extrabold">{title}</Text>
            <TouchableOpacity onPress={onClose} className="p-2 -mr-2">
              <Ionicons name="close" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="max-h-[520px]">
            <Text className="text-primary font-bold mb-3">Sort By</Text>
            <View className="flex-row flex-wrap gap-3 mb-6">
              <Chip
                label="Newest"
                selected={value.sort === "newest"}
                onPress={() => onChange({ ...value, sort: "newest" })}
              />
              <Chip
                label="Price: Low to High"
                selected={value.sort === "price_asc"}
                onPress={() => onChange({ ...value, sort: "price_asc" })}
              />
              <Chip
                label="Price: High to Low"
                selected={value.sort === "price_desc"}
                onPress={() => onChange({ ...value, sort: "price_desc" })}
              />
            </View>

            {showCategory && (
              <>
                <Text className="text-primary font-bold mb-3">Category</Text>
                <View className="flex-row flex-wrap gap-3 mb-6">
                  {categories.map((cat) => (
                    <Chip
                      key={cat}
                      label={cat}
                      selected={value.category === cat}
                      onPress={() => onChange({ ...value, category: cat })}
                    />
                  ))}
                </View>
              </>
            )}

            <Text className="text-primary font-bold mb-3">Price Range</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-2xl px-4 h-12 justify-center">
                <TextInput
                  value={value.minPrice}
                  onChangeText={(t) => onChange({ ...value, minPrice: t.replace(/[^\d.]/g, "") })}
                  placeholder="Min"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  className="text-primary"
                />
              </View>
              <View className="flex-1 bg-surface rounded-2xl px-4 h-12 justify-center">
                <TextInput
                  value={value.maxPrice}
                  onChangeText={(t) => onChange({ ...value, maxPrice: t.replace(/[^\d.]/g, "") })}
                  placeholder="Max"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  className="text-primary"
                />
              </View>
            </View>
          </ScrollView>

          <View className="flex-row gap-4 mt-6">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onReset}
              className="flex-1 border border-border rounded-full py-4 items-center"
            >
              <Text className="text-primary font-bold">Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onApply}
              className="flex-1 bg-primary rounded-full py-4 items-center"
            >
              <Text className="text-white font-bold">Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

