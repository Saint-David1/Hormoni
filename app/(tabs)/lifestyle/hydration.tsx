import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TopAppBar, Button, Card } from '../../../components';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { queueAction } from '../../../lib/db';
import { syncOfflineData } from '../../../lib/syncService';
import { useAuthStore } from '../../../store/authStore';
import { generateUUID } from '../../../lib/uuid';
import { supabase } from '../../../lib/supabase';
import { toLocalDateKey } from '../../../lib/date';

const DAILY_GOAL = 8;

export default function HydrationScreen() {
  const user = useAuthStore((state) => state.user);
  const [todayGlasses, setTodayGlasses] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadToday = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('hydration_logs')
      .select('glasses, logged_at')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: false })
      .limit(50);

    const todayKey = toLocalDateKey(new Date());
    const total = (data ?? [])
      .filter((row) => toLocalDateKey(new Date(row.logged_at)) === todayKey)
      .reduce((sum, row) => sum + row.glasses, 0);
    setTodayGlasses(total);
  }, [user]);

  useFocusEffect(useCallback(() => { loadToday(); }, [loadToday]));

  const addGlass = async () => {
    if (!user || loading) return;
    setLoading(true);
    const recordId = generateUUID();
    const payload = { id: recordId, user_id: user.id, glasses: 1, logged_at: new Date().toISOString() };
    try {
      await queueAction('hydration_logs', 'INSERT', recordId, payload);
      syncOfflineData();
      setTodayGlasses((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to save hydration log', error);
      Alert.alert('Error', 'Failed to save entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Hydration" />
      <ScrollView contentContainerStyle={styles.content}>
        <Card hero style={styles.hero}>
          <Text style={[textStyles.body, { color: colors.inkSoft }]}>Today's water intake</Text>
          <Text style={[textStyles.displayNumber, { color: colors.ink }]}>{todayGlasses} / {DAILY_GOAL}</Text>
          <View style={styles.glassRow}>
            {Array.from({ length: DAILY_GOAL }).map((_, i) => (
              <Ionicons
                key={i}
                name="water"
                size={28}
                color={i < todayGlasses ? colors.phasePeriod : colors.bgWash}
              />
            ))}
          </View>
          <Button label="+ Add a glass" onPress={addGlass} disabled={loading} style={styles.addButton} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen },
  hero: { alignItems: 'center' },
  glassRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm, marginVertical: spacing.lg },
  addButton: { width: '100%' },
});
