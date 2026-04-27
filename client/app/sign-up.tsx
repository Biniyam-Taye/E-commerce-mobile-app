import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import { useRouter } from 'expo-router'

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className='flex-1 bg-white' edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <ScrollView className='flex-1 px-6' showsVerticalScrollIndicator={false}>
          
          {/* Header Area */}
          <View className='mt-12 mb-8'>
            <TouchableOpacity 
              className='w-10 h-10 bg-gray-50 rounded-full items-center justify-center mb-6'
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            
            <Text className='text-3xl font-extrabold text-primary mb-2'>Create Account</Text>
            <Text className='text-secondary text-base'>Sign up to get started with your new shopping journey.</Text>
          </View>

          {/* Form */}
          <View className='flex-col gap-4'>
            
            {/* Full Name */}
            <View>
              <Text className='text-sm font-bold text-primary mb-2 ml-1'>Full Name</Text>
              <View className='flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 h-14'>
                <Ionicons name="person-outline" size={20} color={COLORS.secondary} />
                <TextInput 
                  placeholder="John Doe"
                  placeholderTextColor="#9CA3AF"
                  className='flex-1 ml-3 text-primary font-medium'
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email */}
            <View>
              <Text className='text-sm font-bold text-primary mb-2 ml-1'>Email Address</Text>
              <View className='flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 h-14'>
                <Ionicons name="mail-outline" size={20} color={COLORS.secondary} />
                <TextInput 
                  placeholder="example@email.com"
                  placeholderTextColor="#9CA3AF"
                  className='flex-1 ml-3 text-primary font-medium'
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text className='text-sm font-bold text-primary mb-2 ml-1'>Password</Text>
              <View className='flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 h-14'>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.secondary} />
                <TextInput 
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  className='flex-1 ml-3 text-primary font-medium'
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='p-2'>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.secondary} />
                </TouchableOpacity>
              </View>
            </View>

          </View>

          {/* Terms & Conditions */}
          <View className='flex-row items-center mt-6 pr-4'>
            <View className='w-5 h-5 rounded border-2 border-primary items-center justify-center mr-3'>
              <View className='w-2.5 h-2.5 bg-primary rounded-sm' />
            </View>
            <Text className='text-secondary text-sm leading-5'>
              I agree to the <Text className='font-bold text-primary'>Terms of Service</Text> and <Text className='font-bold text-primary'>Privacy Policy</Text>
            </Text>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity 
            className='bg-primary w-full py-4 rounded-full items-center justify-center mt-8 shadow-md shadow-gray-300'
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)')}
          >
            <Text className='text-white font-bold text-lg'>Sign Up</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className='flex-row items-center my-8'>
            <View className='flex-1 h-[1px] bg-gray-200' />
            <Text className='mx-4 text-gray-400 font-medium'>Or sign up with</Text>
            <View className='flex-1 h-[1px] bg-gray-200' />
          </View>

          {/* Social Logins */}
          <View className='flex-row justify-center gap-4 mb-8'>
            <TouchableOpacity className='w-16 h-16 rounded-2xl border border-gray-200 items-center justify-center bg-white shadow-sm shadow-gray-100'>
              <Ionicons name="logo-google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity className='w-16 h-16 rounded-2xl border border-gray-200 items-center justify-center bg-white shadow-sm shadow-gray-100'>
              <Ionicons name="logo-apple" size={24} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity className='w-16 h-16 rounded-2xl border border-gray-200 items-center justify-center bg-white shadow-sm shadow-gray-100'>
              <Ionicons name="logo-facebook" size={24} color="#4267B2" />
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className='flex-row justify-center items-center mb-10'>
            <Text className='text-secondary'>Already have an account? </Text>
            <TouchableOpacity>
              <Text className='text-primary font-bold'>Sign In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
