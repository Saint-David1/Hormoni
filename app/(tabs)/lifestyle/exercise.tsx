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

const ACTIVITIES = ['Walking', 'Yoga', 'Strength training', 'Cycling', 'Swimming', 'Dancing', 'Other'];

interface ExerciseLog {
  id: string;
  activity: string;
  duration_minutes: number | null;
  logged_at: string;
}

export default function ExerciseScreen() {
  const user = useAuthStore((state) => state.user);
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ExerciseLog[]>([]);

  const loadHistory = useCallback(() => {
    if (!user) return;
    supabase
      .from('exercise_logs')
      .select('id, activity, duration_minutes, logged_at')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: false })
      .limit(10)
      .then(({ data }) => setHistory(data ?? []));
  }, [user]);

  useFocusEffect(useCallback(() => { loadHistory(); }, [loadHistory]));

  const handleSave = async () => {
    if (!user || !activity) return;
    setLoading(true);
    const recordId = generateUUID();
    const payload = {
      id: recordId,
      user_id: user.id,
      activity,
      duration_minutes: parseInt(duration, 10) || null,
      logged_at: new Date().toISOString(),
    };
    try {
      await queueAction('exercise_logs', 'INSERT', recordId, payload);
      syncOfflineData();
      setActivity('');
      setDuration('');
      loadHistory();
      Alert.alert('Saved', 'Activity logged.');
    } catch (error) {
      console.error('Failed to save exercise log', error);
      Alert.alert('Error', 'Failed to save entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Exercise" />
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <Text style={[textStyles.bodyStrong, styles.label]}>Activity</Text>
          <View style={styles.tagRow}>
            {ACTIVITIES.map((a) => (
              <LogTag key={a} label={a} selected={activity === a} onPress={() => setActivity(a)} />
            ))}
          </View>
          <Text style={[textStyles.bodyStrong, styles.label]}>Duration (minutes)</Text>
          <TextInput style={styles.input} keyboardType="number-pad" placeholder="e.g. 30" value={duration} onChangeText={setDuration} />
          <Button label={loading ? 'Saving...' : 'Log Activity'} onPress={handleSave} disabled={!activity || loading} style={styles.saveButton} />
        </Card>

        {history.map((item) => (
          <Card key={item.id} style={styles.historyCard}>
            <Text style={[textStyles.bodyStrong, { color: colors.ink }]}>{item.activity}</Text>
            <Text style={[textStyles.caption, { color: colors.inkFaint }]}>
              {item.duration_minutes ? `${item.duration_minutes} min · ` : ''}{new Date(item.logged_at).toLocaleDateString()}
            </Text>
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
