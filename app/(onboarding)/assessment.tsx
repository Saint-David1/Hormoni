import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Callout } from '../../components';
import { colors, typography, spacing } from '../../theme/tokens';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

// MEDICAL-REVIEW-REQUIRED: The following assessment questions, scoring logic, and escalation thresholds need medical advisor review.
const ASSESSMENT_QUESTIONS = [
  {
    id: 'q1',
    text: '[Sample — pending Medical Advisor review] Do you experience irregular menstrual cycles?',
    options: ['Yes', 'No', 'Not sure'],
  },
  {
    id: 'q2',
    text: '[Sample — pending Medical Advisor review] Have you noticed unusual hair growth or hair loss?',
    options: ['Yes', 'No'],
  },
  {
    id: 'q3',
    text: '[Sample — pending Medical Advisor review] Do you struggle with acne or oily skin?',
    options: ['Yes', 'No', 'Sometimes'],
  },
];

export default function AssessmentScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const question = ASSESSMENT_QUESTIONS[currentStep];

  const handleSelect = async (option: string) => {
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);

    if (currentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await finishAssessment(newAnswers);
    }
  };

  const finishAssessment = async (finalAnswers: Record<string, string>) => {
    if (!user) return;
    setLoading(true);

    // MEDICAL-REVIEW-REQUIRED: Placeholder scoring logic
    const isFlagged = Object.values(finalAnswers).includes('Yes');
    
    await supabase.from('health_assessments').insert({
      user_id: user.id,
      answers: finalAnswers,
      result: isFlagged ? 'High likelihood of symptoms' : 'Low likelihood of symptoms',
      flagged: isFlagged,
    });

    setLoading(false);
    router.push('/(onboarding)/focus-summary');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Self-Assessment</Text>
        <Text style={styles.subtitle}>Question {currentStep + 1} of {ASSESSMENT_QUESTIONS.length}</Text>
        
        <Callout 
          variant="warning"
          message="This assessment is not a diagnostic tool. Please consult a healthcare professional for a formal diagnosis." 
        />

        <Card style={styles.card}>
          <Text style={styles.questionText}>{question.text}</Text>
          <View style={styles.options}>
            {question.options.map(option => (
              <Button
                key={option}
                label={option}
                variant="outline"
                onPress={() => handleSelect(option)}
                style={styles.optionButton}
                disabled={loading}
              />
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink, marginBottom: spacing.xs },
  subtitle: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, marginBottom: spacing.xl },
  card: { padding: spacing.xl },
  questionText: { fontFamily: typography.body, fontSize: 18, fontWeight: '600', color: colors.ink, marginBottom: spacing.xl, lineHeight: 26 },
  options: { gap: spacing.md },
  optionButton: { width: '100%' },
});
