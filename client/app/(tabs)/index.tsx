import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { BANNERS } from '@/assets/assets'
import { useRouter } from 'expo-router'
import { CATEGORIES, COLORS } from '@/constants'
import { dummyProducts } from '@/assets/assets'
import ProductCard from '@/components/ProductCard'
import CategoryItem from '@/components/CategoryItem'
import SideDrawer from '@/components/SideDrawer'

const {width} = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);  
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categories = [{id: 'all' , name: 'All', icon: "grid-outline"}, ...CATEGORIES]

  useEffect(() => {
    // demo data is local; stop spinner after first render
    const t = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaView className='flex-1' edges={['top']}>
      <Header title='Forever' showMenu showCart showLogo onMenuPress={() => setDrawerOpen(true)} />
      <SideDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
      
      <ScrollView className='flex-1 px-4'
      showsHorizontalScrollIndicator={false}>
<View className='mb-6'>
   <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
        className='w-full h-48 rounded-xl' scrollEventThrottle={16}
        onScroll={(event) => {
          const slide = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width)
          if(slide !== activeBannerIndex){
            setActiveBannerIndex(slide);
          }
        }}>
{BANNERS.map((banner, index) => (
  <View key={index} className='relative w-full h-48 bg-gray-200 overflow-hidden' style={{ width: width - 32}}>
    <Image source={{uri:banner.image}} className='w-full h-full' resizeMode='cover' />

    <View className='absolute bottom-4 left-4 z-10 '>
      <Text className='text-white text-2xl font-bold'>{banner.title}</Text>
      <Text className='text-white text-sm font-medium'>{banner.subtitle}</Text>
      <TouchableOpacity className='mt-2 px-4 py-2 bg-primary rounded-full self-start'>
        <Text className='text-white font-bold'>Get Now</Text>
      </TouchableOpacity>
    </View>
    <View className='absolute inset-0 bg-black/40'/>
  </View>
))}
        </ScrollView>
        {/* pagination dots */}
        <View className='flex-row justify-center mt-3 gap-2'>
          {BANNERS.map((_, index) => (
            <View 
              key={index} 
              className={`h-2 rounded-full ${index === activeBannerIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"}`} 
            />
          ))}
        </View>
</View>

{/* categories */}
<View className='mb-6'>
  <View className='flex-row items-center justify-between mb-4'>
    <Text className='text-xl font-bold text-primary'>Categories</Text>
    <TouchableOpacity>
      <Text className='text-accent font-medium'>See All</Text>
    </TouchableOpacity>
  </View>
  <ScrollView horizontal showsHorizontalScrollIndicator={false} className='-mx-4 px-4'>
    {categories.map((cat: any) => (
      <CategoryItem key={cat.id} id={cat.id} name={cat.name} icon={cat.icon} />
    ))}
  </ScrollView>
</View>

{/* Featured Products */}
<View className='mb-6'>
  <View className='flex-row items-center justify-between mb-4'>
    <Text className='text-xl font-bold text-primary'>Featured Products</Text>
    <TouchableOpacity onPress={()=> router.push('/shop')}>
      <Text className='text-accent font-medium'>See All</Text>
    </TouchableOpacity>
  </View>
  {
    loading ? (
      <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    ) : (
      <View className='flex-row flex-wrap justify-between'>
        {dummyProducts.filter(p => p.isFeatured).slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </View>
    )
  }
</View>

{/* New Arrivals */}
<View className='mb-6'>
  <View className='flex-row items-center justify-between mb-4'>
    <Text className='text-xl font-bold text-primary'>New Arrivals</Text>
    <TouchableOpacity>
      <Text className='text-accent font-medium'>See All</Text>
    </TouchableOpacity>
  </View>
  <View className='flex-row flex-wrap justify-between'>
    {dummyProducts.slice(0, 4).map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </View>
</View>

{/* CTA */}
<View className="mb-10">
  <View className="bg-surface rounded-3xl px-6 py-8 items-center">
    <Text className="text-primary text-2xl font-extrabold text-center">
      Join the Revolution
    </Text>
    <Text className="text-secondary text-center mt-3 leading-5">
      Subscribe to our newsletter and get 10% off your first purchase.
    </Text>

    <TouchableOpacity
      activeOpacity={0.9}
      className="mt-6 bg-primary rounded-full px-12 py-4"
    >
      <Text className="text-white font-bold text-base">Subscribe Now</Text>
    </TouchableOpacity>
  </View>
</View>
  </ScrollView>
  </SafeAreaView>
  )
}