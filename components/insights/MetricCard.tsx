import { View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';

export interface MetricCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
  iconLib?: 'Ionicons' | 'MaterialCommunityIcons';
  iconColor: string;
  iconBg: string;
  flex?: number;
}

export function MetricCard({
  title,
  value,
  icon,
  iconLib = 'Ionicons',
  iconColor,
  iconBg,
  flex = 1,
}: MetricCardProps) {
  return (
    <View style={[tw`bg-white rounded-2xl p-4 shadow-sm`, { flex }]}>
      <View
        style={[
          tw`w-8 h-8 rounded-lg items-center justify-center mb-6`,
          { backgroundColor: iconBg },
        ]}
      >
        {iconLib === 'Ionicons' ? (
          <Ionicons name={icon as any} size={16} color={iconColor} />
        ) : (
          <MaterialCommunityIcons name={icon as any} size={16} color={iconColor} />
        )}
      </View>
      <Text style={[tw`text-xs text-neutral-500 mt-auto`, { minHeight: 18 }]}>
        {title}
      </Text>
      <Text
        style={tw`text-[24px] font-bold text-neutral-900 mt-1`}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>
    </View>
  );
}
