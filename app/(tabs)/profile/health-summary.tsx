import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { TopAppBar, Button, Card, LogTag } from '../../../components';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { useAuthStore } from '../../../store/authStore';
import { buildHealthSummary, HealthSummary } from '../../../lib/healthSummary';

const FIELDS: { key: keyof HealthSummary; label: string }[] = [
  { key: 'periodCount', label: 'Cycle' },
  { key: 'symptomCount', label: 'Symptoms' },
  { key: 'moodCount', label: 'Mood' },
  { key: 'exerciseCount', label: 'Exercise' },
  { key: 'averageSleepHours', label: 'Sleep' },
  { key: 'latestWeight', label: 'Weight' },
];

export default function HealthSummaryScreen() {
  const user = useAuthStore((state) => state.user);
  const [summary, setSummary] = useState<HealthSummary | null>(null);
  const [selected, setSelected] = useState<string[]>(['periodCount', 'symptomCount', 'moodCount']);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (!user) return;
    buildHealthSummary(user.id).then(setSummary);
  }, [user]);

  const toggle = (key: string) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const handleShare = async () => {
    if (!summary || !user) return;
    setSharing(true);
    try {
      const filtered: Record<string, unknown> = {};
      selected.forEach((key) => { filtered[key] = summary[key as keyof HealthSummary]; });

      const fileUri = `${FileSystem.documentDirectory}hormoni_health_summary_${Date.now()}.json`;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify({ user_id: user.id, generated_at: new Date().toISOString(), summary: filtered }, null, 2));

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, { mimeType: 'application/json', dialogTitle: 'Share Health Summary' });
      } else {
        Alert.alert('Sharing unavailable', 'File sharing is not available on this device.');
      }
    } finally {
      setSharing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Health Summary" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.body, styles.subtitle]}>Your last 30 days at a glance.</Text>

        {summary && FIELDS.map(({ key, label }) => {
          const value = summary[key];
          const display = value === null ? 'No data' : key === 'averageSleepHours' ? `${(value as number).toFixed(1)}h avg` : String(value);
          return (
            <Card key={key}>
              <Text style={[textStyles.bodyStrong, { color: colors.ink }]}>{label}</Text>
              <Text style={[textStyles.body, { color: colors.inkSoft }]}>{display}</Text>
            </Card>
          );
        })}

        <Text style={[textStyles.cardTitle, styles.sectionTitle]}>What would you like to share?</Text>
        <View style={styles.tagRow}>
          {FIELDS.map(({ key, label }) => (
            <LogTag key={key} label={label} selected={selected.includes(key)} onPress={() => toggle(key)} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label={sharing ? 'Preparing...' : 'Share Summary'} onPress={handleShare} disabled={sharing || selected.length === 0} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120 },
  subtitle: { color: colors.inkSoft, marginBottom: spacing.md },
  sectionTitle: { color: colors.ink, marginTop: spacing.lg, marginBottom: spacing.md },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surfaceAlt },
});
