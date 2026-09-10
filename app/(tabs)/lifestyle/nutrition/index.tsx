import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TopAppBar, Card, Chip } from '../../../../components';
import { colors, spacing, textStyles } from '../../../../theme/tokens';
import { supabase } from '../../../../lib/supabase';

interface Food {
  id: string;
  name: string;
  category: 'explore' | 'limit';
  description: string;
}

export default function NutritionScreen() {
  const router = useRouter();
  const [category, setCategory] = useState<'explore' | 'limit'>('explore');
  const [query, setQuery] = useState('');
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    let request = supabase.from('foods').select('id, name, category, description').eq('category', category);
    if (query.trim()) {
      request = request.ilike('name', `%${query.trim()}%`);
    }
    request.order('name').then(({ data }) => setFoods(data ?? []));
  }, [category, query]);

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Nutrition" />
      <View style={styles.content}>
        <View style={styles.chipRow}>
          <Chip label="Foods to Explore" selected={category === 'explore'} onPress={() => setCategory('explore')} />
          <Chip label="Foods to Limit" selected={category === 'limit'} onPress={() => setCategory('limit')} />
        </View>

        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color={colors.inkFaint} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search foods, e.g. rice"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={[textStyles.body, styles.empty]}>No foods found.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/(tabs)/lifestyle/nutrition/${item.id}` as any)}>
              <Card>
                <Text style={[textStyles.bodyStrong, { color: colors.ink }]}>{item.name}</Text>
                <Text style={[textStyles.body, { color: colors.inkSoft }]} numberOfLines={2}>{item.description}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: spacing.screen },
  chipRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceAlt, borderRadius: 14, borderWidth: 1, borderColor: colors.bgWash, paddingHorizontal: spacing.md, marginBottom: spacing.md },
  searchInput: { flex: 1, paddingVertical: spacing.sm, fontFamily: 'Poppins_400Regular', fontSize: 16, color: colors.ink },
  list: { paddingBottom: 120 },
  empty: { color: colors.inkSoft, textAlign: 'center', marginTop: spacing.xl },
});
