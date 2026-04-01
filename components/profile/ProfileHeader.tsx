import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';
import { useAuth } from '@/shared/contexts/AuthContext';

export function ProfileHeader() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={tw`w-full items-center pb-8`}>
      <View style={[
        tw`w-full bg-brand`, 
        { 
          height: 120 + insets.top, 
          paddingTop: insets.top,
          borderBottomLeftRadius: 40, 
          borderBottomRightRadius: 40 
        }
      ]} />
      
      <View style={tw`-mt-14`}>
        <View style={tw`relative`}>
          <View style={tw`w-28 h-28 rounded-full bg-neutral-100 border-4 border-white shadow-lg items-center justify-center overflow-hidden`}>
            <Ionicons name="person" size={56} color={Colors.neutral[400]} />
          </View>
          <TouchableOpacity 
            style={tw`absolute bottom-0 right-0 bg-brand p-2.5 rounded-full border-2 border-white shadow-sm`}
            activeOpacity={0.7}
          >
            <Ionicons name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`items-center mt-4 px-6`}>
        <View style={tw`flex-row items-center gap-1`}>
          <Text style={tw`text-2xl font-bold text-neutral-900`}>{user?.name || 'Agent User'}</Text>
          <Ionicons name="checkmark-circle" size={20} color={Colors.info.DEFAULT} />
        </View>
        <Text style={tw`text-sm font-medium text-neutral-500 mt-1`}>
          {user?.businessName || 'Leeta Agent'} • #GH-229
        </Text>
      </View>
    </View>
  );
}
