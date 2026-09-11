import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MonthCalendar, Card, GlassCard, IconChip } from '../../../components';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';
import { computePredictedLength } from '../../../lib/insights';
import { toLocalDateKey as toDateKey } from '../../../lib/date';

const QUICK_ACTIONS = [
  { icon: 'water-outline', label: 'Period', tint: 'period' as const, route: '/(tabs)/track/cycle' },
  { icon: 'flame-outline', label: 'Symptoms', tint: 'luteal' as const, route: '/(tabs)/track/symptoms' },
  { icon: 'happy-outline', label: 'Mood', tint: 'fertile' as const, route: '/(tabs)/track/mood' },
  { icon: 'fitness-outline', label: 'Weight', tint: 'ovulation' as const, route: '/(tabs)/track/weight' },
  { icon: 'book-outline', label: 'Journal', tint: 'primary' as const, route: '/(tabs)/track/journal' },
];

export default function TrackScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [month, setMonth] = useState(new Date());
  const [periodDays, setPeriodDays] = useState<Set<string>>(new Set());
  const [predictedDays, setPredictedDays] = useState<Set<string>>(new Set());
  const [markedDays, setMarkedDays] = useState<Set<string>>(new Set());
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

  const load = useCallback(async () => {
    if (!user) return;

    const { data: cycles } = await supabase
      .from('cycles')
      .select('start_date, end_date')
      .eq('user_id', user.id)
      .order('start_date', { ascending: false });

    const period = new Set<string>();
    (cycles ?? []).forEach((cycle) => {
      const start = new Date(cycle.start_date);
      const end = cycle.end_date ? new Date(cycle.end_date) : new Date(start.getTime() + 4 * 86400000);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        period.add(toDateKey(d));
      }
    });
    setPeriodDays(period);

    const predicted = new Set<string>();
    if (cycles && cycles.length > 0) {
      const { length } = computePredictedLength(cycles);
      const lastStart = new Date(cycles[0].start_date);
      const nextStart = new Date(lastStart.getTime() + length * 86400000);
      for (let i = 0; i < 5; i++) {
        predicted.add(toDateKey(new Date(nextStart.getTime() + i * 86400000)));
      }
    }
    setPredictedDays(predicted);

    const [{ data: symptoms }, { data: moods }] = await Promise.all([
      supabase.from('symptom_logs').select('logged_at').eq('user_id', user.id),
      supabase.from('mood_checkins').select('logged_at').eq('user_id', user.id),
    ]);
    const marks = new Set<string>();
    (symptoms ?? []).forEach((s) => marks.add(toDateKey(new Date(s.logged_at))));
    (moods ?? []).forEach((m) => marks.add(toDateKey(new Date(m.logged_at))));
    setMarkedDays(marks);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.screenTitle, styles.title]}>Track</Text>
        <Text style={[textStyles.body, styles.subtitle]}>Tap a date to see or log that day's records.</Text>

        <GlassCard>
          <MonthCalendar
            month={month}
            onMonthChange={setMonth}
            periodDays={periodDays}
            predictedDays={predictedDays}
            markedDays={markedDays}
            selectedDate={selectedDate}
            onSelectDate={(dateKey) => {
              setSelectedDate(dateKey);
              setSheetVisible(true);
            }}
          />
        </GlassCard>

        <TouchableOpacity onPress={() => router.push('/(tabs)/track/timeline')}>
          <Card style={styles.timelineLink}>
            <View style={styles.timelineRow}>
              <Ionicons name="list-outline" size={20} color={colors.ink} />
              <Text style={[textStyles.bodyStrong, { color: colors.ink }]}>Symptom Timeline</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.inkFaint} style={styles.chevron} />
            </View>
          </Card>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={sheetVisible} transparent animationType="fade" onRequestClose={() => setSheetVisible(false)}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setSheetVisible(false)}>
          <View style={styles.sheet}>
            <Text style={[textStyles.cardTitle, styles.sheetTitle]}>Log for {selectedDate}</Text>
            <View style={styles.sheetGrid}>
              {QUICK_ACTIONS.map((action, index) => (
                <Animated.View key={action.label} entering={FadeInDown.delay(index * 40).duration(250)}>
                  <TouchableOpacity
                    style={styles.sheetItem}
                    onPress={() => {
                      setSheetVisible(false);
                      router.push(action.route as any);
                    }}
                  >
                    <IconChip tint={action.tint} size={44}>
                      <Ionicons name={action.icon as any} size={22} color={colors.ink} />
                    </IconChip>
                    <Text style={[textStyles.caption, { color: colors.ink, marginTop: spacing.xs }]}>{action.label}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120 },
  title: { color: colors.ink, marginBottom: spacing.xs },
  subtitle: { color: colors.inkSoft, marginBottom: spacing.lg },
  timelineLink: { marginTop: spacing.sm },
  timelineRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  chevron: { marginLeft: 'auto' },
  backdrop: { flex: 1, backgroundColor: 'rgba(36,27,30,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.surfaceAlt, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: spacing.xl },
  sheetTitle: { color: colors.ink, marginBottom: spacing.lg, textAlign: 'center' },
  sheetGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: spacing.md },
  sheetItem: { alignItems: 'center', width: 70 },
});
