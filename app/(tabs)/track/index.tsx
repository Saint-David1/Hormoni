import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing } from '../../../theme/tokens';
import { Card } from '../../../components';

export default function TrackHubScreen() {
  const router = useRouter();

  const TRACKERS = [
    { title: 'Cycle', desc: 'Log period dates & flow', route: '/(tabs)/track/cycle' },
    { title: 'Symptoms', desc: 'Track daily symptoms', route: '/(tabs)/track/symptoms' },
    { title: 'Weight', desc: 'Log your weight', route: '/(tabs)/track/weight' },
    { title: 'Mood', desc: 'Check in on your mood', route: '/(tabs)/track/mood' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>What would you like to track?</Text>
        
        <View style={styles.grid}>
          {TRACKERS.map(tracker => (
            <TouchableOpacity 
              key={tracker.title} 
              style={styles.gridItem} 
              onPress={() => router.push(tracker.route as any)}
            >
              <Card style={styles.card}>
                <Text style={styles.cardTitle}>{tracker.title}</Text>
                <Text style={styles.cardDesc}>{tracker.desc}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 24, color: colors.ink, marginBottom: spacing.xl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  gridItem: { width: '47%' },
  card: { height: 120, justifyContent: 'center' },
  cardTitle: { fontFamily: typography.body, fontSize: 18, fontWeight: '600', color: colors.ink, marginBottom: spacing.xs },
  cardDesc: { fontFamily: typography.body, fontSize: 13, color: colors.inkSoft },
});
