import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LineChart } from 'react-native-gifted-charts';
import { colors, typography, spacing } from '../../../theme/tokens';
import { Button, Card } from '../../../components';
import { queueAction } from '../../../lib/db';
import { useAuthStore } from '../../../store/authStore';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const MOCK_DATA = [
  { value: 68, label: 'Mon' },
  { value: 67.8, label: 'Tue' },
  { value: 68.2, label: 'Wed' },
  { value: 67.5, label: 'Thu' },
  { value: 67.4, label: 'Fri' },
];

export default function WeightTrackerScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

  const handleSave = async () => {
    if (!user || !weight) return;
    setLoading(true);

    const recordId = generateUUID();
    const today = new Date().toISOString().split('T')[0];
    
    // convert to kg for db storage standard if lbs
    let weightVal = parseFloat(weight);
    if (unit === 'lbs') {
      weightVal = weightVal * 0.453592;
    }

    const payload = {
      id: recordId,
      user_id: user.id,
      date: today,
      weight_kg: weightVal,
      created_at: new Date().toISOString(),
    };

    try {
      await queueAction('weight_logs', 'INSERT', recordId, payload);
      Alert.alert('Saved', 'Weight logged successfully.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Log Weight</Text>
        <Text style={styles.subtitle}>Keep track of your weight over time.</Text>

        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Recent History</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={MOCK_DATA}
              width={280}
              height={150}
              color={colors.primary}
              thickness={3}
              dataPointsColor={colors.primary}
              hideRules
              hideYAxisText
              xAxisLabelTextStyle={{ color: colors.inkSoft, fontSize: 10 }}
            />
          </View>
        </Card>

        <Card style={styles.inputCard}>
          <View style={styles.headerRow}>
            <Text style={styles.label}>Today's Weight</Text>
            <View style={styles.unitToggle}>
              <TouchableOpacity onPress={() => setUnit('kg')} style={[styles.unitBtn, unit === 'kg' && styles.unitBtnActive]}>
                <Text style={[styles.unitText, unit === 'kg' && styles.unitTextActive]}>kg</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setUnit('lbs')} style={[styles.unitBtn, unit === 'lbs' && styles.unitBtnActive]}>
                <Text style={[styles.unitText, unit === 'lbs' && styles.unitTextActive]}>lbs</Text>
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
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink, marginBottom: spacing.xs },
  subtitle: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, marginBottom: spacing.xl },
  chartCard: { padding: spacing.xl, marginBottom: spacing.lg },
  chartTitle: { fontFamily: typography.body, fontSize: 16, fontWeight: '600', color: colors.ink, marginBottom: spacing.md },
  chartContainer: { alignItems: 'center' },
  inputCard: { padding: spacing.xl },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  label: { fontFamily: typography.body, fontSize: 16, fontWeight: '600', color: colors.ink },
  unitToggle: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 8, borderWidth: 1, borderColor: colors.line },
  unitBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  unitBtnActive: { backgroundColor: colors.primarySoft },
  unitText: { fontFamily: typography.mono, fontSize: 12, color: colors.inkSoft },
  unitTextActive: { color: colors.primary, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: spacing.md, fontFamily: typography.body, fontSize: 24, backgroundColor: colors.surface, textAlign: 'center' },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
});
