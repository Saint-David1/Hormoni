import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing } from '../../../theme/tokens';
import { Button, Card } from '../../../components';
import { queueAction } from '../../../lib/db';
import { useAuthStore } from '../../../store/authStore';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const MOODS = [
  { level: 1, emoji: '😫', label: 'Terrible' },
  { level: 2, emoji: '🙁', label: 'Bad' },
  { level: 3, emoji: '😐', label: 'Okay' },
  { level: 4, emoji: '🙂', label: 'Good' },
  { level: 5, emoji: '😁', label: 'Great' },
];

export default function MoodTrackerScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState(false);
  const [moodLevel, setMoodLevel] = useState<number>(0);
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    if (!user || !moodLevel) return;
    setLoading(true);

    const recordId = generateUUID();
    const today = new Date().toISOString().split('T')[0];

    const payload = {
      id: recordId,
      user_id: user.id,
      date: today,
      mood_score: moodLevel,
      notes: notes.trim() || null,
      created_at: new Date().toISOString(),
    };

    try {
      await queueAction('mood_checkins', 'INSERT', recordId, payload);
      Alert.alert('Saved', 'Mood logged successfully.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Log Mood</Text>
        <Text style={styles.subtitle}>How are you feeling today?</Text>

        <Card style={styles.card}>
          <View style={styles.moodRow}>
            {MOODS.map(m => (
              <TouchableOpacity
                key={m.level}
                style={[styles.moodBtn, moodLevel === m.level && styles.moodBtnActive]}
                onPress={() => setMoodLevel(m.level)}
              >
                <Text style={styles.emoji}>{m.emoji}</Text>
                <Text style={[styles.moodLabel, moodLevel === m.level && styles.moodLabelActive]}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {moodLevel > 0 && (
          <Card style={styles.card}>
            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="What's making you feel this way?"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </Card>
        )}

      </ScrollView>

      <View style={styles.footer}>
        <Button label={loading ? 'Saving...' : 'Save Entry'} onPress={handleSave} disabled={!moodLevel || loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink, marginBottom: spacing.xs },
  subtitle: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, marginBottom: spacing.xl },
  card: { padding: spacing.xl, marginBottom: spacing.lg },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodBtn: { alignItems: 'center', padding: spacing.sm, borderRadius: 12, opacity: 0.6 },
  moodBtnActive: { opacity: 1, backgroundColor: colors.primarySoft },
  emoji: { fontSize: 32, marginBottom: spacing.xs },
  moodLabel: { fontFamily: typography.body, fontSize: 12, color: colors.inkSoft },
  moodLabelActive: { color: colors.primary, fontWeight: 'bold' },
  label: { fontFamily: typography.body, fontSize: 16, fontWeight: '600', color: colors.ink, marginBottom: spacing.md },
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: spacing.md, fontFamily: typography.body, fontSize: 16, backgroundColor: colors.surface, textAlignVertical: 'top' },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
});
