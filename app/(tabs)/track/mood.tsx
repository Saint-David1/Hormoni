import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Button, Card, TopAppBar } from '../../../components';
import { queueAction } from '../../../lib/db';
import { syncOfflineData } from '../../../lib/syncService';
import { useAuthStore } from '../../../store/authStore';
import { generateUUID } from '../../../lib/uuid';
import { MOODS } from '../../../lib/moodLabels';

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

    const payload = {
      id: recordId,
      user_id: user.id,
      mood_value: moodLevel,
      note: notes.trim() || null,
      logged_at: new Date().toISOString(),
    };

    try {
      await queueAction('mood_checkins', 'INSERT', recordId, payload);
      syncOfflineData();
      Alert.alert('Saved', 'Mood logged successfully.', [
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
      <TopAppBar title="Log Mood" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.body, styles.subtitle]}>How are you feeling today?</Text>

        <Card style={styles.card}>
          <View style={styles.moodRow}>
            {MOODS.map(m => (
              <TouchableOpacity
                key={m.level}
                style={[styles.moodBtn, moodLevel === m.level && styles.moodBtnActive]}
                onPress={() => setMoodLevel(m.level)}
              >
                <Text style={styles.emoji}>{m.emoji}</Text>
                <Text style={[textStyles.caption, styles.moodLabel, moodLevel === m.level && styles.moodLabelActive]}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {moodLevel > 0 && (
          <Card style={styles.card}>
            <Text style={[textStyles.bodyStrong, styles.label]}>Notes (Optional)</Text>
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
  subtitle: { color: colors.inkSoft, marginBottom: spacing.xl },
  card: { padding: spacing.xl, marginBottom: spacing.lg },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodBtn: { alignItems: 'center', padding: spacing.sm, borderRadius: 12, opacity: 0.6 },
  moodBtnActive: { opacity: 1, backgroundColor: colors.primarySoft },
  emoji: { fontSize: 32, marginBottom: spacing.xs },
  moodLabel: { color: colors.inkSoft },
  moodLabelActive: { color: colors.primary, fontWeight: 'bold' },
  label: { color: colors.ink, marginBottom: spacing.md },
  input: { borderWidth: 1, borderColor: colors.bgWash, borderRadius: 14, padding: spacing.md, fontFamily: 'Poppins_400Regular', fontSize: 16, backgroundColor: colors.surfaceAlt, textAlignVertical: 'top' },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surfaceAlt },
});
