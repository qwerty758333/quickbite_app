import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';

export default function SplashScreen() {
  // Automatically moves the user to guest/login access after the short brand introduction.
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/login' as never), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mark}><Text style={styles.markText}>QB</Text></View>
      <Text style={styles.title}>QuickBite</Text>
      <Text style={styles.subtitle}>Good food. Zero queue.</Text>
      <View style={styles.loader}><View style={styles.loaderFill} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: AppColors.primary, padding: Spacing.four },
  mark: { width: 76, height: 76, borderRadius: Radius.lg, backgroundColor: AppColors.secondary, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-8deg' }] },
  markText: { color: AppColors.text, fontSize: FontSize.xl, fontWeight: '900' },
  title: { color: '#FFFFFF', fontSize: FontSize.display, fontWeight: '900', marginTop: Spacing.four },
  subtitle: { color: '#FFEDE6', fontSize: FontSize.md, marginTop: Spacing.two },
  loader: { width: 110, height: 5, borderRadius: Radius.pill, backgroundColor: AppColors.primaryDark, overflow: 'hidden', marginTop: Spacing.six },
  loaderFill: { width: '60%', height: '100%', backgroundColor: AppColors.secondary },
});
