import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from 'expo-router/js-tabs';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, shadows, spacing, textStyles } from '../theme/tokens';

type IoniconName = keyof typeof Ionicons.glyphMap;

// Routes registered in app/(tabs)/_layout.tsx that must stay reachable via
// router.push (so their screens exist in the navigator) but shouldn't get a
// tab button — e.g. guidance, kept as a secondary link from Home/Profile.
const HIDDEN_ROUTES = new Set(['guidance']);

const ICONS: Record<string, { active: IoniconName; inactive: IoniconName }> = {
  home: { active: 'home', inactive: 'home-outline' },
  track: { active: 'water', inactive: 'water-outline' },
  lifestyle: { active: 'leaf', inactive: 'leaf-outline' },
  learn: { active: 'heart', inactive: 'heart-outline' },
  guidance: { active: 'chatbubbles', inactive: 'chatbubbles-outline' },
  profile: { active: 'person', inactive: 'person-outline' },
};

function TabButton({ focused, label, iconKey, onPress }: { focused: boolean; label: string; iconKey: string; onPress: () => void }) {
  const icons = ICONS[iconKey] ?? ICONS.home;

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(focused ? 1 : 0, { damping: 14, stiffness: 180 }) }],
    opacity: withSpring(focused ? 1 : 0, { damping: 14, stiffness: 180 }),
  }));

  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconWrap}>
        <Animated.View style={[styles.activeCircle, circleStyle]} />
        <Ionicons
          name={focused ? icons.active : icons.inactive}
          size={22}
          color={focused ? colors.onBrand : colors.inkFaint}
          style={styles.icon}
        />
      </View>
      <Text
        style={[textStyles.navLabel, { color: focused ? colors.primary : colors.inkFaint }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { bottom: insets.bottom + spacing.sm }]}>
      {state.routes.map((route, index) => {
        if (HIDDEN_ROUTES.has(route.name)) return null;

        const { options } = descriptors[route.key];
        const label = (options.title ?? route.name) as string;
        const focused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabButton key={route.key} focused={focused} label={label} iconKey={route.name} onPress={onPress} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceAlt,
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    ...shadows.nav,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  iconWrap: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  icon: {
    zIndex: 1,
  },
});
