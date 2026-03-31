import { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Switch,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import tw from '@/lib/tailwind';
import { Colors, Shadows } from '@/lib/design-system';
import { useOrders } from '@/shared/hooks/useOrders';
import { Order, OrderFilter } from '@/shared/types/order';

import { OrderCard } from '@/components/orders/OrderCard';
import { StatsCard } from '@/components/orders/StatsCard';
import { FilterTabs } from '@/components/orders/FilterTabs';
import { EmptyState } from '@/components/orders/EmptyState';
import { DashboardSkeleton } from '@/components/orders/DashboardSkeleton';
import { OrderConfirmationSheet } from '@/components/orders/OrderConfirmationSheet';

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

function getSectionLabel(filter: OrderFilter, count: number): string {
  const labels: Record<OrderFilter, string> = {
    all: 'All Orders',
    pending: 'Pending Orders',
    in_transit: 'Orders in Transit',
    delivered: 'Delivered Orders',
  };
  return `${labels[filter]} ( ${count} )`;
}

// ── Main Screen ───────────────────────────────────────────────────────────────

export default function OrdersDashboard() {
  const {
    filteredOrders,
    todayStats,
    counts,
    isLoading,
    isError,
    isEmpty,
    error,
    filter,
    setFilter,
    refresh,
    acceptOrder,
    rejectOrder,
    markDelivered,
  } = useOrders();

  const [isOnline, setIsOnline] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Bottom Sheet State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [sheetAction, setSheetAction] = useState<'accept' | 'reject' | null>(null);

  const handleOpenAcceptSheet = useCallback((order: Order) => {
    setSelectedOrder(order);
    setSheetAction('accept');
  }, []);

  const handleOpenRejectSheet = useCallback((order: Order) => {
    setSelectedOrder(order);
    setSheetAction('reject');
  }, []);

  const handleCloseSheet = useCallback(() => {
    setSheetAction(null);
    setTimeout(() => setSelectedOrder(null), 350); // clear after slide animation closes
  }, []);

  const handleConfirmSheet = useCallback(() => {
    if (!selectedOrder || !sheetAction) return;
    if (sheetAction === 'accept') {
      acceptOrder(selectedOrder.id);
    } else {
      rejectOrder(selectedOrder.id);
    }
  }, [selectedOrder, sheetAction, acceptOrder, rejectOrder]);

  // Pull-to-refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  }, [refresh]);

  // ── List item renderer (memoised key extractor + render) ──────────────────
  const keyExtractor = useCallback((item: Order) => item.id, []);

  const renderItem: ListRenderItem<Order> = useCallback(
    ({ item }) => (
      <OrderCard
        order={item}
        onAccept={handleOpenAcceptSheet}
        onReject={handleOpenRejectSheet}
        onMarkDelivered={markDelivered}
      />
    ),
    [handleOpenAcceptSheet, handleOpenRejectSheet, markDelivered]
  );

  // ── List header ───────────────────────────────────────────────────────────
  const ListHeader = useCallback(
    () => (
      <>
        {/* ── App header ─────────────────────────────────────────────────── */}
        <View style={tw`flex-row items-center justify-between px-5 pt-2 pb-4`}>
          <View>
            <Text style={tw`text-2xl font-bold text-neutral-900`}>Orders</Text>
            <Text style={tw`text-sm text-neutral-500 mt-0.5`}>GasHub Enterprise</Text>
          </View>
          <View style={tw`flex-row items-center gap-3`}>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: Colors.neutral[300], true: Colors.success.DEFAULT }}
              thumbColor={Colors.white}
              accessibilityLabel="Toggle online status"
            />
            <TouchableOpacity
              accessibilityLabel="Notifications"
              accessibilityRole="button"
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={Colors.neutral[600]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Stats row ─────────────────────────────────────────────────── */}
        <View style={tw`flex-row gap-3 px-5 mb-4`}>
          <StatsCard
            label="Today's Orders"
            value={String(todayStats.totalOrders)}
            iconName="receipt-outline"
            iconColor={Colors.brand.DEFAULT}
            iconBg={Colors.brand.light}
          />
          <StatsCard
            label="Today's Earnings"
            value={formatNaira(todayStats.totalEarnings)}
            iconName="wallet-outline"
            iconColor={Colors.info.DEFAULT}
            iconBg={Colors.info.light}
          />
        </View>

        {/* ── Gas price card ─────────────────────────────────────────────── */}
        <View
          style={[
            tw`mx-5 mb-4 bg-white rounded-xl px-4 py-3 flex-row items-center justify-between`,
            Shadows.sm,
          ]}
        >
          <View>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`text-xs text-neutral-500`}>Gas Price</Text>
              <View style={tw` rounded px-1.5 py-0.5`}>
                <Text style={tw`text-xs font-medium text-brand`}>LPG</Text>
              </View>
            </View>
            <Text style={tw`text-xl font-bold text-neutral-900 mt-0.5`}>₦1,500</Text>
          </View>
          <TouchableOpacity
            style={tw`border border-brand rounded-xl px-4 py-2`}
            accessibilityRole="button"
            accessibilityLabel="Update gas price"
          >
            <Text style={tw`text-brand font-medium text-sm`}>Update price</Text>
          </TouchableOpacity>
        </View>

        {/* ── Filter tabs ───────────────────────────────────────────────── */}
        <FilterTabs
          filter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        {/* ── Section title ─────────────────────────────────────────────── */}
        <View style={tw`px-5 pb-3`}>
          <Text style={tw`text-base font-semibold text-neutral-900`}>
            {getSectionLabel(filter, filteredOrders.length)}
          </Text>
        </View>
      </>
    ),
    [isOnline, todayStats, filter, setFilter, counts, filteredOrders.length]
  );

  // ── Empty / Error list component ──────────────────────────────────────────
  const ListEmpty = useCallback(
    () =>
      isError ? (
        <EmptyState type="error" message={error ?? undefined} onRetry={refresh} />
      ) : (
        <EmptyState type="empty" />
      ),
    [isError, error, refresh]
  );

  // ── Full-screen loading (first load only) ─────────────────────────────────
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-100`} edges={['top']}>
      <StatusBar style="dark" />

      <FlatList
        data={filteredOrders}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.brand.DEFAULT}
            colors={[Colors.brand.DEFAULT]}
          />
        }
        contentContainerStyle={[
          tw`pb-10`,
          filteredOrders.length === 0 && tw`flex-grow`,
        ]}
        showsVerticalScrollIndicator={false}
        // Performance optimisations
        removeClippedSubviews
        maxToRenderPerBatch={8}
        initialNumToRender={5}
        windowSize={10}
      />

      {/* ── Order Action Bottom Sheet ────────────────────────────────────────── */}
      <OrderConfirmationSheet
        order={selectedOrder}
        actionType={sheetAction}
        visible={!!sheetAction}
        onClose={handleCloseSheet}
        onConfirm={handleConfirmSheet}
      />
    </SafeAreaView>
  );
}
