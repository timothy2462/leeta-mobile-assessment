import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';

interface OrderItemsSummaryProps {
  orderId: string;
  orderType: string;
  amount: number;
}

export function OrderItemsSummary({ orderId, orderType, amount }: OrderItemsSummaryProps) {
  return (
    <View style={tw`mb-10`}>
      <Text style={tw`text-sm font-semibold text-neutral-700 mb-4 ml-1`}>Order items</Text>

      {/* Item summary card */}
      <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-4 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-3 flex-1 pr-4`}>
          <View style={tw`w-10 h-10 bg-neutral-100 rounded-lg items-center justify-center`}>
            <MaterialCommunityIcons name="gas-cylinder" size={20} color={Colors.neutral[600]} />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-bold text-neutral-900`}>20 kg Refill x 1</Text>
            <Text style={tw`text-[10px] text-neutral-400 mt-0.5`} numberOfLines={1}>Vendor brings gas to refill customer's cylinder</Text>
          </View>
        </View>
        <Text style={tw`text-sm font-semibold text-neutral-900`}>₦27,000</Text>
      </View>

      {/* Financial breakdown */}
      <View style={tw`bg-white rounded-2xl p-5 shadow-sm`}>
        <View style={tw`flex-row justify-between mb-4`}>
          <Text style={tw`text-sm text-neutral-500`}>Order #</Text>
          <View style={tw`flex-row items-center gap-1`}>
            <Text style={tw`text-sm font-medium text-neutral-900`}>{orderId}</Text>
            <MaterialCommunityIcons name="content-copy" size={14} color={Colors.neutral[500]} />
          </View>
        </View>

        <View style={tw`flex-row justify-between mb-4`}>
          <Text style={tw`text-sm text-neutral-500`}>Order type</Text>
          <Text style={tw`text-sm font-medium text-neutral-900`}>LPG</Text>
        </View>

        <View style={tw`flex-row justify-between mb-4`}>
          <Text style={tw`text-sm text-neutral-500`}>Delivery method</Text>
          <Text style={tw`text-sm font-medium text-success`}>On-site refill</Text>
        </View>

        <View style={tw`flex-row justify-between mb-4`}>
          <Text style={tw`text-sm text-neutral-500`}>Price per kg</Text>
          <Text style={tw`text-sm font-medium text-neutral-900`}>₦1,500</Text>
        </View>

        <View style={tw`flex-row justify-between mb-4`}>
          <Text style={tw`text-sm text-neutral-500`}>Estimated arrival</Text>
          <Text style={tw`text-sm font-medium text-neutral-900`}>12:38 PM</Text>
        </View>

        <View style={tw`flex-row justify-between mb-4`}>
          <Text style={tw`text-sm text-neutral-500`}>Payment method</Text>
          <Text style={tw`text-sm font-medium text-neutral-900`}>Transfer</Text>
        </View>

        <View style={tw`flex-row justify-between mb-4 items-center`}>
          <View style={tw`flex-row gap-1 items-center`}>
            <Text style={tw`text-sm text-neutral-500`}>Delivery fee</Text>
            <MaterialCommunityIcons name="information-outline" size={14} color={Colors.neutral[400]} />
          </View>
          <Text style={tw`text-sm font-medium text-neutral-900`}>₦900</Text>
        </View>

        <View style={tw`flex-row justify-between mb-4 items-center`}>
          <View style={tw`flex-row gap-1 items-center`}>
            <Text style={tw`text-sm text-neutral-500`}>Service charges</Text>
            <MaterialCommunityIcons name="information-outline" size={14} color={Colors.neutral[400]} />
          </View>
          <Text style={tw`text-sm font-medium text-neutral-900`}>₦2,295</Text>
        </View>

        <View style={tw`w-full h-px bg-neutral-100 my-1`} />

        <View style={tw`flex-row justify-between mt-3 mb-1`}>
          <Text style={tw`text-sm font-bold text-neutral-900`}>Total</Text>
          <Text style={tw`text-sm font-bold text-neutral-900`}>₦{amount.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );
}
