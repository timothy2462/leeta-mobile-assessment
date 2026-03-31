import { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import { Colors } from '@/lib/design-system';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '@/lib/tailwind';

interface ToastProps {
  visible: boolean;
  message: string;
  onHide: () => void;
}

export function Toast({ visible, message, onHide }: ToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: Math.max(insets.top, 20) + 10,
        useNativeDriver: true,
        speed: 15,
        bounciness: 8,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -150,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide());
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(translateY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, insets.top, onHide, translateY]);

  return (
    <Animated.View
      style={[
        tw`absolute top-0 left-5 right-5 rounded-xl bg-success flex-row items-center px-4 py-3 shadow border border-success/20`,
        { transform: [{ translateY }], zIndex: 9999 },
      ]}
    >
      <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
      <Text style={tw`text-white text-sm font-medium ml-2`}>{message}</Text>
    </Animated.View>
  );
}
