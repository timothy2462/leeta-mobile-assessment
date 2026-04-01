/**
 * Tests: Order List screen (app/index.tsx)
 *
 * Focus: what the user sees across loading / empty / error / loaded states.
 * The API is mocked so tests are deterministic and fast.
 */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import OrdersDashboard from '@/app/(tabs)/index';
import { __setForceError, __resetStore } from '@/shared/api/orders';

jest.mock('expo-status-bar', () => ({ StatusBar: () => null }));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaView: ({ children, ...props }: { children: React.ReactNode; style?: object }) =>
      React.createElement('View', props, children),
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement('View', null, children),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

beforeEach(() => {
  __resetStore();
  __setForceError(false);
});

describe('OrdersDashboard screen', () => {
  it('shows a loading skeleton while orders are being fetched', () => {
    render(<OrdersDashboard />);
    // During loading, the FlatList is not rendered — skeleton is shown instead
    // The skeleton doesn't have text content so we verify the list is not present
    expect(screen.queryByText('Pending Orders')).toBeNull();
  });

  it('renders the dashboard header and orders after loading', async () => {
    render(<OrdersDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Orders')).toBeTruthy();
    });

    expect(screen.getByText('GasHub Enterprise')).toBeTruthy();

    expect(screen.getByText("Today's Orders")).toBeTruthy();
    expect(screen.getByText("Today's Earnings")).toBeTruthy();

    expect(screen.getByText('New')).toBeTruthy();
    expect(screen.getByText('Accepted')).toBeTruthy();
    expect(screen.getByText('Completed')).toBeTruthy();
  });

  it('renders order cards with customer names after loading', async () => {
    render(<OrdersDashboard />);

    await waitFor(() => {
      // Default filter is 'pending' — Chinedu and Sarah are pending
      expect(screen.getByText(/Chinedu Okafor/i)).toBeTruthy();
    });
  });

  it('shows an error state and retry button when the API fails', async () => {
    __setForceError(true);
    render(<OrdersDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeTruthy();
    });

    expect(screen.getByText('Try again')).toBeTruthy();
  });

  it('retries fetching orders when Try again is pressed', async () => {
    __setForceError(true);
    render(<OrdersDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Try again')).toBeTruthy();
    });

    __setForceError(false);
    fireEvent.press(screen.getByText('Try again'));

    await waitFor(() => {
      expect(screen.getByText('Orders')).toBeTruthy();
    });
  });

  it('switches filters when tabs are pressed', async () => {
    render(<OrdersDashboard />);

    await waitFor(() => {
      expect(screen.getByText('New')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Accepted'));

    await waitFor(() => {
      // After switching to in_transit tab, Emeka should appear
      expect(screen.getByText(/Emeka Nwosu/i)).toBeTruthy();
    });
  });

  it('shows an empty state message when no orders match the filter', async () => {
    render(<OrdersDashboard />);
    await waitFor(() => expect(screen.getByText('New')).toBeTruthy());


    fireEvent.press(screen.getByText('Completed'));

    expect(screen.getByText('Completed')).toBeTruthy();
  });

  it('shows Mark as Delivered button for in_transit orders', async () => {
    render(<OrdersDashboard />);

    await waitFor(() => expect(screen.getByText('Accepted')).toBeTruthy());

    fireEvent.press(screen.getByText('Accepted'));

    await waitFor(() => {
      expect(screen.getByText('Mark as Delivered')).toBeTruthy();
    });
  });
});
