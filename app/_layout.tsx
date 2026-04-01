import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OrdersProvider } from '@/shared/contexts/OrdersContext';
import { AuthProvider, useAuth } from '@/shared/contexts/AuthContext';
import { DashboardSkeleton } from '@/components/orders/DashboardSkeleton';

function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/(auth)/welcome' as any);
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/(tabs)' as any);
    }
  }, [isLoggedIn, isLoading, segments]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
      <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
      <Stack.Screen name="order/[id]" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <OrdersProvider>
            <RootNavigator />
          </OrdersProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
