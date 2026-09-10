import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { TopAppBar, Button, Card, LogTag } from '../../../components';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { queueAction } from '../../../lib/db';
import { syncOfflineData } from '../../../lib/syncService';
import { useAuthStore } from '../../../store/authStore';
import { generateUUID } from '../../../lib/uuid';
import { supabase } from '../../../lib/supabase';

const QUALITY_OPTIONS = ['Poor', 'Fair', 'Good', 'Great'];

interface SleepLog {
  id: string;
  quality: string | null;
  logged_at: string;
  wake_time: string | null;
  bedtime: string | null;
}

export default function SleepScreen() {
  const user = useAuthStore((state) => state.user);
  const [hours, setHours] = useState('');
  const [quality, setQuality] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<SleepLog[]>([]);

  const loadHistory = useCallback(() => {
    if (!user) return;
    supabase
      .from('sleep_logs')
      .select('id, quality, logged_at, wake_time, bedtime')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: false })
      .limit(10)
      .then(({ data }) => setHistory(data ?? []));
  }, [user]);

  useFocusEffect(useCallback(() => { loadHistory(); }, [loadHistory]));

  const handleSave = async () => {
    if (!user || !hours) return;
    setLoading(true);
    const recordId = generateUUID();
    const wakeTime = new Date();
    const bedtime = new Date(wakeTime.getTime() - parseFloat(hours) * 3600000);
    const payload = {
      id: recordId,
      user_id: user.id,
      bedtime: bedtime.toISOString(),
      wake_time: wakeTime.toISOString(),
      quality: quality || null,
      logged_at: wakeTime.toISOString(),
    };
    try {
      await queueAction('sleep_logs', 'INSERT', recordId, payload);
      syncOfflineData();
      setHours('');
      setQuality('');
      loadHistory();
      Alert.alert('Saved', 'Sleep logged.');
    } catch (error) {
      console.error('Failed to save sleep log', error);
      Alert.alert('Error', 'Failed to save entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Sleep" />
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <Text style={[textStyles.bodyStrong, styles.label]}>Hours slept</Text>
          <TextInput style={styles.input} keyboardType="decimal-pad" placeholder="e.g. 7.5" value={hours} onChangeText={setHours} />
          <Text style={[textStyles.bodyStrong, styles.label]}>Sleep quality</Text>
          <View style={styles.tagRow}>
            {QUALITY_OPTIONS.map((q) => (
              <LogTag key={q} label={q} selected={quality === q} onPress={() => setQuality(q)} />
            ))}
          </View>
          <Button label={loading ? 'Saving...' : 'Log Sleep'} onPress={handleSave} disabled={!hours || loading} style={styles.saveButton} />
        </Card>

        {history.map((item) => (
          <Card key={item.id} style={styles.historyCard}>
            <Text style={[textStyles.bodyStrong, { color: colors.ink }]}>
              {item.bedtime && item.wake_time
                ? `${((new Date(item.wake_time).getTime() - new Date(item.bedtime).getTime()) / 3600000).toFixed(1)}h`
                : '—'}
              {item.quality ? ` · ${item.quality}` : ''}
            </Text>
            <Text style={[textStyles.caption, { color: colors.inkFaint }]}>{new Date(item.logged_at).toLocaleDateString()}</Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120 },
  label: { color: colors.ink, marginBottom: spacing.sm, marginTop: spacing.md },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  input: { borderWidth: 1, borderColor: colors.bgWash, borderRadius: 14, padding: spacing.md, fontFamily: 'Poppins_400Regular', fontSize: 16, backgroundColor: colors.surfaceAlt },
  saveButton: { marginTop: spacing.lg },
  historyCard: { marginTop: spacing.sm },
});
