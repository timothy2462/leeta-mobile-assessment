import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';

interface ProfileMenuItemProps {
  label: string;
  icon: string | keyof typeof Ionicons.glyphMap;
  iconLib?: 'Ionicons' | 'MaterialCommunityIcons';
  isLast?: boolean;
  onPress?: () => void;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (val: boolean) => void;
  destructive?: boolean;
}

export function ProfileMenuItem({
  label,
  icon,
  iconLib = 'Ionicons',
  isLast = false,
  onPress,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  destructive = false,
}: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      disabled={showSwitch}
      style={[
        tw`flex-row items-center px-4 py-4`,
        !isLast && tw`border-b border-neutral-100`,
      ]}
    >
      <View
        style={[
          tw`w-9 h-9 rounded-xl items-center justify-center mr-3`,
          destructive ? { backgroundColor: Colors.error.light } : { backgroundColor: Colors.brand.light },
        ]}
      >
        {iconLib === 'Ionicons' ? (
          <Ionicons
            name={icon as any}
            size={18}
            color={destructive ? Colors.error.DEFAULT : Colors.brand.DEFAULT}
          />
        ) : (
          <MaterialCommunityIcons
            name={icon as any}
            size={20}
            color={destructive ? Colors.error.DEFAULT : Colors.brand.DEFAULT}
          />
        )}
      </View>

      <Text
        style={[
          tw`flex-1 text-base font-medium`,
          destructive ? tw`text-error` : tw`text-neutral-800`,
        ]}
      >
        {label}
      </Text>

      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: Colors.neutral[300], true: Colors.success.DEFAULT }}
          thumbColor="white"
        />
      ) : (
        <Ionicons name="chevron-forward" size={18} color={Colors.neutral[300]} />
      )}
    </TouchableOpacity>
  );
}
