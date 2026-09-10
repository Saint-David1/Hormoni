import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Button, Card, Callout, LogTag, TopAppBar } from '../../../components';
import { queueAction } from '../../../lib/db';
import { syncOfflineData } from '../../../lib/syncService';
import { useAuthStore } from '../../../store/authStore';
import { generateUUID } from '../../../lib/uuid';
import { toLocalDateKey } from '../../../lib/date';

export default function CycleTrackerScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState(false);
  const [flow, setFlow] = useState<string>('');

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    const recordId = generateUUID();
    const today = toLocalDateKey(new Date());

    const payload = {
      id: recordId,
      user_id: user.id,
      start_date: today,
      end_date: null,
      flow,
    };

    try {
      await queueAction('cycles', 'INSERT', recordId, payload);
      syncOfflineData();
      Alert.alert('Saved', 'Cycle entry saved successfully.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Failed to save entry', error);
      Alert.alert('Error', 'Failed to save entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Log Cycle" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.body, styles.subtitle]}>Track your period start date and flow.</Text>

        <Callout variant="info" message="Today will be logged as the start date of your period." />

        <Card style={styles.card}>
          <Text style={[textStyles.bodyStrong, styles.label]}>How is your flow today?</Text>
          <View style={styles.buttonRow}>
            {['Light', 'Medium', 'Heavy', 'Spotting'].map(f => (
              <LogTag key={f} label={f} selected={flow === f} onPress={() => setFlow(f)} />
            ))}
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button label={loading ? 'Saving...' : 'Save Entry'} onPress={handleSave} disabled={!flow || loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  subtitle: { color: colors.inkSoft, marginBottom: spacing.xl },
  card: { padding: spacing.xl },
  label: { color: colors.ink, marginBottom: spacing.md },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surfaceAlt },
});
