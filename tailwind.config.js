/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // ─── Design Tokens ────────────────────────────────────────────────────────
    colors: {
      // Transparent & absolute
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#000000',

      // ── Brand ──────────────────────────────────────────────────────────────
      brand: {
        DEFAULT: '#F97316', // Primary orange – CTAs, active states, key accents
        light: '#FFF0E6', // Soft orange tint – badge backgrounds, card highlights
        dark: '#EA580C', // Pressed / hover state for orange
      },

      // ── Status / Semantic ──────────────────────────────────────────────────
      success: {
        DEFAULT: '#22C55E', // Toggle active, checkmarks, "Delivered" badge, "On-site refill"
        light: '#DCFCE7', // Success badge background
        dark: '#16A34A', // Pressed success
      },

      warning: {
        DEFAULT: '#F59E0B', // In-transit state
        light: '#FEF3C7', // Warning badge background
        dark: '#D97706',
      },

      error: {
        DEFAULT: '#EF4444', // Error states, destructive actions
        light: '#FEE2E2', // Error badge background
        dark: '#DC2626',
      },

      info: {
        DEFAULT: '#5B5BD6', // Indigo/purple – Earnings card, Cylinder Exchange badge
        light: '#EDEDFF', // Info badge background
        dark: '#4338CA',
      },

      // ── Neutral (Text, Borders, Backgrounds) ───────────────────────────────
      neutral: {
        50: '#F9FAFB',   // Subtle section backgrounds
        100: '#F4F4F6',  // Main app background (off-white page bg)
        200: '#E5E7EB',  // Card borders, dividers, input borders
        300: '#D1D5DB',  // Placeholder text, disabled borders
        400: '#9CA3AF',  // Tertiary text, icons (inactive)
        500: '#6B7280',  // Secondary text (subtitles, metadata)
        600: '#4B5563',  // Strong secondary text
        700: '#374151',  // Semi-primary text
        800: '#1F2937',  // Secondary headings
        900: '#111827',  // Primary text – headings, order names
        950: '#030712',  // Near black
      },

      // ── Overlay & Surface ──────────────────────────────────────────────────
      overlay: 'rgba(0,0,0,0.5)',   // Modal backdrops
      surface: '#FFFFFF',            // Card / sheet surface
    },

    // ─── Typography ───────────────────────────────────────────────────────────
    fontFamily: {
      sans: ['System'],        // Will be replaced when custom fonts are loaded
      mono: ['SpaceMono'],
    },

    fontSize: {
      xs: [10, { lineHeight: '14px' }],
      sm: [12, { lineHeight: '16px' }],
      base: [14, { lineHeight: '20px' }],
      md: [15, { lineHeight: '22px' }],
      lg: [16, { lineHeight: '24px' }],
      xl: [18, { lineHeight: '26px' }],
      '2xl': [20, { lineHeight: '28px' }],
      '3xl': [24, { lineHeight: '32px' }],
      '4xl': [28, { lineHeight: '36px' }],
      '5xl': [32, { lineHeight: '40px' }],
    },

    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },

    // ─── Spacing ──────────────────────────────────────────────────────────────
    spacing: {
      0: 0, 0.5: 2, 1: 4, 1.5: 6, 2: 8, 2.5: 10,
      3: 12, 3.5: 14, 4: 16, 5: 20, 6: 24, 7: 28,
      8: 32, 9: 36, 10: 40, 11: 44, 12: 48, 14: 56,
      16: 64, 20: 80, 24: 96,
    },

    borderRadius: {
      none: 0,
      sm: 4,
      DEFAULT: 8,
      md: 10,
      lg: 12,
      xl: 16,
      '2xl': 20,
      '3xl': 24,
      full: 9999,
    },

    borderWidth: {
      DEFAULT: 1, 0: 0, 2: 2,
    },

    boxShadow: {
      none: 'none',
      sm: '0 1px 3px rgba(0,0,0,0.06)',
      DEFAULT: '0 2px 8px rgba(0,0,0,0.08)',
      md: '0 4px 16px rgba(0,0,0,0.10)',
      lg: '0 8px 24px rgba(0,0,0,0.12)',
    },

    opacity: {
      0: '0', 10: '0.1', 20: '0.2', 30: '0.3',
      40: '0.4', 50: '0.5', 60: '0.6', 70: '0.7',
      80: '0.8', 90: '0.9', 100: '1',
    },

    extend: {},
  },
  plugins: [],
};
