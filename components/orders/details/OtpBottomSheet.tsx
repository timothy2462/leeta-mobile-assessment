import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Platform } from 'react-native';
import tw from '@/lib/tailwind';
import { BottomSheet } from '@/components/ui/BottomSheet';

interface OtpBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (code: string) => void;
  customerName?: string;
}

export function OtpBottomSheet({ visible, onClose, onComplete, customerName }: OtpBottomSheetProps) {
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);

  // Reset when opening
  useEffect(() => {
    if (visible) {
      setCode('');
      // focus input slightly after mount to allow modal animation to finish
      setTimeout(() => inputRef.current?.focus(), 400);
    } else {
      Keyboard.dismiss();
    }
  }, [visible]);

  const isComplete = code.length === 4;

  const handleComplete = () => {
    if (isComplete) {
      if (code !== '1234') {
        const { logger } = require('@/lib/logger');
        logger.error('Invalid OTP attempt', { 
          customer: customerName, 
          attempt: code 
        });
      }
      onComplete(code);
    }
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={tw`mb-2 pt-2`}>
        <Text style={tw`text-xl font-bold text-neutral-900 mb-2`}>
          Enter code from Customer
        </Text>
        <Text style={tw`text-sm text-neutral-500 mb-8`}>
          Please enter the 4-digit pin from {customerName || 'the customer'} to confirm you have safely delivered this order.
        </Text>

        {/* Hidden Input field for robust native typing/pasting */}
        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={(text) => setCode(text.replace(/[^0-9]/g, '').slice(0, 4))}
          keyboardType="number-pad"
          maxLength={4}
          style={[tw`absolute opacity-0`, { width: 1, height: 1 }, Platform.OS === 'web' && { outlineStyle: 'none' } as any]}
          caretHidden
          contextMenuHidden
        />

        {/* Visual OTP Boxes */}
        <View style={tw`flex-row justify-center gap-4 mb-8`}>
          {[0, 1, 2, 3].map((index) => {
            const digit = code[index] || '';
            const isActive = code.length === index || (code.length === 4 && index === 3);

            return (
              <TouchableOpacity
                key={`otp-${index}`}
                activeOpacity={1}
                onPress={() => inputRef.current?.focus()}
                style={[
                  tw`w-14 h-16 rounded-xl border-2 items-center justify-center bg-white`,
                  isActive ? [{ borderColor: '#F97316', backgroundColor: '#FFF0E6' }] : tw`border-neutral-200`,
                ]}
              >
                <Text style={tw`text-2xl font-medium text-neutral-900`}>{digit}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={handleComplete}
          disabled={!isComplete}
          activeOpacity={0.8}
          style={[
            tw`w-full py-4 rounded-2xl shadow-sm items-center justify-center`,
            isComplete ? tw`bg-brand` : tw`bg-neutral-200`,
          ]}
        >
          <Text
            style={[
              tw`font-medium text-base`,
              isComplete ? tw`text-white` : tw`text-neutral-500`,
            ]}
          >
            Complete Order
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}
