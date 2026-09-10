import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TopAppBar, Card, Pill } from '../../../../components';
import { colors, spacing, textStyles } from '../../../../theme/tokens';
import { supabase } from '../../../../lib/supabase';
import { useAuthStore } from '../../../../store/authStore';

interface JournalEntry {
  id: string;
  text: string;
  tagged_symptoms: string[] | null;
  entry_date: string;
}

export default function JournalListScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      supabase
        .from('journal_entries')
        .select('id, text, tagged_symptoms, entry_date')
        .eq('user_id', user.id)
        .order('entry_date', { ascending: false })
        .then(({ data }) => setEntries(data ?? []));
    }, [user])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar
        title="Journal"
        rightAccessory={
          <TouchableOpacity onPress={() => router.push('/(tabs)/track/journal/new')} hitSlop={8}>
            <Ionicons name="add-circle" size={28} color={colors.primary} />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListEmptyComponent={<Text style={[textStyles.body, styles.empty]}>No journal entries yet. Tap + to write one.</Text>}
        renderItem={({ item }) => (
          <Card>
            <Text style={[textStyles.caption, styles.date]}>{new Date(item.entry_date).toLocaleDateString()}</Text>
            <Text style={[textStyles.body, styles.text]} numberOfLines={3}>{item.text}</Text>
            {item.tagged_symptoms && item.tagged_symptoms.length > 0 && (
              <View style={styles.tagRow}>
                {item.tagged_symptoms.map((tag) => (
                  <Pill key={tag} label={tag} variant="phase" />
                ))}
              </View>
            )}
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120 },
  date: { color: colors.inkFaint, marginBottom: spacing.xs },
  text: { color: colors.ink, marginBottom: spacing.sm },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  empty: { color: colors.inkSoft, textAlign: 'center', marginTop: spacing.xl },
});
