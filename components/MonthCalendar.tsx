import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, textStyles } from '../theme/tokens';
import { toLocalDateKey as toDateKey } from '../lib/date';

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface MonthCalendarProps {
  month: Date;
  onMonthChange?: (date: Date) => void;
  periodDays: Set<string>;
  predictedDays: Set<string>;
  markedDays?: Set<string>;
  selectedDate?: string;
  onSelectDate?: (dateKey: string) => void;
}

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  month,
  onMonthChange,
  periodDays,
  predictedDays,
  markedDays,
  selectedDate,
  onSelectDate,
}) => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const todayKey = toDateKey(new Date());

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const goToMonth = (delta: number) => {
    onMonthChange?.(new Date(year, monthIndex + delta, 1));
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goToMonth(-1)} hitSlop={8}>
          <Ionicons name="chevron-back" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text style={textStyles.cardTitle}>
          {month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </Text>
        <TouchableOpacity onPress={() => goToMonth(1)} hitSlop={8}>
          <Ionicons name="chevron-forward" size={20} color={colors.ink} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekdayRow}>
        {WEEKDAY_LABELS.map((label, i) => (
          <Text key={i} style={[textStyles.caption, styles.weekdayLabel]}>{label}</Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((day, index) => {
          if (day === null) return <View key={index} style={styles.cell} />;

          const dateKey = toDateKey(new Date(year, monthIndex, day));
          const isPeriod = periodDays.has(dateKey);
          const isPredicted = predictedDays.has(dateKey);
          const isMarked = markedDays?.has(dateKey);
          const isToday = dateKey === todayKey;
          const isSelected = dateKey === selectedDate;

          return (
            <TouchableOpacity
              key={index}
              style={styles.cell}
              onPress={() => onSelectDate?.(dateKey)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.dayCircle,
                  isPeriod && styles.periodDay,
                  isPredicted && !isPeriod && styles.predictedDay,
                  isSelected && styles.selectedDay,
                  isToday && !isSelected && styles.todayDay,
                ]}
              >
                <Text
                  style={[
                    textStyles.body,
                    styles.dayText,
                    (isPeriod || isSelected) && { color: colors.onBrand },
                  ]}
                >
                  {day}
                </Text>
              </View>
              {isMarked && <View style={styles.markDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const CELL_SIZE = 40;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  weekdayLabel: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    color: colors.inkFaint,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: `${100 / 7}%`,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: colors.ink,
  },
  periodDay: {
    backgroundColor: colors.phasePeriod,
  },
  predictedDay: {
    borderWidth: 1.5,
    borderColor: colors.phaseOvulation,
    borderStyle: 'dashed',
  },
  selectedDay: {
    backgroundColor: colors.primary,
  },
  todayDay: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  markDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
