import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button, Card, Pill } from '../../components';
import { colors, typography, spacing } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

export default function FocusSummaryScreen() {
  const router = useRouter();
  const setOnboardingCompleted = useAuthStore(state => state.setOnboardingCompleted);
  const setBiometricEnabled = useAuthStore(state => state.setBiometricEnabled);
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
      
      if (result.success) {
        setBiometricEnabled(true);
      } else {
        setBiometricEnabled(false);
      }
      setIsPrompting(false);
    }
    
    await setOnboardingCompleted(true);
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>You're all set!</Text>
        <Text style={styles.subtitle}>Here is a summary of your focus based on your answers.</Text>

        <Card style={styles.card}>
          <View style={styles.headerRow}>
             <Text style={styles.sectionTitle}>Symptom Tracking</Text>
             <Pill label="High Priority" variant="data" />
          </View>
          <Text style={styles.description}>
            We've set up your dashboard to prioritize cycle and symptom logging.
          </Text>
        </Card>

        <Card style={styles.card}>
          <View style={styles.headerRow}>
             <Text style={styles.sectionTitle}>Education</Text>
             <Pill label="Recommended" variant="primary" />
          </View>
          <Text style={styles.description}>
            We have curated some articles about hormonal health and cycle regularity for you.
          </Text>
        </Card>
        
      </ScrollView>

      <View style={styles.footer}>
        <Button label={isPrompting ? "Setting up..." : "Go to Dashboard"} onPress={handleComplete} disabled={isPrompting} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink, marginBottom: spacing.xs },
  subtitle: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, marginBottom: spacing.xl },
  card: { padding: spacing.xl, marginBottom: spacing.lg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  sectionTitle: { fontFamily: typography.body, fontSize: 18, fontWeight: '600', color: colors.ink },
  description: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft, lineHeight: 20 },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
});
