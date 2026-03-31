import { Modal, View, TouchableWithoutFeedback, Animated, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '@/lib/tailwind';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={tw`flex-1 justify-end`}>
          {/* Backdrop */}
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={[StyleSheet.absoluteFill, tw`bg-black/50`]} />
          </TouchableWithoutFeedback>

          {/* Content */}
          <View
            style={[
              tw`bg-white rounded-t-3xl overflow-hidden`,
              { paddingBottom: Math.max(insets.bottom, 20) }, // safe area
            ]}
          >
            {/* Grabber handle */}
            <View style={tw`items-center pt-3 pb-2`}>
              <View style={tw`w-12 h-1.5 bg-neutral-200 rounded-full`} />
            </View>
            
            <View style={tw`px-5 pt-2 pb-5`}>
              {children}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
