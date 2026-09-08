import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing } from '../../../theme/tokens';
import { Card, Pill } from '../../../components';

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
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.filterBtn, activeCategory === cat && styles.filterBtnActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.filterText, activeCategory === cat && styles.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {filteredArticles.map(article => (
          <TouchableOpacity 
            key={article.id} 
            onPress={() => router.push(`/(tabs)/learn/article/${article.id}` as any)}
            style={styles.articleCard}
          >
            <Card>
              <View style={styles.cardHeader}>
                <Pill label={article.category} variant="primary" />
                <Text style={styles.readTime}>{article.readTime}</Text>
              </View>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleExcerpt} numberOfLines={2}>{article.excerpt}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  filterContainer: { backgroundColor: colors.surface, paddingVertical: spacing.md, borderBottomWidth: 1, borderColor: colors.line },
  filterScroll: { paddingHorizontal: spacing.xl, gap: spacing.sm },
  filterBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 20, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.line },
  filterBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft },
  filterTextActive: { color: colors.surface, fontWeight: '600' },
  content: { padding: spacing.xl, gap: spacing.md },
  articleCard: { width: '100%' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  readTime: { fontFamily: typography.mono, fontSize: 12, color: colors.inkSoft },
  articleTitle: { fontFamily: typography.body, fontSize: 18, fontWeight: '600', color: colors.ink, marginBottom: spacing.xs },
  articleExcerpt: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft, lineHeight: 20 },
});
