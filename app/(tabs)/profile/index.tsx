import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { Card, Button } from '../../../components';
import { useAuthStore } from '../../../store/authStore';
import { supabase } from '../../../lib/supabase';
import { deleteAllUserData } from '../../../lib/account';

function Row({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Ionicons name={icon} size={20} color={colors.inkSoft} style={styles.rowIcon} />
      <Text style={[textStyles.body, styles.rowLabel]}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.inkFaint} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, biometricEnabled, setBiometricEnabled, setSession, setUser } = useAuthStore();
  const [deleting, setDeleting] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This permanently erases all of your logged cycles, symptoms, weight, mood, and journal data. Your login itself will be disabled and fully removed by our team — this step just wipes the data immediately.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete My Data',
          style: 'destructive',
          onPress: async () => {
            if (!user) return;
            setDeleting(true);
            try {
              await deleteAllUserData(user.id);
              await supabase.auth.signOut();
              setSession(null);
              setUser(null);
              Alert.alert('Data Deleted', 'Your health data has been erased. Contact support to finish removing your login credentials from our systems.');
            } catch (error) {
              Alert.alert('Deletion Failed', error instanceof Error ? error.message : 'Please try again or contact support.');
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[textStyles.screenTitle, { color: colors.ink }]}>Profile</Text>
          <Text style={[textStyles.body, styles.email]}>{user?.email}</Text>
        </View>

        <Card tint="fertile">
          <Text style={[textStyles.bodyStrong, { color: colors.ink }]}>Need professional support?</Text>
          <Text style={[textStyles.body, styles.supportText]}>
            Request a consultation, or search our Library for trusted information on PCOS and female health.
          </Text>
          <View style={styles.supportButtons}>
            <Button label="Speak to a Doctor" size="sm" onPress={() => router.push('/(tabs)/profile/speak-to-doctor')} style={styles.supportButton} />
            <Button label="Search the Library" size="sm" variant="outline" onPress={() => router.push('/(tabs)/guidance')} style={styles.supportButton} />
          </View>
        </Card>

        <Text style={[textStyles.caption, styles.sectionLabel]}>Account</Text>
        <Card style={styles.sectionCard}>
          <View style={styles.switchRow}>
            <Text style={[textStyles.body, { color: colors.ink }]}>Biometric App Lock</Text>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: colors.bgWash, true: colors.primarySoft }}
              thumbColor={biometricEnabled ? colors.primary : colors.inkFaint}
            />
          </View>
        </Card>

        <Text style={[textStyles.caption, styles.sectionLabel]}>Data & Privacy</Text>
        <Card style={styles.sectionCard}>
          <Row icon="stats-chart-outline" label="Health Summary" onPress={() => router.push('/(tabs)/profile/health-summary')} />
          <Row icon="notifications-outline" label="Reminders" onPress={() => router.push('/(tabs)/profile/reminders')} />
          <Row icon="download-outline" label="Export My Health Data" onPress={() => router.push('/(tabs)/profile/export')} />
          <Row icon="document-text-outline" label="Legal & Compliance" onPress={() => router.push('/(tabs)/profile/legal')} />
        </Card>

        <Card style={[styles.sectionCard, styles.dangerCard]}>
          <TouchableOpacity style={styles.row} onPress={handleSignOut}>
            <Text style={[textStyles.body, styles.dangerText]}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={handleDeleteAccount} disabled={deleting}>
            {deleting ? <ActivityIndicator color={colors.errorMuted} /> : <Text style={[textStyles.body, styles.dangerText]}>Delete Account</Text>}
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120 },
  header: { marginBottom: spacing.lg },
  email: { color: colors.inkSoft },
  supportText: { color: colors.inkSoft, marginTop: spacing.xs, marginBottom: spacing.md },
  supportButtons: { flexDirection: 'row', gap: spacing.sm },
  supportButton: { flex: 1 },
  sectionLabel: { color: colors.inkFaint, marginTop: spacing.lg, marginBottom: spacing.sm, marginLeft: spacing.xs },
  sectionCard: { paddingVertical: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, gap: spacing.sm },
  rowIcon: { width: 24 },
  rowLabel: { flex: 1, color: colors.ink },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.xs },
  dangerCard: { backgroundColor: colors.errorMutedSoft },
  dangerText: { color: colors.errorMuted, fontWeight: '600' },
});
