import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Card, Pill, Chip, InsightHeroCard, TopAppBar } from '../../../components';

const CATEGORIES = ['All', 'Diet', 'Stress', 'Cycle', 'General'];

const ARTICLES = [
  {
    id: '1',
    title: 'Managing Insulin Resistance with Local Staples',
    category: 'Diet',
    readTime: '5 min read',
    excerpt: 'How to swap high-GI foods for Nigerian alternatives like unripe plantain amala and Efo Riro.',
  },
  {
    id: '2',
    title: 'Understanding Irregular Cycles',
    category: 'Cycle',
    readTime: '4 min read',
    excerpt: 'What causes your cycle to fluctuate and when to speak to a doctor.',
  },
  {
    id: '3',
    title: 'Stress and Cortisol in PCOS',
    category: 'Stress',
    readTime: '6 min read',
    excerpt: 'Why managing your daily stress levels is as important as your diet.',
  }
];

export default function LearnHubScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredArticles = activeCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Learn" showBack={false} />
      <ScrollView contentContainerStyle={styles.content}>
        <InsightHeroCard
          headline="Recommended for you"
          subheadline="Based on your focus areas"
          stats={[
            { label: 'Articles', value: String(ARTICLES.length) },
            { label: 'Categories', value: String(CATEGORIES.length - 1) },
          ]}
        />

        <View style={styles.filterRow}>
          {CATEGORIES.map(cat => (
            <Chip key={cat} label={cat} selected={activeCategory === cat} onPress={() => setActiveCategory(cat)} />
          ))}
        </View>

        {filteredArticles.map(article => (
          <TouchableOpacity
            key={article.id}
            onPress={() => router.push(`/(tabs)/learn/article/${article.id}` as any)}
            style={styles.articleCard}
          >
            <Card>
              <View style={styles.cardHeader}>
                <Pill label={article.category} variant="accent" />
                <Text style={[textStyles.caption, styles.readTime]}>{article.readTime}</Text>
              </View>
              <Text style={[textStyles.cardTitle, styles.articleTitle]}>{article.title}</Text>
              <Text style={[textStyles.body, styles.articleExcerpt]} numberOfLines={2}>{article.excerpt}</Text>
            </Card>
          </TouchableOpacity>
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
});
