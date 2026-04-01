import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from '@/lib/tailwind';
import { Colors, Shadows } from '@/lib/design-system';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { useAuth } from '@/shared/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth();
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    location: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validateStep = () => {
    const newErrors: Partial<typeof formData> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Full name is required';
      if (!formData.email) newErrors.email = 'Email address is required';
      else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email';
      const phoneRegex = /^\d{11}$/;
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone must be exactly 11 digits';
    } else if (step === 2) {
      if (!formData.businessName) newErrors.businessName = 'Business name is required';
      if (!formData.location) newErrors.location = 'Location is required';
    } else if (step === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      
      const hasUpper = /[A-Z]/.test(formData.password);
      const hasNumber = /[0-9]/.test(formData.password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
      
      if (!hasUpper || !hasNumber || !hasSpecial) {
        newErrors.password = 'Must include uppercase, number, and special character';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) setStep(step + 1);
      else handleSignup();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.back();
  };

  const handleSignup = async () => {
    setIsSubmitting(true);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        businessName: formData.businessName,
      }, formData.password);
    } catch (e) {
      setIsSubmitting(false);
      Alert.alert('Signup Failed', 'An error occurred. Please try again.');
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const renderStepIndicator = () => (
    <View style={tw`flex-row items-center justify-center gap-3 mb-10`}>
      {[1, 2, 3].map((s) => (
        <View 
          key={s} 
          style={[
            tw`h-1.5 rounded-full`,
            { width: s === step ? 40 : 12 },
            s === step ? tw`bg-brand` : (s < step ? tw`bg-brand/40` : tw`bg-neutral-200`)
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[tw`flex-1 bg-white`, { alignSelf: 'center', width: '100%', maxWidth: 600 }]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
        <ScrollView 
          contentContainerStyle={tw`flex-grow px-6 pt-12 pb-10`}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity 
            onPress={handleBack} 
            style={tw`w-12 h-12 bg-neutral-100 rounded-full items-center justify-center mb-10`}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.neutral[800]} />
          </TouchableOpacity>

          <View style={tw`mb-2`}>
            <Text style={tw`text-3xl font-bold text-neutral-900 mb-2 leading-tight text-center`}>
              {step === 1 ? 'Join Leeta Agent' : step === 2 ? 'Business Details' : 'Secure Account'}
            </Text>
            <Text style={tw`text-base text-neutral-500 text-center mb-8 px-6`}>
              {step === 1 ? 'Enter your personal details to get started.' : step === 2 ? 'Tell us more about your gas agency.' : 'Set a strong password for your security.'}
            </Text>
          </View>

          {renderStepIndicator()}

          <View style={tw`flex-1`}>
            {step === 1 && (
              <>
                <AuthInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChangeText={(v) => updateField('name', v)}
                  error={errors.name}
                  icon="person-outline"
                />
                <AuthInput
                  label="Email Address"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChangeText={(v) => updateField('email', v)}
                  error={errors.email}
                  icon="mail-outline"
                  keyboardType="email-address"
                />
                <AuthInput
                  label="Phone Number"
                  placeholder="+234"
                  value={formData.phone}
                  onChangeText={(v) => updateField('phone', v)}
                  error={errors.phone}
                  icon="call-outline"
                  keyboardType="phone-pad"
                />
              </>
            )}

            {step === 2 && (
              <>
                <AuthInput
                  label="Business Name"
                  placeholder="Enter your gas agency name"
                  value={formData.businessName}
                  onChangeText={(v) => updateField('businessName', v)}
                  error={errors.businessName}
                  icon="business-outline"
                />
                <AuthInput
                  label="Service Location"
                  placeholder="Street address, City"
                  value={formData.location}
                  onChangeText={(v) => updateField('location', v)}
                  error={errors.location}
                  icon="location-outline"
                />
              </>
            )}

            {step === 3 && (
              <>
                <AuthInput
                  label="Password"
                  placeholder="Enter a strong password"
                  value={formData.password}
                  onChangeText={(v) => updateField('password', v)}
                  error={errors.password}
                  icon="lock-closed-outline"
                  isPassword
                />
                <AuthInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChangeText={(v) => updateField('confirmPassword', v)}
                  error={errors.confirmPassword}
                  icon="shield-checkmark-outline"
                  isPassword
                />
              </>
            )}

            <View style={tw`mt-10`}>
              <AuthButton
                title={step === 3 ? 'Create My Account' : 'Next Step'}
                onPress={handleNext}
                loading={isSubmitting}
              />
              {step === 1 && (
                <View style={tw`flex-row items-center justify-center mt-12`}>
                  <Text style={tw`text-neutral-500 text-sm`}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => router.push('/login' as any)}>
                    <Text style={tw`text-brand font-bold text-sm`}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
