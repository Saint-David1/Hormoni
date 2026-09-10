import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, textStyles, spacing } from '../../../theme/tokens';
import { Button, Card, LogTag, TopAppBar } from '../../../components';
import { queueAction } from '../../../lib/db';
import { syncOfflineData } from '../../../lib/syncService';
import { useAuthStore } from '../../../store/authStore';
import { generateUUID } from '../../../lib/uuid';
import { SYMPTOMS } from '../../../constants/symptoms';

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

    const payload = {
      id: recordId,
      user_id: user.id,
      symptom_type: selectedSymptom,
      severity,
      note: notes.trim() || null,
      logged_at: new Date().toISOString(),
    };

    try {
      await queueAction('symptom_logs', 'INSERT', recordId, payload);
      syncOfflineData();
      Alert.alert('Saved', 'Symptom logged successfully.', [
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
      <TopAppBar title="Log Symptoms" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.body, styles.subtitle]}>Track what you're feeling today.</Text>

        <Text style={[textStyles.bodyStrong, styles.label]}>Select Symptom</Text>
        <View style={styles.symptomList}>
          {SYMPTOMS.map(s => (
            <LogTag key={s} label={s} selected={selectedSymptom === s} onPress={() => setSelectedSymptom(s)} />
          ))}
        </View>

        {selectedSymptom ? (
          <Card style={styles.card}>
            <Text style={[textStyles.bodyStrong, styles.label]}>Severity (1-5)</Text>
            <View style={styles.severityRow}>
              {[1, 2, 3, 4, 5].map(lvl => (
                <TouchableOpacity
                  key={lvl}
                  style={[styles.severityBtn, severity === lvl && styles.severityBtnActive]}
                  onPress={() => setSeverity(lvl)}
                >
                  <Text style={[textStyles.body, styles.severityText, severity === lvl && styles.severityTextActive]}>{lvl}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[textStyles.bodyStrong, styles.label]}>Notes (Optional)</Text>
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
  subtitle: { color: colors.inkSoft, marginBottom: spacing.xl },
  label: { color: colors.ink, marginBottom: spacing.sm, marginTop: spacing.md },
  symptomList: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  card: { padding: spacing.xl, marginTop: spacing.sm },
  severityRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl },
  severityBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.bgWash, justifyContent: 'center', alignItems: 'center' },
  severityBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  severityText: { color: colors.ink },
  severityTextActive: { color: colors.onBrand, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: colors.bgWash, borderRadius: 14, padding: spacing.md, fontFamily: 'Poppins_400Regular', fontSize: 16, backgroundColor: colors.surfaceAlt, textAlignVertical: 'top' },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surfaceAlt },
});
