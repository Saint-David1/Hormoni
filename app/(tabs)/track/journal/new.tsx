import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { TopAppBar, Button, Card, LogTag } from '../../../../components';
import { colors, spacing, textStyles } from '../../../../theme/tokens';
import { queueAction } from '../../../../lib/db';
import { syncOfflineData } from '../../../../lib/syncService';
import { useAuthStore } from '../../../../store/authStore';
import { generateUUID } from '../../../../lib/uuid';
import { SYMPTOMS } from '../../../../constants/symptoms';

export default function NewJournalEntryScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [includeInSummary, setIncludeInSummary] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleSave = async () => {
    if (!user || !text.trim()) return;
    setLoading(true);

    const recordId = generateUUID();
    const payload = {
      id: recordId,
      user_id: user.id,
      text: text.trim(),
      tagged_symptoms: tags,
      include_in_summary: includeInSummary,
      entry_date: new Date().toISOString(),
    };

    try {
      await queueAction('journal_entries', 'INSERT', recordId, payload);
      syncOfflineData();
      Alert.alert('Saved', 'Journal entry saved.', [{ text: 'OK', onPress: () => router.back() }]);
    } catch (error) {
      console.error('Failed to save journal entry', error);
      Alert.alert('Error', 'Failed to save entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="New Entry" />
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <TextInput
            style={styles.input}
            placeholder="What's on your mind today?"
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={8}
          />
        </Card>

        <Text style={[textStyles.bodyStrong, styles.label]}>Tag related symptoms (optional)</Text>
        <View style={styles.tagRow}>
          {SYMPTOMS.map((s) => (
            <LogTag key={s} label={s} selected={tags.includes(s)} onPress={() => toggleTag(s)} />
          ))}
        </View>

        <View style={styles.switchRow}>
          <Text style={[textStyles.body, { color: colors.ink }]}>Include in health summary</Text>
          <Switch value={includeInSummary} onValueChange={setIncludeInSummary} trackColor={{ false: colors.bgWash, true: colors.primarySoft }} thumbColor={includeInSummary ? colors.primary : colors.inkFaint} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label={loading ? 'Saving...' : 'Save Entry'} onPress={handleSave} disabled={!text.trim() || loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen },
  input: { minHeight: 160, textAlignVertical: 'top', fontFamily: 'Poppins_400Regular', fontSize: 16, color: colors.ink },
  label: { color: colors.ink, marginTop: spacing.lg, marginBottom: spacing.sm },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surfaceAlt },
});
