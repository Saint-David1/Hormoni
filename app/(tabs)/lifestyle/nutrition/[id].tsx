import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { TopAppBar, Card, Callout, Pill } from '../../../../components';
import { colors, spacing, textStyles } from '../../../../theme/tokens';
import { supabase } from '../../../../lib/supabase';

interface Food {
  id: string;
  name: string;
  category: 'explore' | 'limit';
  description: string;
  glycemic_note: string | null;
}

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [food, setFood] = useState<Food | null>(null);

  useEffect(() => {
    if (!id) return;
    supabase.from('foods').select('id, name, category, description, glycemic_note').eq('id', id).single().then(({ data }) => setFood(data));
  }, [id]);

  if (!food) {
    return (
      <SafeAreaView style={styles.container}>
        <TopAppBar title="Food" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title={food.name} />
      <ScrollView contentContainerStyle={styles.content}>
        <Pill variant="phase" label={food.category === 'explore' ? 'Foods to Explore' : 'Foods to Limit'} style={styles.pill} />
        <Card>
          <Text style={[textStyles.body, styles.description]}>{food.description}</Text>
          {food.glycemic_note && (
            <Text style={[textStyles.caption, styles.note]}>{food.glycemic_note}</Text>
          )}
        </Card>
        <Callout
          variant="info"
          message="Nutrition and lifestyle can support managing PCOS, but they don't cure it. This information is educational, not medical advice."
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen },
  pill: { marginBottom: spacing.md },
  description: { color: colors.ink, lineHeight: 22, marginBottom: spacing.sm },
  note: { color: colors.inkSoft, fontStyle: 'italic' },
});
