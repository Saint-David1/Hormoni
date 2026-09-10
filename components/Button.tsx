import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, radii, spacing } from '../theme/tokens';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'md' | 'sm';
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', size = 'md', style, labelStyle, ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return { container: styles.secondaryContainer, label: styles.secondaryLabel };
      case 'outline':
        return { container: styles.outlineContainer, label: styles.outlineLabel };
      case 'ghost':
        return { container: styles.ghostContainer, label: styles.ghostLabel };
      case 'destructive':
        return { container: styles.destructiveContainer, label: styles.destructiveLabel };
      case 'primary':
      default:
        return { container: styles.primaryContainer, label: styles.primaryLabel };
    }
  };

  const { container, label: variantLabelStyle } = getVariantStyles();

  return (
    <TouchableOpacity
      style={[
        styles.baseContainer,
        size === 'sm' && styles.smContainer,
        container,
        style,
        props.disabled && styles.disabledContainer,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={[styles.baseLabel, variantLabelStyle, labelStyle, props.disabled && styles.disabledLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smContainer: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  baseLabel: {
    fontFamily: typography.bodySemibold,
    fontSize: 16,
  },
  primaryContainer: { backgroundColor: colors.primary },
  primaryLabel: { color: colors.onBrand },
  secondaryContainer: { backgroundColor: colors.primarySoft },
  secondaryLabel: { color: colors.primaryPressed },
  outlineContainer: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
  outlineLabel: { color: colors.primary },
  ghostContainer: { backgroundColor: 'transparent' },
  ghostLabel: { color: colors.primary },
  destructiveContainer: { backgroundColor: colors.errorMutedSoft },
  destructiveLabel: { color: colors.errorMuted },
  disabledContainer: { opacity: 0.5 },
  disabledLabel: {},
});
