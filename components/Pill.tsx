import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, radii, spacing } from '../theme/tokens';

interface PillProps {
  label: string;
  variant?: 'primary' | 'calm' | 'data';
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Pill: React.FC<PillProps> = ({ label, variant = 'primary', style, labelStyle }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'calm':
        return {
          container: styles.calmContainer,
          label: styles.calmLabel,
        };
      case 'data':
        return {
          container: styles.dataContainer,
          label: styles.dataLabel,
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
    <View style={[styles.baseContainer, container, style]}>
      <Text style={[styles.baseLabel, variantLabelStyle, labelStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  baseLabel: {
    fontFamily: typography.mono,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  primaryContainer: {
    backgroundColor: colors.primarySoft,
  },
  primaryLabel: {
    color: colors.primary,
  },
  calmContainer: {
    backgroundColor: colors.calmSoft,
  },
  calmLabel: {
    color: colors.inkSoft,
  },
  dataContainer: {
    backgroundColor: '#FDE0EB', // accentSoft alternative
  },
  dataLabel: {
    color: colors.data,
  },
});
