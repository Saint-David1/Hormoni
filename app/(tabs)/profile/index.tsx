import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing } from '../../../theme/tokens';
import { Card } from '../../../components';
import { useAuthStore } from '../../../store/authStore';
import { supabase } from '../../../lib/supabase';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, biometricEnabled, setBiometricEnabled, setSession } = useAuthStore();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account and all associated health data?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => Alert.alert('Action Required', 'Please contact support to complete account deletion.')
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Account</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Biometric App Lock</Text>
            <Switch 
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: colors.line, true: colors.primarySoft }}
              thumbColor={biometricEnabled ? colors.primary : colors.inkSoft}
            />
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          
          <TouchableOpacity style={styles.rowAction} onPress={() => router.push('/(tabs)/profile/export')}>
            <Text style={styles.actionText}>Export My Health Data</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.rowAction} onPress={() => router.push('/(tabs)/profile/legal')}>
            <Text style={styles.actionText}>Legal & Compliance</Text>
          </TouchableOpacity>
        </Card>

        <Card style={[styles.card, styles.dangerCard]}>
          <TouchableOpacity style={styles.rowAction} onPress={handleSignOut}>
            <Text style={[styles.actionText, styles.dangerText]}>Sign Out</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.rowAction} onPress={handleDeleteAccount}>
            <Text style={[styles.actionText, styles.dangerText]}>Delete Account</Text>
          </TouchableOpacity>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  header: { marginBottom: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink, marginBottom: spacing.xs },
  email: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft },
  card: { padding: spacing.xl, marginBottom: spacing.lg },
  sectionTitle: { fontFamily: typography.body, fontSize: 14, fontWeight: '600', color: colors.inkSoft, marginBottom: spacing.md, textTransform: 'uppercase', letterSpacing: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowLabel: { fontFamily: typography.body, fontSize: 16, color: colors.ink },
  rowAction: { paddingVertical: spacing.sm },
  actionText: { fontFamily: typography.body, fontSize: 16, color: colors.ink },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: spacing.md },
  dangerCard: { borderColor: '#ffebee', borderWidth: 1, backgroundColor: '#fffafa' },
  dangerText: { color: colors.error, fontWeight: '600' },
});
