import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, radii, spacing } from '../theme/tokens';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', style, labelStyle, ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          container: styles.secondaryContainer,
          label: styles.secondaryLabel,
        };
      case 'outline':
        return {
          container: styles.outlineContainer,
          label: styles.outlineLabel,
        };
      case 'primary':
      default:
        return {
          container: styles.primaryContainer,
          label: styles.primaryLabel,
        };
    }
  };

  const { container, label: variantLabelStyle } = getVariantStyles();

  return (
    <TouchableOpacity
      style={[styles.baseContainer, container, style, props.disabled && styles.disabledContainer]}
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
  baseLabel: {
    fontFamily: typography.body,
    fontSize: 16,
    fontWeight: '600',
  },
  primaryContainer: {
    backgroundColor: colors.primary,
  },
  primaryLabel: {
    color: colors.surface,
  },
  secondaryContainer: {
    backgroundColor: colors.primarySoft,
  },
  secondaryLabel: {
    color: colors.primary,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  outlineLabel: {
    color: colors.primary,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  disabledLabel: {},
});
