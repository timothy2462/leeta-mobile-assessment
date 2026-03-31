/**
 * Leeta Design System
 * -------------------
 * Single source of truth for all design tokens used in the app.
 * Use these constants alongside twrnc (`tw`) for consistent styling.
 *
 * Pattern:
 *   import tw from '@/lib/tailwind';
 *   import { Colors, Typography, Spacing, Icons } from '@/lib/design-system';
 */

// ─────────────────────────────────────────────────────────────────────────────
// COLORS
// Mirrors tailwind.config.js exactly — typed for autocomplete & safety.
// ─────────────────────────────────────────────────────────────────────────────

export const Colors = {
  // Brand
  brand: {
    DEFAULT: '#F97316',
    light: '#FFF0E6',
    dark: '#EA580C',
  },

  // Semantic
  success: {
    DEFAULT: '#22C55E',
    light: '#DCFCE7',
    dark: '#16A34A',
  },
  warning: {
    DEFAULT: '#F59E0B',
    light: '#FEF3C7',
    dark: '#D97706',
  },
  error: {
    DEFAULT: '#EF4444',
    light: '#FEE2E2',
    dark: '#DC2626',
  },
  info: {
    DEFAULT: '#5B5BD6',
    light: '#EDEDFF',
    dark: '#4338CA',
  },

  // Neutral scale
  neutral: {
    50: '#F9FAFB',
    100: '#F4F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },

  // Surfaces
  white: '#FFFFFF',
  black: '#000000',
  surface: '#FFFFFF',
  overlay: 'rgba(0,0,0,0.5)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ORDER STATUS
// Centralised config for status badge color + label — use everywhere.
// ─────────────────────────────────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'in_transit' | 'delivered';

export const OrderStatusConfig: Record<
  OrderStatus,
  { label: string; color: string; bgColor: string; twClasses: string }
> = {
  pending: {
    label: 'Pending',
    color: Colors.warning.DEFAULT,
    bgColor: Colors.warning.light,
    twClasses: 'text-warning bg-warning-light',
  },
  in_transit: {
    label: 'In Transit',
    color: Colors.info.DEFAULT,
    bgColor: Colors.info.light,
    twClasses: 'text-info bg-info-light',
  },
  delivered: {
    label: 'Delivered',
    color: Colors.success.DEFAULT,
    bgColor: Colors.success.light,
    twClasses: 'text-success bg-success-light',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY
// Consistent text style presets. Pair with tw`` for React Native.
// ─────────────────────────────────────────────────────────────────────────────

export const Typography = {
  // Screen headings
  h1: 'text-3xl font-bold text-neutral-900',
  h2: 'text-2xl font-bold text-neutral-900',
  h3: 'text-xl font-semibold text-neutral-900',
  h4: 'text-lg font-semibold text-neutral-800',

  // Body
  bodyLg: 'text-md font-normal text-neutral-800',
  body: 'text-base font-normal text-neutral-700',
  bodySm: 'text-sm font-normal text-neutral-500',

  // Labels & metadata
  label: 'text-base font-medium text-neutral-700',
  labelSm: 'text-sm font-medium text-neutral-500',
  caption: 'text-xs font-normal text-neutral-400',

  // Brand accents
  link: 'text-base font-medium text-brand',
  linkSm: 'text-sm font-medium text-brand',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SPACING
// Raw pixel values matching the Tailwind spacing scale.
// ─────────────────────────────────────────────────────────────────────────────

export const Spacing = {
  xs: 4,    // spacing-1
  sm: 8,    // spacing-2
  md: 12,   // spacing-3
  base: 16, // spacing-4
  lg: 20,   // spacing-5
  xl: 24,   // spacing-6
  '2xl': 32, // spacing-8
  '3xl': 40, // spacing-10
  '4xl': 48, // spacing-12
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// BORDER RADIUS
// ─────────────────────────────────────────────────────────────────────────────

export const Radius = {
  sm: 4,
  DEFAULT: 8,
  md: 10,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// All icons are from @expo/vector-icons (Ionicons + MaterialCommunityIcons).
// Each entry documents: library, name, and recommended size/color context.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Icon library shorthands:
 *   Ionicons          → "Ion"
 *   MaterialCommunityIcons → "MCI"
 *   Feather           → "F"
 */

export const Icons = {
  // ── Navigation / Tab Bar ──────────────────────────────────────────────────
  tabOrders: { library: 'Ionicons' as const, name: 'receipt-outline' },
  tabOrdersActive: { library: 'Ionicons' as const, name: 'receipt' },
  tabAnalytics: { library: 'Ionicons' as const, name: 'bar-chart-outline' },
  tabAnalyticsActive: { library: 'Ionicons' as const, name: 'bar-chart' },
  tabProfile: { library: 'Ionicons' as const, name: 'person-circle-outline' },
  tabProfileActive: { library: 'Ionicons' as const, name: 'person-circle' },

  // ── Header / App Bar ──────────────────────────────────────────────────────
  notification: { library: 'Ionicons' as const, name: 'notifications-outline' },
  notificationBadge: { library: 'Ionicons' as const, name: 'notifications' },
  back: { library: 'Ionicons' as const, name: 'arrow-back' },
  menu: { library: 'Ionicons' as const, name: 'menu-outline' },

  // ── Orders ────────────────────────────────────────────────────────────────
  order: { library: 'MaterialCommunityIcons' as const, name: 'gas-cylinder' },
  orderDelivered: { library: 'Ionicons' as const, name: 'checkmark-circle' },
  orderPending: { library: 'Ionicons' as const, name: 'time-outline' },
  orderInTransit: { library: 'Ionicons' as const, name: 'bicycle-outline' },
  accept: { library: 'Ionicons' as const, name: 'checkmark-circle-outline' },
  reject: { library: 'Ionicons' as const, name: 'close-circle-outline' },
  markDelivered: { library: 'Ionicons' as const, name: 'checkmark-done-outline' },

  // ── Stats / Dashboard ─────────────────────────────────────────────────────
  todayOrders: { library: 'Ionicons' as const, name: 'list-outline' },
  earnings: { library: 'Ionicons' as const, name: 'wallet-outline' },
  gasPrice: { library: 'MaterialCommunityIcons' as const, name: 'gas-station' },

  // ── Customer / Contact ────────────────────────────────────────────────────
  phone: { library: 'Ionicons' as const, name: 'call-outline' },
  message: { library: 'Ionicons' as const, name: 'chatbubble-outline' },
  location: { library: 'Ionicons' as const, name: 'location-outline' },
  copy: { library: 'Ionicons' as const, name: 'copy-outline' },

  // ── Utility ───────────────────────────────────────────────────────────────
  close: { library: 'Ionicons' as const, name: 'close' },
  search: { library: 'Ionicons' as const, name: 'search-outline' },
  filter: { library: 'Ionicons' as const, name: 'filter-outline' },
  refresh: { library: 'Ionicons' as const, name: 'refresh-outline' },
  info: { library: 'Ionicons' as const, name: 'information-circle-outline' },
  warning: { library: 'Ionicons' as const, name: 'warning-outline' },
  error: { library: 'Ionicons' as const, name: 'alert-circle-outline' },
  success: { library: 'Ionicons' as const, name: 'checkmark-circle-outline' },
  chevronRight: { library: 'Ionicons' as const, name: 'chevron-forward' },
  chevronDown: { library: 'Ionicons' as const, name: 'chevron-down' },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ICON SIZES
// Standardised sizes — pick one, be consistent.
// ─────────────────────────────────────────────────────────────────────────────

export const IconSize = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT STYLE PRESETS (twrnc class strings)
// Ready-to-use tw`` class strings for recurring patterns.
// ─────────────────────────────────────────────────────────────────────────────

export const Styles = {
  // Containers
  screen: 'flex-1 bg-neutral-100',
  card: 'bg-white rounded-xl p-4',
  cardShadow: 'bg-white rounded-xl p-4', // combine with RN shadow style below

  // Buttons
  btnPrimary: 'bg-brand rounded-xl py-4 px-6 items-center justify-center',
  btnPrimaryText: 'text-white font-semibold text-lg',
  btnOutline: 'border border-brand rounded-xl py-3 px-5 items-center justify-center',
  btnOutlineText: 'text-brand font-semibold text-base',
  btnDestructive: 'border border-error rounded-xl py-3 px-5 items-center justify-center',
  btnDestructiveText: 'text-error font-semibold text-base',
  btnDisabled: 'bg-neutral-200 rounded-xl py-4 px-6 items-center justify-center',
  btnDisabledText: 'text-neutral-400 font-semibold text-lg',

  // Status badges
  badge: 'rounded-full px-3 py-1 self-start',
  badgePending: 'bg-warning-light',
  badgeInTransit: 'bg-info-light',
  badgeDelivered: 'bg-success-light',

  // Divider
  divider: 'h-px bg-neutral-200 my-3',

  // Row layout patterns
  row: 'flex-row items-center',
  rowBetween: 'flex-row items-center justify-between',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SHADOWS (React Native style objects – not available in twrnc classnames)
// Import these directly into `style` props as needed.
// ─────────────────────────────────────────────────────────────────────────────

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;
