import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Card, TopAppBar, IconChip } from '../../../components';
import { usePatternInsights } from '../../../hooks/usePatternInsights';

export default function PatternsScreen() {
  const { findings, loading } = usePatternInsights();

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Patterns" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.body, styles.subtitle]}>
          Findings from cross-referencing your logged sleep, exercise, and hydration against your symptoms and mood
          over the last 60 days. We only show a pattern once there's enough data on both sides to say something real.
        </Text>

        {!loading && findings.length === 0 && (
          <Card>
            <Text style={[textStyles.bodyStrong, { color: colors.ink }]}>Not enough data yet</Text>
            <Text style={[textStyles.body, styles.emptyText]}>
              Keep logging your symptoms, mood, sleep, exercise, and hydration — patterns will show up here once
              there's enough history to compare.
            </Text>
          </Card>
        )}

        {findings.map((finding) => (
          <Card key={finding.id} style={styles.findingCard}>
            <IconChip tint="fertile" style={styles.icon}>
              <Ionicons name="analytics-outline" size={20} color={colors.phaseFertile} />
            </IconChip>
            <Text style={[textStyles.body, styles.findingText]}>{finding.text}</Text>
            <Text style={[textStyles.caption, styles.sampleSize]}>Based on {finding.sampleSize} days of logs</Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120, gap: spacing.md },
  subtitle: { color: colors.inkSoft },
  emptyText: { color: colors.inkSoft, marginTop: spacing.xs },
  findingCard: {},
  icon: { marginBottom: spacing.sm },
  findingText: { color: colors.ink, marginBottom: spacing.xs },
  sampleSize: { color: colors.inkFaint },
});
