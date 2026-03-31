import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tailwind';

export default function InsightsScreen() {
  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-100 items-center justify-center`}>
      <Text style={tw`text-xl font-bold text-neutral-900`}>Insights</Text>
      <Text style={tw`text-sm text-neutral-500 mt-2`}>Coming soon</Text>
    </SafeAreaView>
  );
}
