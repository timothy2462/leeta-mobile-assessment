import { useEffect, useRef } from 'react';
import { View, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tailwind';

function SkeletonBox({
  width,
  height,
  rounded = 'md',
  style,
}: {
  width: number | `${number}%`;
  height: number;
  rounded?: 'sm' | 'md' | 'lg' | '2xl' | '3xl' | 'full';
  style?: object;
}) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  const radiusMap = { sm: 4, md: 8, lg: 12, '2xl': 16, '3xl': 24, full: 9999 };

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: '#E5E7EB',
          borderRadius: radiusMap[rounded as keyof typeof radiusMap],
          opacity,
        },
        style,
      ]}
    />
  );
}

export function InsightsSkeleton() {
  return (
    <SafeAreaView style={[tw`flex-1 bg-[#F4F5F9]`, { alignSelf: 'center', width: '100%', maxWidth: 600 }]} edges={['top']}>
      <ScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`px-5 pt-8 pb-32`}
      >
        {/* Header */}
        <View style={tw`mb-8`}>
          <SkeletonBox width={120} height={32} rounded="md" style={tw`mb-2`} />
          <SkeletonBox width="100%" height={16} rounded="md" style={tw`mb-1`} />
          <SkeletonBox width="80%" height={16} rounded="md" />
        </View>

        {/* Metric Cards Grid */}
        <View style={tw`flex-row gap-3 mb-3`}>
          <View style={tw`flex-1 bg-white rounded-2xl p-4 shadow-sm`}>
            <SkeletonBox width={32} height={32} rounded="lg" style={tw`mb-6`} />
            <SkeletonBox width={80} height={12} rounded="md" style={tw`mt-auto`} />
            <SkeletonBox width={50} height={24} rounded="md" style={tw`mt-1`} />
          </View>
          <View style={tw`flex-[1.5] bg-white rounded-2xl p-4 shadow-sm`}>
            <SkeletonBox width={32} height={32} rounded="lg" style={tw`mb-6`} />
            <SkeletonBox width={100} height={12} rounded="md" style={tw`mt-auto`} />
            <SkeletonBox width={120} height={24} rounded="md" style={tw`mt-1`} />
          </View>
        </View>

        <View style={tw`flex-row gap-3 mb-3`}>
          <View style={tw`flex-1 bg-white rounded-2xl p-4 shadow-sm`}>
            <SkeletonBox width={32} height={32} rounded="lg" style={tw`mb-6`} />
            <SkeletonBox width={80} height={12} rounded="md" style={tw`mt-auto`} />
            <SkeletonBox width={40} height={24} rounded="md" style={tw`mt-1`} />
          </View>
          <View style={tw`flex-1 bg-white rounded-2xl p-4 shadow-sm`}>
            <SkeletonBox width={50} height={14} rounded="md" style={tw`mb-2`} />
            <View style={tw`flex-row gap-1 mb-1`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <SkeletonBox key={i} width={14} height={14} rounded="full" />
              ))}
            </View>
            <View style={tw`flex-row items-baseline gap-1 mt-auto`}>
              <SkeletonBox width={40} height={28} rounded="md" />
              <SkeletonBox width={30} height={12} rounded="md" />
            </View>
          </View>
        </View>

        <View style={tw`flex-row gap-3 mb-10`}>
          <View style={tw`flex-[1.9] bg-white rounded-2xl p-4 shadow-sm`}>
            <SkeletonBox width={32} height={32} rounded="lg" style={tw`mb-6`} />
            <SkeletonBox width={80} height={12} rounded="md" style={tw`mt-auto`} />
            <SkeletonBox width={140} height={24} rounded="md" style={tw`mt-1`} />
          </View>
          <View style={tw`flex-[1.1] bg-white rounded-2xl p-4 shadow-sm`}>
            <SkeletonBox width={32} height={32} rounded="lg" style={tw`mb-6`} />
            <SkeletonBox width={80} height={12} rounded="md" style={tw`mt-auto`} />
            <SkeletonBox width={60} height={24} rounded="md" style={tw`mt-1`} />
          </View>
        </View>

        {/* Chart Section */}
        <SkeletonBox width={120} height={20} rounded="md" style={tw`mb-4`} />
        <View style={tw`bg-white rounded-3xl p-5 shadow-sm mb-10 h-[280px]`}>
          <View style={tw`flex-row justify-between mb-8`}>
            <SkeletonBox width={60} height={16} rounded="md" />
            <SkeletonBox width={80} height={16} rounded="md" />
          </View>
          <SkeletonBox width="100%" height={180} rounded="lg" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
