import { View, Text, ScrollView, TouchableOpacity, Switch, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);

  const SettingItem = ({ icon, label, bg, color, hasSwitch, switchValue, onSwitchChange, isLast }: any) => (
    <TouchableOpacity 
      activeOpacity={hasSwitch ? 1 : 0.7}
      className={`flex-row items-center justify-between p-3 ${!isLast ? 'border-b border-gray-50' : ''}`}
    >
      <View className='flex-row items-center'>
        <View className={`w-10 h-10 rounded-xl items-center justify-center mr-4 ${bg}`}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text className='font-bold text-primary text-base'>{label}</Text>
      </View>
      {hasSwitch ? (
        <Switch 
          value={switchValue} 
          onValueChange={onSwitchChange}
          trackColor={{ false: '#E5E7EB', true: COLORS.primary }}
          thumbColor={'#fff'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='Settings' showBack />
      <ScrollView className='flex-1 px-4 py-2' showsVerticalScrollIndicator={false}>
        
        {/* Profile Banner */}
        <View className='bg-white rounded-3xl p-5 mb-8 shadow-sm shadow-gray-200 flex-row items-center'>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" }} 
            className='w-16 h-16 rounded-full'
          />
          <View className='ml-4 flex-1'>
            <Text className='text-xl font-extrabold text-primary'>Biniyam Taye</Text>
            <Text className='text-secondary mt-1'>biniyam.taye@example.com</Text>
          </View>
          <TouchableOpacity className='w-10 h-10 bg-gray-50 rounded-full items-center justify-center'>
            <Ionicons name="pencil" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <Text className='text-gray-400 font-bold uppercase tracking-wider text-xs mb-3 ml-2'>Account</Text>
        <View className='bg-white rounded-3xl p-2 mb-6 shadow-sm shadow-gray-200'>
          <SettingItem 
            icon="person" label="Personal Information" 
            bg="bg-blue-50" color="#3B82F6" 
          />
          <SettingItem 
            icon="shield-checkmark" label="Password & Security" 
            bg="bg-green-50" color="#10B981" isLast 
          />
        </View>

        {/* Preferences Section */}
        <Text className='text-gray-400 font-bold uppercase tracking-wider text-xs mb-3 ml-2'>Preferences</Text>
        <View className='bg-white rounded-3xl p-2 mb-6 shadow-sm shadow-gray-200'>
          <SettingItem 
            icon="notifications" label="Push Notifications" 
            bg="bg-orange-50" color="#F97316" 
            hasSwitch switchValue={notificationsEnabled} onSwitchChange={setNotificationsEnabled}
          />
          <SettingItem 
            icon="moon" label="Dark Mode" 
            bg="bg-indigo-50" color="#6366F1" 
            hasSwitch switchValue={darkModeEnabled} onSwitchChange={setDarkModeEnabled}
          />
          <SettingItem 
            icon="scan" label="Face ID / Biometrics" 
            bg="bg-purple-50" color="#A855F7" 
            hasSwitch switchValue={faceIdEnabled} onSwitchChange={setFaceIdEnabled} isLast
          />
        </View>

        {/* Support Section */}
        <Text className='text-gray-400 font-bold uppercase tracking-wider text-xs mb-3 ml-2'>Support</Text>
        <View className='bg-white rounded-3xl p-2 mb-10 shadow-sm shadow-gray-200'>
          <SettingItem 
            icon="help-circle" label="Help Center" 
            bg="bg-pink-50" color="#EC4899" 
          />
          <SettingItem 
            icon="information-circle" label="About Us" 
            bg="bg-gray-100" color="#6B7280" isLast
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}
