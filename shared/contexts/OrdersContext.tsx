import React, { createContext, useReducer, ReactNode } from 'react';
import {
  Order,
  OrderFilter,
  OrdersState,
  OrdersAction,
} from '../types/order';

const initialState: OrdersState = {
  orders: [],
  status: 'idle',
  error: null,
  filter: 'pending',
};

function reducer(state: OrdersState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_SUCCESS':
      return { ...state, status: 'success', orders: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.id ? { ...o, status: action.status } : o
        ),
      };
    case 'REMOVE_ORDER':
      return {
        ...state,
        orders: state.orders.filter((o) => o.id !== action.id),
      };
    case 'REVERT_ORDER':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id ? action.payload : o
        ),
      };
    default:
      return state;
  }
}

interface OrdersContextType {
  state: OrdersState;
  dispatch: React.Dispatch<OrdersAction>;
}

export const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrdersContext.Provider value={{ state, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
}
