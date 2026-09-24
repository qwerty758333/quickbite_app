import { router } from 'expo-router';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { QuantitySelector } from '@/components/QuantitySelector';
import { useCart } from '@/context/CartContext';
import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';

export default function CartScreen() {
  const { cartItems, cartSubtotal, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) return <SafeAreaView style={styles.safeArea}><View style={styles.empty}><Text style={styles.emptyEmoji}>+</Text><Text style={styles.title}>Your bag is waiting</Text><Text style={styles.muted}>Add something delicious from today&apos;s menu.</Text><PrimaryButton label="Browse menu" onPress={() => router.replace('/home' as never)} /></View></SafeAreaView>;

  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.content}><Pressable onPress={() => router.back()}><Text style={styles.back}>Back</Text></Pressable><Text style={styles.title}>Your bag</Text><Text style={styles.muted}>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected</Text><View style={styles.items}>{cartItems.map((item) => <View key={item.id} style={styles.item}><Image source={{ uri: item.image }} style={styles.image} /><View style={styles.itemInfo}><Text style={styles.itemName}>{item.name}</Text><Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text><QuantitySelector quantity={item.quantity} onDecrease={() => decreaseQuantity(item.id)} onIncrease={() => increaseQuantity(item.id)} /></View><Pressable onPress={() => removeFromCart(item.id)}><Text style={styles.remove}>Remove</Text></Pressable></View>)}</View><View style={styles.summary}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.total}>${cartSubtotal.toFixed(2)}</Text></View><PrimaryButton label="Continue to checkout" onPress={() => router.push('/checkout' as never)} /></ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.background },
  content: { padding: Spacing.four, gap: Spacing.two, paddingBottom: Spacing.six },
  empty: { flex: 1, justifyContent: 'center', padding: Spacing.four, gap: Spacing.three },
  emptyEmoji: { width: 62, height: 62, lineHeight: 62, textAlign: 'center', borderRadius: Radius.pill, backgroundColor: AppColors.secondary, color: AppColors.text, fontSize: FontSize.xl, fontWeight: '900' },
  back: { color: AppColors.primary, fontWeight: '900', fontSize: FontSize.md, marginBottom: Spacing.three },
  title: { color: AppColors.text, fontSize: FontSize.xl, fontWeight: '900' },
  muted: { color: AppColors.textSecondary, fontSize: FontSize.md },
  items: { gap: Spacing.two, marginTop: Spacing.four },
  item: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, backgroundColor: AppColors.surface, borderRadius: Radius.md, padding: Spacing.two, borderWidth: 1, borderColor: AppColors.border },
  image: { width: 76, height: 76, borderRadius: Radius.sm },
  itemInfo: { flex: 1, gap: Spacing.one },
  itemName: { color: AppColors.text, fontWeight: '800', fontSize: FontSize.sm },
  itemPrice: { color: AppColors.textSecondary, fontWeight: '800' },
  remove: { color: AppColors.primary, fontSize: FontSize.xs, fontWeight: '800', padding: Spacing.one },
  summary: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: AppColors.border, marginTop: Spacing.four, paddingTop: Spacing.three, marginBottom: Spacing.three },
  summaryLabel: { color: AppColors.textSecondary, fontSize: FontSize.md },
  total: { color: AppColors.text, fontSize: FontSize.xl, fontWeight: '900' },
});