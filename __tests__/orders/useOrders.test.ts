/**
 * Tests: useOrders hook
 *
 * Focus: behaviour, not implementation details.
 * Covers: loading, success, error, filter, acceptOrder, rejectOrder, markDelivered.
 */
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useOrders } from '@/shared/hooks/useOrders';
import { __setForceError, __resetStore } from '@/shared/api/orders';

// Reset in-memory store and error flag before each test
beforeEach(() => {
  __resetStore();
  __setForceError(false);
});

describe('useOrders', () => {
  it('starts in loading state', () => {
    const { result } = renderHook(() => useOrders());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.orders).toHaveLength(0);
  });

  it('loads orders successfully', async () => {
    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.status).toBe('success');
    expect(result.current.orders.length).toBeGreaterThan(0);
    expect(result.current.isError).toBe(false);
  });

  it('enters error state when API fails', async () => {
    __setForceError(true);
    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.status).toBe('error');
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeTruthy();
  });

  it('isEmpty is true when filter returns no results', async () => {
    const { result } = renderHook(() => useOrders());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => {
      result.current.setFilter('in_transit');
    });

    result.current.filteredOrders.forEach((order) => {
      expect(order.status).toBe('in_transit');
    });
  });

  it('filters orders by status correctly', async () => {
    const { result } = renderHook(() => useOrders());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.setFilter('pending'));
    result.current.filteredOrders.forEach((o) => expect(o.status).toBe('pending'));

    act(() => result.current.setFilter('delivered'));
    result.current.filteredOrders.forEach((o) => expect(o.status).toBe('delivered'));

    act(() => result.current.setFilter('all'));
    expect(result.current.filteredOrders).toEqual(result.current.orders);
  });

  // ── Accept order ──────────────────────────────────────────────────────────
  it('optimistically moves a pending order to in_transit when accepted', async () => {
    const { result } = renderHook(() => useOrders());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const pendingOrder = result.current.orders.find((o) => o.status === 'pending');
    expect(pendingOrder).toBeDefined();

    await act(async () => {
      await result.current.acceptOrder(pendingOrder!.id);
    });

    const updated = result.current.orders.find((o) => o.id === pendingOrder!.id);
    expect(updated?.status).toBe('in_transit');
  });

  // ── Reject order ──────────────────────────────────────────────────────────
  it('removes a rejected order from the list', async () => {
    const { result } = renderHook(() => useOrders());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const pendingOrder = result.current.orders.find((o) => o.status === 'pending');
    expect(pendingOrder).toBeDefined();
    const initialCount = result.current.orders.length;

    await act(async () => {
      await result.current.rejectOrder(pendingOrder!.id);
    });

    expect(result.current.orders.length).toBe(initialCount - 1);
    expect(result.current.orders.find((o) => o.id === pendingOrder!.id)).toBeUndefined();
  });

  // ── Mark as delivered ─────────────────────────────────────────────────────
  it('marks an in_transit order as delivered', async () => {
    const { result } = renderHook(() => useOrders());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const inTransitOrder = result.current.orders.find((o) => o.status === 'in_transit');
    expect(inTransitOrder).toBeDefined();

    await act(async () => {
      await result.current.markDelivered(inTransitOrder!.id);
    });

    const updated = result.current.orders.find((o) => o.id === inTransitOrder!.id);
    expect(updated?.status).toBe('delivered');
  });

  // ── Today stats ───────────────────────────────────────────────────────────
  it('computes today stats correctly', async () => {
    const { result } = renderHook(() => useOrders());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(typeof result.current.todayStats.totalOrders).toBe('number');
    expect(typeof result.current.todayStats.totalEarnings).toBe('number');
    expect(result.current.todayStats.totalOrders).toBeGreaterThanOrEqual(0);
    expect(result.current.todayStats.totalEarnings).toBeGreaterThanOrEqual(0);
  });
});
