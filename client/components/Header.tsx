import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { HeaderProps } from '@/constants/types'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import {  useRouter } from 'expo-router'

export default function Header({
    title,
    showBack,
    showSearch, 
    showCart ,
    showMenu,
    showLogo,
    showSearchBar,
    searchValue,
    onSearchChangeText,
    onFilterPress,
    onMenuPress,
} : HeaderProps) {
    const router = useRouter();
    const {itemCount} = {itemCount: 6}; // Example cart item count
  return (
    <View className='bg-white'>
    <View className='flex-row items-center justify-between px-4 py-3 relative'>
      {/* left side */}
      <View className='flex-row items-center'>
{showBack && (
    <TouchableOpacity onPress={() => router.back()} className='mr-3'>
    <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
    </TouchableOpacity>
)}
{showMenu && (
    <TouchableOpacity className='mr-3' onPress={onMenuPress} activeOpacity={0.85}>
    <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
    </TouchableOpacity>
)}
      </View>

      {showLogo ? (
        <View className="absolute left-12 right-12 items-center">
          <Image source={require('@/assets/logo.png')} style={{ width: "100%", height: 24 }} resizeMode='contain' />
        </View>
      ) : title ? (
        <View className="absolute left-12 right-12 items-center">
          <Text className='text-xl font-bold text-primary text-center' numberOfLines={1}>
            {title}
          </Text>
        </View>
      ) : null}

      {/* right side */}
      <View className='flex-row items-center gap-4'>
{showSearch && (
    <TouchableOpacity className='mr-3'>
    <Ionicons name="search-outline" size={24} color={COLORS.primary} />
    </TouchableOpacity>
)}
{showCart && (
    <TouchableOpacity onPress={()=> router.push('/(tabs)/cart')} className='mr-3'>
      <View className='relative'>
    <Ionicons name="bag-outline" size={24} color={COLORS.primary} />
    <View className='absolute -top-1 -right-1 bg-accent w-4 h-4 rounded-full items-center justify-center'>
      <Text className='text-white text-[10px] font-bold'>{itemCount}</Text>
    </View>
    </View>
    </TouchableOpacity>
)}
      </View>
    </View>

    {showSearchBar && (
      <View className="px-4 pb-3">
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-surface border border-border rounded-2xl px-4 h-12">
            <Ionicons name="search-outline" size={20} color="#9CA3AF" />
            <TextInput
              value={searchValue}
              onChangeText={onSearchChangeText}
              placeholder="Search products..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-3 text-primary"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onFilterPress}
            className="w-12 h-12 rounded-2xl bg-primary items-center justify-center"
          >
            <Ionicons name="options-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    )}
    </View>
  )
}