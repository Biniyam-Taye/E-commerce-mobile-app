import { View, Text, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { dummyProducts } from '@/assets/assets'
import ProductCard from '@/components/ProductCard'

export default function Favorite() {
  // Use featured products as dummy favorites
  const favorites = useMemo(() => {
    return dummyProducts.filter(p => p.isFeatured);
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='Favorites' showBack={false} showCart />
      
      <ScrollView className='flex-1 px-4 py-4' showsVerticalScrollIndicator={false}>
        <View className="mb-4">
          <Text className="text-secondary">
            {favorites.length} {favorites.length === 1 ? "item" : "items"}
          </Text>
        </View>

        <View className='flex-row flex-wrap justify-between'>
          {favorites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </View>
        
        <View className='h-8' />
      </ScrollView>
    </SafeAreaView>
  )
}