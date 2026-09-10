import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, spacing, textStyles } from '../theme/tokens';

interface CalloutProps {
  title?: string;
  message: string;
  variant?: 'info' | 'warning' | 'safety';
  style?: ViewStyle;
}

export const Callout: React.FC<CalloutProps> = ({ title, message, variant = 'info', style }) => {
  const variantStyle = {
    info: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
    warning: { backgroundColor: colors.phaseOvulationSoft, borderColor: colors.warning },
    safety: { backgroundColor: colors.phaseFertileSoft, borderColor: colors.phaseFertile },
  }[variant];

  return (
    <View style={[styles.container, variantStyle, style]}>
      {title && <Text style={[textStyles.bodyStrong, styles.title]}>{title}</Text>}
      <Text style={[textStyles.body, styles.message]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  message: {
    color: colors.ink,
  },
});
