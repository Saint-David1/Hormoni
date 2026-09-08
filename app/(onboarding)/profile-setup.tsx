import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../components';
import { colors, typography, spacing } from '../../theme/tokens';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [age, setAge] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const availableGoals = [
    'Track symptoms',
    'Manage weight',
    'Understand my cycle',
    'Find educational content',
    'Get medical guidance',
  ];

  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handleNext = async () => {
    if (!user) return;
    setLoading(true);

    // Save profile to Supabase
    await supabase.from('profiles').upsert({
      id: user.id,
      age: parseInt(age, 10) || null,
      // goals are not in the current DB schema per Section 5, but we would typically save them to a user preferences JSON
    });

    setLoading(false);
    router.push('/(onboarding)/assessment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Let's get to know you</Text>
          <Text style={styles.subtitle}>Tell us a bit about yourself so we can personalize your experience.</Text>

          <Card style={styles.card}>
            <Text style={styles.label}>Your Age</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 28"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              maxLength={3}
            />
          </Card>

          <Text style={styles.sectionTitle}>What are your main goals?</Text>
          <View style={styles.goalsContainer}>
            {availableGoals.map(goal => {
              const isSelected = goals.includes(goal);
              return (
                <Button
                  key={goal}
                  label={goal}
                  variant={isSelected ? 'primary' : 'outline'}
                  onPress={() => toggleGoal(goal)}
                  style={styles.goalButton}
                />
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Button label={loading ? 'Saving...' : 'Next'} onPress={handleNext} disabled={!age || goals.length === 0 || loading} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  content: { padding: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink, marginBottom: spacing.xs },
  subtitle: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, marginBottom: spacing.xl },
  card: { marginBottom: spacing.xl },
  label: { fontFamily: typography.body, fontSize: 14, fontWeight: '600', color: colors.ink, marginBottom: spacing.sm },
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: spacing.md, fontFamily: typography.body, fontSize: 16, backgroundColor: colors.surface },
  sectionTitle: { fontFamily: typography.body, fontSize: 18, fontWeight: '600', color: colors.ink, marginBottom: spacing.md },
  goalsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  goalButton: { alignSelf: 'flex-start', paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: 100, marginBottom: spacing.sm, marginRight: spacing.sm },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
});
