import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='Settings' showBack />
      <ScrollView className='flex-1 px-4 py-4' showsVerticalScrollIndicator={false}>
        
        {/* Account Section */}
        <Text className='text-gray-400 font-bold uppercase tracking-wider text-xs mb-3 ml-2'>Account</Text>
        <View className='bg-white rounded-3xl p-2 mb-6 shadow-sm shadow-gray-200'>
          <TouchableOpacity className='flex-row items-center justify-between p-3 border-b border-gray-50'>
            <View className='flex-row items-center'>
              <View className='w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3'>
                <Ionicons name="person-outline" size={20} color={COLORS.primary} />
              </View>
              <Text className='font-bold text-primary text-base'>Personal Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center justify-between p-3'>
            <View className='flex-row items-center'>
              <View className='w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3'>
                <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.primary} />
              </View>
              <Text className='font-bold text-primary text-base'>Password & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <Text className='text-gray-400 font-bold uppercase tracking-wider text-xs mb-3 ml-2'>Preferences</Text>
        <View className='bg-white rounded-3xl p-2 mb-6 shadow-sm shadow-gray-200'>
          <View className='flex-row items-center justify-between p-3 border-b border-gray-50'>
            <View className='flex-row items-center'>
              <View className='w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3'>
                <Ionicons name="notifications-outline" size={20} color={COLORS.primary} />
              </View>
              <Text className='font-bold text-primary text-base'>Push Notifications</Text>
            </View>
            <Switch 
              value={notificationsEnabled} 
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E7EB', true: COLORS.primary }}
              thumbColor={'#fff'}
            />
          </View>

          <View className='flex-row items-center justify-between p-3 border-b border-gray-50'>
            <View className='flex-row items-center'>
              <View className='w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3'>
                <Ionicons name="moon-outline" size={20} color={COLORS.primary} />
              </View>
              <Text className='font-bold text-primary text-base'>Dark Mode</Text>
            </View>
            <Switch 
              value={darkModeEnabled} 
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#E5E7EB', true: COLORS.primary }}
              thumbColor={'#fff'}
            />
          </View>

          <View className='flex-row items-center justify-between p-3'>
            <View className='flex-row items-center'>
              <View className='w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3'>
                <Ionicons name="scan-outline" size={20} color={COLORS.primary} />
              </View>
              <Text className='font-bold text-primary text-base'>Face ID / Biometrics</Text>
            </View>
            <Switch 
              value={faceIdEnabled} 
              onValueChange={setFaceIdEnabled}
              trackColor={{ false: '#E5E7EB', true: COLORS.primary }}
              thumbColor={'#fff'}
            />
          </View>
        </View>

        {/* Support Section */}
        <Text className='text-gray-400 font-bold uppercase tracking-wider text-xs mb-3 ml-2'>Support</Text>
        <View className='bg-white rounded-3xl p-2 mb-8 shadow-sm shadow-gray-200'>
          <TouchableOpacity className='flex-row items-center justify-between p-3 border-b border-gray-50'>
            <View className='flex-row items-center'>
              <View className='w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3'>
                <Ionicons name="help-circle-outline" size={20} color={COLORS.primary} />
              </View>
              <Text className='font-bold text-primary text-base'>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center justify-between p-3'>
            <View className='flex-row items-center'>
              <View className='w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3'>
                <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
              </View>
              <Text className='font-bold text-primary text-base'>About Us</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}
