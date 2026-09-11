import React, { useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import { colors, radii, spacing, textStyles } from '../theme/tokens';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const Chip: React.FC<ChipProps> = ({ label, selected = false, onPress, icon }) => {
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
      {icon && <Ionicons name={icon} size={14} color={selected ? colors.onBrand : colors.inkSoft} style={styles.icon} />}
      {!icon && <View style={[styles.dot, { backgroundColor: selected ? colors.onBrand : colors.primary }]} />}
      <Text style={[textStyles.caption, { color: selected ? colors.onBrand : colors.inkSoft }]}>{label}</Text>
    </AnimatedTouchable>
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
