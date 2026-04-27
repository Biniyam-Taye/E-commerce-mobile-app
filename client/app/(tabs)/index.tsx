import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
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
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);  
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categories = [{id: 'all' , name: 'All', icon: "grid-outline"}, ...CATEGORIES]

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-[#F9FAFB]' edges={['top']}>
      <Header title='' showMenu showCart showLogo onMenuPress={() => setDrawerOpen(true)} />
      <SideDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
      
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        
        {/* Welcome & Search Section */}
        <View className="px-5 pt-2 pb-6">
          <Text className="text-secondary text-base mb-1">Hello, John 👋</Text>
          <Text className="text-3xl font-extrabold text-primary leading-[40px] mb-6">
            Find your{"\n"}perfect style
          </Text>

          <View className="flex-row items-center gap-3">
            <View className="flex-1 flex-row items-center bg-white border border-gray-100 shadow-sm shadow-gray-200 rounded-2xl px-4 h-14">
              <Ionicons name="search-outline" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Search for clothes, shoes..."
                placeholderTextColor="#9CA3AF"
                className="flex-1 ml-3 text-primary font-medium"
              />
            </View>
            <TouchableOpacity 
              activeOpacity={0.8}
              className="w-14 h-14 rounded-2xl bg-primary items-center justify-center shadow-md shadow-gray-300"
            >
              <Ionicons name="options-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner Carousel */}
        <View className='mb-8 px-5'>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            className='w-full h-44 rounded-3xl overflow-hidden shadow-sm shadow-gray-300' 
            scrollEventThrottle={16}
            onScroll={(event) => {
              const slide = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width)
              if(slide !== activeBannerIndex){
                setActiveBannerIndex(slide);
              }
            }}
          >
            {BANNERS.map((banner, index) => (
              <View key={index} className='relative w-full h-full bg-gray-900' style={{ width: width - 40 }}>
                <Image source={{uri:banner.image}} className='w-full h-full opacity-70' resizeMode='cover' />
                <View className='absolute top-0 left-0 right-0 bottom-0 p-6 justify-center'>
                  <Text className='text-white text-3xl font-extrabold mb-1'>{banner.title}</Text>
                  <Text className='text-white/90 text-sm font-medium mb-4'>{banner.subtitle}</Text>
                  <TouchableOpacity className='px-5 py-2.5 bg-white rounded-full self-start'>
                    <Text className='text-primary font-black text-xs uppercase tracking-widest'>Shop Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <View className='flex-row justify-center mt-4 gap-2'>
            {BANNERS.map((_, index) => (
              <View 
                key={index} 
                className={`h-2 rounded-full transition-all ${index === activeBannerIndex ? "w-8 bg-primary" : "w-2 bg-gray-300"}`} 
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <View className='mb-8'>
          <View className='flex-row items-center justify-between mb-4 px-5'>
            <Text className='text-xl font-extrabold text-primary'>Categories</Text>
            <TouchableOpacity>
              <Text className='text-gray-400 font-bold text-sm'>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-5'>
            {categories.map((cat: any) => (
              <View key={cat.id} className="mr-4 items-center">
                <TouchableOpacity className="w-16 h-16 rounded-full bg-white shadow-sm shadow-gray-200 items-center justify-center border border-gray-100 mb-2">
                  <Ionicons name={cat.icon as any} size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text className="text-xs font-bold text-primary">{cat.name}</Text>
              </View>
            ))}
            <View className="w-5" />
          </ScrollView>
        </View>

        {/* Featured Products (Horizontal Scroll for Variety) */}
        <View className='mb-8'>
          <View className='flex-row items-center justify-between mb-4 px-5'>
            <Text className='text-xl font-extrabold text-primary'>Featured</Text>
            <TouchableOpacity onPress={()=> router.push('/shop')}>
              <Text className='text-gray-400 font-bold text-sm'>See All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} className="my-10" />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-5 pb-2'>
              {dummyProducts.filter(p => p.isFeatured).slice(0, 5).map((product) => (
                <View key={product._id} className="mr-4">
                  <ProductCard product={product} />
                </View>
              ))}
              <View className="w-5" />
            </ScrollView>
          )}
        </View>

        {/* New Arrivals (Grid) */}
        <View className='mb-8 px-5'>
          <View className='flex-row items-center justify-between mb-4'>
            <Text className='text-xl font-extrabold text-primary'>New Arrivals</Text>
            <TouchableOpacity>
              <Text className='text-gray-400 font-bold text-sm'>See All</Text>
            </TouchableOpacity>
          </View>
          <View className='flex-row flex-wrap justify-between'>
            {dummyProducts.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </View>
        </View>

        {/* CTA */}
        <View className="mb-10 px-5">
          <View className="bg-primary rounded-3xl px-6 py-10 items-center shadow-lg shadow-gray-400">
            <Ionicons name="flash" size={40} color="#FFD700" className="mb-4" />
            <Text className="text-white text-3xl font-black text-center mb-2">
              Join the VIP
            </Text>
            <Text className="text-white/80 text-center leading-6 mb-8 px-4">
              Get exclusive early access to drops and an extra 15% off your first order.
            </Text>
            <TouchableOpacity activeOpacity={0.9} className="bg-white rounded-full px-10 py-4 w-full">
              <Text className="text-primary font-black text-center text-base uppercase tracking-widest">Subscribe Now</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}