import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, PhaseKey, PHASE_COLORS } from '../theme/tokens';

interface IconChipProps {
  children: React.ReactNode;
  style?: ViewStyle;
  size?: number;
  tint?: PhaseKey | 'primary';
}

export const IconChip: React.FC<IconChipProps> = ({ children, style, size = 40, tint }) => {
  const backgroundColor = tint === 'primary' ? colors.primarySoft : tint ? PHASE_COLORS[tint].soft : colors.primarySoft;

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
