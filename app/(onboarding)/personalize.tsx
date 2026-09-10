import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from '../../components';
import { colors, spacing, textStyles } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

export default function PersonalizeScreen() {
  const router = useRouter();
  const goals = useAuthStore((state) => state.onboardingGoals);
  const focusAreas = useAuthStore((state) => state.onboardingFocusAreas);

  const planItems = Array.from(new Set([...goals, ...focusAreas]));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.screenTitle, styles.title]}>Your Hornomi plan</Text>
        <Text style={[textStyles.body, styles.subtitle]}>
          We've set up your experience around what matters most to you.
        </Text>

        <Card tint="fertile" hero>
          {planItems.length === 0 ? (
            <Text style={[textStyles.body, { color: colors.inkSoft }]}>
              We'll personalize things as you start tracking.
            </Text>
          ) : (
            planItems.map((item) => (
              <View key={item} style={styles.planRow}>
                <Ionicons name="checkmark-circle" size={20} color={colors.phaseFertile} />
                <Text style={[textStyles.body, styles.planText]}>{item}</Text>
              </View>
            ))
          )}
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Continue to Hormoni" onPress={() => router.push('/(onboarding)/focus-summary')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  title: { color: colors.ink, marginBottom: spacing.xs },
  subtitle: { color: colors.inkSoft, marginBottom: spacing.xl },
  planRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  planText: { color: colors.ink, flex: 1 },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surfaceAlt },
});
