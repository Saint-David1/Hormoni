import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card, IconChip } from '../../../components';
import { colors, spacing, textStyles, PhaseKey } from '../../../theme/tokens';

const ITEMS: { icon: string; label: string; description: string; tint: PhaseKey | 'primary'; route: string }[] = [
  { icon: 'nutrition-outline', label: 'Nutrition', description: 'Foods to explore and limit', tint: 'primary', route: '/(tabs)/lifestyle/nutrition' },
  { icon: 'walk-outline', label: 'Exercise', description: 'Log your activity', tint: 'ovulation', route: '/(tabs)/lifestyle/exercise' },
  { icon: 'moon-outline', label: 'Sleep', description: 'Track bedtime and quality', tint: 'fertile', route: '/(tabs)/lifestyle/sleep' },
  { icon: 'water-outline', label: 'Hydration', description: 'Log your water intake', tint: 'period', route: '/(tabs)/lifestyle/hydration' },
  { icon: 'checkmark-done-outline', label: 'Habits', description: 'Build daily routines', tint: 'luteal', route: '/(tabs)/lifestyle/habits' },
];

export default function LifestyleHubScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.screenTitle, styles.title]}>Lifestyle</Text>
        <Text style={[textStyles.body, styles.subtitle]}>Small habits that support your PCOS management.</Text>

        {ITEMS.map((item) => (
          <TouchableOpacity key={item.label} onPress={() => router.push(item.route as any)}>
            <Card>
              <View style={styles.row}>
                <IconChip tint={item.tint} size={44}>
                  <Ionicons name={item.icon as any} size={22} color={colors.ink} />
                </IconChip>
                <View style={styles.textCol}>
                  <Text style={[textStyles.cardTitle, { color: colors.ink }]}>{item.label}</Text>
                  <Text style={[textStyles.body, { color: colors.inkSoft }]}>{item.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.inkFaint} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120 },
  title: { color: colors.ink, marginBottom: spacing.xs },
  subtitle: { color: colors.inkSoft, marginBottom: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  textCol: { flex: 1 },
});
