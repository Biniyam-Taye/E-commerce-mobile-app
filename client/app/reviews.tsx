import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'

export default function Reviews() {
  const dummyReviews = [
    {
      id: 1,
      productName: 'Running Shoes',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      date: 'Oct 15, 2026',
      review: 'These shoes are incredibly comfortable and lightweight. Perfect for my morning runs!',
    },
    {
      id: 2,
      productName: 'Denim Jacket',
      image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=200&auto=format&fit=crop',
      rating: 4,
      date: 'Sep 30, 2026',
      review: 'Great fit and very stylish. The material feels premium. Deducted one star because shipping took longer than expected.',
    }
  ];

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='My Reviews' showBack />
      <ScrollView className='flex-1 px-4 py-4' showsVerticalScrollIndicator={false}>
        <View className='flex-col gap-4 mb-8'>
          {dummyReviews.map((review) => (
            <View 
              key={review.id} 
              className='bg-white rounded-3xl p-5 shadow-sm shadow-gray-200 border border-gray-100'
            >
              <View className='flex-row items-center mb-4 pb-4 border-b border-gray-50'>
                <Image 
                  source={{ uri: review.image }} 
                  className='w-12 h-12 rounded-lg bg-gray-100'
                  resizeMode='cover'
                />
                <View className='flex-1 ml-3'>
                  <Text className='font-bold text-primary text-base' numberOfLines={1}>{review.productName}</Text>
                  <Text className='text-xs text-gray-400 mt-0.5'>{review.date}</Text>
                </View>
              </View>

              <View className='flex-row items-center mb-2'>
                {[...Array(5)].map((_, i) => (
                  <Ionicons 
                    key={i} 
                    name={i < review.rating ? "star" : "star-outline"} 
                    size={16} 
                    color="#FFD700" 
                    style={{ marginRight: 2 }}
                  />
                ))}
              </View>

              <Text className='text-secondary leading-6'>
                "{review.review}"
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
