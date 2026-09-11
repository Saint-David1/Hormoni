import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Button, Card, Callout, TopAppBar } from '../../../components';
import { useAuthStore } from '../../../store/authStore';
import { supabase } from '../../../lib/supabase';
import { SyncTable } from '../../../lib/db';

const EXPORT_TABLES: SyncTable[] = [
  'cycles',
  'symptom_logs',
  'weight_logs',
  'mood_checkins',
  'journal_entries',
  'exercise_logs',
  'sleep_logs',
  'hydration_logs',
  'habit_completions',
];

export default function ExportDataScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const results = await Promise.all(
        EXPORT_TABLES.map((table) => supabase.from(table).select('*').eq('user_id', user.id))
      );

      const data = Object.fromEntries(
        EXPORT_TABLES.map((table, i) => [table, results[i].data ?? []])
      );

      const exportObject = {
        user_id: user.id,
        email: user.email,
        export_date: new Date().toISOString(),
        data,
      };

      const fileUri = `${FileSystem.documentDirectory}hornomi_export_${Date.now()}.json`;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(exportObject, null, 2), {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Export Hornomi Data',
        });
      } else {
        Alert.alert('Sharing Unavailable', 'File sharing is not available on this device.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Export Failed', 'There was a problem exporting your data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Export Data" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.body, styles.subtitle]}>Download a copy of your personal health data.</Text>

        <Callout
          variant="info"
          message="Your data will be exported as a standard JSON file. You can save this to your files, email it to yourself, or share it with your healthcare provider."
        />

        <Card style={styles.card}>
          <Text style={[textStyles.body, styles.cardText]}>
            This export contains all your logged cycles, symptoms, weight entries, and mood check-ins. It is formatted in a structured way that is easy to parse.
          </Text>
          <Button
            label={loading ? 'Generating...' : 'Export to JSON'}
            onPress={handleExport}
            disabled={loading}
          />
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  subtitle: { color: colors.inkSoft, marginBottom: spacing.xl },
  card: { padding: spacing.xl, marginTop: spacing.md },
  cardText: { color: colors.inkSoft, lineHeight: 24, marginBottom: spacing.xl },
});
