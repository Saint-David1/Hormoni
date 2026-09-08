import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing } from '../../../theme/tokens';
import { Button, Card, Callout } from '../../../components';
import { queueAction } from '../../../lib/db';
import { useAuthStore } from '../../../store/authStore';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const SYMPTOMS = [
  'Acne', 'Fatigue', 'Hair Loss', 'Pelvic Pain', 'Irregular Periods', 'Mood Swings', 'Headache', 'Bloating'
];

export default function SymptomsTrackerScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  const [severity, setSeverity] = useState<number>(3);
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    if (!user || !selectedSymptom) return;
    setLoading(true);

    const recordId = generateUUID();
    const today = new Date().toISOString().split('T')[0];

    const payload = {
      id: recordId,
      user_id: user.id,
      date: today,
      symptom_name: selectedSymptom,
      severity,
      notes: notes.trim() || null,
      created_at: new Date().toISOString(),
    };

    try {
      await queueAction('symptom_logs', 'INSERT', recordId, payload);
      Alert.alert('Saved', 'Symptom logged successfully.', [
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
        <Text style={styles.title}>Log Symptoms</Text>
        <Text style={styles.subtitle}>Track what you're feeling today.</Text>

        <Callout variant="warning" message="// MEDICAL-REVIEW-REQUIRED: Symptom list is pending Medical Advisor review." />

        <Text style={styles.label}>Select Symptom</Text>
        <View style={styles.symptomList}>
          {SYMPTOMS.map(s => (
            <Button
              key={s}
              label={s}
              variant={selectedSymptom === s ? 'primary' : 'outline'}
              onPress={() => setSelectedSymptom(s)}
              style={styles.symptomBtn}
            />
          ))}
        </View>

        {selectedSymptom ? (
          <Card style={styles.card}>
            <Text style={styles.label}>Severity (1-5)</Text>
            <View style={styles.severityRow}>
              {[1, 2, 3, 4, 5].map(lvl => (
                <TouchableOpacity
                  key={lvl}
                  style={[styles.severityBtn, severity === lvl && styles.severityBtnActive]}
                  onPress={() => setSeverity(lvl)}
                >
                  <Text style={[styles.severityText, severity === lvl && styles.severityTextActive]}>{lvl}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Any details..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </Card>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <Button label={loading ? 'Saving...' : 'Save Entry'} onPress={handleSave} disabled={!selectedSymptom || loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink, marginBottom: spacing.xs },
  subtitle: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, marginBottom: spacing.xl },
  label: { fontFamily: typography.body, fontSize: 16, fontWeight: '600', color: colors.ink, marginBottom: spacing.sm, marginTop: spacing.md },
  symptomList: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  symptomBtn: { alignSelf: 'flex-start' },
  card: { padding: spacing.xl, marginTop: spacing.sm },
  severityRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl },
  severityBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, justifyContent: 'center', alignItems: 'center' },
  severityBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  severityText: { fontFamily: typography.mono, fontSize: 16, color: colors.ink },
  severityTextActive: { color: colors.surface, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: spacing.md, fontFamily: typography.body, fontSize: 16, backgroundColor: colors.surface, textAlignVertical: 'top' },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
});
