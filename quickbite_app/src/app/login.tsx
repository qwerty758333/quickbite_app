import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';

export default function LoginScreen() {
  const [name, setName] = useState('');

  // Guest access keeps the prototype usable without requiring real authentication.
  const enterApp = () => router.replace('/home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.kicker}>WELCOME TO</Text>
        <Text style={styles.title}>QuickBite</Text>
        <Text style={styles.intro}>Your campus canteen, sorted before you even leave class.</Text>
        <View style={styles.form}>
          <Text style={styles.label}>What should we call you?</Text>
          <TextInput autoCapitalize="words" onChangeText={setName} placeholder="Your first name" placeholderTextColor={AppColors.textSecondary} style={styles.input} value={name} />
          <PrimaryButton label="Start ordering" onPress={enterApp} />
          <Pressable onPress={enterApp} style={styles.guest}><Text style={styles.guestText}>Continue as guest</Text></Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: AppColors.background },
  container: { flex: 1, justifyContent: 'center', padding: Spacing.four },
  kicker: { color: AppColors.primary, fontSize: FontSize.sm, fontWeight: '900', letterSpacing: 2 },
  title: { color: AppColors.text, fontSize: FontSize.display, fontWeight: '900', marginTop: Spacing.two },
  intro: { color: AppColors.textSecondary, fontSize: FontSize.lg, lineHeight: 28, marginTop: Spacing.three, maxWidth: 360 },
  form: { marginTop: Spacing.six, gap: Spacing.two },
  label: { color: AppColors.text, fontWeight: '800', fontSize: FontSize.sm },
  input: { backgroundColor: AppColors.surface, borderColor: AppColors.border, borderRadius: Radius.md, borderWidth: 1, color: AppColors.text, fontSize: FontSize.md, padding: Spacing.three },
  guest: { alignItems: 'center', padding: Spacing.two },
  guestText: { color: AppColors.primary, fontWeight: '800' },
});