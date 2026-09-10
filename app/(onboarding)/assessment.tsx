import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Callout, LogTag } from '../../components';
import { colors, spacing, textStyles } from '../../theme/tokens';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

type Question =
  | { id: string; type: 'single'; text: string; options: string[] }
  | { id: string; type: 'multi'; text: string; options: string[] };

const QUESTIONS: Question[] = [
  {
    id: 'cycle_regularity',
    type: 'single',
    text: 'How would you describe your menstrual cycle?',
    options: ['Usually regular', 'Sometimes irregular', 'Often irregular', "I don't know"],
  },
  {
    id: 'symptoms',
    type: 'multi',
    text: 'Which of these do you experience?',
    options: [
      'Irregular/missed periods',
      'Acne',
      'Excess facial/body hair',
      'Hair thinning/hair loss',
      'Weight changes',
      'Fatigue',
      'Mood changes',
      'Pelvic/abdominal discomfort',
      'Other',
      'None of these',
    ],
  },
  {
    id: 'lifestyle_focus',
    type: 'multi',
    text: 'Which areas would you like to work on?',
    options: ['Nutrition', 'Exercise', 'Sleep', 'Hydration', 'Weight management', 'Stress management'],
  },
  {
    id: 'reproductive_health',
    type: 'single',
    text: 'Would you like access to reproductive health and fertility education?',
    options: ['Yes', 'Not now'],
  },
];

export default function AssessmentScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setOnboardingFocusAreas = useAuthStore((state) => state.setOnboardingFocusAreas);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(false);

  const question = QUESTIONS[currentStep];

  const selectSingle = (option: string) => {
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);
    advance(newAnswers);
  };

  const toggleMulti = (option: string) => {
    const current = (answers[question.id] as string[]) || [];
    const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
    setAnswers({ ...answers, [question.id]: next });
  };

  const advance = (finalAnswers: Record<string, string | string[]>) => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finish(finalAnswers);
    }
  };

  const finish = async (finalAnswers: Record<string, string | string[]>) => {
    if (!user) return;
    setLoading(true);

    await supabase.from('health_assessments').insert({
      user_id: user.id,
      answers: finalAnswers,
    });

    const lifestyleFocus = (finalAnswers.lifestyle_focus as string[]) || [];
    setOnboardingFocusAreas(lifestyleFocus);

    setLoading(false);
    router.push('/(onboarding)/personalize');
  };

  const isMulti = question.type === 'multi';
  const selectedMulti = (answers[question.id] as string[]) || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.screenTitle, styles.title]}>Health Profile</Text>
        <Text style={[textStyles.body, styles.subtitle]}>Question {currentStep + 1} of {QUESTIONS.length}</Text>

        <Callout
          variant="warning"
          message="This is not a diagnostic tool. Please consult a healthcare professional for a formal diagnosis."
        />

        <Card style={styles.card}>
          <Text style={[textStyles.cardTitle, styles.questionText]}>{question.text}</Text>
          <View style={styles.options}>
            {question.options.map((option) => (
              <LogTag
                key={option}
                label={option}
                selected={isMulti ? selectedMulti.includes(option) : answers[question.id] === option}
                onPress={() => (isMulti ? toggleMulti(option) : selectSingle(option))}
              />
            ))}
          </View>
        </Card>
      </ScrollView>

      {isMulti && (
        <View style={styles.footer}>
          <Button
            label={loading ? 'Saving...' : currentStep === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
            onPress={() => advance(answers)}
            disabled={loading}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  title: { color: colors.ink, marginBottom: spacing.xs },
  subtitle: { color: colors.inkSoft, marginBottom: spacing.xl },
  card: { padding: spacing.xl },
  questionText: { color: colors.ink, marginBottom: spacing.xl, lineHeight: 26 },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  footer: { padding: spacing.xl, borderTopWidth: 1, borderColor: colors.bgWash, backgroundColor: colors.surfaceAlt },
});
