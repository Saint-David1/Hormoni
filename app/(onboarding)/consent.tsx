import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { Button, Callout } from '../../components';
import { colors, typography, spacing } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

export default function ConsentScreen() {
  const router = useRouter();
  const setHasConsented = useAuthStore(state => state.setHasConsented);
  const user = useAuthStore(state => state.user);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Data & Privacy</Text>
        
        <Callout 
          variant="safety" 
          title="Your health data is yours" 
          message="We use advanced security to ensure your data is isolated. Only you can access your personal health records." 
        />

        <Text style={styles.sectionTitle}>What you need to know</Text>
        <Text style={styles.paragraph}>
          Hornomi is designed to help you track and understand your symptoms. It is not a diagnostic tool and does not replace professional medical advice.
        </Text>
        
        <Text style={styles.paragraph}>
          By continuing, you agree to our Terms of Service and Privacy Policy, and you consent to the processing of your health data for the purpose of providing this service.
        </Text>

      </ScrollView>

      <View style={styles.footer}>
        <Button 
          label={loading ? 'Saving...' : 'I Agree'} 
          onPress={handleAccept} 
          disabled={loading} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink, marginBottom: spacing.xl },
  sectionTitle: { fontFamily: typography.body, fontSize: 18, fontWeight: '600', color: colors.ink, marginTop: spacing.md, marginBottom: spacing.sm },
  paragraph: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, lineHeight: 24, marginBottom: spacing.md },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
});
