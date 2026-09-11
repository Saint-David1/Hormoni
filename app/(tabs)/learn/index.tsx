import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter, useFocusEffect } from 'expo-router';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Card, Pill, Chip, InsightHeroCard, TopAppBar } from '../../../components';
import { supabase } from '../../../lib/supabase';

interface Article {
  id: string;
  title: string;
  category: string | null;
  body: string | null;
  published_at: string | null;
}

function excerptOf(body: string | null): string {
  if (!body) return '';
  const plain = body.replace(/[#*_>`-]/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.length > 140 ? `${plain.slice(0, 140)}…` : plain;
}

function readTimeOf(body: string | null): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default function LearnHubScreen() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useFocusEffect(
    useCallback(() => {
      supabase
        .from('educational_content')
        .select('id, title, category, body, published_at')
        .eq('review_status', 'approved')
        .order('published_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            console.error('Failed to load educational content', error);
            return;
          }
          setArticles(data ?? []);
        });
    }, [])
  );

  const categories = useMemo(() => {
    const distinct = Array.from(new Set(articles.map((a) => a.category).filter(Boolean))) as string[];
    return ['All', ...distinct];
  }, [articles]);

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Learn" showBack={false} />
      <ScrollView contentContainerStyle={styles.content}>
        <InsightHeroCard
          headline="Recommended for you"
          subheadline="Based on your focus areas"
          stats={[
            { label: 'Articles', value: String(articles.length) },
            { label: 'Categories', value: String(Math.max(categories.length - 1, 0)) },
          ]}
        />

        {categories.length > 1 && (
          <View style={styles.filterRow}>
            {categories.map((cat) => (
              <Chip key={cat} label={cat} selected={activeCategory === cat} onPress={() => setActiveCategory(cat)} />
            ))}
          </View>
        )}

        {filteredArticles.length === 0 && (
          <Text style={[textStyles.body, styles.empty]}>No articles yet — check back soon.</Text>
        )}

        {filteredArticles.map((article, index) => (
          <Animated.View key={article.id} entering={FadeInDown.delay(Math.min(index, 6) * 40).duration(300)}>
            <TouchableOpacity
              onPress={() => router.push(`/(tabs)/learn/article/${article.id}` as any)}
              style={styles.articleCard}
            >
              <Card>
                <View style={styles.cardHeader}>
                  {article.category && <Pill label={article.category} variant="accent" />}
                  <Text style={[textStyles.caption, styles.readTime]}>{readTimeOf(article.body)}</Text>
                </View>
                <Text style={[textStyles.cardTitle, styles.articleTitle]}>{article.title}</Text>
                <Text style={[textStyles.body, styles.articleExcerpt]} numberOfLines={2}>{excerptOf(article.body)}</Text>
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
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.sm },
  articleCard: { width: '100%' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  readTime: { color: colors.inkSoft },
  articleTitle: { color: colors.ink, marginBottom: spacing.xs },
  articleExcerpt: { color: colors.inkSoft, lineHeight: 20 },
  empty: { color: colors.inkSoft, textAlign: 'center', marginTop: spacing.xl },
});
