import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <View style={tw`mb-8`}>
      <Text style={tw`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 px-1`}>
        {title}
      </Text>
      <View style={tw`bg-white rounded-2xl overflow-hidden shadow-sm`}>
        {children}
      </View>
    </View>
  );
}
