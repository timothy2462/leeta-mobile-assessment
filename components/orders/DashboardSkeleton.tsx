import { useEffect, useRef } from 'react';
import { View, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tailwind';

// ── Animated skeleton box ─────────────────────────────────────────────────────

function SkeletonBox({
  width,
  height,
  rounded = 'md',
  style,
}: {
  width: number | `${number}%`;
  height: number;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  style?: object;
}) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 750, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  const radiusMap = { sm: 4, md: 8, lg: 12, full: 9999 };

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: '#E5E7EB',
          borderRadius: radiusMap[rounded],
          opacity,
        },
        style,
      ]}
    />
  );
}

// ── Skeleton order card ───────────────────────────────────────────────────────

function SkeletonOrderCard() {
  return (
    <View style={tw`bg-white mx-5 mb-3 rounded-xl p-4`}>
      {/* Top row */}
      <View style={tw`flex-row items-start gap-3 mb-3`}>
        <SkeletonBox width={40} height={40} rounded="lg" />
        <View style={tw`flex-1 gap-2`}>
          <View style={tw`flex-row items-center gap-2`}>
            <SkeletonBox width={120} height={14} rounded="md" />
            <SkeletonBox width={80} height={20} rounded="sm" />
          </View>
          <SkeletonBox width={100} height={11} rounded="md" />
        </View>
      </View>

      {/* Info row */}
      <View style={tw`flex-row gap-4 mb-4`}>
        <SkeletonBox width={60} height={12} rounded="md" />
        <SkeletonBox width={80} height={12} rounded="md" />
        <SkeletonBox width={60} height={12} rounded="md" />
      </View>

      {/* Buttons row */}
      <View style={tw`flex-row gap-3`}>
        <SkeletonBox width={'55%'} height={40} rounded="lg" />
        <SkeletonBox width={'40%'} height={40} rounded="lg" />
      </View>
    </View>
  );
}

// ── Full page skeleton ────────────────────────────────────────────────────────

export function DashboardSkeleton() {
  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-100`}>
      <ScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-8`}
      >
        {/* Header */}
        <View style={tw`flex-row items-center justify-between px-5 pt-4 pb-5`}>
          <View style={tw`gap-2`}>
            <SkeletonBox width={80} height={22} rounded="md" />
            <SkeletonBox width={140} height={14} rounded="md" />
          </View>
          <View style={tw`flex-row gap-3`}>
            <SkeletonBox width={44} height={26} rounded="full" />
            <SkeletonBox width={26} height={26} rounded="full" />
          </View>
        </View>

        {/* Stats row */}
        <View style={tw`flex-row gap-3 px-5 mb-4`}>
          <View style={tw`flex-1 bg-white rounded-xl p-4`}>
            <SkeletonBox width={36} height={36} rounded="lg" style={{ marginBottom: 10 }} />
            <SkeletonBox width={80} height={11} rounded="md" style={{ marginBottom: 6 }} />
            <SkeletonBox width={50} height={20} rounded="md" />
          </View>
          <View style={tw`flex-1 bg-white rounded-xl p-4`}>
            <SkeletonBox width={36} height={36} rounded="lg" style={{ marginBottom: 10 }} />
            <SkeletonBox width={80} height={11} rounded="md" style={{ marginBottom: 6 }} />
            <SkeletonBox width={110} height={20} rounded="md" />
          </View>
        </View>

        {/* Gas price card */}
        <View style={tw`mx-5 mb-4 bg-white rounded-xl p-4 flex-row items-center justify-between`}>
          <View style={tw`gap-2`}>
            <SkeletonBox width={100} height={12} rounded="md" />
            <SkeletonBox width={70} height={20} rounded="md" />
          </View>
          <SkeletonBox width={110} height={36} rounded="lg" />
        </View>

        {/* Filter tabs */}
        <View style={tw`mx-5 mb-4`}>
          <View style={tw`flex-row bg-neutral-100 rounded-xl p-1 gap-1`}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={tw`flex-1 bg-white rounded-lg py-2.5 items-center`}>
                <SkeletonBox width={60} height={14} rounded="md" />
              </View>
            ))}
          </View>
        </View>

        {/* Section title */}
        <View style={tw`px-5 mb-3`}>
          <SkeletonBox width={150} height={16} rounded="md" />
        </View>

        {/* Order cards */}
        {[0, 1, 2].map((i) => (
          <SkeletonOrderCard key={i} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
