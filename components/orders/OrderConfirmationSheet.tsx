import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Order } from '@/shared/types/order';
import { CustomerAvatar } from './CustomerAvatar';

interface OrderConfirmationSheetProps {
  order: Order | null;
  actionType: 'accept' | 'reject' | null;
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function OrderConfirmationSheet({
  order,
  actionType,
  visible,
  onClose,
  onConfirm,
}: OrderConfirmationSheetProps) {
  if (!order) return null;

  const isAccept = actionType === 'accept';
  const title = isAccept ? 'Accept Order' : 'Reject Order';
  const description = isAccept
    ? "Review the order details before accepting."
    : "Are you sure you want to reject this order? This action cannot be undone.";

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-xl font-bold text-neutral-900 text-center mb-1`}>{title}</Text>
        <Text style={tw`text-sm text-neutral-500 text-center`}>{description}</Text>
      </View>

      <View style={tw`bg-neutral-50 rounded-xl p-4 mb-5 border border-neutral-100`}>
        <View style={tw`flex-row items-center gap-3 mb-4`}>
          <CustomerAvatar name={order.customerName} size="md" />
          <View style={tw`flex-1`}>
            <Text style={tw`text-base font-semibold text-neutral-900`}>{order.customerName}</Text>
            <View style={tw`flex-row items-center gap-1 mt-0.5`}>
              <Ionicons name="call" size={12} color={Colors.neutral[500]} />
              <Text style={tw`text-sm text-neutral-500`}>{order.phone}</Text>
            </View>
          </View>
        </View>

        <View style={tw`flex-row flex-wrap border-t border-neutral-200 pt-3`}>

          <View style={tw`w-1/2 mb-3 items-center flex-row gap-2`}>
            <View style={tw`w-8 h-8 rounded-full bg-brand-light items-center justify-center`}>
              <MaterialCommunityIcons name="gas-cylinder" size={16} color={Colors.brand.DEFAULT} />
            </View>
            <View>
              <Text style={tw`text-xs text-neutral-400`}>Quantity</Text>
              <Text style={tw`text-sm font-semibold text-neutral-900`}>{order.quantity}</Text>
            </View>
          </View>

          <View style={tw`w-1/2 mb-3 items-center flex-row gap-2`}>
            <View style={tw`w-8 h-8 rounded-full bg-success-light items-center justify-center`}>
              <Ionicons name="wallet" size={16} color={Colors.success.DEFAULT} />
            </View>
            <View>
              <Text style={tw`text-xs text-neutral-400`}>Amount</Text>
              <Text style={tw`text-sm font-semibold text-neutral-900`}>₦{order.amount.toLocaleString()}</Text>
            </View>
          </View>

          {order.distance !== undefined && (
            <View style={tw`w-1/2 items-center flex-row gap-2`}>
              <View style={tw`w-8 h-8 rounded-full bg-info-light items-center justify-center`}>
                <Ionicons name="location" size={16} color={Colors.info.DEFAULT} />
              </View>
              <View>
                <Text style={tw`text-xs text-neutral-400`}>Distance</Text>
                <Text style={tw`text-sm font-semibold text-neutral-900`}>{order.distance} km away</Text>
              </View>
            </View>
          )}

        </View>
      </View>

      <View style={tw`flex-row gap-3`}>
        <TouchableOpacity
          style={tw`flex-1 py-3.5 rounded-xl border border-neutral-200 items-center justify-center`}
          onPress={onClose}
        >
          <Text style={tw`font-semibold text-neutral-700`}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 py-3.5 rounded-xl items-center justify-center ${isAccept ? 'bg-brand' : 'bg-error'}`}
          onPress={() => {
            onConfirm();
            onClose();
          }}
        >
          <Text style={tw`font-semibold text-white`}>
            {isAccept ? 'Accept Order' : 'Reject Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}
