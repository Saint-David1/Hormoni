import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Card, GlassCard, CycleTrackerCard, IconChip } from '../../../components';
import { useAuthStore } from '../../../store/authStore';
import { useHomeStats } from '../../../hooks/useHomeStats';
import { usePatternInsights } from '../../../hooks/usePatternInsights';
import { Ionicons } from '@expo/vector-icons';

const SYMPTOM_SCORE_LABELS: Record<string, string> = {
  none: 'Log a symptom',
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
};

const QUICK_LOG_ITEMS = [
  { icon: 'water-outline', label: 'Period', tint: 'period' as const, route: '/(tabs)/track/cycle' },
  { icon: 'flame-outline', label: 'Symptoms', tint: 'luteal' as const, route: '/(tabs)/track/symptoms' },
  { icon: 'happy-outline', label: 'Mood', tint: 'fertile' as const, route: '/(tabs)/track/mood' },
  { icon: 'fitness-outline', label: 'Weight', tint: 'ovulation' as const, route: '/(tabs)/track/weight' },
];

// Onboarding's profile-setup screen asks what a user wants out of the app —
// this is the one place that answer visibly changes anything, by floating
// the matching quick-log tile(s) to the front instead of a fixed order.
const GOAL_TO_QUICK_LOG_LABEL: Record<string, string> = {
  'Understand and track my cycle': 'Period',
  'Track period irregularities': 'Period',
  'Understand and track my symptoms': 'Symptoms',
  'Track my mood and wellbeing': 'Mood',
  'Manage my weight and lifestyle': 'Weight',
};

function orderQuickLogByGoals(goals: string[]) {
  const prioritized = new Set(goals.map((g) => GOAL_TO_QUICK_LOG_LABEL[g]).filter(Boolean));
  if (prioritized.size === 0) return QUICK_LOG_ITEMS;
  return [...QUICK_LOG_ITEMS].sort((a, b) => Number(prioritized.has(b.label)) - Number(prioritized.has(a.label)));
}

export default function DashboardScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const stats = useHomeStats();
  const { findings } = usePatternInsights();

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[textStyles.screenTitle, { color: colors.ink }]}>{greeting} 👋</Text>
          <Text style={[textStyles.body, { color: colors.inkSoft }]}>Here's your health overview for today.</Text>
        </View>

        <CycleTrackerCard
          hasCycles={stats.hasCycles}
          cycleDay={stats.cycleDay}
          predictedLength={stats.predictedLength}
          progress={stats.progress}
          phase={stats.phase.phase}
          confidence={stats.phase.confidence}
          onLogPress={() => router.push('/(tabs)/track/cycle')}
        />

        <Animated.View style={styles.grid} entering={FadeInDown.duration(300)}>
          <TouchableOpacity style={styles.gridCard} activeOpacity={0.8} onPress={() => router.push('/(tabs)/track/symptoms')}>
            <GlassCard>
              <IconChip tint="luteal" style={styles.gridIcon}>
                <Ionicons name="flame-outline" size={20} color={colors.phaseLuteal} />
              </IconChip>
              <Text style={[textStyles.caption, { color: colors.inkSoft }]}>Symptom Score</Text>
              <Text style={[textStyles.cardTitle, { color: colors.ink }]}>{SYMPTOM_SCORE_LABELS[stats.symptomScore]}</Text>
            </GlassCard>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} activeOpacity={0.8} onPress={() => router.push('/(tabs)/track/mood')}>
            <GlassCard>
              <IconChip tint="fertile" style={styles.gridIcon}>
                <Ionicons name="happy-outline" size={20} color={colors.phaseFertile} />
              </IconChip>
              <Text style={[textStyles.caption, { color: colors.inkSoft }]}>Mood</Text>
              <Text style={[textStyles.cardTitle, { color: colors.ink }]}>{stats.moodTrend.label}</Text>
            </GlassCard>
          </TouchableOpacity>
        </Animated.View>

        {findings.length > 0 && (
          <Animated.View entering={FadeInDown.delay(80).duration(300)}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/(tabs)/home/patterns' as any)}>
            <GlassCard style={styles.patternsCard}>
              <View style={styles.patternsHeader}>
                <IconChip tint="fertile">
                  <Ionicons name="analytics-outline" size={20} color={colors.phaseFertile} />
                </IconChip>
                <Text style={[textStyles.cardTitle, styles.patternsTitle]}>Patterns</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.inkFaint} />
              </View>
              <Text style={[textStyles.body, styles.patternsText]}>{findings[0].text}</Text>
              {findings.length > 1 && (
                <Text style={[textStyles.caption, styles.patternsMore]}>+{findings.length - 1} more pattern{findings.length > 2 ? 's' : ''}</Text>
              )}
            </GlassCard>
          </TouchableOpacity>
          </Animated.View>
        )}

        <Text style={[textStyles.cardTitle, styles.sectionTitle]}>Quick log</Text>
        <View style={styles.quickGrid}>
          {orderQuickLogByGoals(stats.goals).map((item, index) => (
            <Animated.View key={item.label} style={styles.quickCard} entering={FadeInDown.delay(index * 50).duration(300)}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => router.push(item.route as any)}>
                <Card style={styles.quickCardInner}>
                  <IconChip tint={item.tint} size={44}>
                    <Ionicons name={item.icon as any} size={22} color={colors.ink} />
                  </IconChip>
                  <Text style={[textStyles.body, { color: colors.ink, marginTop: spacing.sm }]}>{item.label}</Text>
                </Card>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120 },
  header: { marginBottom: spacing.lg },
  grid: { flexDirection: 'row', gap: spacing.md },
  gridCard: { flex: 1 },
  gridIcon: { marginBottom: spacing.sm },
  patternsCard: { marginTop: spacing.md },
  patternsHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  patternsTitle: { color: colors.ink, flex: 1 },
  patternsText: { color: colors.ink },
  patternsMore: { color: colors.inkSoft, marginTop: spacing.xs },
  sectionTitle: { marginTop: spacing.md, marginBottom: spacing.md, color: colors.ink },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  quickCard: { width: '47%' },
  quickCardInner: { alignItems: 'center', paddingVertical: spacing.lg },
});
