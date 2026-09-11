import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { colors, typography, spacing } from '../../../../theme/tokens';
import { Callout, TopAppBar } from '../../../../components';
import { supabase } from '../../../../lib/supabase';

interface Article {
  id: string;
  title: string;
  body: string | null;
}

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('educational_content')
      .select('id, title, body')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) console.error('Failed to load article', error);
        setArticle(data);
        setLoading(false);
      });
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title={article?.title ?? 'Article'} />
      <ScrollView contentContainerStyle={styles.content}>
        <Callout
          variant="warning"
          title="Disclaimer"
          message="The following content is for informational purposes only and does not constitute medical advice."
        />

        {loading ? (
          <ActivityIndicator color={colors.primary} style={styles.loading} />
        ) : (
          <View style={styles.markdownContainer}>
            <Markdown style={markdownStyles}>{article?.body ?? 'Article not found.'}</Markdown>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  markdownContainer: { marginTop: spacing.lg },
  loading: { marginTop: spacing.xl },
});

const markdownStyles = {
  heading1: { fontFamily: typography.display, fontSize: 28, color: colors.ink, marginBottom: spacing.md },
  heading2: { fontFamily: typography.body, fontSize: 20, fontWeight: '600' as const, color: colors.ink, marginTop: spacing.xl, marginBottom: spacing.sm },
  body: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, lineHeight: 24 },
  bullet_list: { marginTop: spacing.sm, marginBottom: spacing.md },
  list_item: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, lineHeight: 24, marginBottom: spacing.xs },
  strong: { fontWeight: 'bold' as const, color: colors.ink },
  em: { fontStyle: 'italic' as const },
};
