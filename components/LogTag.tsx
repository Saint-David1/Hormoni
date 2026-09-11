import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import { colors, radii, spacing, textStyles, typography } from '../theme/tokens';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface LogTagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export const LogTag: React.FC<LogTagProps> = ({ label, selected = false, onPress }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (selected) {
      scale.value = withSequence(withSpring(1.08, { damping: 10, stiffness: 300 }), withSpring(1, { damping: 12, stiffness: 220 }));
    }
  }, [selected]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedTouchable
      style={[styles.container, selected ? styles.selected : styles.unselected, animatedStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {selected && <Ionicons name="checkmark" size={14} color={colors.primaryPressed} style={styles.check} />}
      <Text style={[textStyles.body, { fontFamily: typography.bodyMedium, color: selected ? colors.primaryPressed : colors.inkSoft }]}>
        {label}
      </Text>
    </AnimatedTouchable>
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
