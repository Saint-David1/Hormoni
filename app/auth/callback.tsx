import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { colors, typography, spacing } from '../../theme/tokens';

// The deep link that lands here is already consumed once, globally, by the
// listener in app/_layout.tsx (which flips the auth store's session and lets
// the root navigator redirect away from this screen). Re-parsing the same URL
// here would try to exchange the same single-use PKCE code a second time.
export default function AuthCallbackScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.text}>Verifying your sign in...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  text: {
    marginTop: spacing.md,
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.inkSoft,
  },
});
