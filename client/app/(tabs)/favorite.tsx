import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { dummyProducts } from '@/assets/assets'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import { useRouter } from 'expo-router'

export default function Favorite() {
  const router = useRouter()
  
  // Use featured products as dummy favorites
  const favorites = useMemo(() => {
    return dummyProducts.filter(p => p.isFeatured);
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='My Wishlist' showBack={false} showCart />
      
      <ScrollView className='flex-1 px-4 py-4' showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-end mb-6">
          <View>
            <Text className="text-2xl font-extrabold text-primary">Saved Items</Text>
            <Text className="text-secondary mt-1">
              {favorites.length} {favorites.length === 1 ? "item" : "items"} in your wishlist
            </Text>
          </View>
        </View>

        <View className='flex-col gap-4'>
          {favorites.map((product, index) => (
            <TouchableOpacity 
              key={`${product._id}-${index}`} 
              activeOpacity={0.9}
              onPress={() => router.push({ pathname: "/product-details", params: { id: product._id } })}
              className='flex-row bg-white rounded-3xl p-3 shadow-sm shadow-gray-200'
            >
              {/* Image */}
              <View className='relative'>
                <Image 
                  source={{ uri: product.images?.[0] }} 
                  className='w-28 h-28 rounded-2xl bg-gray-100'
                  resizeMode='cover'
                />
                <View className='absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-lg'>
                  <View className='flex-row items-center'>
                    <Ionicons name="star" size={10} color="#FFD700" />
                    <Text className='text-[10px] font-bold ml-1'>{product.ratings?.average || 0}</Text>
                  </View>
                </View>
              </View>

              {/* Details */}
              <View className='flex-1 ml-4 justify-between py-1'>
                <View>
                  <View className='flex-row justify-between items-start'>
                    <Text className='text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider' numberOfLines={1}>
                      {typeof product.category === 'string' ? product.category : product.category?.name || 'Category'}
                    </Text>
                    <TouchableOpacity className='bg-red-50 p-1.5 rounded-full'>
                      <Ionicons name="trash-outline" size={16} color={COLORS.error} />
                    </TouchableOpacity>
                  </View>
                  
                  <Text className='text-base font-bold text-primary mr-2 leading-5' numberOfLines={2}>
                    {product.name}
                  </Text>
                </View>

                <View className='flex-row justify-between items-end mt-2'>
                  <View>
                    <Text className='text-lg font-extrabold text-primary'>
                      ${product.price}
                    </Text>
                    {product.comparePrice && (
                      <Text className='text-xs text-gray-400 line-through'>
                        ${product.comparePrice}
                      </Text>
                    )}
                  </View>
                  
                  <TouchableOpacity className='bg-primary px-4 py-2.5 rounded-full flex-row items-center'>
                    <Ionicons name="cart-outline" size={16} color="white" />
                    <Text className='text-white text-xs font-bold ml-1'>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View className='h-12' />
      </ScrollView>
    </SafeAreaView>
  )
}