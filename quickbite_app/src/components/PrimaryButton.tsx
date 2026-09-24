import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors, FontSize, Radius, Spacing } from '@/constants/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function PrimaryButton({ label, onPress, variant = 'primary', disabled }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.label, variant === 'secondary' && styles.secondaryLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: AppColors.primary, borderRadius: Radius.md, padding: Spacing.three, alignItems: 'center' },
  secondary: { backgroundColor: AppColors.surface, borderWidth: 1, borderColor: AppColors.border },
  label: { color: '#FFFFFF', fontSize: FontSize.md, fontWeight: '800' },
  secondaryLabel: { color: AppColors.text },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.78 },
});