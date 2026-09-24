import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { useCart } from '@/context/CartContext';
import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';
import { formatOrderStatus, Order } from '@/types/order';

const mockOrders: Order[] = [{ id: 'QB-4821', items: [], subtotal: 12.75, status: 'READY', estimatedPickupTime: 'Yesterday' }, { id: 'QB-3190', items: [], subtotal: 9.5, status: 'READY', estimatedPickupTime: '18 Sep' }];

export default function ProfileScreen() {
  const { currentOrder } = useCart();
  const orderHistory = currentOrder ? [currentOrder, ...mockOrders] : mockOrders;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.back} onPress={() => router.back()}>Back</Text>
        <View style={styles.profile}>
          <View style={styles.avatar}><Text style={styles.avatarText}>A</Text></View>
          <View>
            <Text style={styles.title}>Alex Student</Text>
            <Text style={styles.muted}>Campus member · Main campus</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Order history</Text>
        {orderHistory.map((order) => (
          <View key={order.id} style={styles.order}>
            <View>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.muted}>{formatOrderStatus(order.status)} · {order.estimatedPickupTime}</Text>
            </View>
            <Text style={styles.total}>Rs. {order.subtotal.toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.note}>
          <Text style={styles.noteTitle}>QuickBite member</Text>
          <Text style={styles.muted}>You&apos;re helping keep campus queues moving.</Text>
        </View>

        <PrimaryButton label="Back to menu" onPress={() => router.replace('/home' as never)} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.background },
  content: { padding: Spacing.four, gap: Spacing.three },
  back: { color: AppColors.primary, fontWeight: '900', fontSize: FontSize.md, marginBottom: Spacing.three },
  profile: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, marginBottom: Spacing.four },
  avatar: { width: 64, height: 64, borderRadius: Radius.pill, backgroundColor: AppColors.secondary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: AppColors.text, fontSize: FontSize.xl, fontWeight: '900' },
  title: { color: AppColors.text, fontSize: FontSize.xl, fontWeight: '900' },
  muted: { color: AppColors.textSecondary, fontSize: FontSize.sm, marginTop: 3 },
  sectionTitle: { color: AppColors.text, fontSize: FontSize.lg, fontWeight: '900', marginTop: Spacing.three },
  order: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.three, backgroundColor: AppColors.surface, borderColor: AppColors.border, borderWidth: 1, borderRadius: Radius.md },
  orderId: { color: AppColors.text, fontWeight: '900', fontSize: FontSize.md },
  total: { color: AppColors.primary, fontWeight: '900', fontSize: FontSize.md },
  note: { backgroundColor: AppColors.surfaceMuted, padding: Spacing.three, borderRadius: Radius.md, marginVertical: Spacing.three },
  noteTitle: { color: AppColors.text, fontWeight: '900', fontSize: FontSize.md },
});