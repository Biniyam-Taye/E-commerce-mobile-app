import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import { useRouter } from 'expo-router'

const { width } = Dimensions.get('window')
const cardWidth = (width - 48) / 2

export default function ProductCard({ product }: { product: any }) {
    const router = useRouter()
    const image = product?.images?.[0]
    const categoryLabel = typeof product?.category === 'string' ? product.category : product?.category?.name
    const ratingAvg = product?.ratings?.average ?? 0
    const ratingCount = product?.ratings?.count ?? 0

    return (
        <TouchableOpacity 
            className='bg-white rounded-2xl mb-4 overflow-hidden'
            style={{ width: cardWidth, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
            onPress={() => router.push({
                pathname: "/(tabs)/product-details",
                params: { id: product._id }
            })}
        >
            <View className='relative'>
                {image ? (
                    <Image 
                        source={{ uri: image }} 
                        className='h-48 w-full'
                        resizeMode='cover'
                    />
                ) : (
                    <View className="h-48 w-full bg-gray-100 items-center justify-center">
                        <Ionicons name="image-outline" size={28} color="#999" />
                        <Text className="text-gray-500 mt-1 text-xs">No image</Text>
                    </View>
                )}
                <TouchableOpacity className='absolute top-2 right-2 bg-white/80 p-1.5 rounded-full'>
                    <Ionicons name="heart-outline" size={18} color={COLORS.primary} />
                </TouchableOpacity>
                {product.isFeatured && (
                    <View className='absolute top-2 left-2 bg-accent px-2 py-1 rounded-md'>
                        <Text className='text-white text-[10px] font-bold'>Featured</Text>
                    </View>
                )}
            </View>

            <View className='p-3'>
                <Text className='text-xs text-gray-500 mb-1' numberOfLines={1}>{categoryLabel}</Text>
                <Text className='text-sm font-bold text-primary mb-1' numberOfLines={1}>{product.name}</Text>
                
                <View className='flex-row items-center mb-2'>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text className='text-[10px] font-bold ml-1'>{ratingAvg}</Text>
                    <Text className='text-[10px] text-gray-400 ml-1'>({ratingCount})</Text>
                </View>

                <View className='flex-row items-center justify-between'>
                    <Text className='text-base font-bold text-primary'>${product.price}</Text>
                    {product.comparePrice && (
                        <Text className='text-xs text-gray-400 line-through'>${product.comparePrice}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}
