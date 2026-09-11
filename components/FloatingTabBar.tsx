import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from 'expo-router/js-tabs';
import { BlurView } from 'expo-blur';
import Animated, { useAnimatedStyle, withSpring, FadeInDown, FadeOutDown } from 'react-native-reanimated';
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

  // Each tab (track, lifestyle, learn, profile) is its own Stack navigator, so
  // pushing a detail/form screen (e.g. Log Cycle, an article, Reminders) keeps
  // this floating pill mounted on top of it by default — it's an absolute
  // overlay, not part of that screen's layout flow, so it can cover a footer
  // button rather than making room for it. Hiding the bar whenever the
  // focused tab is deeper than its own root screen fixes that for every
  // current and future nested screen at once, instead of patching bottom
  // padding into each one individually.
  const focusedRoute = state.routes[state.index];
  const nestedState = focusedRoute.state as { index: number; routes: { name: string }[] } | undefined;
  // Each tab's stack always registers its landing screen as "index" (see the
  // Stack.Screen lists in app/(tabs)/*/_layout.tsx). Navigating straight to a
  // deep link (e.g. router.push to track/cycle) creates a nested state whose
  // `routes` array holds only the visited screen, so `index` is 0 there too —
  // checking the active route's name, not its position, is what actually
  // tells root from pushed.
  const nestedRouteName = nestedState?.routes[nestedState.index]?.name;
  const onNestedScreen = !!nestedState && nestedRouteName !== 'index';

  if (onNestedScreen) return null;

  return (
    <Animated.View
      entering={FadeInDown.duration(200)}
      exiting={FadeOutDown.duration(150)}
      style={[styles.shadowWrap, { bottom: insets.bottom + spacing.sm }]}
    >
      <View style={styles.container}>
        <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, styles.tint]} />
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Shadow and clipping fight each other on the same view (overflow: 'hidden'
  // needed for the blur's rounded corners would also clip the shadow), so the
  // shadow lives on this outer, unclipped wrapper and the blur + its rounding
  // live on the inner `container` below.
  shadowWrap: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    borderRadius: radii.full,
    ...shadows.nav,
  },
  container: {
    borderRadius: radii.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  tint: {
    backgroundColor: colors.glassFill,
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
