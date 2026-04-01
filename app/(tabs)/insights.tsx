import { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';
import { ptData, mockReviews } from '@/shared/data/mock-insights';

// ── Components ─────────────────────────────────────────────────────────────────
import { MetricCard } from '@/components/insights/MetricCard';
import { InsightsChart } from '@/components/insights/InsightsChart';
import { ReviewsSection } from '@/components/insights/ReviewsSection';
import { NextMovesSection } from '@/components/insights/NextMovesSection';
import { InsightsSkeleton } from '@/components/insights/InsightsSkeleton';

export default function InsightsScreen() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'next_moves'>('reviews');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(() => {
    // Simulate loading for 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsRefreshing(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setIsLoading(true);
    loadData();
  }, [loadData]);

  if (isLoading) {
    return <InsightsSkeleton />;
  }

  return (
    <SafeAreaView style={[tw`flex-1 bg-neutral-100`, { alignSelf: 'center', width: '100%', maxWidth: 600 }]} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={tw`px-5 pt-8 pb-10`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.brand.DEFAULT}
            colors={[Colors.brand.DEFAULT]}
          />
        }
      >
        {/* Header Section */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-[28px] font-bold text-neutral-900`}>Insights</Text>
          <Text style={tw`text-sm text-neutral-500 mt-1 leading-5`}>
            Track your orders, earnings, and performance trends in real time
          </Text>
        </View>

        {/* ── Metric Cards Grid ── */}

        {/* Row 1 */}
        <View style={tw`flex-row gap-3 mb-3`}>
          <MetricCard
            title="Orders this Week"
            value="500"
            icon="receipt"
            iconColor={Colors.brand.DEFAULT}
            iconBg={Colors.brand.light}
            flex={1}
          />
          <MetricCard
            title="Earnings this Week"
            value="₦350,050, 00"
            icon="wallet"
            iconColor={Colors.info.dark}
            iconBg={Colors.info.light}
            flex={1.5}
          />
        </View>

        {/* Row 2 */}
        <View style={tw`flex-row gap-3 mb-3`}>
          <MetricCard
            title="Active Customers"
            value="50"
            icon="people"
            iconColor={Colors.brand.dark}
            iconBg={Colors.brand.light}
          />

          {/* Custom Ratings Card */}
          <View style={[tw`flex-1 bg-white rounded-2xl p-4 shadow-sm`]}>
            <Text style={tw`text-xs font-medium text-neutral-800 mb-2`}>
              Ratings
            </Text>
            <View style={tw`flex-row items-center gap-0.5 mb-1`}>
              <Ionicons name="star" size={14} color={Colors.warning.DEFAULT} />
              <Ionicons name="star" size={14} color={Colors.warning.DEFAULT} />
              <Ionicons name="star" size={14} color={Colors.warning.DEFAULT} />
              <Ionicons name="star" size={14} color={Colors.warning.DEFAULT} />
              <Ionicons name="star-outline" size={14} color={Colors.warning.DEFAULT} />
            </View>
            <View style={tw`flex-row items-baseline gap-1 mt-auto`}>
              <Text style={tw`text-2xl font-bold text-neutral-900`}>4.0</Text>
              <Text style={tw`text-xs text-neutral-400`}>(22)</Text>
            </View>
          </View>
        </View>

        {/* Row 3 - Asymmetric */}
        <View style={tw`flex-row gap-3 mb-10`}>
          <MetricCard
            title="Total Earnings"
            value="₦350,050,998.00"
            icon="cash"
            iconColor={Colors.warning.DEFAULT}
            iconBg={Colors.warning.light}
            flex={1.9}
          />
          <MetricCard
            title="Avg. Delivery Time"
            value="30mins"
            icon="truck-fast"
            iconLib="MaterialCommunityIcons"
            iconColor={Colors.success.DEFAULT}
            iconBg={Colors.success.light}
            flex={1.1}
          />
        </View>

        {/* ── Order Trends Chart ── */}
        <Text style={tw`text-base font-bold text-neutral-900 mb-4`}>
          Order Trends
        </Text>

        <InsightsChart data={ptData} />

        {/* ── Tabs: Reviews / Next Moves ── */}
        <View style={tw`flex-row bg-neutral-200 rounded-xl p-1 mb-6 mt-2`}>
          <TouchableOpacity
            onPress={() => setActiveTab('reviews')}
            style={[
              tw`flex-1 py-3 rounded-lg items-center justify-center`,
              activeTab === 'reviews' ? tw`bg-white shadow-sm` : tw`bg-transparent`,
            ]}
          >
            <Text
              style={[
                tw`font-medium text-sm`,
                activeTab === 'reviews' ? tw`text-neutral-900` : tw`text-neutral-500`,
              ]}
            >
              Reviews
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('next_moves')}
            style={[
              tw`flex-1 py-3 rounded-lg items-center justify-center`,
              activeTab === 'next_moves' ? tw`bg-white shadow-sm` : tw`bg-transparent`,
            ]}
          >
            <Text
              style={[
                tw`font-medium text-sm`,
                activeTab === 'next_moves'
                  ? tw`text-neutral-900`
                  : tw`text-neutral-500`,
              ]}
            >
              Your Next Moves
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Dynamic Content ── */}
        {activeTab === 'reviews' ? (
          <ReviewsSection reviews={mockReviews} />
        ) : (
          <NextMovesSection />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
