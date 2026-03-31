import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors, Shadows } from '@/lib/design-system';
import { Order } from '@/shared/types/order';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderTypeBadge } from './OrderTypeBadge';
import { CustomerAvatar } from './CustomerAvatar';

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTimeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `Requested ${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `Requested ${diffHours}hr${diffHours > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `Requested ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface OrderCardProps {
  order: Order;
  onAccept?: (order: Order) => void;
  onReject?: (order: Order) => void;
  onMarkDelivered?: (id: string) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function OrderCard({ order, onAccept, onReject, onMarkDelivered }: OrderCardProps) {
  const { id, customerName, quantity, status, orderType, amount, distance, createdAt } = order;

  const handleAccept = () => onAccept?.(order);
  const handleReject = () => onReject?.(order);

  const handleMarkDelivered = () => {
    Alert.alert(
      'Mark as Delivered',
      `Confirm delivery for ${customerName}'s order?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', style: 'default', onPress: () => onMarkDelivered?.(id) },
      ]
    );
  };

  return (
    <View
      style={[tw`bg-white mx-5 mb-3 rounded-xl overflow-hidden`, Shadows.sm]}
      accessibilityLabel={`Order from ${customerName}`}
    >
      <View style={tw`p-4`}>
        {/* ── Top row: avatar + customer info + type badge ─────────────────── */}
        <View style={tw`flex-row items-start gap-3 mb-4`}>
          {/* Gas cylinder icon */}
          <View style={tw`w-10 h-10 bg-neutral-100 rounded-lg items-center justify-center`}>
            <MaterialCommunityIcons
              name="gas-cylinder"
              size={22}
              color={Colors.neutral[500]}
            />
          </View>

          {/* Info section */}
          <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-semibold text-neutral-900 mb-1`}>
              {customerName}
              <Text style={tw`font-normal text-neutral-500`}> – Refill</Text>
            </Text>

            {/* Timestamp */}
            <Text style={tw`text-xs text-neutral-400 mb-2.5`}>
              {formatTimeAgo(createdAt)}
            </Text>

            {/* ── Info row: quantity + price + distance ─────────────────────────── */}
            <View style={tw`flex-row items-center gap-3`}>
              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`text-xs text-neutral-600 font-medium`}>{quantity}</Text>
              </View>

              <View style={tw`flex-row items-center gap-1`}>
                <Ionicons name="wallet-outline" size={13} color={Colors.neutral[400]} />
                <Text style={tw`text-xs text-neutral-600 font-medium`}>{formatNaira(amount)}</Text>
              </View>

              {distance !== undefined && (
                <View style={tw`flex-row items-center gap-1`}>
                  <Ionicons name="location-outline" size={13} color={Colors.neutral[400]} />
                  <Text style={tw`text-xs text-neutral-600 font-medium`}>{distance} km</Text>
                </View>
              )}
            </View>
          </View>

          {/* Type badge (top-right replacing status badge) */}
          <OrderTypeBadge orderType={orderType} />
        </View>

        {/* ── Action buttons ───────────────────────────────────────────────── */}
        {status === 'pending' && (
          <View style={tw`flex-row gap-3 mt-1`}>
            <TouchableOpacity
              style={tw`flex-1 bg-brand rounded-xl py-2.5 items-center`}
              onPress={handleAccept}
              accessibilityLabel={`Accept order from ${customerName}`}
              accessibilityRole="button"
            >
              <Text style={tw`text-white font-semibold text-sm`}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-1 border border-brand rounded-xl py-2.5 items-center`}
              onPress={handleReject}
              accessibilityLabel={`Reject order from ${customerName}`}
              accessibilityRole="button"
            >
              <Text style={tw`text-brand font-semibold text-sm`}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}

        {status === 'in_transit' && (
          <TouchableOpacity
            style={tw`bg-brand rounded-xl py-2.5 items-center flex-row justify-center gap-2 mt-1`}
            onPress={handleMarkDelivered}
            accessibilityLabel={`Mark order from ${customerName} as delivered`}
            accessibilityRole="button"
          >
            <Ionicons name="checkmark-done-outline" size={18} color={Colors.white} />
            <Text style={tw`text-white font-semibold text-sm`}>Mark as Delivered</Text>
          </TouchableOpacity>
        )}

        {status === 'delivered' && (
          <View style={tw`flex-row items-center justify-center gap-2 py-2 bg-success-light rounded-xl mt-1`}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.success.DEFAULT} />
            <Text style={tw`text-success font-semibold text-sm`}>Order Completed</Text>
          </View>
        )}
      </View>
    </View>
  );
}
