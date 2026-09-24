/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';
import { Platform } from 'react-native';

const quickBiteColors = {
  primary: '#F05A3C',
  primaryDark: '#D7472D',
  secondary: '#F7C948',
  background: '#FFF9F4',
  surface: '#FFFFFF',
  surfaceMuted: '#FFF0E8',
  text: '#25211F',
  textSecondary: '#756C66',
  border: '#F0DED4',
  success: '#2E8B62',
  backgroundElement: '#FFF0E8',
  backgroundSelected: '#FFE1D4',
} as const;

// The starter components are kept in the project, so these aliases let them compile
// while the new QuickBite routes use the shared palette above.
export const Colors = {
  light: quickBiteColors,
  dark: quickBiteColors,
} as const;
export type ThemeColor = keyof typeof quickBiteColors;
export const Fonts = Platform.select({
  ios: { sans: 'system-ui', serif: 'ui-serif', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', serif: 'serif', rounded: 'normal', mono: 'monospace' },
  web: { sans: 'var(--font-display)', serif: 'var(--font-serif)', rounded: 'var(--font-rounded)', mono: 'var(--font-mono)' },
});

export const AppColors = quickBiteColors;

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
  display: 38,
} as const;

export const Radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 48,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
