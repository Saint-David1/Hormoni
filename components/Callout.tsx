import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, radii, spacing } from '../theme/tokens';

interface CalloutProps {
  title?: string;
  message: string;
  variant?: 'info' | 'warning' | 'safety';
  style?: ViewStyle;
}

export const Callout: React.FC<CalloutProps> = ({ title, message, variant = 'info', style }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          container: styles.warningContainer,
          text: styles.warningText,
        };
      case 'safety':
        return {
          container: styles.safetyContainer,
          text: styles.safetyText,
        };
      case 'info':
      default:
        return {
          container: styles.infoContainer,
          text: styles.infoText,
        };
    }
  };

  const { container, text: variantTextStyle } = getVariantStyles();

  return (
    <View style={[styles.baseContainer, container, style]}>
      {title && <Text style={[styles.title, variantTextStyle]}>{title}</Text>}
      <Text style={[styles.message, variantTextStyle]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  title: {
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  message: {
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.line,
  },
  infoText: {
    color: colors.ink,
  },
  warningContainer: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  warningText: {
    color: colors.ink,
  },
  safetyContainer: {
    backgroundColor: colors.calmSoft,
    borderColor: colors.calm,
  },
  safetyText: {
    color: colors.ink,
  },
});
