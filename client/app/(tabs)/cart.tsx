import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
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
  ];

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  const shipping = 15; // flat rate for demo
  const total = subtotal + shipping;

  return (
    <SafeAreaView className='flex-1 bg-[#F9FAFB]' edges={['top']}>
      <View className="px-4 py-3 flex-row items-center justify-between bg-[#F9FAFB]">
        <Text className="text-2xl font-black text-primary tracking-tight">My Cart</Text>
        <View className="bg-primary/10 px-3 py-1 rounded-full">
          <Text className="text-primary font-bold text-sm">{cartItems.length} Items</Text>
        </View>
      </View>
      
      <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false}>
        
        {/* Cart Items */}
        <View className="mt-4 flex-col gap-4">
          {cartItems.map((item) => (
            <View key={item.id} className='flex-row bg-white rounded-3xl p-3 shadow-sm shadow-gray-200'>
              <Image 
                source={{ uri: item.product.images[0] }} 
                className='w-28 h-28 rounded-2xl bg-gray-100'
                resizeMode='cover'
              />
              
              <View className='flex-1 ml-4 py-1 justify-between'>
                <View>
                  <View className='flex-row justify-between items-start'>
                    <Text className='text-lg font-extrabold text-primary flex-1 mr-2 leading-6' numberOfLines={2}>
                      {item.product.name}
                    </Text>
                    <TouchableOpacity className="p-1 -mt-1 -mr-1">
                      <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                    </TouchableOpacity>
                  </View>
                  <Text className='text-sm text-gray-400 font-bold mt-1'>Size: {item.size}</Text>
                </View>

                <View className='flex-row justify-between items-end mt-2'>
                  <Text className='text-xl font-black text-primary'>
                    ${item.product.price}
                  </Text>
                  
                  {/* Quantity Stepper */}
                  <View className='flex-row items-center bg-gray-50 border border-gray-100 rounded-full p-1'>
                    <TouchableOpacity className='w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm shadow-gray-200'>
                      <Ionicons name="remove" size={16} color={COLORS.primary} />
                    </TouchableOpacity>
                    <Text className='w-8 text-center font-bold text-primary text-base'>{item.quantity}</Text>
                    <TouchableOpacity className='w-8 h-8 bg-primary rounded-full items-center justify-center shadow-sm shadow-gray-200'>
                      <Ionicons name="add" size={16} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Promo Code */}
        <View className="mt-8 flex-row items-center">
          <View className="flex-1 flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 h-14 shadow-sm shadow-gray-200">
            <Ionicons name="ticket-outline" size={20} color={COLORS.primary} />
            <TextInput 
              placeholder="Add promo code"
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-3 font-bold text-primary"
            />
          </View>
          <TouchableOpacity className="ml-3 bg-primary h-14 px-6 rounded-2xl items-center justify-center shadow-sm shadow-gray-300">
            <Text className="text-white font-bold">Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View className='bg-white rounded-3xl p-6 mt-6 mb-8 shadow-sm shadow-gray-200'>
          <Text className='text-lg font-black text-primary mb-5'>Order Summary</Text>
          
          <View className='flex-row justify-between mb-4'>
            <Text className='text-gray-500 font-medium text-base'>Subtotal</Text>
            <Text className='font-bold text-primary text-base'>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View className='flex-row justify-between mb-4'>
            <Text className='text-gray-500 font-medium text-base'>Shipping</Text>
            <Text className='font-bold text-primary text-base'>${shipping.toFixed(2)}</Text>
          </View>
          
          <View className='flex-row justify-between mb-5'>
            <Text className='text-gray-500 font-medium text-base'>Tax</Text>
            <Text className='font-bold text-primary text-base'>$0.00</Text>
          </View>

          <View className="border-t border-dashed border-gray-200 pt-5 flex-row justify-between items-center">
            <Text className='text-base font-black text-primary'>Total Amount</Text>
            <Text className='text-2xl font-black text-primary'>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Checkout Button */}
      <View className='px-4 py-4 bg-white border-t border-gray-100 pb-8'>
        <TouchableOpacity 
          className='bg-primary w-full py-4 rounded-full flex-row justify-between items-center px-6 shadow-md shadow-gray-400'
          activeOpacity={0.9}
          onPress={() => router.push('/checkout')}
        >
          <Text className='text-white font-bold text-lg'>Checkout</Text>
          <View className="flex-row items-center">
            <Text className='text-white font-black text-lg mr-2'>${total.toFixed(2)}</Text>
            <View className="w-8 h-8 bg-white/20 rounded-full items-center justify-center">
              <Ionicons name="arrow-forward" size={16} color="white" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}