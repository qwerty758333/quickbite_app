import { Stack } from 'expo-router';

import { CartProvider } from '@/context/CartContext';
import { AppColors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: AppColors.background },
          animation: 'slide_from_right',
        }}
      />
    </CartProvider>
  );
}
