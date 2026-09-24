import { router } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { useCart } from '@/context/CartContext';
import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';
import { formatOrderStatus, OrderStatus } from '@/types/order';

const statuses: OrderStatus[] = ['PLACED', 'PREPARING', 'READY'];

export default function OrderTrackingScreen() {
  const { currentOrder, advanceOrderStatus } = useCart();

  // Simulates the canteen workflow using a single timeout per current status.
  // The cleanup prevents an old timer from updating state after the screen updates or unmounts.
  useEffect(() => {
    if (!currentOrder) {
      return undefined;
    }

    if (currentOrder.status === 'PLACED' || currentOrder.status === 'PREPARING') {
      const timer = setTimeout(() => {
        advanceOrderStatus();
      }, 5000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [currentOrder?.id, currentOrder?.status]);

  if (!currentOrder) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Text style={styles.title}>No active order</Text>
          <Text style={styles.muted}>Place an order from the menu to start tracking it here.</Text>
          <PrimaryButton label="Back to menu" onPress={() => router.replace('/home' as never)} />
        </View>
      </SafeAreaView>
    );
  }

  const currentIndex = statuses.indexOf(currentOrder.status);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.back} onPress={() => router.back()}>Back</Text>
        <Text style={styles.eyebrow}>ORDER {currentOrder.id}</Text>
        <Text style={styles.title}>On its way to ready</Text>
        <Text style={styles.muted}>Your order is being prepared by the canteen team.</Text>

        <View style={styles.timeline}>
          {statuses.map((status, index) => {
            const isActive = index <= currentIndex;
            const label = formatOrderStatus(status);
            const hint =
              index === 0 ? 'Order received' : index === 1 ? 'The kitchen is on it' : 'We will notify you at pickup';

            return (
              <View key={status} style={styles.statusRow}>
                <View style={[styles.dot, isActive && styles.activeDot]}>
                  <Text style={styles.dotText}>{index < currentIndex ? 'OK' : index === currentIndex ? '...' : ''}</Text>
                </View>
                <View>
                  <Text style={[styles.status, isActive && styles.activeStatus]}>{label}</Text>
                  <Text style={styles.statusHint}>{hint}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <PrimaryButton label="Back to menu" onPress={() => router.replace('/home' as never)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.background },
  content: { flex: 1, padding: Spacing.four },
  emptyState: { flex: 1, justifyContent: 'center', padding: Spacing.four, gap: Spacing.three },
  back: { color: AppColors.primary, fontWeight: '900', fontSize: FontSize.md, marginBottom: Spacing.six },
  eyebrow: { color: AppColors.primary, fontSize: FontSize.xs, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: AppColors.text, fontSize: FontSize.xl, fontWeight: '900', marginTop: Spacing.two },
  muted: { color: AppColors.textSecondary, fontSize: FontSize.md, lineHeight: 24, marginTop: Spacing.two },
  timeline: { gap: Spacing.five, marginVertical: Spacing.six },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  dot: { width: 42, height: 42, borderRadius: Radius.pill, backgroundColor: AppColors.border, alignItems: 'center', justifyContent: 'center' },
  activeDot: { backgroundColor: AppColors.primary },
  dotText: { color: '#FFFFFF', fontSize: FontSize.xs, fontWeight: '900' },
  status: { color: AppColors.textSecondary, fontSize: FontSize.lg, fontWeight: '800' },
  activeStatus: { color: AppColors.text },
  statusHint: { color: AppColors.textSecondary, marginTop: 2 },
});