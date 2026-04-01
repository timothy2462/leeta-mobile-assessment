import { View, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import tw from '@/lib/tailwind';

export function DetailsSkeleton() {
  const animatedValue = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(animatedValue, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, [animatedValue]);

  return (
    <Animated.View style={[tw`flex-1 bg-[#EEF1F5] px-5 py-6`, { opacity: animatedValue }]}>

      <View style={tw`bg-white rounded-2xl p-5 mb-8 w-full`}>
        <View style={tw`flex-row justify-between mb-4`}>
          <View style={tw`w-32 h-4 bg-neutral-200 rounded mb-2`} />
          <View style={tw`w-20 h-4 bg-neutral-200 rounded`} />
        </View>
        <View style={tw`w-24 h-3 bg-neutral-100 rounded mb-6`} />

        <View style={tw`flex-row items-center gap-4 mb-8`}>
          <View style={tw`w-20 h-6 bg-neutral-200 rounded`} />
          <View style={tw`w-28 h-5 bg-neutral-100 rounded`} />
        </View>

        <View style={tw`flex-row items-center justify-between mb-3 w-full`}>
          <View style={tw`w-full h-1 bg-neutral-200 absolute`} />
          {[1, 2, 3, 4, 5].map(v => <View key={v} style={tw`w-6 h-6 rounded-full bg-neutral-300 z-10`} />)}
        </View>
      </View>

      <View style={tw`w-48 h-4 bg-neutral-200 rounded mb-4`} />
      <View style={tw`flex-row justify-center gap-3 mb-6`}>
        {[1, 2, 3, 4].map(v => <View key={v} style={tw`w-12 h-14 bg-white border border-neutral-200 rounded-xl`} />)}
      </View>
      <View style={tw`w-full h-[52px] bg-neutral-300 rounded-2xl mb-8`} />

      <View style={tw`bg-white rounded-2xl p-5 w-full h-40 mb-4`} />
      <View style={tw`bg-white rounded-2xl p-5 w-full h-64`} />

    </Animated.View>
  );
}
