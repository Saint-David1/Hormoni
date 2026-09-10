import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Card, CycleTrackerCard, IconChip } from '../../../components';
import { useAuthStore } from '../../../store/authStore';
import { useHomeStats } from '../../../hooks/useHomeStats';
import { Ionicons } from '@expo/vector-icons';

const SYMPTOM_SCORE_LABELS: Record<string, string> = {
  none: 'Log a symptom',
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
};

export default function DashboardScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const stats = useHomeStats();

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

        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridCard} activeOpacity={0.8} onPress={() => router.push('/(tabs)/track/symptoms')}>
            <Card>
              <IconChip tint="luteal" style={styles.gridIcon}>
                <Ionicons name="flame-outline" size={20} color={colors.phaseLuteal} />
              </IconChip>
              <Text style={[textStyles.caption, { color: colors.inkSoft }]}>Symptom Score</Text>
              <Text style={[textStyles.cardTitle, { color: colors.ink }]}>{SYMPTOM_SCORE_LABELS[stats.symptomScore]}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} activeOpacity={0.8} onPress={() => router.push('/(tabs)/track/mood')}>
            <Card>
              <IconChip tint="fertile" style={styles.gridIcon}>
                <Ionicons name="happy-outline" size={20} color={colors.phaseFertile} />
              </IconChip>
              <Text style={[textStyles.caption, { color: colors.inkSoft }]}>Mood</Text>
              <Text style={[textStyles.cardTitle, { color: colors.ink }]}>{stats.moodTrend.label}</Text>
            </Card>
          </TouchableOpacity>
        </View>

        <Text style={[textStyles.cardTitle, styles.sectionTitle]}>Quick log</Text>
        <View style={styles.quickGrid}>
          {[
            { icon: 'water-outline', label: 'Period', tint: 'period' as const, route: '/(tabs)/track/cycle' },
            { icon: 'flame-outline', label: 'Symptoms', tint: 'luteal' as const, route: '/(tabs)/track/symptoms' },
            { icon: 'happy-outline', label: 'Mood', tint: 'fertile' as const, route: '/(tabs)/track/mood' },
            { icon: 'fitness-outline', label: 'Weight', tint: 'ovulation' as const, route: '/(tabs)/track/weight' },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.quickCard} activeOpacity={0.8} onPress={() => router.push(item.route as any)}>
              <Card style={styles.quickCardInner}>
                <IconChip tint={item.tint} size={44}>
                  <Ionicons name={item.icon as any} size={22} color={colors.ink} />
                </IconChip>
                <Text style={[textStyles.body, { color: colors.ink, marginTop: spacing.sm }]}>{item.label}</Text>
              </Card>
            </TouchableOpacity>
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
  sectionTitle: { marginTop: spacing.md, marginBottom: spacing.md, color: colors.ink },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  quickCard: { width: '47%' },
  quickCardInner: { alignItems: 'center', paddingVertical: spacing.lg },
});
