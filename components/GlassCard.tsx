import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radii, spacing, shadows } from '../theme/tokens';

interface GlassCardProps {
  intensity?: number;
  tint?: 'light' | 'dark';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ intensity = 40, tint = 'light', style, children }) => {
  // Shadow and the blur's rounded-corner clipping fight on the same view
  // (overflow: 'hidden' needed for the blur would also clip the shadow), so
  // the shadow lives on this outer wrapper and the blur/clipping live on the
  // inner one — same split used in FloatingTabBar for the same reason.
  return (
    <View style={[styles.shadowWrap, style]}>
      <View style={styles.container}>
        <View style={[StyleSheet.absoluteFill, styles.fill]} />
        <BlurView intensity={intensity} tint={tint} style={StyleSheet.absoluteFill} />
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: radii.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  container: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  fill: {
    backgroundColor: colors.glassFill,
  },
  content: {
    padding: spacing.lg,
  },
});
