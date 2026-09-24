import { router } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { useCart } from '@/context/CartContext';
import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';
import { formatOrderStatus } from '@/types/order';

export default function OrderConfirmationScreen() {
  const { currentOrder } = useCart();

  // The confirmation screen reads from the actual placed order snapshot rather than from temporary params.
  // This guarantees the data still exists even after the cart is cleared.
  if (!currentOrder) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>No current order</Text>
          <Text style={styles.message}>Place an order from the menu to see your confirmation here.</Text>
          <PrimaryButton label="Back to menu" onPress={() => router.replace('/home' as never)} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.check}><Text style={styles.checkText}>OK</Text></View>
        <Text style={styles.title}>Order confirmed!</Text>
        <Text style={styles.message}>We&apos;re preparing your food now. Pick it up at the main canteen.</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>ORDER NUMBER</Text>
          <Text style={styles.orderId}>{currentOrder.id}</Text>
          <Text style={styles.cardLabel}>ESTIMATED PICKUP</Text>
          <Text style={styles.pickup}>{currentOrder.estimatedPickupTime}</Text>
          <Text style={styles.cardLabel}>STATUS</Text>
          <Text style={styles.status}>{formatOrderStatus(currentOrder.status)}</Text>
        </View>

        <PrimaryButton label="Track my order" onPress={() => router.replace('/order-tracking' as never)} />
        <PrimaryButton label="Back to menu" onPress={() => router.replace('/home' as never)} variant="secondary" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.background },
  content: { flex: 1, justifyContent: 'center', padding: Spacing.four, gap: Spacing.three },
  check: { width: 74, height: 74, borderRadius: Radius.pill, backgroundColor: AppColors.success, alignItems: 'center', justifyContent: 'center' },
  checkText: { color: '#FFFFFF', fontWeight: '900', fontSize: FontSize.md },
  title: { color: AppColors.text, fontWeight: '900', fontSize: FontSize.xl },
  message: { color: AppColors.textSecondary, fontSize: FontSize.md, lineHeight: 24 },
  card: { backgroundColor: AppColors.text, borderRadius: Radius.md, padding: Spacing.four, gap: Spacing.two, marginVertical: Spacing.three },
  cardLabel: { color: '#BEB5AF', fontSize: FontSize.xs, fontWeight: '900', letterSpacing: 1.5 },
  orderId: { color: '#FFFFFF', fontSize: FontSize.xl, fontWeight: '900', marginBottom: Spacing.two },
  pickup: { color: AppColors.secondary, fontSize: FontSize.lg, fontWeight: '900' },
  status: { color: AppColors.secondary, fontSize: FontSize.lg, fontWeight: '900' },
});