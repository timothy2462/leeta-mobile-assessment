import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import { OrderType } from '@/shared/types/order';

interface OrderTypeBadgeProps {
  orderType: OrderType;
}

const TYPE_CONFIG: Record<
  OrderType,
  { label: string; textClass: string }
> = {
  pickup_refill: {
    label: 'Pick up & refill',
    textClass: 'text-brand',
  },
  cylinder_exchange: {
    label: 'Cylinder Exchange',
    textClass: 'text-info',
  },
  home_delivery: {
    label: 'Home Delivery',
    textClass: 'text-success',
  },
};

export function OrderTypeBadge({ orderType }: OrderTypeBadgeProps) {
  const config = TYPE_CONFIG[orderType];

  return (
    <View style={tw`bg-transparent border border-neutral-200 rounded-full px-2.5 py-1`}>
      <Text style={[tw`${config.textClass} font-medium`, { fontSize: 11 }]}>
        {config.label}
      </Text>
    </View>
  );
}
