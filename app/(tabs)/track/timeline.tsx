import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { TopAppBar, Card, Pill } from '../../../components';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';

interface SymptomLog {
  id: string;
  symptom_type: string;
  severity: number;
  logged_at: string;
}

interface TimelineEntry extends SymptomLog {
  durationDays: number;
}

const SEVERITY_LABELS: Record<number, string> = { 1: 'Very mild', 2: 'Mild', 3: 'Moderate', 4: 'Severe', 5: 'Very severe' };

function buildTimeline(logs: SymptomLog[]): TimelineEntry[] {
  const sorted = [...logs].sort((a, b) => new Date(b.logged_at).getTime() - new Date(a.logged_at).getTime());
  return sorted.map((log, index) => {
    const nextDifferent = sorted.slice(index + 1).find((l) => l.symptom_type === log.symptom_type);
    const durationDays = nextDifferent
      ? Math.max(1, Math.round((new Date(log.logged_at).getTime() - new Date(nextDifferent.logged_at).getTime()) / 86400000))
      : 1;
    return { ...log, durationDays };
  });
}

export default function SymptomTimelineScreen() {
  const user = useAuthStore((state) => state.user);
  const [entries, setEntries] = useState<TimelineEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      supabase
        .from('symptom_logs')
        .select('id, symptom_type, severity, logged_at')
        .eq('user_id', user.id)
        .order('logged_at', { ascending: false })
        .then(({ data }) => setEntries(buildTimeline(data ?? [])));
    }, [user])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Symptom Timeline" />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <Text style={[textStyles.body, styles.empty]}>No symptoms logged yet.</Text>
        }
        renderItem={({ item }) => (
          <Card>
            <View style={styles.row}>
              <Text style={[textStyles.bodyStrong, { color: colors.ink }]}>{item.symptom_type}</Text>
              <Pill variant="phase" label={SEVERITY_LABELS[item.severity] ?? `Level ${item.severity}`} />
            </View>
            <Text style={[textStyles.caption, styles.meta]}>
              Started {new Date(item.logged_at).toLocaleDateString()} · {item.durationDays} day{item.durationDays > 1 ? 's' : ''}
            </Text>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs },
  meta: { color: colors.inkFaint },
  empty: { color: colors.inkSoft, textAlign: 'center', marginTop: spacing.xl },
});
