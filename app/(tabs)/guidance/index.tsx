import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Card, Chip, Callout } from '../../../components';
import { supabase } from '../../../lib/supabase';

interface Entry {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
}

export default function LibraryScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useFocusEffect(
    useCallback(() => {
      supabase
        .from('knowledge_base_entries')
        .select('id, title, category, summary, tags')
        .eq('review_status', 'approved')
        .order('title', { ascending: true })
        .then(({ data, error }) => {
          if (error) {
            console.error('Failed to load knowledge base', error);
            return;
          }
          setEntries(data ?? []);
        });
    }, [])
  );

  const categories = useMemo(() => {
    const distinct = Array.from(new Set(entries.map((e) => e.category)));
    return ['All', ...distinct];
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      const matchesCategory = activeCategory === 'All' || e.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [entries, query, activeCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.body, styles.subtitle]}>
          Search trusted, brief information on PCOS and female health, with links to credible sources for further reading.
        </Text>

        <Callout
          variant="safety"
          message="This is general information, not medical advice. For anything urgent or personal to your situation, please talk to a healthcare professional."
        />

        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color={colors.inkFaint} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search topics, e.g. ovulation, hirsutism..."
            placeholderTextColor={colors.inkFaint}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
          />
        </View>

        {categories.length > 1 && (
          <View style={styles.filterRow}>
            {categories.map((cat) => (
              <Chip key={cat} label={cat} selected={activeCategory === cat} onPress={() => setActiveCategory(cat)} />
            ))}
          </View>
        )}

        {filtered.length === 0 && (
          <Text style={[textStyles.body, styles.empty]}>
            {entries.length === 0 ? 'The Library is empty right now — check back soon.' : 'No results for that search.'}
          </Text>
        )}

        {filtered.map((entry, index) => (
          <Animated.View key={entry.id} entering={FadeInDown.delay(Math.min(index, 6) * 40).duration(300)}>
            <TouchableOpacity onPress={() => router.push(`/(tabs)/guidance/${entry.id}` as any)}>
              <Card>
                <Text style={[textStyles.caption, styles.category]}>{entry.category}</Text>
                <Text style={[textStyles.cardTitle, styles.entryTitle]}>{entry.title}</Text>
                <Text style={[textStyles.body, styles.summary]} numberOfLines={2}>{entry.summary}</Text>
              </Card>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120, gap: spacing.md },
  subtitle: { color: colors.inkSoft },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
  },
  searchIcon: { marginRight: spacing.sm },
  searchInput: { flex: 1, paddingVertical: spacing.sm, fontSize: 15, color: colors.ink },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  category: { color: colors.primary, marginBottom: spacing.xs, textTransform: 'uppercase' },
  entryTitle: { color: colors.ink, marginBottom: spacing.xs },
  summary: { color: colors.inkSoft, lineHeight: 20 },
  empty: { color: colors.inkSoft, textAlign: 'center', marginTop: spacing.xl },
});
