import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';

export function QuantitySelector({ quantity, onDecrease, onIncrease }: { quantity: number; onDecrease: () => void; onIncrease: () => void }) {
  return <View style={styles.container}><Pressable onPress={onDecrease} style={styles.button}><Text style={styles.symbol}>-</Text></Pressable><Text style={styles.value}>{quantity}</Text><Pressable onPress={onIncrease} style={styles.button}><Text style={styles.symbol}>+</Text></Pressable></View>;
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  button: { width: 30, height: 30, borderRadius: Radius.pill, backgroundColor: AppColors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  symbol: { color: AppColors.primary, fontSize: FontSize.lg, fontWeight: '900' },
  value: { color: AppColors.text, minWidth: 18, textAlign: 'center', fontWeight: '900' },
});