import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import { OrderStatus } from '@/shared/types/order';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; textClass: string; bgClass: string }
> = {
  pending: {
    label: 'Pending',
    textClass: 'text-warning',
    bgClass: 'bg-warning-light',
  },
  in_transit: {
    label: 'In Transit',
    textClass: 'text-info',
    bgClass: 'bg-info-light',
  },
  delivered: {
    label: 'Delivered',
    textClass: 'text-success',
    bgClass: 'bg-success-light',
  },
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View style={tw`${config.bgClass} rounded-full px-2.5 py-1`}>
      <Text style={tw`${config.textClass} text-xs font-semibold`}>
        {config.label}
      </Text>
    </View>
  );
}
