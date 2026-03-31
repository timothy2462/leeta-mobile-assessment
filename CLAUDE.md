# CLAUDE.md – Leeta Mobile Assessment

This file provides context for AI assistants (Claude, Gemini, etc.) helping with this codebase.

---

## Project Overview

**Leeta Agent Order Management Dashboard** — a React Native (Expo) mobile app and Next.js web interface for LPG delivery agents to view and manage gas delivery orders.

This is a take-home assessment for a **Senior Frontend Engineer** role. Code quality, architecture decisions, and production-readiness are being evaluated — not just feature completion.

---

## Tech Stack

| Layer       | Technology                         |
|-------------|-----------------------------------|
| Mobile      | Expo (SDK 54) + Expo Router v6    |
| Language    | TypeScript (strict mode)          |
| Styling     | `twrnc` (Tailwind RN Classnames)  |
| Icons       | `@expo/vector-icons` (Ionicons + MaterialCommunityIcons) |
| Web         | Next.js 14 (App Router) + Tailwind CSS |
| Testing     | Jest + `@testing-library/react-native` |

---

## Project Structure

```
leeta-mobile-assessment/
├── app/                      # Expo Router screens
│   ├── _layout.tsx           # Root layout (fonts, safe area, status bar)
│   └── index.tsx             # Order Dashboard screen (main entry)
│
├── shared/                   # Platform-agnostic business logic
│   ├── types/order.ts        # Order interface, OrderStatus enum
│   ├── data/mock-orders.ts   # Canonical mock data (single source of truth)
│   ├── api/orders.ts         # Simulated async API (fetchOrders, markAsDelivered)
│   └── hooks/useOrders.ts    # Core hook: state, loading, error, filter, refresh
│
├── components/               # Mobile-only React Native components
│   └── orders/
│       ├── OrderCard.tsx         # Single order row card
│       ├── OrderStatusBadge.tsx  # Coloured status pill
│       ├── OrderListHeader.tsx   # Dashboard header + stats
│       ├── FilterTabs.tsx        # New / Accepted / Completed filter tabs
│       └── EmptyState.tsx        # Empty/error state with icon + message
│
├── lib/
│   ├── tailwind.ts           # twrnc instance (import `tw` from here)
│   ├── design-system.ts      # Typed design tokens: Colors, Typography, Icons, Shadows, Styles
│   └── logger.ts             # Lightweight logger (console wrapper + production strategy)
│
├── __tests__/                # Jest test suite
│   └── orders/
│       ├── useOrders.test.ts
│       ├── OrderCard.test.tsx
│       └── OrderList.test.tsx
│
├── web/                      # Separate Next.js 14 web app
│   ├── app/page.tsx          # Order list web screen
│   └── components/orders/    # Web-specific UI variants
│
├── tailwind.config.js        # Leeta design token config (colors, spacing, radius, etc.)
├── CLAUDE.md                 # This file
└── README.md                 # Setup, architecture decisions, trade-offs
```

---

## Styling Rules

### Mobile (React Native)
- **Always** use `tw` from `@/lib/tailwind` for style props.
- **Never** use `StyleSheet.create` — use `twrnc` exclusively.
- For shadows, import `Shadows` from `@/lib/design-system` and spread into `style` prop (RN shadows are not supported as Tailwind classes in `twrnc`).
- Use `Styles.*` presets from `@/lib/design-system` for recurring patterns (card, button, badge).

```tsx
// ✅ Correct
import tw from '@/lib/tailwind';
import { Shadows, Colors } from '@/lib/design-system';

<View style={[tw`bg-white rounded-xl p-4`, Shadows.md]}>
  <Text style={tw`text-neutral-900 font-semibold text-lg`}>...</Text>
</View>

// ❌ Incorrect
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({ card: { backgroundColor: '#fff' } });
```

### Color Usage
- Page/screen backgrounds: `bg-neutral-100`
- Card surfaces: `bg-white` (+ `Shadows.md`)
- Primary actions: `bg-brand` with `text-white`
- Status badges: see `OrderStatusConfig` in `@/lib/design-system`

### Icons
- Use `Icons.*` from `@/lib/design-system` to look up the correct icon name + library.
- Always import the specific icon component (e.g., `Ionicons`) from `@expo/vector-icons`.
- Standard sizes: `IconSize.md` (20) for inline, `IconSize.lg` (24) for standalone.

```tsx
import { Ionicons } from '@expo/vector-icons';
import { Icons, IconSize, Colors } from '@/lib/design-system';

<Ionicons
  name={Icons.markDelivered.name}
  size={IconSize.md}
  color={Colors.brand.DEFAULT}
/>
```

---

## Data Flow

```
shared/data/mock-orders.ts
    ↓
shared/api/orders.ts        (simulated async, 800ms delay, configurable error)
    ↓
shared/hooks/useOrders.ts   (useReducer state machine: idle → loading → success/error)
    ↓
app/index.tsx (mobile) / web/app/page.tsx (web)
```

The `useOrders` hook is the **only** place that talks to the API. Screens are purely presentational with respect to data.

---

## Order Types

```ts
type OrderStatus = 'pending' | 'in_transit' | 'delivered';

interface Order {
  id: string;
  customerName: string;
  phone: string;
  quantity: string;        // e.g. "12.5kg"
  status: OrderStatus;
  createdAt: string;       // ISO 8601
}
```

---

## State Machine (useOrders)

```
         refresh/mount
              ↓
           'loading'
           ↙       ↘
      'success'   'error'
          ↓            ↓
    (show list)  (show error + retry)
```

- `markDelivered(id)` performs an optimistic local update, then syncs with the mock API.
- `filter` state: `'all' | 'pending' | 'in_transit' | 'delivered'`

---

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

Tests live in `__tests__/orders/`. The strategy is **behaviour-driven** — test what the user sees/does, not implementation details.

---

## Running the App

```bash
# Mobile (iOS/Android)
npx expo start

# Web (Expo web target — for quick check)
npx expo start --web

# Web (Next.js — production web interface)
cd web && npm run dev
```

---

## Key Patterns to Follow

1. **Shared first**: If logic is reusable across mobile + web, it belongs in `shared/`.
2. **Typed tokens**: Never hardcode hex values. Always use `Colors.*` from `@/lib/design-system`.
3. **Test behaviour**: Tests should read like user stories, not implementation assertions.
4. **Optimistic updates**: For quick actions (mark delivered), update local state immediately, then sync.
5. **Error boundaries**: Every screen should handle loading, empty, and error states explicitly.
6. **Icons via registry**: All icons are registered in `Icons` in `@/lib/design-system` — don't invent new ones without adding them there.

---

## What NOT to Do

- ❌ Don't use `StyleSheet.create` — use `twrnc`
- ❌ Don't hardcode colors as hex strings in components
- ❌ Don't import the API directly in components — use the `useOrders` hook
- ❌ Don't create one-off components — check `components/orders/` first
- ❌ Don't skip error/empty states — all three data states (loading, empty, error) must be handled

---

## Assessment Context

- **Role**: Senior Frontend Engineer (Leeta)
- **Time budget**: ~16 hours (2 work days)
- **Evaluation criteria**: Coding ability, attention to detail, product thinking, production readiness
- **Bonus features implemented**: Pull-to-refresh, filter tabs, offline state handling, basic logging
