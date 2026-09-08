import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { colors, typography, spacing } from '../../../../theme/tokens';
import { Callout } from '../../../../components';

const ARTICLE_CONTENT: Record<string, string> = {
  '1': `
# Managing Insulin Resistance with Local Staples

**// MEDICAL-REVIEW-REQUIRED: [Sample — pending Medical Advisor review]**

When managing PCOS, insulin resistance is a common challenge. However, you don't need to completely abandon traditional Nigerian foods. The key is portion control and choosing low-glycemic index (GI) options.

## Swapping Your Swallows
Instead of high-GI options like white rice, yam, or regular eba, consider these alternatives:
*   **Unripe Plantain Amala:** High in resistant starch and dietary fiber, which slows down glucose absorption.
*   **Wheat or Guinea Corn (Tuwo):** Better whole-grain alternatives, provided they are not overly processed.

## The Power of Soups
Nigerian vegetable soups are excellent for PCOS diets because they are packed with micronutrients and fiber:
*   **Efo Riro & Edikaikong:** Rich in leafy greens (spinach, pumpkin leaves) which help regulate blood sugar levels.
*   **Ogbono:** The seeds have a good fiber profile that helps keep you full for longer.

*Remember: Always consult with a registered dietitian to tailor a meal plan that fits your specific hormonal needs and metabolic health.*
  `,
  '2': `
# Understanding Irregular Cycles

**// MEDICAL-REVIEW-REQUIRED: [Sample — pending Medical Advisor review]**

Irregular menstrual cycles are a hallmark of PCOS, but understanding the underlying mechanisms can empower you to manage them better.

## Why Does It Happen?
In PCOS, an imbalance of reproductive hormones—specifically elevated androgens (male hormones) and luteinizing hormone (LH)—can disrupt the normal ovulation process. Without regular ovulation, the menstrual cycle becomes unpredictable.

## When to Seek Help
While occasional irregularity is common, you should consult a healthcare provider if:
1. You go more than 3 months without a period.
2. Your periods are excessively heavy or last longer than 7 days.
3. You experience severe pelvic pain.
  `,
  '3': `
# Stress and Cortisol in PCOS

**// MEDICAL-REVIEW-REQUIRED: [Sample — pending Medical Advisor review]**

Managing PCOS isn't just about diet and exercise; managing your stress levels is equally important. 

## The Cortisol Connection
Stress triggers the release of cortisol from the adrenal glands. In individuals with PCOS, elevated cortisol can worsen insulin resistance and increase androgen production, leading to more pronounced symptoms like acne and hair loss.

## Practical Stress Management
*   **Mindfulness & Meditation:** Even 5 minutes of deep breathing can lower your baseline cortisol.
*   **Adequate Sleep:** Aim for 7-9 hours of quality sleep per night.
*   **Gentle Movement:** Instead of high-intensity workouts that spike cortisol, try yoga, walking, or light stretching.
  `
};

export default function ArticleScreen() {
  const { id } = useLocalSearchParams();
  const content = ARTICLE_CONTENT[id as string] || 'Article not found.';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Callout 
          variant="warning"
          title="Disclaimer" 
          message="The following content is for informational purposes only and does not constitute medical advice." 
        />
        
        <View style={styles.markdownContainer}>
          <Markdown style={markdownStyles}>
            {content}
          </Markdown>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  markdownContainer: { marginTop: spacing.lg },
});

const markdownStyles = {
  heading1: { fontFamily: typography.display, fontSize: 28, color: colors.ink, marginBottom: spacing.md },
  heading2: { fontFamily: typography.body, fontSize: 20, fontWeight: '600' as const, color: colors.ink, marginTop: spacing.xl, marginBottom: spacing.sm },
  body: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, lineHeight: 24 },
  bullet_list: { marginTop: spacing.sm, marginBottom: spacing.md },
  list_item: { fontFamily: typography.body, fontSize: 16, color: colors.inkSoft, lineHeight: 24, marginBottom: spacing.xs },
  strong: { fontWeight: 'bold' as const, color: colors.ink },
  em: { fontStyle: 'italic' as const },
};
