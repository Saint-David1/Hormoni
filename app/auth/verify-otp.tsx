import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { supabase } from '../../lib/supabase';
import { Button, Card } from '../../components';
import { colors, typography, spacing } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

export default function VerifyOtpScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);

  const handleVerify = async () => {
    if (!token) return Alert.alert('Error', 'Please enter the verification code');
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: token.trim(),
      type: 'email',
    });
    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else if (data.session && data.user) {
      setSession(data.session);
      setUser(data.user);
      // App layout will automatically redirect to onboarding or tabs
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    const redirectUrl = Linking.createURL('/auth/callback');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    setResending(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Code Sent', 'A new verification code / link has been sent to your email.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <View style={styles.content}>
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>We sent a sign-in link to {email || 'your email'}</Text>

          <Card style={styles.cardStyle}>
            <Text style={styles.primaryInstruction}>
              Tap the link in your email to sign in automatically.
            </Text>

            <View style={styles.footerRow}>
              <Text style={styles.helperText}>Didn't receive a link?</Text>
              <TouchableOpacity onPress={handleResend} disabled={resending}>
                <Text style={styles.resendLink}>{resending ? 'Sending...' : 'Resend Link'}</Text>
              </TouchableOpacity>
            </View>
          </Card>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <Card style={styles.cardStyle}>
            <Text style={styles.label}>Have a 6-digit code?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit code"
              value={token}
              onChangeText={setToken}
              keyboardType="number-pad"
              autoCapitalize="none"
              maxLength={10}
            />
            <Button
              label={loading ? 'Verifying...' : 'Verify Code'}
              onPress={handleVerify}
              disabled={loading || !token}
              style={styles.button}
              variant="secondary"
            />
          </Card>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  cardStyle: {
    padding: spacing.lg,
  },
  title: {
    fontFamily: typography.display,
    fontSize: 32,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.inkSoft,
    marginBottom: spacing.xl,
  },
  label: {
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.ink,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: spacing.md,
    fontFamily: typography.body,
    fontSize: 16,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  button: {
    width: '100%',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  helperText: {
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.inkSoft,
  },
  resendLink: {
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  primaryInstruction: {
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.line,
  },
  dividerText: {
    fontFamily: typography.mono,
    fontSize: 12,
    color: colors.inkSoft,
    marginHorizontal: spacing.md,
  },
});

