import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, textStyles, typography } from '../theme/tokens';

interface LogTagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export const LogTag: React.FC<LogTagProps> = ({ label, selected = false, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected ? styles.selected : styles.unselected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {selected && <Ionicons name="checkmark" size={14} color={colors.primaryPressed} style={styles.check} />}
      <Text style={[textStyles.body, { fontFamily: typography.bodyMedium, color: selected ? colors.primaryPressed : colors.inkSoft }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.sm,
    gap: 4,
  },
  selected: {
    backgroundColor: colors.primarySoft,
    borderWidth: 0,
  },
  unselected: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.bgWash,
  },
  check: {
    marginRight: 2,
  },
});
