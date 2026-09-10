import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, textStyles } from '../theme/tokens';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const Chip: React.FC<ChipProps> = ({ label, selected = false, onPress, icon }) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected ? styles.selected : styles.unselected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && <Ionicons name={icon} size={14} color={selected ? colors.onBrand : colors.inkSoft} style={styles.icon} />}
      {!icon && <View style={[styles.dot, { backgroundColor: selected ? colors.onBrand : colors.primary }]} />}
      <Text style={[textStyles.caption, { color: selected ? colors.onBrand : colors.inkSoft }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: radii.sm,
    gap: 6,
  },
  selected: {
    backgroundColor: colors.primary,
  },
  unselected: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.bgWash,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  icon: {
    marginRight: 2,
  },
});
