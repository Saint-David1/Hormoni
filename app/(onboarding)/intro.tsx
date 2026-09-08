import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, IconChip } from '../../components';
import { colors, typography, spacing } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

export default function IntroScreen() {
  const router = useRouter();
  const setHasSeenIntro = useAuthStore(state => state.setHasSeenIntro);

  const handleGetStarted = () => {
    setHasSeenIntro(true);
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <IconChip size={64}>
            <Text style={{ fontSize: 32 }}>👋</Text>
          </IconChip>
          <Text style={styles.title}>Welcome to Hornomi</Text>
          <Text style={styles.subtitle}>Your companion for understanding and tracking PCOS.</Text>
        </View>

        <View style={styles.footer}>
          <Button label="Get Started" onPress={handleGetStarted} style={styles.button} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.xl, justifyContent: 'space-between' },
  header: { marginTop: spacing.xxl, alignItems: 'center' },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink, marginTop: spacing.lg, marginBottom: spacing.xs, textAlign: 'center' },
  subtitle: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, textAlign: 'center', lineHeight: 24 },
  button: { width: '100%', marginBottom: spacing.md },
  footer: { paddingBottom: spacing.xl },
});
