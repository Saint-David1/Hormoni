import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, IconChip } from '../../components';
import { colors, spacing, textStyles } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

export default function FocusSummaryScreen() {
  const router = useRouter();
  const setOnboardingCompleted = useAuthStore((state) => state.setOnboardingCompleted);
  const setBiometricEnabled = useAuthStore((state) => state.setBiometricEnabled);
  const [hasHardware, setHasHardware] = useState(false);
  const [isPrompting, setIsPrompting] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setHasHardware(compatible);
    })();
  }, []);

  const handleComplete = async () => {
    if (hasHardware) {
      setIsPrompting(true);
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Enable Biometric Login',
        cancelLabel: 'Skip',
        disableDeviceFallback: false,
      });

      setBiometricEnabled(result.success);
      setIsPrompting(false);
    }

    await setOnboardingCompleted(true);
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <IconChip size={64} tint="fertile" style={styles.icon}>
          <Ionicons name="shield-checkmark-outline" size={30} color={colors.phaseFertile} />
        </IconChip>
        <Text style={[textStyles.screenTitle, styles.title]}>You're all set!</Text>
        <Text style={[textStyles.body, styles.subtitle]}>
          {hasHardware
            ? 'One last step — secure Hormoni with Face ID or Touch ID so only you can open it.'
            : "You're ready to start tracking with Hormoni."}
        </Text>

        <Card>
          <Text style={[textStyles.bodyStrong, { color: colors.ink }]}>Why we ask</Text>
          <Text style={[textStyles.body, styles.description]}>
            Your health data is private. A biometric lock keeps it safe even if someone else picks up your phone.
          </Text>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={isPrompting ? 'Setting up...' : hasHardware ? 'Enable & Continue' : 'Go to Dashboard'}
          onPress={handleComplete}
          disabled={isPrompting}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, alignItems: 'center' },
  icon: { marginBottom: spacing.lg, marginTop: spacing.xl },
  title: { color: colors.ink, marginBottom: spacing.xs, textAlign: 'center' },
  subtitle: { color: colors.inkSoft, marginBottom: spacing.xl, textAlign: 'center' },
  description: { color: colors.inkSoft, marginTop: spacing.xs, lineHeight: 20 },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surfaceAlt, width: '100%' },
});
