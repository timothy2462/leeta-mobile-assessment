import { useCallback, useMemo, useContext } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  Order,
  OrderFilter,
  TodayStats,
  DataStatus,
} from '../types/order';
import {
  fetchOrders,
  updateOrderStatus,
  removeOrder,
} from '../api/orders';
import { logger } from '../../lib/logger';
import { OrdersContext } from '../contexts/OrdersContext';

// ── Helpers ───────────────────────────────────────────────────────────────────

function computeTodayStats(orders: Order[]): TodayStats {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayOrders = orders.filter(
    (o) => new Date(o.createdAt) >= todayStart
  );

  const totalEarnings = todayOrders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + o.amount, 0);

  return { totalOrders: todayOrders.length, totalEarnings };
}

function applyFilter(orders: Order[], filter: OrderFilter): Order[] {
  if (filter === 'all') return orders;
  return orders.filter((o) => o.status === filter);
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export interface UseOrdersReturn {
  // Data
  orders: Order[];
  filteredOrders: Order[];
  todayStats: TodayStats;
  counts: Partial<Record<OrderFilter, number>>;
  // State
  status: DataStatus;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  // Filters
  filter: OrderFilter;
  setFilter: (filter: OrderFilter) => void;
  // Actions
  refresh: () => Promise<void>;
  acceptOrder: (id: string) => Promise<void>;
  rejectOrder: (id: string) => Promise<void>;
  markDelivered: (id: string) => Promise<void>;
}

export function useOrders(): UseOrdersReturn {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }

  const { state, dispatch } = context;

  const loadOrders = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    logger.info('Fetching orders');
    try {
      const orders = await fetchOrders();
      dispatch({ type: 'FETCH_SUCCESS', payload: orders });
      logger.info(`Loaded ${orders.length} orders`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load orders.';
      dispatch({ type: 'FETCH_ERROR', payload: msg });
      logger.error('Order fetch failed', { error: msg });
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (state.status === 'idle') {
        loadOrders();
      }
    }, [loadOrders, state.status])
  );

  const setFilter = useCallback((filter: OrderFilter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, [dispatch]);

  // ── Accept order (pending → in_transit, optimistic) ───────────────────────
  const acceptOrder = useCallback(
    async (id: string) => {
      logger.info('User initiated order acceptance', { orderId: id });
      const original = state.orders.find((o) => o.id === id);
      if (!original) return;

      dispatch({ type: 'UPDATE_ORDER_STATUS', id, status: 'in_transit' });
      logger.info(`Accepting order ${id}`);

      try {
        await updateOrderStatus(id, 'in_transit');
      } catch (err) {
        dispatch({ type: 'REVERT_ORDER', payload: original });
        logger.error(`Failed to accept order ${id}`);
      }
    },
    [state.orders, dispatch]
  );

  // ── Reject order (remove from list, optimistic) ───────────────────────────
  const rejectOrder = useCallback(
    async (id: string) => {
      logger.info('User initiated order rejection', { orderId: id });
      const original = state.orders.find((o) => o.id === id);
      if (!original) return;

      dispatch({ type: 'REMOVE_ORDER', id });
      logger.info(`Rejecting order ${id}`);

      try {
        await removeOrder(id);
      } catch (err) {
        dispatch({ type: 'REVERT_ORDER', payload: original });
        logger.error(`Failed to reject order ${id}`);
      }
    },
    [state.orders, dispatch]
  );

  // ── Mark as delivered (in_transit → delivered, optimistic) ────────────────
  const markDelivered = useCallback(
    async (id: string) => {
      logger.info('User initiated delivery completion', { orderId: id });
      const original = state.orders.find((o) => o.id === id);
      if (!original) return;

      dispatch({ type: 'UPDATE_ORDER_STATUS', id, status: 'delivered' });
      logger.info(`Marking order ${id} as delivered`);

      try {
        await updateOrderStatus(id, 'delivered');
      } catch (err) {
        dispatch({ type: 'REVERT_ORDER', payload: original });
        logger.error(`Failed to mark order ${id} as delivered`);
      }
    },
    [state.orders, dispatch]
  );

  // ── Derived state (memoised to avoid re-renders) ──────────────────────────
  const filteredOrders = useMemo(
    () => applyFilter(state.orders, state.filter),
    [state.orders, state.filter]
  );

  const todayStats = useMemo(() => computeTodayStats(state.orders), [state.orders]);

  const counts = useMemo<Partial<Record<OrderFilter, number>>>(
    () => ({
      pending: state.orders.filter((o) => o.status === 'pending').length,
      in_transit: state.orders.filter((o) => o.status === 'in_transit').length,
      delivered: state.orders.filter((o) => o.status === 'delivered').length,
    }),
    [state.orders]
  );

  return {
    orders: state.orders,
    filteredOrders,
    todayStats,
    counts,
    status: state.status,
    error: state.error,
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isEmpty: state.status === 'success' && filteredOrders.length === 0,
    filter: state.filter,
    setFilter,
    refresh: loadOrders,
    acceptOrder,
    rejectOrder,
    markDelivered,
  };
}
