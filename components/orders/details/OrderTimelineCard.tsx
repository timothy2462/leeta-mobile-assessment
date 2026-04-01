import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';

interface OrderTimelineCardProps {
  customerName: string;
  dateString: string;
  orderId: string;
  amount: string;
}

export function OrderTimelineCard({ customerName, dateString, orderId, amount }: OrderTimelineCardProps) {
  const steps = [true, true, true, true, false];

  return (
    <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm`}>
      <View style={tw`flex-row justify-between items-start mb-6`}>
        <View>
          <Text style={tw`text-base font-semibold text-neutral-900`}>{customerName}</Text>
          <Text style={tw`text-sm text-neutral-500 mt-1`}>{dateString}</Text>
        </View>
        <Text style={tw`text-sm font-medium text-brand`}>Report an issue</Text>
      </View>

      <View style={tw`flex-row items-center gap-3 mb-6`}>
        <Text style={tw`text-sm font-bold text-neutral-900`}>₦{amount}</Text>
        <Text style={tw`text-sm text-neutral-400`}>Order {orderId}</Text>
      </View>

      <View style={tw`w-full mb-3`}>
        <View style={tw`flex-row items-center justify-between relative`}>
          <View style={tw`absolute left-3 right-3 h-0.5 bg-success top-1/2 -mt-px z-0`} />

          {steps.map((isDone, index) => {
            const isLast = index === steps.length - 1;
            if (isLast) {
              return (
                <View
                  key={index}
                  style={tw`w-6 h-6 border-[2.5px] border-neutral-800 rounded-md bg-white items-center justify-center z-10`}
                >
                  <View style={tw`w-2 h-0.5 bg-neutral-800`} />
                </View>
              );
            }
            return (
              <View
                key={index}
                style={tw`w-5 h-5 bg-success rounded-full items-center justify-center z-10`}
              >
                <MaterialCommunityIcons name="check" size={12} color={Colors.white} />
              </View>
            );
          })}
        </View>
      </View>

      <View style={tw`flex-row items-center gap-1.5`}>
        <Text style={tw`text-xs text-neutral-500`}>12:40 PM</Text>
        <Text style={tw`text-xs font-semibold text-neutral-900`}>Order Delivered</Text>
      </View>
    </View>
  );
}
