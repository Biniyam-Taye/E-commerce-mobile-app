import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import { useRouter } from 'expo-router'

export default function Checkout() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState('card');

  const subtotal = 302.99;
  const shipping = 15.00;
  const total = subtotal + shipping;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
    { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
    { id: 'cod', name: 'Cash on Delivery', icon: 'cash-outline' },
  ];

  const handlePlaceOrder = () => {
    // Navigate to a success page or back to home for now
    alert("Order Placed Successfully!");
    router.push('/');
  };

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='Checkout' showBack />
      
      <ScrollView className='flex-1 px-4 py-4' showsVerticalScrollIndicator={false}>
        
        {/* Shipping Address */}
        <View className='mb-6'>
          <View className='flex-row justify-between items-center mb-3'>
            <Text className='text-lg font-bold text-primary'>Shipping Address</Text>
            <TouchableOpacity>
              <Text className='text-accent font-medium'>Change</Text>
            </TouchableOpacity>
          </View>
          
          <View className='bg-white rounded-2xl p-4 flex-row items-center shadow-sm shadow-gray-200'>
            <View className='w-12 h-12 bg-gray-50 rounded-full items-center justify-center mr-4'>
              <Ionicons name="location" size={24} color={COLORS.primary} />
            </View>
            <View className='flex-1'>
              <Text className='font-bold text-primary text-base mb-1'>Home</Text>
              <Text className='text-secondary leading-5'>
                1234 Main Street, Apt 4B{"\n"}
                New York, NY 10001
              </Text>
              <Text className='text-secondary mt-1'>+1 (555) 123-4567</Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View className='mb-6'>
          <Text className='text-lg font-bold text-primary mb-3'>Payment Method</Text>
          
          <View className='bg-white rounded-2xl p-2 shadow-sm shadow-gray-200'>
            {paymentMethods.map((method, index) => (
              <TouchableOpacity 
                key={method.id}
                activeOpacity={0.7}
                onPress={() => setSelectedPayment(method.id)}
                className={`flex-row items-center p-3 rounded-xl ${selectedPayment === method.id ? 'bg-gray-50' : ''}`}
              >
                <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${selectedPayment === method.id ? 'bg-primary' : 'bg-gray-100'}`}>
                  <Ionicons 
                    name={method.icon as any} 
                    size={20} 
                    color={selectedPayment === method.id ? '#FFF' : COLORS.primary} 
                  />
                </View>
                <Text className={`flex-1 text-base ${selectedPayment === method.id ? 'font-bold text-primary' : 'font-medium text-secondary'}`}>
                  {method.name}
                </Text>
                <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${selectedPayment === method.id ? 'border-primary' : 'border-gray-300'}`}>
                  {selectedPayment === method.id && <View className='w-2.5 h-2.5 bg-primary rounded-full' />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Order Summary */}
        <View className='bg-white rounded-2xl p-5 mb-8 shadow-sm shadow-gray-200'>
          <Text className='text-lg font-bold text-primary mb-4'>Order Summary</Text>
          
          <View className='flex-row justify-between mb-3'>
            <Text className='text-secondary'>Subtotal</Text>
            <Text className='font-medium text-primary'>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View className='flex-row justify-between mb-3'>
            <Text className='text-secondary'>Shipping</Text>
            <Text className='font-medium text-primary'>${shipping.toFixed(2)}</Text>
          </View>
          
          <View className='h-[1px] bg-gray-100 my-3' />
          
          <View className='flex-row justify-between items-center'>
            <Text className='text-base font-bold text-primary'>Total Amount</Text>
            <Text className='text-xl font-extrabold text-accent'>${total.toFixed(2)}</Text>
          </View>
        </View>
        
        <View className='h-8' />
      </ScrollView>

      {/* Place Order Button */}
      <View className='px-4 py-4 bg-white border-t border-gray-100 pb-8'>
        <TouchableOpacity 
          className='bg-primary w-full py-4 rounded-full flex-row justify-center items-center shadow-md shadow-gray-300'
          activeOpacity={0.8}
          onPress={handlePlaceOrder}
        >
          <Text className='text-white font-bold text-lg mr-2'>Place Order</Text>
          <Ionicons name="checkmark-circle" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
