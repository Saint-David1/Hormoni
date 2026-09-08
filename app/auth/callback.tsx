import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import * as Linking from 'expo-linking';
import { createSessionFromUrl } from '../../lib/supabase';
import { colors, typography, spacing } from '../../theme/tokens';

export default function AuthCallbackScreen() {
  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        createSessionFromUrl(url);
      }
    });
  }, []);

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
