import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing } from '../../../theme/tokens';
import { Button, Card, Callout } from '../../../components';
import { queueAction } from '../../../lib/db';
import { useAuthStore } from '../../../store/authStore';

// Simple UUID generator fallback since crypto might not be polyfilled in standard Expo without config
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export default function CycleTrackerScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState(false);
  const [flow, setFlow] = useState<string>('');

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    const recordId = generateUUID();
    const today = new Date().toISOString().split('T')[0];

    const payload = {
      id: recordId,
      user_id: user.id,
      start_date: today,
      end_date: null,
      notes: `Flow: ${flow}`,
      created_at: new Date().toISOString(),
    };

    try {
      await queueAction('cycles', 'INSERT', recordId, payload);
      Alert.alert('Saved', 'Cycle entry saved successfully.', [
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
        <Text style={styles.title}>Log Cycle</Text>
        <Text style={styles.subtitle}>Track your period start date and flow.</Text>
        
        <Callout variant="info" message="Today will be logged as the start date of your period." />

        <Card style={styles.card}>
          <Text style={styles.label}>How is your flow today?</Text>
          <View style={styles.buttonRow}>
            {['Light', 'Medium', 'Heavy', 'Spotting'].map(f => (
              <Button
                key={f}
                label={f}
                variant={flow === f ? 'primary' : 'outline'}
                onPress={() => setFlow(f)}
                style={styles.flowButton}
              />
            ))}
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button label={loading ? 'Saving...' : 'Save Entry'} onPress={handleSave} disabled={!flow || loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink, marginBottom: spacing.xs },
  subtitle: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, marginBottom: spacing.xl },
  card: { padding: spacing.xl },
  label: { fontFamily: typography.body, fontSize: 16, fontWeight: '600', color: colors.ink, marginBottom: spacing.md },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  flowButton: { alignSelf: 'flex-start' },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
});
