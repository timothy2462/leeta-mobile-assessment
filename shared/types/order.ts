// ─────────────────────────────────────────────────────────────────────────────
// Order Types & Interfaces
// Single source of truth for all order-related types across mobile & web.
// ─────────────────────────────────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'in_transit' | 'delivered';

export type OrderType = 'pickup_refill' | 'cylinder_exchange' | 'home_delivery';

export type OrderFilter = 'all' | OrderStatus;

export type DataStatus = 'idle' | 'loading' | 'success' | 'error';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  quantity: string;        // e.g. "12.5kg"
  status: OrderStatus;
  createdAt: string;       // ISO 8601
  orderType: OrderType;
  amount: number;          // in Naira
  distance?: number;       // in km
  address?: string;
}

export interface TodayStats {
  totalOrders: number;
  totalEarnings: number;
}

// ── State machine types (used inside useOrders) ───────────────────────────────

export type OrdersState = {
  orders: Order[];
  status: DataStatus;
  error: string | null;
  filter: OrderFilter;
};

export type OrdersAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Order[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_FILTER'; payload: OrderFilter }
  | { type: 'UPDATE_ORDER_STATUS'; id: string; status: OrderStatus }
  | { type: 'REMOVE_ORDER'; id: string }
  | { type: 'REVERT_ORDER'; payload: Order };
