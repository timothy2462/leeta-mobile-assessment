import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';

interface EmptyStateProps {
  type: 'empty' | 'error';
  message?: string;
  onRetry?: () => void;
}

export function EmptyState({ type, message, onRetry }: EmptyStateProps) {
  const isError = type === 'error';

  return (
    <View style={tw`flex-1 items-center justify-center px-8 py-16`}>
      <View
        style={[
          tw`w-20 h-20 rounded-full items-center justify-center mb-5`,
          { backgroundColor: isError ? Colors.error.light : Colors.neutral[100] },
        ]}
      >
        <Ionicons
          name={isError ? 'alert-circle-outline' : 'receipt-outline'}
          size={36}
          color={isError ? Colors.error.DEFAULT : Colors.neutral[400]}
        />
      </View>

      <Text style={tw`text-lg font-semibold text-neutral-900 mb-2 text-center`}>
        {isError ? 'Something went wrong' : 'No orders yet'}
      </Text>

      <Text style={tw`text-sm text-neutral-500 text-center mb-6 leading-5`}>
        {message ??
          (isError
            ? "We couldn't load your orders. Check your connection and try again."
            : 'New orders will appear here once customers place requests.')}
      </Text>

      {isError && onRetry && (
        <TouchableOpacity
          style={tw`bg-brand rounded-xl px-8 py-3`}
          onPress={onRetry}
          accessibilityLabel="Retry loading orders"
          accessibilityRole="button"
        >
          <Text style={tw`text-white font-semibold text-base`}>Try again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
