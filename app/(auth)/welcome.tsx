import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import tw from '@/lib/tailwind';
import { Colors, Shadows, } from '@/lib/design-system';
import { AuthButton } from '@/components/auth/AuthButton';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={[tw`flex-1 bg-white`, { alignSelf: 'center', width: '100%', maxWidth: 600 }]}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={tw`flex-grow px-6 pt-6 pb-10`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`items-center justify-center py-6`}>
          <View style={[tw`w-20 h-20 bg-brand rounded-3xl items-center justify-center mb-6`, Shadows.lg]}>
            <Text style={tw`text-white text-4xl font-bold`}>L</Text>
          </View>

          <Text style={tw`text-2xl font-bold text-neutral-900 text-center mb-2 leading-tight`}>
            Modern LPG Distribution for Agents
          </Text>
          <Text style={tw`text-base text-neutral-500 text-center mb-8 leading-relaxed px-4`}>
            Manage orders, track earnings, and grow your business with Leeta.
          </Text>
        </View>

        <View style={tw`flex-1 gap-4 mb-10`}>
          <FeatureItem
            icon="receipt-outline"
            title="Simplified Orders"
            desc="Accept and track gas delivery orders in real-time."
          />
          <FeatureItem
            icon="wallet-outline"
            title="Daily Earnings"
            desc="Monitor your performance and daily profit instantly."
          />
          <FeatureItem
            icon="shield-checkmark-outline"
            title="Secure Deliveries"
            desc="Verify every drop-off with 4-digit customer OTP."
          />
        </View>

        <View style={tw`gap-4`}>
          <AuthButton
            title="Login to Dashboard"
            variant="outline"
            onPress={() => router.push('/login' as any)}
          />
          <AuthButton
            title="Create Account"
            onPress={() => router.push('/signup' as any)}
          />
        </View>

        <Text style={tw`text-center text-xs text-neutral-400 mt-10 px-6`}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureItem({ icon, title, desc }: { icon: any; title: string; desc: string }) {
  const { Ionicons } = require('@expo/vector-icons');
  return (
    <View style={tw`flex-row items-start gap-4`}>
      <View style={tw`w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center`}>
        <Ionicons name={icon} size={24} color={Colors.brand.DEFAULT} />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-base font-bold text-neutral-900 mb-1`}>{title}</Text>
        <Text style={tw`text-sm text-neutral-500 leading-snug`}>{desc}</Text>
      </View>
    </View>
  );
}
