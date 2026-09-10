import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, IconChip } from '../../components';
import { colors, textStyles, spacing } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

const STEPS = [
  {
    emoji: '👋',
    title: 'Your PCOS journey is personal.',
    subtitle: 'Hornomi helps you track your cycle, symptoms, and lifestyle, and understand the patterns that matter to you.',
    cta: 'Get Started',
  },
  {
    emoji: '💛',
    title: 'Managing PCOS can feel like a lot.',
    subtitle: "It's normal for it to feel confusing, stressful, or overwhelming sometimes. Hormoni is here to make tracking it a little easier.",
    cta: 'Continue',
  },
];

export default function IntroScreen() {
  const router = useRouter();
  const setHasSeenIntro = useAuthStore((state) => state.setHasSeenIntro);
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setHasSeenIntro(true);
      router.replace('/auth/login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <IconChip size={64}>
            <Text style={{ fontSize: 32 }}>{current.emoji}</Text>
          </IconChip>
          <Text style={[textStyles.screenTitle, styles.title]}>{current.title}</Text>
          <Text style={[textStyles.body, styles.subtitle]}>{current.subtitle}</Text>
        </View>

        <View style={styles.footer}>
          <Button label={current.cta} onPress={handleNext} style={styles.button} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.xl, justifyContent: 'space-between' },
  header: { marginTop: spacing.xxl, alignItems: 'center' },
  title: { color: colors.ink, marginTop: spacing.lg, marginBottom: spacing.xs, textAlign: 'center' },
  subtitle: { color: colors.inkSoft, textAlign: 'center', lineHeight: 24 },
  button: { width: '100%', marginBottom: spacing.md },
  footer: { paddingBottom: spacing.xl },
});
