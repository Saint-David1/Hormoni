import React, { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from './Button';
import { colors, typography, spacing } from '../theme/tokens';
import { useAuthStore } from '../store/authStore';

// Re-locks the app behind Face ID / Touch ID whenever the user has the
// "Biometric App Lock" setting on. Without this, that setting only ever
// prompted once during onboarding and never actually protected anything.
export function AppLockGate({ children }: { children: React.ReactNode }) {
  const session = useAuthStore((state) => state.session);
  const biometricEnabled = useAuthStore((state) => state.biometricEnabled);
  const setBiometricEnabled = useAuthStore((state) => state.setBiometricEnabled);
  const shouldLock = !!session && biometricEnabled;

  const [isLocked, setIsLocked] = useState(shouldLock);
  const [isPrompting, setIsPrompting] = useState(false);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    setIsLocked(shouldLock);
  }, [shouldLock]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (next) => {
      const cameFromBackground = /inactive|background/.test(appState.current) && next === 'active';
      if (cameFromBackground && shouldLock) {
        setIsLocked(true);
      }
      appState.current = next;
    });
    return () => subscription.remove();
  }, [shouldLock]);

  const unlock = async () => {
    if (isPrompting) return;
    setIsPrompting(true);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = hasHardware && (await LocalAuthentication.isEnrolledAsync());
      if (!hasHardware || !isEnrolled) {
        // The device can no longer authenticate (e.g. biometrics were removed in
        // Settings) — don't permanently lock the user out of their own data.
        await setBiometricEnabled(false);
        setIsLocked(false);
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Unlock Hornomi',
        disableDeviceFallback: false,
      });
      if (result.success) {
        setIsLocked(false);
      }
    } finally {
      setIsPrompting(false);
    }
  };

  useEffect(() => {
    if (isLocked) {
      unlock();
    }
    // Only re-run when a fresh lock occurs, not on every isPrompting change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocked]);

  if (!isLocked) return <>{children}</>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hornomi is Locked</Text>
        <Text style={styles.subtitle}>Unlock with Face ID or Touch ID to view your health data.</Text>
        <Button label={isPrompting ? 'Unlocking...' : 'Unlock'} onPress={unlock} disabled={isPrompting} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 28, color: colors.ink, marginBottom: spacing.sm, textAlign: 'center' },
  subtitle: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, textAlign: 'center', marginBottom: spacing.xl },
  button: { width: '100%' },
});
