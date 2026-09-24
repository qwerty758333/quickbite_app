import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import { MenuCard } from '@/components/MenuCard';
import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';
import { menuItems, MenuCategory } from '@/data/menuItems';
import { useCart } from '@/context/CartContext';

const categories: Array<'All' | MenuCategory> = ['All', 'Meals', 'Beverages', 'Snacks'];

export default function HomeScreen() {
  const { cartItemCount } = useCart();
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [query, setQuery] = useState('');
  const filteredItems = useMemo(() => menuItems.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    return matchesCategory && item.name.toLowerCase().includes(query.toLowerCase());
  }), [category, query]);

  // Opens item detail with the selected local menu item's ID for lookup on the next screen.
  const openItem = (id: string) => router.push(`/item/${id}` as never);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        data={filteredItems}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<>
          <View style={styles.header}><View><Text style={styles.eyebrow}>THURSDAY, 24 SEP</Text><Text style={styles.title}>What are you craving?</Text></View><Pressable onPress={() => router.push('/profile' as never)} style={styles.avatar}><Text style={styles.avatarText}>A</Text></Pressable></View>
          <View style={styles.actions}><TextInput onChangeText={setQuery} placeholder="Search the menu" placeholderTextColor={AppColors.textSecondary} style={styles.search} value={query} /><Pressable onPress={() => router.push('/cart' as never)} style={styles.cart}><Text style={styles.cartIcon}>Bag</Text>{cartItemCount > 0 && <Text style={styles.badge}>{cartItemCount}</Text>}</Pressable></View>
          <FlatList horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories} data={categories} keyExtractor={(item) => item} renderItem={({ item }) => <Pressable onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.activeChip]}><Text style={[styles.chipText, category === item && styles.activeChipText]}>{item}</Text></Pressable>} />
          <Text style={styles.sectionTitle}>Today&apos;s picks</Text>
        </>}
        numColumns={2}
        renderItem={({ item }) => <MenuCard item={item} onPress={() => openItem(item.id)} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.background },
  list: { padding: Spacing.four, paddingBottom: Spacing.six },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.four },
  eyebrow: { color: AppColors.primary, fontSize: FontSize.xs, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: AppColors.text, fontSize: FontSize.xl, fontWeight: '900', marginTop: Spacing.two, maxWidth: 280 },
  avatar: { width: 44, height: 44, borderRadius: Radius.pill, backgroundColor: AppColors.secondary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: AppColors.text, fontSize: FontSize.lg, fontWeight: '900' },
  actions: { flexDirection: 'row', gap: Spacing.two, marginBottom: Spacing.three },
  search: { flex: 1, backgroundColor: AppColors.surface, borderColor: AppColors.border, borderWidth: 1, borderRadius: Radius.md, paddingHorizontal: Spacing.three, color: AppColors.text, fontSize: FontSize.md },
  cart: { width: 58, borderRadius: Radius.md, backgroundColor: AppColors.text, alignItems: 'center', justifyContent: 'center' },
  cartIcon: { color: '#FFFFFF', fontSize: FontSize.xs, fontWeight: '900' },
  badge: { position: 'absolute', right: -5, top: -7, minWidth: 21, textAlign: 'center', color: '#FFFFFF', backgroundColor: AppColors.primary, borderRadius: Radius.pill, padding: 3, fontSize: FontSize.xs, fontWeight: '900' },
  categories: { gap: Spacing.two, paddingBottom: Spacing.four },
  chip: { borderRadius: Radius.pill, backgroundColor: AppColors.surface, borderColor: AppColors.border, borderWidth: 1, paddingHorizontal: Spacing.three, paddingVertical: Spacing.two },
  activeChip: { backgroundColor: AppColors.text, borderColor: AppColors.text },
  chipText: { color: AppColors.textSecondary, fontWeight: '800' },
  activeChipText: { color: '#FFFFFF' },
  sectionTitle: { color: AppColors.text, fontSize: FontSize.lg, fontWeight: '900', marginBottom: Spacing.three },
  row: { gap: Spacing.three, marginBottom: Spacing.three },
});