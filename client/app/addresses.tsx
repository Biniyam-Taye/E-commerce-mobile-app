import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'

export default function Addresses() {
  const dummyAddresses = [
    {
      id: 1,
      title: 'Home',
      address: '1234 Main Street, Apt 4B',
      city: 'New York, NY 10001',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: 2,
      title: 'Office',
      address: '9876 Corporate Blvd, Suite 200',
      city: 'San Francisco, CA 94105',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    }
  ];

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='Shipping Addresses' showBack />
      <ScrollView className='flex-1 px-4 py-4' showsVerticalScrollIndicator={false}>
        <View className='flex-col gap-4 mb-8'>
          {dummyAddresses.map((addr) => (
            <View 
              key={addr.id} 
              className={`bg-white rounded-3xl p-5 shadow-sm shadow-gray-200 border-2 ${addr.isDefault ? 'border-primary' : 'border-transparent'}`}
            >
              <View className='flex-row justify-between items-center mb-3'>
                <View className='flex-row items-center'>
                  <View className='w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3'>
                    <Ionicons name={addr.title === 'Home' ? 'home' : 'business'} size={18} color={COLORS.primary} />
                  </View>
                  <Text className='font-extrabold text-primary text-lg'>{addr.title}</Text>
                  {addr.isDefault && (
                    <View className='bg-primary/10 px-2 py-0.5 rounded-md ml-3'>
                      <Text className='text-xs font-bold text-primary'>Default</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-vertical" size={20} color={COLORS.secondary} />
                </TouchableOpacity>
              </View>

              <View className='ml-13'>
                <Text className='text-secondary leading-5 mb-1'>{addr.address}</Text>
                <Text className='text-secondary leading-5 mb-2'>{addr.city}</Text>
                <Text className='text-gray-400 font-medium text-sm'>{addr.phone}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add New Address Button */}
      <View className='px-4 py-4 bg-white border-t border-gray-100 pb-8'>
        <TouchableOpacity 
          className='bg-primary w-full py-4 rounded-full flex-row justify-center items-center shadow-md shadow-gray-300'
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text className='text-white font-bold text-lg ml-2'>Add New Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
