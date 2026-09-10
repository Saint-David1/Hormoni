import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GlassCard } from './GlassCard';
import { colors, radii, spacing, textStyles } from '../theme/tokens';

interface InsightHeroCardProps {
  headline: string;
  subheadline?: string;
  stats: { label: string; value: string }[];
}

export const InsightHeroCard: React.FC<InsightHeroCardProps> = ({ headline, subheadline, stats }) => {
  return (
    <LinearGradient
      colors={[colors.phaseFertileSoft, colors.phasePeriodSoft]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {subheadline && <Text style={[textStyles.caption, styles.subheadline]}>{subheadline}</Text>}
      <Text style={[textStyles.cardTitle, styles.headline]}>{headline}</Text>

      <View style={styles.statsRow}>
        {stats.map((stat, index) => (
          <GlassCard key={stat.label} style={[styles.statCard, index % 2 === 1 && styles.statCardOffset]}>
            <Text style={[textStyles.caption, styles.statLabel]}>{stat.label}</Text>
            <Text style={[textStyles.bodyStrong, styles.statValue]}>{stat.value}</Text>
          </GlassCard>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  subheadline: { color: colors.inkSoft, marginBottom: spacing.xs },
  headline: { color: colors.ink, marginBottom: spacing.lg },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  statCard: { flex: 1, transform: [{ rotate: '-2deg' }] },
  statCardOffset: { transform: [{ rotate: '2deg' }] },
  statLabel: { color: colors.inkSoft },
  statValue: { color: colors.ink, marginTop: 2 },
});
