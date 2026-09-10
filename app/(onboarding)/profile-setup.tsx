import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, LogTag } from '../../components';
import { colors, spacing, textStyles } from '../../theme/tokens';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

const GOAL_GROUPS: { title: string; goals: string[] }[] = [
  {
    title: 'Cycle & Reproductive Health',
    goals: ['Understand and track my cycle', 'Track period irregularities', 'Learn about reproductive health and fertility'],
  },
  {
    title: 'Lifestyle & Nutrition',
    goals: ['Improve my eating habits', 'Become more active', 'Manage my weight and lifestyle'],
  },
  {
    title: 'Symptoms & Wellbeing',
    goals: ['Understand and track my symptoms', 'Track my mood and wellbeing'],
  },
  {
    title: 'PCOS Education',
    goals: ['Learn more about PCOS'],
  },
];

export default function ProfileSetupScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setOnboardingGoals = useAuthStore((state) => state.setOnboardingGoals);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleGoal = (goal: string) => {
    setGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));
  };

  const handleNext = async () => {
    if (!user) return;
    setLoading(true);

    await supabase.from('profiles').upsert({
      id: user.id,
      first_name: firstName.trim() || null,
      last_name: lastName.trim() || null,
      age: parseInt(age, 10) || null,
    });

    setOnboardingGoals(goals);
    setLoading(false);
    router.push('/(onboarding)/assessment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[textStyles.screenTitle, styles.title]}>Let's get to know you</Text>
          <Text style={[textStyles.body, styles.subtitle]}>Tell us a bit about yourself so we can personalize your experience.</Text>

          <Card style={styles.card}>
            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                <Text style={[textStyles.bodyStrong, styles.label]}>First name</Text>
                <TextInput style={styles.input} placeholder="e.g. Ada" value={firstName} onChangeText={setFirstName} />
              </View>
              <View style={styles.nameField}>
                <Text style={[textStyles.bodyStrong, styles.label]}>Last name</Text>
                <TextInput style={styles.input} placeholder="e.g. Okoro" value={lastName} onChangeText={setLastName} />
              </View>
            </View>
            <Text style={[textStyles.bodyStrong, styles.label]}>Your age</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 28"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              maxLength={3}
            />
          </Card>

          <Text style={[textStyles.cardTitle, styles.sectionTitle]}>What would you like Hornomi to help you with?</Text>
          {GOAL_GROUPS.map((group) => (
            <View key={group.title} style={styles.group}>
              <Text style={[textStyles.bodyStrong, styles.groupTitle]}>{group.title}</Text>
              <View style={styles.goalsContainer}>
                {group.goals.map((goal) => (
                  <LogTag key={goal} label={goal} selected={goals.includes(goal)} onPress={() => toggleGoal(goal)} />
                ))}
              </View>
            </View>
          ))}
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
  title: { color: colors.ink, marginBottom: spacing.xs },
  subtitle: { color: colors.inkSoft, marginBottom: spacing.xl },
  card: { marginBottom: spacing.xl },
  nameRow: { flexDirection: 'row', gap: spacing.md },
  nameField: { flex: 1 },
  label: { color: colors.ink, marginBottom: spacing.sm, marginTop: spacing.sm },
  input: { borderWidth: 1, borderColor: colors.bgWash, borderRadius: 14, padding: spacing.md, fontFamily: 'Poppins_400Regular', fontSize: 16, backgroundColor: colors.surfaceAlt },
  sectionTitle: { color: colors.ink, marginBottom: spacing.md },
  group: { marginBottom: spacing.lg },
  groupTitle: { color: colors.inkSoft, marginBottom: spacing.sm },
  goalsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surfaceAlt },
});
