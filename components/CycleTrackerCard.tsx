import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Ring } from './Ring';
import { PhaseDot } from './PhaseDot';
import { Pill } from './Pill';
import { colors, spacing, textStyles, PhaseKey } from '../theme/tokens';

const PHASE_LABELS: Record<PhaseKey, string> = {
  period: 'Period',
  fertile: 'Fertile window',
  ovulation: 'Ovulation',
  luteal: 'Luteal phase',
};

interface CycleTrackerCardProps {
  hasCycles: boolean;
  cycleDay: number;
  predictedLength: number;
  progress: number;
  phase: PhaseKey;
  confidence: 'estimated' | 'confirmed';
  onLogPress?: () => void;
}

export const CycleTrackerCard: React.FC<CycleTrackerCardProps> = ({
  hasCycles,
  cycleDay,
  predictedLength,
  progress,
  phase,
  confidence,
  onLogPress,
}) => {
  if (!hasCycles) {
    return (
      <Card hero>
        <Text style={[textStyles.cardTitle, styles.center]}>Log your first period to start tracking</Text>
        <Text style={[textStyles.body, styles.center, styles.subtitle]}>
          Once you log a cycle, we'll show your day-by-day progress here.
        </Text>
        <TouchableOpacity onPress={onLogPress} style={styles.logButton}>
          <Text style={[textStyles.bodyStrong, { color: colors.onBrand }]}>Log period</Text>
        </TouchableOpacity>
      </Card>
    );
  }

  return (
    <Card hero>
      <Text style={[textStyles.cardTitle, styles.center]}>Current Cycle</Text>
      <Text style={[textStyles.body, styles.center, styles.subtitle]}>
        {confidence === 'estimated' ? 'Estimated based on limited data' : 'Based on your recorded cycles'}
      </Text>

      <View style={styles.ringWrap}>
        <Ring size={200} strokeWidth={14} progress={progress}>
          <View style={styles.ringCenter}>
            <Text style={[textStyles.caption, { color: colors.inkSoft }]}>Day</Text>
            <Text style={[textStyles.displayNumber, { color: colors.ink }]}>{cycleDay}</Text>
            <Text style={[textStyles.caption, { color: colors.inkSoft }]}>{PHASE_LABELS[phase]}</Text>
          </View>
        </Ring>
      </View>

      <View style={styles.legendRow}>
        <PhaseDot phase="fertile" label="Fertile" />
        <PhaseDot phase="period" label="Period" />
        <PhaseDot phase="ovulation" label="Ovulation" />
      </View>

      <Pill
        style={styles.pill}
        variant="phase"
        label={`${confidence === 'estimated' ? 'Estimated' : 'Predicted'}: ${predictedLength} days`}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
  subtitle: { color: colors.inkSoft, marginBottom: spacing.lg },
  ringWrap: { alignItems: 'center', marginBottom: spacing.lg },
  ringCenter: { alignItems: 'center' },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  pill: { alignSelf: 'center' },
  logButton: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
});
