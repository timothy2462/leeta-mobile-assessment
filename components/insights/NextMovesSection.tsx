import { View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';

export function NextMovesSection() {
  return (
    <View style={tw`gap-4 mb-10`}>
      <View style={tw`bg-info-light rounded-2xl p-5 border border-info/10`}>
        <View style={tw`flex-row items-center gap-2 mb-2`}>
          <Ionicons name="trending-up" size={18} color={Colors.info.dark} />
          <Text style={tw`text-sm font-bold text-info-dark`}>
            Demand Surge Predicted
          </Text>
        </View>
        <Text style={tw`text-sm text-neutral-700 leading-5`}>
          Historical data suggests an 18% increase in weekend refills. Restock 12.5kg
          cylinders by Friday.
        </Text>
      </View>

      <View style={tw`bg-warning-light rounded-2xl p-5 border border-warning/10`}>
        <View style={tw`flex-row items-center gap-2 mb-2`}>
          <Ionicons name="star" size={18} color={Colors.warning.dark} />
          <Text style={tw`text-sm font-bold text-warning-dark`}>
            Customer Retention
          </Text>
        </View>
        <Text style={tw`text-sm text-neutral-700 leading-5`}>
          You have 3 active customers who haven't ordered in 4 weeks. Tap here to
          send them a re-engagement SMS.
        </Text>
      </View>

      <View style={tw`bg-success-light rounded-2xl p-5 border border-success/10`}>
        <View style={tw`flex-row items-center gap-2 mb-2`}>
          <MaterialCommunityIcons
            name="truck-fast"
            size={18}
            color={Colors.success.dark}
          />
          <Text style={tw`text-sm font-bold text-success-dark`}>
            Speed Optimization
          </Text>
        </View>
        <Text style={tw`text-sm text-neutral-700 leading-5`}>
          Your delivery times to Victoria Island are improving! Prioritize VI routes
          during non-rush hours to lower your overall average.
        </Text>
      </View>
    </View>
  );
}
