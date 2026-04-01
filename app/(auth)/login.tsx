import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from '@/lib/tailwind';
import { Colors, Shadows } from '@/lib/design-system';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { useAuth } from '@/shared/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) newErrors.email = 'Email address is required';
    else if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid email';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await login(email, password);
      // AuthContext will handle redirection via RootNavigator
    } catch (e) {
      setIsSubmitting(false);
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  };

  return (
    <SafeAreaView style={[tw`flex-1 bg-white`, { alignSelf: 'center', width: '100%', maxWidth: 600 }]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <ScrollView 
          contentContainerStyle={tw`flex-grow px-6 pt-12 pb-10`}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={tw`w-12 h-12 bg-neutral-100 rounded-full items-center justify-center mb-10`}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.neutral[800]} />
          </TouchableOpacity>

          <View style={tw`mb-12`}>
            <Text style={tw`text-3xl font-bold text-neutral-900 mb-2 leading-tight`}>
              Welcome Back!
            </Text>
            <Text style={tw`text-lg text-neutral-500 leading-relaxed font-normal`}>
              Enter your credentials to manage your Leeta Agent dashboard.
            </Text>
          </View>

          {/* Form */}
          <View style={tw`flex-1`}>
            <AuthInput
              label="Email Address"
              placeholder="agent@leeta.com"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              icon="mail-outline"
              autoComplete="email"
              keyboardType="email-address"
            />

            <AuthInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              icon="lock-closed-outline"
              isPassword
              autoComplete="password"
            />

            <TouchableOpacity style={tw`self-end mb-10`}>
              <Text style={tw`text-brand font-semibold text-sm`}>Forgot Password?</Text>
            </TouchableOpacity>

            <AuthButton
              title="Sign In"
              onPress={handleLogin}
              loading={isSubmitting}
            />

            <View style={tw`flex-row items-center justify-center mt-12`}>
              <Text style={tw`text-neutral-500 text-sm`}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/signup' as any)}>
                <Text style={tw`text-brand font-bold text-sm`}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
