import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, PROFILE_MENU } from '@/constants'
import { useRouter } from 'expo-router'

export default function Profile() {
  const router = useRouter();

  const user = {
    name: "Bini",
    email: "bini@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
  }

  return (
    <SafeAreaView className='flex-1 bg-white' edges={['top']}>
      <Header title='Profile' />
      
      <ScrollView className='flex-1 px-4'>
        {/* User Info */}
        <View className='items-center py-6'>
          <View className='relative'>
            <Image 
              source={{ uri: user.avatar }} 
              className='w-24 h-24 rounded-full'
            />
            <TouchableOpacity className='absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-white'>
              <Ionicons name="camera-outline" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text className='text-xl font-bold mt-4 text-primary'>{user.name}</Text>
          <Text className='text-gray-500'>{user.email}</Text>
        </View>

        {/* Menu Items */}
        <View className='mt-4'>
          {PROFILE_MENU.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              className='flex-row items-center justify-between py-4 border-b border-gray-100'
              onPress={() => item.route !== '/' && router.push(item.route as any)}
            >
              <View className='flex-row items-center'>
                <View className={`w-10 h-10 rounded-xl items-center justify-center mr-4 ${item.bg || 'bg-gray-50'}`}>
                  <Ionicons name={item.icon as any} size={20} color={item.color || COLORS.primary} />
                </View>
                <Text className='text-base font-bold text-gray-800'>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity className='flex-row items-center justify-center mt-10 mb-10 py-4 bg-red-50 rounded-2xl'>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text className='ml-2 text-base font-bold text-error'>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}