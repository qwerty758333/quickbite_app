import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { useCart } from '@/context/CartContext';
import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';

export default function CheckoutScreen() {
  const { cartItems, cartSubtotal, placeOrder } = useCart();
  const [studentName, setStudentName] = useState('');
  const [pickupTime, setPickupTime] = useState('12:30 PM');

  // The cart is validated before an order is created.
  // After the order is saved, the cart is cleared and the confirmation screen reads the order snapshot.
  const handlePlaceOrder = () => {
    const createdOrder = placeOrder();

    if (!createdOrder) {
      return;
    }

    router.replace({ pathname: '/order-confirmation' as never, params: { orderId: createdOrder.id, pickupTime: createdOrder.estimatedPickupTime } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.back} onPress={() => router.back()}>Back</Text>
        <Text style={styles.title}>Almost there</Text>
        <Text style={styles.muted}>Choose a pickup time and we&apos;ll have it ready.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Student name</Text>
          <TextInput onChangeText={setStudentName} placeholder="Enter your name" placeholderTextColor={AppColors.textSecondary} style={styles.input} value={studentName} />
          <Text style={styles.label}>Pickup time</Text>
          <TextInput onChangeText={setPickupTime} style={styles.input} value={pickupTime} />
        </View>

        <View style={styles.orderBox}>
          <Text style={styles.label}>Order summary</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.line}>
              <Text style={styles.muted}>{item.quantity} x {item.name}</Text>
              <Text style={styles.muted}>Rs. {(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.line}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>Rs. {cartSubtotal.toFixed(2)}</Text>
          </View>
        </View>

        <PrimaryButton disabled={cartItems.length === 0} label="Place order" onPress={handlePlaceOrder} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.background },
  content: { padding: Spacing.four, gap: Spacing.two, paddingBottom: Spacing.six },
  back: { color: AppColors.primary, fontWeight: '900', fontSize: FontSize.md, marginBottom: Spacing.three },
  title: { color: AppColors.text, fontSize: FontSize.xl, fontWeight: '900' },
  muted: { color: AppColors.textSecondary, fontSize: FontSize.md },
  form: { gap: Spacing.two, marginTop: Spacing.four },
  label: { color: AppColors.text, fontWeight: '800', fontSize: FontSize.sm },
  input: { backgroundColor: AppColors.surface, borderColor: AppColors.border, borderWidth: 1, borderRadius: Radius.md, color: AppColors.text, padding: Spacing.three, fontSize: FontSize.md, marginBottom: Spacing.two },
  orderBox: { backgroundColor: AppColors.surface, padding: Spacing.three, borderRadius: Radius.md, gap: Spacing.two, marginVertical: Spacing.three, borderWidth: 1, borderColor: AppColors.border },
  line: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.two },
  totalLabel: { color: AppColors.text, fontWeight: '900', fontSize: FontSize.md, marginTop: Spacing.two },
  total: { color: AppColors.primary, fontSize: FontSize.lg, fontWeight: '900', marginTop: Spacing.two },
});