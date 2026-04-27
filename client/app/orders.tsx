import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'

export default function Orders() {
  const dummyOrders = [
    {
      id: 'ORD-100234',
      date: 'Oct 12, 2026',
      status: 'Delivered',
      total: 120.50,
      items: 2,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'ORD-100235',
      date: 'Oct 05, 2026',
      status: 'Processing',
      total: 84.00,
      items: 1,
      image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'ORD-100236',
      date: 'Sep 28, 2026',
      status: 'Cancelled',
      total: 45.00,
      items: 1,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=200&auto=format&fit=crop',
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50 border-green-200';
      case 'Processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='My Orders' showBack />
      <ScrollView className='flex-1 px-4 py-4' showsVerticalScrollIndicator={false}>
        <View className='flex-col gap-4 mb-8'>
          {dummyOrders.map((order, index) => (
            <TouchableOpacity 
              key={index} 
              activeOpacity={0.9}
              className='bg-white rounded-3xl p-4 shadow-sm shadow-gray-200 border border-gray-100'
            >
              <View className='flex-row justify-between items-center mb-3 border-b border-gray-50 pb-3'>
                <View>
                  <Text className='font-extrabold text-primary text-base'>{order.id}</Text>
                  <Text className='text-xs text-secondary mt-0.5'>{order.date}</Text>
                </View>
                <View className={`px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                  <Text className='text-xs font-bold' style={{ color: 'inherit' }}>{order.status}</Text>
                </View>
              </View>

              <View className='flex-row items-center'>
                <Image 
                  source={{ uri: order.image }} 
                  className='w-16 h-16 rounded-xl bg-gray-100'
                  resizeMode='cover'
                />
                <View className='flex-1 ml-4'>
                  <Text className='text-secondary text-sm mb-1'>{order.items} {order.items === 1 ? 'item' : 'items'}</Text>
                  <Text className='text-lg font-bold text-primary'>${order.total.toFixed(2)}</Text>
                </View>
                <View className='w-10 h-10 rounded-full bg-gray-50 items-center justify-center'>
                  <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
