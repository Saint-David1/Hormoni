import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Card, Pill } from '../../../components';
import { supabase } from '../../../lib/supabase';

interface ExternalLink {
  label: string;
  url: string;
}

interface Entry {
  id: string;
  title: string;
  category: string;
  summary: string;
  external_links: ExternalLink[];
}

export default function LibraryEntryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('knowledge_base_entries')
      .select('id, title, category, summary, external_links')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) console.error('Failed to load library entry', error);
        setEntry(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color={colors.primary} style={styles.loading} />
      </SafeAreaView>
    );
  }

  if (!entry) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[textStyles.body, styles.notFound]}>This entry couldn't be found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pill label={entry.category} variant="accent" />
        <Text style={[textStyles.screenTitle, styles.title]}>{entry.title}</Text>
        <Text style={[textStyles.body, styles.summary]}>{entry.summary}</Text>

        {entry.external_links?.length > 0 && (
          <>
            <Text style={[textStyles.cardTitle, styles.linksTitle]}>Read more from credible sources</Text>
            {entry.external_links.map((link) => (
              <TouchableOpacity key={link.url} onPress={() => Linking.openURL(link.url)}>
                <Card style={styles.linkCard}>
                  <View style={styles.linkRow}>
                    <Ionicons name="open-outline" size={18} color={colors.primary} />
                    <Text style={[textStyles.body, styles.linkLabel]}>{link.label}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.sm },
  loading: { marginTop: spacing.xl },
  notFound: { color: colors.inkSoft, textAlign: 'center', marginTop: spacing.xl },
  title: { color: colors.ink, marginTop: spacing.sm, marginBottom: spacing.sm },
  summary: { color: colors.inkSoft, lineHeight: 24, marginBottom: spacing.lg },
  linksTitle: { color: colors.ink, marginBottom: spacing.sm },
  linkCard: { marginBottom: spacing.sm },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  linkLabel: { color: colors.ink, flex: 1 },
});
