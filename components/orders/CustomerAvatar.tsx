import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';

interface CustomerAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

/** Deterministically pick an avatar color based on customer name */
const AVATAR_COLORS = [
  '#F97316',
  '#5B5BD6',
  '#22C55E',
  '#EF4444',
  '#A855F7',
  '#06B6D4',
  '#F59E0B',
  '#EC4899',
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const SIZE_CONFIG = {
  sm: { containerClass: 'w-8 h-8 rounded-lg', textClass: 'text-xs font-bold' },
  md: { containerClass: 'w-10 h-10 rounded-xl', textClass: 'text-sm font-bold' },
  lg: { containerClass: 'w-12 h-12 rounded-xl', textClass: 'text-base font-bold' },
};

export function CustomerAvatar({ name, size = 'md' }: CustomerAvatarProps) {
  const color = getAvatarColor(name);
  const initials = getInitials(name);
  const { containerClass, textClass } = SIZE_CONFIG[size];

  return (
    <View
      style={[
        tw`${containerClass} items-center justify-center`,
        { backgroundColor: color + '22' },
      ]}
    >
      <Text style={[tw`${textClass}`, { color }]}>{initials}</Text>
    </View>
  );
}
