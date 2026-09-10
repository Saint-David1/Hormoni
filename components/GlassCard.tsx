import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radii } from '../theme/tokens';

interface GlassCardProps {
  intensity?: number;
  tint?: 'light' | 'dark';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ intensity = 40, tint = 'light', style, children }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[StyleSheet.absoluteFill, styles.fill]} />
      <BlurView intensity={intensity} tint={tint} style={StyleSheet.absoluteFill} />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    padding: 14,
  },
});
