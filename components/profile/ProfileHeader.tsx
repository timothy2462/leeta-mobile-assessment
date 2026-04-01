import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';
import { useAuth } from '@/shared/contexts/AuthContext';

export function ProfileHeader() {
  const { user } = useAuth();
  
  return (
    <View style={tw`items-center justify-center pt-6 pb-10`}>
      <View style={tw`relative`}>
        <View style={tw`w-28 h-28 rounded-full bg-neutral-200 border-4 border-white shadow-sm overflow-hidden items-center justify-center`}>
           <Ionicons name="person" size={56} color={Colors.neutral[400]} />
        </View>
        <TouchableOpacity 
          style={tw`absolute bottom-0 right-0 bg-brand p-2 rounded-full border-2 border-white`}
          activeOpacity={0.7}
        >
          <Ionicons name="camera" size={16} color="white" />
        </TouchableOpacity>
      </View>

      <View style={tw`items-center mt-4`}>
        <View style={tw`flex-row items-center gap-1`}>
          <Text style={tw`text-xl font-bold text-neutral-900 ml-5`}>{user?.name || 'Agent User'}</Text>
          <Ionicons name="checkmark-circle" size={18} color={Colors.info.DEFAULT} />
        </View>
        <Text style={tw`text-sm text-neutral-500 mt-1`}>{user?.businessName || 'Leeta Agent'} - #GH-229</Text>
      </View>
    </View>
  );
}
