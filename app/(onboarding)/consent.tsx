import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { Button, Callout } from '../../components';
import { colors, spacing, textStyles } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

export default function ConsentScreen() {
  const router = useRouter();
  const setHasConsented = useAuthStore((state) => state.setHasConsented);
  const user = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    if (!user) return;
    setLoading(true);

    const { error } = await supabase.from('consent_records').insert({
      user_id: user.id,
      policy_version: 'v1.0.0',
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error saving consent', error.message);
    } else {
      await setHasConsented(true);
      router.push('/(onboarding)/profile-setup');
    }
  };

  const handleNotNow = () => {
    Alert.alert(
      'No problem',
      "You can come back and set up Hormoni whenever you're ready. We'll sign you out for now.",
      [
        { text: 'Stay', style: 'cancel' },
        {
          text: 'Sign out',
          onPress: async () => {
            await supabase.auth.signOut();
            setSession(null);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.screenTitle, styles.headerTitle]}>Data & Privacy</Text>

        <Callout
          variant="safety"
          title="Your health data is yours"
          message="Health information is sensitive. We only collect what helps Hornomi work for you, and only you can access your personal records unless you choose to share them."
        />

        <Text style={[textStyles.cardTitle, styles.sectionTitle]}>What you need to know</Text>
        <Text style={[textStyles.body, styles.paragraph]}>
          Hornomi is designed to help you track and understand your symptoms. It is not a diagnostic tool and does not replace professional medical advice.
        </Text>
        <Text style={[textStyles.body, styles.paragraph]}>
          Sharing information with a healthcare provider through Hornomi always requires your explicit authorization first — nothing is sent on your behalf automatically.
        </Text>
        <Text style={[textStyles.body, styles.paragraph]}>
          By continuing, you agree to our Terms of Service and Privacy Policy, and you consent to the processing of your health data for the purpose of providing this service.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Button label={loading ? 'Saving...' : 'Agree & Continue'} onPress={handleAccept} disabled={loading} style={styles.agreeButton} />
        <Button label="Not Now" variant="ghost" onPress={handleNotNow} disabled={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  headerTitle: { color: colors.ink, marginBottom: spacing.xl },
  sectionTitle: { color: colors.ink, marginTop: spacing.md, marginBottom: spacing.sm },
  paragraph: { color: colors.inkSoft, lineHeight: 24, marginBottom: spacing.md },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surface },
  agreeButton: { marginBottom: spacing.sm },
});
