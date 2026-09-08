import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../../../theme/tokens';
import { Card, Pill } from '../../../components';

export default function DashboardScreen() {
  const [range, setRange] = useState<'30' | '90' | '180'>('30');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Overview</Text>
          <View style={styles.rangeSelector}>
            {(['30', '90', '180'] as const).map(r => (
              <TouchableOpacity key={r} onPress={() => setRange(r)} style={[styles.rangeBtn, range === r && styles.rangeBtnActive]}>
                <Text style={[styles.rangeText, range === r && styles.rangeTextActive]}>{r}d</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Card>
          <Text style={styles.cardTitle}>Current Cycle</Text>
          <Text style={styles.cardData}>Day 14</Text>
          <Pill label="Predicted: 28 days" variant="calm" />
        </Card>

        <View style={styles.grid}>
          <Card style={styles.gridCard}>
            <Text style={styles.cardTitle}>Symptom Score</Text>
            <Text style={styles.cardData}>Moderate</Text>
          </Card>
          
          <Card style={styles.gridCard}>
            <Text style={styles.cardTitle}>Mood Trend</Text>
            <Text style={styles.cardData}>Good</Text>
          </Card>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 28, color: colors.ink },
  rangeSelector: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 20, padding: 2 },
  rangeBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 18 },
  rangeBtnActive: { backgroundColor: colors.primarySoft },
  rangeText: { fontFamily: typography.mono, fontSize: 12, color: colors.inkSoft },
  rangeTextActive: { color: colors.primary, fontWeight: '600' },
  cardTitle: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, marginBottom: spacing.xs },
  cardData: { fontFamily: typography.display, fontSize: 24, color: colors.ink, marginBottom: spacing.md },
  grid: { flexDirection: 'row', gap: spacing.md },
  gridCard: { flex: 1 },
});
