import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';
import { CustomerAvatar } from '@/components/orders/CustomerAvatar';

interface CustomerContextCardProps {
  customerName: string;
  phone: string;
}

export function CustomerContextCard({ customerName, phone }: CustomerContextCardProps) {
  return (
    <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm`}>
      <Text style={tw`text-sm font-semibold text-neutral-700 mb-4`}>Customer details</Text>

      <View style={tw`flex-row items-center justify-between mb-6`}>
        <View style={tw`flex-row items-center gap-3`}>
          <CustomerAvatar name={customerName} size="lg" />
          <View>
            <Text style={tw`text-sm font-semibold text-[#30308d]`}>{customerName}</Text>
            <Text style={tw`text-xs text-neutral-500 underline mt-0.5`}>{phone}</Text>
          </View>
        </View>

        <View style={tw`flex-row gap-2`}>
          <TouchableOpacity style={tw`w-8 h-8 rounded-lg border border-neutral-200 items-center justify-center`}>
            <MaterialCommunityIcons name="message-text-outline" size={16} color={Colors.neutral[600]} />
          </TouchableOpacity>
          <TouchableOpacity style={tw`w-8 h-8 rounded-lg border border-neutral-200 items-center justify-center`}>
            <Ionicons name="call-outline" size={16} color={Colors.neutral[600]} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={tw`text-sm font-semibold text-neutral-900 mb-2`}>Delivery Address</Text>
      <Text style={tw`text-xs text-neutral-600 mb-1`}>12 Bukola estate, Boulevard, Victoria Island</Text>
      <Text style={tw`text-xs font-semibold text-brand mb-4`}>1.8km from you</Text>

      <View style={tw`flex-row gap-1.5 items-center`}>
        <MaterialCommunityIcons name="information-outline" size={14} color={Colors.success.DEFAULT} />
        <Text style={tw`text-xs font-medium text-success`}>Delivery requires PIN confirmation</Text>
      </View>
    </View>
  );
}
