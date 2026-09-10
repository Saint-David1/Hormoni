import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, textStyles, PhaseKey, PHASE_COLORS } from '../theme/tokens';

interface PhaseDotProps {
  phase: PhaseKey;
  label: string;
  size?: number;
}

export const PhaseDot: React.FC<PhaseDotProps> = ({ phase, label, size = 8 }) => {
  const { color } = PHASE_COLORS[phase];
  return (
    <View style={styles.row}>
      <View style={[styles.dot, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]} />
      <Text style={[textStyles.caption, { color: colors.inkSoft }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {},
});
