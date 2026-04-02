// Order Types & Interfaces
// Single source of truth for all order-related types across mobile & web.

export type OrderStatus = "pending" | "in_transit" | "delivered";

export type OrderType = "pickup_refill" | "cylinder_exchange" | "home_delivery";

export type OrderFilter = "all" | OrderStatus;

export type DataStatus = "idle" | "loading" | "success" | "error";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  quantity: string;
  status: OrderStatus;
  createdAt: string;
  orderType: OrderType;
  amount: number;
  distance?: number;
  address?: string;
}

export interface TodayStats {
  totalOrders: number;
  totalEarnings: number;
}

export type OrdersState = {
  orders: Order[];
  status: DataStatus;
  error: string | null;
  filter: OrderFilter;
};

export type OrdersAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Order[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SET_FILTER"; payload: OrderFilter }
  | { type: "UPDATE_ORDER_STATUS"; id: string; status: OrderStatus }
  | { type: "REMOVE_ORDER"; id: string }
  | { type: "REVERT_ORDER"; payload: Order };
