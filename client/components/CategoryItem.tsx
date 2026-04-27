import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import { useRouter } from 'expo-router'

interface CategoryItemProps {
  id: string | number;
  name: string;
  icon: string;
}

export default function CategoryItem({ id, name, icon }: CategoryItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className='items-center mr-6'
      activeOpacity={0.85}
      onPress={() => router.push(`/category/${encodeURIComponent(name)}`)}
    >
      <View className='w-14 h-14 rounded-full bg-gray-100 items-center justify-center mb-2'>
        <Ionicons name={icon as any} size={24} color={COLORS.primary} />
      </View>
      <Text className='text-xs font-medium text-gray-700'>{name}</Text>
    </TouchableOpacity>
  )
}
