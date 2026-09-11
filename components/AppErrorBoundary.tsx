import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from './Button';
import { colors, spacing, typography } from '../theme/tokens';

// expo-router renders this in place of any screen that throws during render —
// the only crash UI a remote tester (TestFlight/APK, no dev tools attached)
// ever sees, so it must never show a raw stack trace or the default black
// debug screen. Signature (`error`, `retry`) is fixed by expo-router's contract.
export function AppErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😕</Text>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.subtitle}>
          We hit an unexpected error. Your data is safe — try again, and if it keeps happening, restart the app.
        </Text>
        {__DEV__ && <Text style={styles.devError}>{error.message}</Text>}
        <Button label="Try Again" onPress={retry} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: typography.display,
    fontSize: 24,
    color: colors.ink,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.inkSoft,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  devError: {
    fontFamily: typography.mono,
    fontSize: 12,
    color: colors.errorMuted,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    minWidth: 180,
  },
});
