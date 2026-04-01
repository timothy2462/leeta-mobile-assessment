/**
 * Tests: OrderCard component
 *
 * Focus: what the user sees and can do, not internal implementation.
 * Covers: rendering, conditional action buttons, callback invocations.
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { OrderCard } from '@/components/orders/OrderCard';
import { Order } from '@/shared/types/order';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn((_, __, buttons) => {
    const confirm = buttons?.find(
      (b: { text: string }) =>
        b.text === 'Accept' || b.text === 'Reject' || b.text === 'Confirm'
    );
    confirm?.onPress?.();
  }),
}));


const baseOrder: Order = {
  id: 'TEST-001',
  customerName: 'Test Customer',
  phone: '08012345678',
  quantity: '20kg',
  status: 'pending',
  orderType: 'pickup_refill',
  amount: 30000,
  distance: 1.5,
  address: '5 Test Street, Lagos',
  createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
};

const makeOrder = (overrides: Partial<Order>): Order => ({ ...baseOrder, ...overrides });


describe('OrderCard', () => {
  it('renders customer name', () => {
    render(<OrderCard order={baseOrder} />);
    expect(screen.getByText(/Test Customer/i)).toBeTruthy();
  });

  it('renders phone number', () => {
    render(<OrderCard order={baseOrder} />);
    expect(screen.getByText('08012345678')).toBeTruthy();
  });

  it('renders gas quantity', () => {
    render(<OrderCard order={baseOrder} />);
    expect(screen.getByText('20kg')).toBeTruthy();
  });

  it('renders distance', () => {
    render(<OrderCard order={baseOrder} />);
    expect(screen.getByText('1.5 km')).toBeTruthy();
  });

  it('shows Accept and Reject buttons for pending orders', () => {
    render(<OrderCard order={makeOrder({ status: 'pending' })} />);
    expect(screen.getByText('Accept')).toBeTruthy();
    expect(screen.getByText('Reject')).toBeTruthy();
  });

  it('shows Mark as Delivered button for in_transit orders', () => {
    render(<OrderCard order={makeOrder({ status: 'in_transit' })} />);
    expect(screen.getByText('Mark as Delivered')).toBeTruthy();
    expect(screen.queryByText('Accept')).toBeNull();
  });

  it('shows Completed chip for delivered orders', () => {
    render(<OrderCard order={makeOrder({ status: 'delivered' })} />);
    expect(screen.getByText('Order Completed')).toBeTruthy();
    expect(screen.queryByText('Accept')).toBeNull();
    expect(screen.queryByText('Mark as Delivered')).toBeNull();
  });

  it('calls onAccept with the order id when Accept is pressed', () => {
    const onAccept = jest.fn();
    render(<OrderCard order={baseOrder} onAccept={onAccept} />);
    fireEvent.press(screen.getByText('Accept'));
    expect(onAccept).toHaveBeenCalledWith('TEST-001');
  });

  it('calls onReject with the order id when Reject is pressed', () => {
    const onReject = jest.fn();
    render(<OrderCard order={baseOrder} onReject={onReject} />);
    fireEvent.press(screen.getByText('Reject'));
    expect(onReject).toHaveBeenCalledWith('TEST-001');
  });

  it('calls onMarkDelivered with the order id when Mark as Delivered is pressed', () => {
    const onMarkDelivered = jest.fn();
    render(
      <OrderCard
        order={makeOrder({ status: 'in_transit' })}
        onMarkDelivered={onMarkDelivered}
      />
    );
    fireEvent.press(screen.getByText('Mark as Delivered'));
    expect(onMarkDelivered).toHaveBeenCalledWith('TEST-001');
  });
});
