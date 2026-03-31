import { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';
import { useOrders } from '@/shared/hooks/useOrders';

// Route Subcomponents
import { DetailsSkeleton } from '@/components/orders/details/DetailsSkeleton';
import { OrderTimelineCard } from '@/components/orders/details/OrderTimelineCard';
import { CustomerContextCard } from '@/components/orders/details/CustomerContextCard';
import { OrderItemsSummary } from '@/components/orders/details/OrderItemsSummary';
import { OtpBottomSheet } from '@/components/orders/details/OtpBottomSheet';
import { Toast } from '@/components/ui/Toast';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Manage Order Data
  const { orders, markDelivered, isLoading: isOrdersLoading } = useOrders();
  const order = orders.find((o) => o.id === id);

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  // MOCK: Emulate network fetch visualization for entering the screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [id]);

  const handleCompleteOrder = async (code: string) => {
    // 1. Hide the OTP Sheet
    setSheetVisible(false);
    
    // 2. Mark delivered dynamically via our hook state mapping
    if (id) {
      await markDelivered(id);
    }
    
    // 3. Trigger success toast
    setToastVisible(true);
    
    // 4. Navigate back to the Orders Dashboard after showing toast
    setTimeout(() => {
      router.back();
    }, 1500);
  };
  
  const showSkeleton = isLoading || isOrdersLoading;

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F4F5F9]`} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />
      
      {/* Absolute Positioned Toast */}
      <Toast 
        visible={toastVisible}
        message="Order Completed Successfully!"
        onHide={() => setToastVisible(false)}
      />
      
      {/* ── Custom App Header ── */}
      <View style={tw`flex-row items-center px-4 py-3 bg-[#F4F5F9]`}>
        <TouchableOpacity
          style={tw`p-2 -ml-2 rounded-full`}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.neutral[900]} />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold text-neutral-900 ml-2`}>Order details</Text>
      </View>

      {/* ── Main Content Area ── */}
      {showSkeleton || !order ? (
        <DetailsSkeleton />
      ) : (
        <KeyboardAvoidingView 
          style={tw`flex-1`}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 44 : 0}
        >
          <ScrollView 
            style={tw`flex-1`}
            contentContainerStyle={tw`px-5 pt-4 pb-32`}
            showsVerticalScrollIndicator={false}
          >
            <OrderTimelineCard 
              customerName={order.customerName}
              dateString={new Date(order.createdAt).toLocaleString()}
              orderId={order.id}
              amount={(order.amount).toLocaleString()}
            />

            <CustomerContextCard 
              customerName={order.customerName}
              phone={order.phone}
            />

            <OrderItemsSummary 
              orderId={order.id}
              orderType={
                order.orderType === 'pickup_refill' ? 'Refill' : 
                order.orderType === 'home_delivery' ? 'Delivery' : 'Exchange'
              }
              amount={order.amount}
            />
          </ScrollView>

          {/* ── Pinned Action Button at Bottom ── */}
          {order.status === 'in_transit' && (
             <View style={[
               tw`absolute bottom-0 left-0 right-0 bg-white px-5 pt-4 border-t border-neutral-100 shadow-sm`, 
               { paddingBottom: Math.max(insets.bottom, 16) }
              ]}>
              <TouchableOpacity
                onPress={() => setSheetVisible(true)}
                style={tw`w-full py-4 rounded-2xl bg-brand shadow items-center justify-center`}
                activeOpacity={0.8}
              >
                <Text style={tw`text-white font-medium text-base`}>Complete Order</Text>
              </TouchableOpacity>
            </View>
          )}

        </KeyboardAvoidingView>
      )}

      {/* ── OTP Sheet ── */}
      <OtpBottomSheet 
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        customerName={order?.customerName}
        onComplete={handleCompleteOrder}
      />
    </SafeAreaView>
  );
}
