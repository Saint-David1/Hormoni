import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { LineChart } from 'react-native-gifted-charts';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Button, Card, TopAppBar } from '../../../components';
import { queueAction } from '../../../lib/db';
import { syncOfflineData } from '../../../lib/syncService';
import { useAuthStore } from '../../../store/authStore';
import { generateUUID } from '../../../lib/uuid';
import { supabase } from '../../../lib/supabase';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function WeightTrackerScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [history, setHistory] = useState<{ value: number; label: string }[]>([]);

  const loadHistory = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('weight_logs')
      .select('weight_value, logged_at')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: true })
      .limit(7);

    if (!error && data) {
      setHistory(
        data.map((row) => ({
          value: row.weight_value,
          label: WEEKDAY_LABELS[new Date(row.logged_at).getDay()],
        }))
      );
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  const handleSave = async () => {
    if (!user || !weight) return;
    setLoading(true);

    const recordId = generateUUID();
    const weightVal = parseFloat(weight);

    const payload = {
      id: recordId,
      user_id: user.id,
      weight_value: weightVal,
      unit,
      logged_at: new Date().toISOString(),
    };

    try {
      await queueAction('weight_logs', 'INSERT', recordId, payload);
      syncOfflineData();
      Alert.alert('Saved', 'Weight logged successfully.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Failed to save entry', error);
      Alert.alert('Error', 'Failed to save entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Log Weight" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.body, styles.subtitle]}>Keep track of your weight over time.</Text>

        <Card style={styles.chartCard}>
          <Text style={[textStyles.bodyStrong, styles.chartTitle]}>Recent History</Text>
          <View style={styles.chartContainer}>
            {history.length > 1 ? (
              <LineChart
                data={history}
                width={280}
                height={150}
                color={colors.primary}
                thickness={3}
                dataPointsColor={colors.primary}
                hideRules
                hideYAxisText
                xAxisLabelTextStyle={{ color: colors.inkSoft, fontSize: 10 }}
              />
            ) : (
              <Text style={[textStyles.body, styles.emptyText]}>Log a few entries to see your trend here.</Text>
            )}
          </View>
        </Card>

        <Card style={styles.inputCard}>
          <View style={styles.headerRow}>
            <Text style={[textStyles.bodyStrong, styles.label]}>Today's Weight</Text>
            <View style={styles.unitToggle}>
              <TouchableOpacity onPress={() => setUnit('kg')} style={[styles.unitBtn, unit === 'kg' && styles.unitBtnActive]}>
                <Text style={[textStyles.caption, styles.unitText, unit === 'kg' && styles.unitTextActive]}>kg</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setUnit('lbs')} style={[styles.unitBtn, unit === 'lbs' && styles.unitBtnActive]}>
                <Text style={[textStyles.caption, styles.unitText, unit === 'lbs' && styles.unitTextActive]}>lbs</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder={`e.g. ${unit === 'kg' ? '68.5' : '150.0'}`}
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
          />
        </Card>

      </ScrollView>

      <View style={styles.footer}>
        <Button label={loading ? 'Saving...' : 'Save Entry'} onPress={handleSave} disabled={!weight || loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  subtitle: { color: colors.inkSoft, marginBottom: spacing.xl },
  chartCard: { padding: spacing.xl, marginBottom: spacing.lg },
  chartTitle: { color: colors.ink, marginBottom: spacing.md },
  chartContainer: { alignItems: 'center', minHeight: 150, justifyContent: 'center' },
  emptyText: { color: colors.inkSoft, textAlign: 'center' },
  inputCard: { padding: spacing.xl },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  label: { color: colors.ink },
  unitToggle: { flexDirection: 'row', backgroundColor: colors.surfaceAlt, borderRadius: 14, borderWidth: 1, borderColor: colors.bgWash },
  unitBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  unitBtnActive: { backgroundColor: colors.primarySoft },
  unitText: { color: colors.inkSoft },
  unitTextActive: { color: colors.primary, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: colors.bgWash, borderRadius: 14, padding: spacing.md, fontFamily: 'Poppins_600SemiBold', fontSize: 24, backgroundColor: colors.surfaceAlt, textAlign: 'center' },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surfaceAlt },
});
