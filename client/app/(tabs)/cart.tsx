import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { dummyProducts } from '@/assets/assets'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import { useRouter } from 'expo-router'

export default function Cart() {
  const router = useRouter();

  // Dummy cart data
  const cartItems = [
    { id: 1, product: dummyProducts[0], quantity: 1, size: 'M' },
    { id: 2, product: dummyProducts[1], quantity: 2, size: 'L' },
    { id: 3, product: dummyProducts[2], quantity: 1, size: '9' }
  ];

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  const shipping = 15; // flat rate for demo
  const total = subtotal + shipping;

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='My Cart' showBack={false} />
      
      <ScrollView className='flex-1 px-4 py-4' showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} className='flex-row bg-white rounded-2xl p-3 mb-4 shadow-sm shadow-gray-200'>
            <Image 
              source={{ uri: item.product.images[0] }} 
              className='w-24 h-24 rounded-xl bg-gray-100'
              resizeMode='cover'
            />
            
            <View className='flex-1 ml-4 justify-between py-1'>
              <View>
                <View className='flex-row justify-between items-start'>
                  <Text className='text-base font-bold text-primary flex-1 mr-2' numberOfLines={2}>
                    {item.product.name}
                  </Text>
                  <TouchableOpacity>
                    <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
                <Text className='text-sm text-secondary mt-1'>Size: {item.size}</Text>
              </View>

              <View className='flex-row justify-between items-center mt-2'>
                <Text className='text-lg font-extrabold text-primary'>
                  ${item.product.price}
                </Text>
                
                <View className='flex-row items-center bg-gray-50 rounded-full px-2 py-1'>
                  <TouchableOpacity className='w-7 h-7 bg-white rounded-full items-center justify-center shadow-sm shadow-gray-200'>
                    <Ionicons name="remove" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                  <Text className='mx-3 font-bold text-primary'>{item.quantity}</Text>
                  <TouchableOpacity className='w-7 h-7 bg-primary rounded-full items-center justify-center shadow-sm shadow-gray-200'>
                    <Ionicons name="add" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* Order Summary */}
        <View className='bg-white rounded-2xl p-5 mt-2 mb-8 shadow-sm shadow-gray-200'>
          <Text className='text-lg font-bold text-primary mb-4'>Order Summary</Text>
          
          <View className='flex-row justify-between mb-3'>
            <Text className='text-secondary'>Subtotal</Text>
            <Text className='font-medium text-primary'>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View className='flex-row justify-between mb-3'>
            <Text className='text-secondary'>Shipping</Text>
            <Text className='font-medium text-primary'>${shipping.toFixed(2)}</Text>
          </View>
          
          <View className='flex-row justify-between mb-4'>
            <Text className='text-secondary'>Tax</Text>
            <Text className='font-medium text-primary'>$0.00</Text>
          </View>

          <View className='h-[1px] bg-gray-100 mb-4' />
          
          <View className='flex-row justify-between items-center mb-2'>
            <Text className='text-base font-bold text-primary'>Total Amount</Text>
            <Text className='text-xl font-extrabold text-accent'>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View className='px-4 py-4 bg-white border-t border-gray-100 pb-8'>
        <TouchableOpacity 
          className='bg-primary w-full py-4 rounded-full flex-row justify-center items-center shadow-md shadow-gray-300'
          activeOpacity={0.8}
          onPress={() => router.push('/checkout')}
        >
          <Text className='text-white font-bold text-lg mr-2'>Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}