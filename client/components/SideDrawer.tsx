import { View, Text, Modal, TouchableOpacity, Animated, Easing } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";

type DrawerItem = {
  label: string;
  icon: any;
  route?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SideDrawer({ visible, onClose }: Props) {
  const router = useRouter();
  const translateX = useRef(new Animated.Value(-320)).current;

  useEffect(() => {
    if (!visible) return;
    translateX.setValue(-320);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [visible, translateX]);

  const items = useMemo<DrawerItem[]>(
    () => [
      { label: "Home", icon: "home-outline", route: "/(tabs)" },
      { label: "Shop", icon: "grid-outline", route: "/shop" },
      { label: "My Profile", icon: "person-outline", route: "/(tabs)/profile" },
      { label: "My Cart", icon: "bag-outline", route: "/(tabs)/cart" },
      { label: "Wishlist", icon: "heart-outline", route: "/(tabs)/favorite" },
      { label: "My Orders", icon: "receipt-outline", route: "/orders" },
      { label: "Settings", icon: "settings-outline", route: "/settings" },
    ],
    []
  );

  const closeWithAnimation = () => {
    Animated.timing(translateX, {
      toValue: -320,
      duration: 200,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) onClose();
    });
  };

  const onPressItem = (route?: string) => {
    closeWithAnimation();
    if (route) router.push(route as any);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeWithAnimation}
      statusBarTranslucent
    >
      <View className="flex-1 flex-row">
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: 300,
            height: "100%",
            alignSelf: "stretch",
          }}
          className="bg-white"
        >
          <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
            <View className="px-5 pt-6 pb-4 border-b border-gray-100">
              <View className="w-14 h-14 rounded-full bg-gray-200 items-center justify-center">
                <Ionicons name="person" size={28} color="#6B7280" />
              </View>
              <Text className="text-primary text-lg font-extrabold mt-4">Login / Sign Up</Text>
              <Text className="text-secondary mt-1">To access your account</Text>
            </View>

            <View className="px-4 py-4">
              {items.map((it) => (
                <TouchableOpacity
                  key={it.label}
                  activeOpacity={0.85}
                  onPress={() => onPressItem(it.route)}
                  className="flex-row items-center px-4 py-4 rounded-2xl"
                >
                  <Ionicons name={it.icon} size={20} color={COLORS.primary} />
                  <Text className="ml-4 text-base font-medium text-gray-700">{it.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="mt-auto border-t border-gray-100 px-4 py-6">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => onPressItem("/login")}
                className="flex-row items-center px-4 py-3"
              >
                <Ionicons name="log-in-outline" size={20} color={COLORS.primary} />
                <Text className="ml-4 text-base font-bold text-primary">Login</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>

        <TouchableOpacity activeOpacity={1} onPress={closeWithAnimation} className="flex-1 bg-black/30" />
      </View>
    </Modal>
  );
}

