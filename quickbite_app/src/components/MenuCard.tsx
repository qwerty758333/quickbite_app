import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';
import { MenuItem } from '@/data/menuItems';

export function MenuCard({ item, onPress }: { item: MenuItem; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{item.category.toUpperCase()}</Text>
        <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 150, backgroundColor: AppColors.surface, borderRadius: Radius.md, overflow: 'hidden', borderWidth: 1, borderColor: AppColors.border },
  image: { width: '100%', aspectRatio: 1.18 },
  content: { padding: Spacing.three },
  category: { color: AppColors.primary, fontSize: FontSize.xs, fontWeight: '800', letterSpacing: 1 },
  name: { color: AppColors.text, fontSize: FontSize.md, fontWeight: '800', marginTop: Spacing.one, minHeight: 42 },
  price: { color: AppColors.textSecondary, fontSize: FontSize.sm, fontWeight: '700', marginTop: Spacing.two },
  pressed: { opacity: 0.8 },
});