import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import { useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    
    if (error) {
      Alert.alert('Sign In Failed', error.message);
    } else {
      router.replace('/(tabs)');
    }
  };

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
            
            <Text className='text-3xl font-extrabold text-primary mb-2'>Welcome Back</Text>
            <Text className='text-secondary text-base'>Sign in to continue your shopping journey.</Text>
          </View>

          {/* Form */}
          <View className='flex-col gap-4'>
            
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
                  value={email}
                  onChangeText={setEmail}
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
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='p-2'>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.secondary} />
                </TouchableOpacity>
              </View>
            </View>

          </View>

          <TouchableOpacity className="mt-4 items-end">
            <Text className="text-primary font-bold">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity 
            className={`w-full py-4 rounded-full items-center justify-center mt-8 shadow-md shadow-gray-300 ${loading ? 'bg-gray-400' : 'bg-primary'}`}
            activeOpacity={0.8}
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text className='text-white font-bold text-lg'>{loading ? 'Signing in...' : 'Sign In'}</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className='flex-row items-center my-8'>
            <View className='flex-1 h-[1px] bg-gray-200' />
            <Text className='mx-4 text-gray-400 font-medium'>Or sign in with</Text>
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

          {/* Sign Up Link */}
          <View className='flex-row justify-center items-center mb-10'>
            <Text className='text-secondary'>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <Text className='text-primary font-bold'>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
