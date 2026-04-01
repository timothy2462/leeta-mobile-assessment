import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import OrdersDashboard from '../../app/(tabs)/index';
import { OrdersProvider } from '../../shared/contexts/OrdersContext';
import { __resetStore } from '../../shared/api/orders';

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

    await waitFor(() => {
      expect(screen.getByText(/Chinedu Okafor/i)).toBeTruthy();
    });

    const acceptBtn = screen.getByLabelText(/Accept order from Chinedu Okafor/i);
    fireEvent.press(acceptBtn);

    await waitFor(() => {
      expect(screen.getByText(/Confirm Acceptance/i)).toBeTruthy();
    });

    const confirmBtn = screen.getByText(/Yes, Accept/i);
    fireEvent.press(confirmBtn);

    await waitFor(() => {
      expect(screen.queryByText(/Chinedu Okafor/i)).toBeNull();
    });

    fireEvent.press(screen.getByText('Accepted'));

    await waitFor(() => {
      expect(screen.getByText(/Chinedu Okafor/i)).toBeTruthy();
      expect(screen.getByText(/Order in Transit/i)).toBeTruthy();
    });
  });
});
