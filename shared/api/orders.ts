import { Order, OrderStatus } from '../types/order';
import { mockOrders } from '../data/mock-orders';

/**
 * Simulated async API for orders.
 *
 * Production note:
 *   Replace these functions with real HTTP calls (fetch/axios).
 *   The function signatures are designed to match what a real REST API
 *   would return, so swapping is a one-line change per function.
 *
 *   e.g. fetchOrders → GET /api/v1/orders
 *        updateOrderStatus → PATCH /api/v1/orders/:id/status
 *        removeOrder → DELETE /api/v1/orders/:id
 */

// In-memory store simulates a server-side database
let ordersStore: Order[] = [...mockOrders];

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// ── Configurable for testing ─────────────────────────────────────────────────
let _forceError = false;
export const __setForceError = (val: boolean) => { _forceError = val; };
export const __resetStore = () => { ordersStore = [...mockOrders]; };

// ── API Functions ─────────────────────────────────────────────────────────────

export async function fetchOrders(): Promise<Order[]> {
  await delay(900);

  if (_forceError) {
    throw new Error('Network request failed. Please check your connection.');
  }

  return [...ordersStore];
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  await delay(350);

  const index = ordersStore.findIndex((o) => o.id === id);
  if (index === -1) {
    throw new Error(`Order ${id} not found.`);
  }

  ordersStore[index] = { ...ordersStore[index], status };
  return { ...ordersStore[index] };
}

export async function removeOrder(id: string): Promise<void> {
  await delay(350);

  const exists = ordersStore.some((o) => o.id === id);
  if (!exists) {
    throw new Error(`Order ${id} not found.`);
  }

  ordersStore = ordersStore.filter((o) => o.id !== id);
}
