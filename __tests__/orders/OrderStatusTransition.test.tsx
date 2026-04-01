import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import OrdersDashboard from '../../app/(tabs)/index';
import { OrdersProvider } from '../../shared/contexts/OrdersContext';
import { __resetStore } from '../../shared/api/orders';

// ── Mock Dependencies ──────────────────────────────────────────────────────────
jest.mock('expo-status-bar', () => ({ StatusBar: () => null }));
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useLocalSearchParams: () => ({ id: '1' }),
}));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaView: ({ children, style, ...props }: any) =>
      React.createElement('View', { ...props, style }, children),
    SafeAreaProvider: ({ children }: any) =>
      React.createElement('View', null, children),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

// Mocking Bottom Sheet to avoid animation delays
jest.mock('@/components/ui/BottomSheet', () => ({
  BottomSheet: ({ children, visible }: any) => visible ? children : null,
}));

describe('Order Status Lifecycle Integration', () => {
  beforeEach(() => {
    __resetStore();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const setup = () => {
    return render(
      <OrdersProvider>
        <OrdersDashboard />
      </OrdersProvider>
    );
  };

  it('completes a full order lifecycle: New -> Accepted', async () => {
    setup();

    // 1. Initial Load: Check for a "New" order
    await waitFor(() => {
      expect(screen.getByText(/Chinedu Okafor/i)).toBeTruthy();
    });

    // 2. Accept the order
    const acceptBtn = screen.getByLabelText(/Accept order from Chinedu Okafor/i);
    fireEvent.press(acceptBtn);

    // 3. Confirm in Bottom Sheet
    await waitFor(() => {
      expect(screen.getByText(/Confirm Acceptance/i)).toBeTruthy();
    });
    
    const confirmBtn = screen.getByText(/Yes, Accept/i);
    fireEvent.press(confirmBtn);

    // 4. Verify it's gone from "New" tab
    await waitFor(() => {
      expect(screen.queryByText(/Chinedu Okafor/i)).toBeNull();
    });

    // 5. Switch to "Accepted" tab
    fireEvent.press(screen.getByText('Accepted'));

    // 6. Verify it appears in "Accepted" tab
    await waitFor(() => {
      expect(screen.getByText(/Chinedu Okafor/i)).toBeTruthy();
      expect(screen.getByText(/Order in Transit/i)).toBeTruthy();
    });
  });
});
