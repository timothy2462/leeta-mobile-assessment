import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../lib/tailwind';

export default function Home() {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 justify-center items-center p-6`}>
        <Text style={tw`text-2xl font-bold text-primary mb-2`}>
          Welcome to your new app!
        </Text>
        <Text style={tw`text-base text-gray-600 text-center`}>
          Tailwind is now set up and ready to use.
        </Text>
      </View>
    </SafeAreaView>
  );
}
