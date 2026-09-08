import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors, typography, spacing } from '../../../theme/tokens';
import { Card, Callout } from '../../../components';

export default function LegalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.title}>Legal & Compliance</Text>
        
        <Callout 
          variant="warning"
          title="Medical Disclaimer"
          message="Hornomi is a health tracking and educational application. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."
        />

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Terms of Service</Text>
          <Text style={styles.paragraph}>
            By using Hornomi, you agree to these terms. We provide tools to log health data and view educational content. We do not guarantee the accuracy of predictive algorithms (such as cycle prediction) and you use them at your own risk.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.paragraph}>
            Your health data is considered highly sensitive. We use Row Level Security (RLS) on our servers to ensure that your data is mathematically isolated from other users. We will never sell your personal health records to third-party advertisers.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Data Processing Consent</Text>
          <Text style={styles.paragraph}>
            By continuing to use this application, you consent to the storage and processing of your health metrics as outlined during your initial onboarding (Version 1.0.0). You may revoke this consent by deleting your account from the Profile settings menu.
          </Text>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink, marginBottom: spacing.xl },
  card: { padding: spacing.xl, marginTop: spacing.md },
  sectionTitle: { fontFamily: typography.body, fontSize: 18, fontWeight: '600', color: colors.ink, marginBottom: spacing.sm },
  paragraph: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, lineHeight: 24 },
});
