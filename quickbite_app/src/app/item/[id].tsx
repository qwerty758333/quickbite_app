import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';
import { menuItems } from '@/data/menuItems';
import { useCart } from '@/context/CartContext';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = menuItems.find((menuItem) => menuItem.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!item) return <SafeAreaView style={styles.safeArea}><Text style={styles.missing}>Item not found.</Text></SafeAreaView>;

  // Adds the chosen quantity, then gives immediate feedback without forcing a route change.
  const handleAdd = () => { addToCart(item, quantity); setAdded(true); };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>Back</Text></Pressable>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.category}>{item.category.toUpperCase()}</Text>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityRow}><Text style={styles.quantityLabel}>Quantity</Text><View style={styles.quantity}><Pressable onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}><Text style={styles.quantityText}>-</Text></Pressable><Text style={styles.quantityValue}>{quantity}</Text><Pressable onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}><Text style={styles.quantityText}>+</Text></Pressable></View></View>
        <PrimaryButton label={added ? 'Added to cart' : 'Add to cart'} onPress={handleAdd} />
        {added && <PrimaryButton label="View cart" onPress={() => router.push('/cart' as never)} variant="secondary" />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.background },
  content: { padding: Spacing.four, gap: Spacing.three },
  back: { color: AppColors.primary, fontWeight: '900', fontSize: FontSize.md, marginBottom: Spacing.two },
  image: { width: '100%', aspectRatio: 1.05, borderRadius: Radius.lg },
  category: { color: AppColors.primary, fontSize: FontSize.xs, fontWeight: '900', letterSpacing: 1.5, marginTop: Spacing.two },
  title: { color: AppColors.text, fontSize: FontSize.xl, fontWeight: '900' },
  description: { color: AppColors.textSecondary, fontSize: FontSize.md, lineHeight: 24 },
  price: { color: AppColors.text, fontSize: FontSize.lg, fontWeight: '900' },
  quantityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: Spacing.two },
  quantityLabel: { color: AppColors.text, fontSize: FontSize.md, fontWeight: '800' },
  quantity: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  quantityButton: { width: 36, height: 36, borderRadius: Radius.pill, backgroundColor: AppColors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  quantityText: { color: AppColors.primary, fontSize: FontSize.lg, fontWeight: '900' },
  quantityValue: { color: AppColors.text, fontSize: FontSize.md, fontWeight: '900' },
  missing: { color: AppColors.text, padding: Spacing.four },
});