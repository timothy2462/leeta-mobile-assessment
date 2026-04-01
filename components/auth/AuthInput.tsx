import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';

interface AuthInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
}

export function AuthInput({ label, error, icon, isPassword, style, ...props }: AuthInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <View style={tw`mb-5`}>
      <Text style={tw`text-sm font-semibold text-neutral-700 mb-2`}>{label}</Text>
      
      <View
        style={[
          tw`flex-row items-center bg-neutral-50 border-2 rounded-2xl px-4 h-14`,
          isFocused ? tw`border-brand` : tw`border-neutral-200`,
          !!error && tw`border-error/50`,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={isFocused ? Colors.brand.DEFAULT : Colors.neutral[400]}
            style={tw`mr-3`}
          />
        )}
        
        <TextInput
          style={[tw`flex-1 text-base text-neutral-900`, Platform.OS === 'web' && { outlineStyle: 'none' } as any, style]}
          placeholderTextColor={Colors.neutral[400]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          {...props}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={tw`ml-2`}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={Colors.neutral[400]}
            />
          </TouchableOpacity>
        )}
      </View>

      {!!error && (
        <Text style={tw`text-xs text-error mt-1.5 ml-1 font-medium`}>{error}</Text>
      )}
    </View>
  );
}
