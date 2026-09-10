import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { colors, radii, spacing, shadows, PhaseKey, PHASE_COLORS } from '../theme/tokens';

interface CardProps extends ViewProps {
  tint?: PhaseKey;
  hero?: boolean;
}

export const Card: React.FC<CardProps> = ({ style, tint, hero = false, ...props }) => {
  const backgroundColor = tint ? PHASE_COLORS[tint].soft : colors.surface;

  return (
    <View
      style={[styles.container, hero && styles.hero, { backgroundColor }, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  hero: {
    borderRadius: radii.xl,
    padding: spacing.xl,
  },
});
