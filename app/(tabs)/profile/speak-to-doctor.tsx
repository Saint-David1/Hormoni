import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { TopAppBar, Button, Card, LogTag, Callout } from '../../../components';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { useAuthStore } from '../../../store/authStore';
import { supabase } from '../../../lib/supabase';
import { generateUUID } from '../../../lib/uuid';
import { buildHealthSummary } from '../../../lib/healthSummary';

const REASONS = ['PCOS management', 'Irregular periods', 'Symptoms', 'Fertility/reproductive health', 'Medication questions', 'Lifestyle concerns', 'Other'];

export default function SpeakToDoctorScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [reasons, setReasons] = useState<string[]>([]);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const toggleReason = (reason: string) => {
    setReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]));
  };

  const handleSubmit = async () => {
    if (!user || reasons.length === 0) return;
    setSubmitting(true);

    const dataSnapshot: Record<string, unknown> = { reasons };
    if (includeSummary) {
      dataSnapshot.health_summary = await buildHealthSummary(user.id);
    }

    const { error } = await supabase.from('guidance_requests').insert({
      id: generateUUID(),
      user_id: user.id,
      data_snapshot: dataSnapshot,
      status: 'pending',
    });

    setSubmitting(false);

    if (error) {
      Alert.alert('Error', 'Could not submit your request.');
      return;
    }

    Alert.alert('Request sent', "We've received your request. A member of our care team will follow up.", [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Speak to a Doctor" />
      <ScrollView contentContainerStyle={styles.content}>
        <Callout
          variant="info"
          message="This sends a request for a healthcare professional to follow up with you — it doesn't connect you instantly or replace emergency care."
        />

        <Text style={[textStyles.cardTitle, styles.sectionTitle]}>What would you like help with?</Text>
        <View style={styles.tagRow}>
          {REASONS.map((reason) => (
            <LogTag key={reason} label={reason} selected={reasons.includes(reason)} onPress={() => toggleReason(reason)} />
          ))}
        </View>

        <Card>
          <Text style={[textStyles.bodyStrong, { color: colors.ink }]}>Prepare your consultation</Text>
          <Text style={[textStyles.body, styles.description]}>
            Your health summary can help you explain what you've been experiencing.
          </Text>
          <LogTag
            label={includeSummary ? 'Including your health summary' : 'Not including your health summary'}
            selected={includeSummary}
            onPress={() => setIncludeSummary(!includeSummary)}
          />
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button label={submitting ? 'Sending...' : 'Request Consultation'} onPress={handleSubmit} disabled={reasons.length === 0 || submitting} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120 },
  sectionTitle: { color: colors.ink, marginBottom: spacing.md },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  description: { color: colors.inkSoft, marginVertical: spacing.sm },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surfaceAlt },
});
