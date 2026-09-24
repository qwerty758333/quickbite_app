import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';
import { OrderStatus } from '@/types/order';

const statuses: OrderStatus[] = ['Placed', 'Preparing', 'Ready for Pickup'];

export default function OrderTrackingScreen() {
  const { orderId = 'QB-0000' } = useLocalSearchParams<{ orderId?: string }>();
  const currentIndex = 1;
  return <SafeAreaView style={styles.safeArea}><View style={styles.content}><Text style={styles.back} onPress={() => router.back()}>Back</Text><Text style={styles.eyebrow}>ORDER {orderId}</Text><Text style={styles.title}>On its way to ready</Text><Text style={styles.muted}>Your order is being prepared by the canteen team.</Text><View style={styles.timeline}>{statuses.map((status, index) => <View key={status} style={styles.statusRow}><View style={[styles.dot, index <= currentIndex && styles.activeDot]}><Text style={styles.dotText}>{index < currentIndex ? 'OK' : index === currentIndex ? '...' : ''}</Text></View><View><Text style={[styles.status, index <= currentIndex && styles.activeStatus]}>{status}</Text><Text style={styles.statusHint}>{index === 0 ? 'Order received' : index === 1 ? 'The kitchen is on it' : 'We&apos;ll notify you at pickup'}</Text></View></View>)}</View><PrimaryButton label="Back to menu" onPress={() => router.replace('/home' as never)} /></View></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: AppColors.background }, content: { flex: 1, padding: Spacing.four }, back: { color: AppColors.primary, fontWeight: '900', fontSize: FontSize.md, marginBottom: Spacing.six }, eyebrow: { color: AppColors.primary, fontSize: FontSize.xs, fontWeight: '900', letterSpacing: 1.5 }, title: { color: AppColors.text, fontSize: FontSize.xl, fontWeight: '900', marginTop: Spacing.two }, muted: { color: AppColors.textSecondary, fontSize: FontSize.md, lineHeight: 24, marginTop: Spacing.two }, timeline: { gap: Spacing.five, marginVertical: Spacing.six }, statusRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three }, dot: { width: 42, height: 42, borderRadius: Radius.pill, backgroundColor: AppColors.border, alignItems: 'center', justifyContent: 'center' }, activeDot: { backgroundColor: AppColors.primary }, dotText: { color: '#FFFFFF', fontSize: FontSize.xs, fontWeight: '900' }, status: { color: AppColors.textSecondary, fontSize: FontSize.lg, fontWeight: '800' }, activeStatus: { color: AppColors.text }, statusHint: { color: AppColors.textSecondary, marginTop: 2 } });