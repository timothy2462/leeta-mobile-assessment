# Technical Decisions & Architectural Rationale

This document outlines the key engineering decisions made during the development of the Leeta Agent Dashboard, focusing on scalability, production-readiness, and user experience.

## 1. Centralized State Management (Context API)
We transitioned from local component state to a centralized `OrdersProvider` using the **React Context API**. 
- **Rationale**: In a real-world LPG distribution app, order statuses (Pending → In Transit → Delivered) must be synchronized across multiple screens (Dashboard, Insights, and Order Details). 
- **Benefit**: This eliminates "data ghosting" where an order marked as completed on the details screen still appears as "Accepted" on the dashboard.

## 2. Optimistic UI Updates & Resiliency
The `useOrders` hook implements **optimistic updates** for all primary actions (Accept, Reject, Complete).
- **Rationale**: Agents often work in low-connectivity environments. Waiting for a server response for every button press creates a sluggish experience.
- **Implementation**: The UI updates immediately, but we store the "original" state. If the mock API call fails, the store automatically **reverts** the change and notifies the user via an error toast.

## 3. Production Monitoring & Observability
We implemented a thin `logger` abstraction (`lib/logger.ts`) that bridges dev-mode console logs with production monitoring.
- **Breadcrumbs**: Key transitions (like initiating an OTP verification) are logged as breadcrumbs.
- **Error Tracking**: Failed OTP attempts are logged with metadata (customer name, attempted code) to help identify potential fraud or UX friction in production.

## 4. Platform Adaptability (Mobile & Web)
Although built with React Native/Expo, the app is "Platform Aware":
- **Web Layout**: On desktop screens, we enforce a `max-width` container (600px) and center the content. This prevents the "stretched card" anti-pattern and maintains the visual hierarchy intended by the mobile design.
- **Haptics**: We use `expo-haptics` for tactile feedback on mobile interactions, which gracefully degrades to no-op on Web.

## 5. Performance Optimizations
For the Order List, we utilized `FlatList` with specific performance props:
- `removeClippedSubviews`: Minimizes memory usage for long lists of completed orders.
- `initialNumToRender`: Ensures the first fold of the dashboard loads instantly.
- `memo`: Key components like `OrderCard` use `useCallback` for event handlers to prevent unnecessary re-renders during tab switching.

## 6. Security (OTP Flow)
The "Complete Order" flow uses a 4-digit OTP verification.
- **Native Experience**: We use a hidden `TextInput` to allow for native "Paste" and "Number Pad" behaviors while maintaining a high-fidelity custom visual UI for the digits.

---

### Future Roadmap
1. **Offline Persistence**: Integrating `AsyncStorage` or `SQLite` to allow agents to continue working without any internet.
2. **Real-time Updates**: Implementing WebSockets or Firebase Listeners to push new orders to the agent instantly.
3. **E2E Testing**: Adding Maëstro or Detox tests for full-flow verification on physical devices.
