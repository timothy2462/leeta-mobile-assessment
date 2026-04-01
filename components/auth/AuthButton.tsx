import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors, Shadows } from '@/lib/design-system';

interface AuthButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  icon?: keyof typeof Ionicons.glyphMap;
}

export function AuthButton({ title, loading, variant = 'primary', icon, style, disabled, ...props }: AuthButtonProps) {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        tw`h-14 rounded-2xl flex-row items-center justify-center px-6`,
        isPrimary && (disabled ? tw`bg-neutral-200` : tw`bg-brand`),
        isOutline && tw`border-2 border-neutral-200 bg-white`,
        isGhost && tw`bg-transparent h-auto py-2`,
        isPrimary && !disabled && Shadows.md,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? 'white' : Colors.brand.DEFAULT} />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={isPrimary ? 'white' : (isGhost ? Colors.brand.DEFAULT : Colors.neutral[700])}
              style={tw`mr-2`}
            />
          )}
          <Text
            style={[
              tw`text-base font-bold`,
              isPrimary && (disabled ? tw`text-neutral-400` : tw`text-white`),
              isOutline && tw`text-neutral-800`,
              isGhost && tw`text-brand`,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
