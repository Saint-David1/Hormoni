import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, radii, spacing, textStyles } from '../theme/tokens';

// 'primary'/'calm'/'data' are legacy aliases kept during the screen-by-screen
// redesign migration — new call sites should use neutral/accent/phase.
type PillVariant = 'neutral' | 'accent' | 'phase' | 'primary' | 'calm' | 'data';

interface PillProps {
  label: string;
  variant?: PillVariant;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Pill: React.FC<PillProps> = ({ label, variant = 'neutral', style, labelStyle }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'accent':
      case 'data':
        return { container: styles.accentContainer, label: styles.accentLabel };
      case 'phase':
      case 'calm':
        return { container: styles.phaseContainer, label: styles.phaseLabel };
      case 'primary':
      case 'neutral':
      default:
        return { container: styles.neutralContainer, label: styles.neutralLabel };
    }
  };

  const { container, label: variantLabelStyle } = getVariantStyles();

  return (
    <View style={[styles.baseContainer, container, style]}>
      <Text style={[textStyles.caption, variantLabelStyle, labelStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
  },
  neutralContainer: { backgroundColor: colors.bgSection },
  neutralLabel: { color: colors.inkSoft },
  accentContainer: { backgroundColor: colors.primarySoft },
  accentLabel: { color: colors.primaryPressed },
  phaseContainer: { backgroundColor: colors.phaseLutealSoft },
  phaseLabel: { color: colors.phaseLuteal },
});
