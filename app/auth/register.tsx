import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { Button, Card } from '../../components';
import { colors, typography, spacing } from '../../theme/tokens';
import { useAuthStore } from '../../store/authStore';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please enter your email and password');
    if (password.length < 6) return Alert.alert('Error', 'Password must be at least 6 characters');
    if (password !== confirmPassword) return Alert.alert('Error', "Passwords don't match");

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    if (data.session && data.user) {
      // Email confirmation is disabled for this project — sign the user in immediately.
      setSession(data.session);
      setUser(data.user);
    } else {
      // Email confirmation is required on the Supabase project — the user must
      // click the link sent to their inbox before a session is created.
      setAwaitingConfirmation(true);
    }
  };

  if (awaitingConfirmation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>
            We sent a confirmation link to {email}. Tap it to activate your account, then come back and log in.
          </Text>
          <Button label="Back to Log In" onPress={() => router.replace('/auth/login')} style={styles.button} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <View style={styles.content}>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Enter your email and password to sign up for Hornomi.</Text>

          <Card>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="At least 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <Button
              label={loading ? 'Creating account...' : 'Sign Up'}
              onPress={handleRegister}
              disabled={loading}
              style={styles.button}
            />

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>Already have an account? </Text>
              <Link href="/auth/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.toggleLink}>Log in</Text>
                </TouchableOpacity>
              </Link>
            </View>
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  toggleText: {
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.inkSoft,
  },
  toggleLink: {
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
