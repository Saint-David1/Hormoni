import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, textStyles } from '../theme/tokens';

interface TopAppBarProps {
  title?: string;
  showBack?: boolean;
  rightAccessory?: React.ReactNode;
  transparent?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ title, showBack = true, rightAccessory, transparent = false }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing.sm },
        transparent ? styles.transparent : styles.opaque,
      ]}
    >
      <View style={styles.side}>
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton} hitSlop={8}>
            <Ionicons name="chevron-back" size={24} color={colors.ink} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={[textStyles.screenTitle, styles.title]} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, styles.rightSide]}>{rightAccessory}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.sm,
  },
  opaque: {
    backgroundColor: colors.background,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  side: {
    width: 40,
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.ink,
  },
});
