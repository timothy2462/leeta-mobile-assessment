import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Shadows } from '@/lib/design-system';

interface StatsCardProps {
  label: string;
  value: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
  iconBg: string;
  flex?: number;
}

export function StatsCard({ label, value, iconName, iconColor, iconBg, flex = 1 }: StatsCardProps) {
  return (
    <View
      style={[
        tw`bg-white rounded-xl p-4`,
        { flex },
        Shadows.sm,
      ]}
    >
      <View
        style={[
          tw`w-9 h-9 rounded-lg items-center justify-center mb-3`,
          { backgroundColor: iconBg },
        ]}
      >
        <Ionicons name={iconName} size={18} color={iconColor} />
      </View>

      <Text style={tw`text-xs text-neutral-500 mb-1`}>{label}</Text>

      <Text style={tw`text-xl font-bold text-neutral-900`} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
    </View>
  );
}
