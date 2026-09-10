import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TopAppBar, Button, Card } from '../../../components';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { useAuthStore } from '../../../store/authStore';
import { generateUUID } from '../../../lib/uuid';
import { supabase } from '../../../lib/supabase';
import { toLocalDateKey } from '../../../lib/date';

interface Habit {
  id: string;
  name: string;
  target_frequency: string | null;
}

export default function HabitsScreen() {
  const user = useAuthStore((state) => state.user);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completedToday, setCompletedToday] = useState<Set<string>>(new Set());
  const [newHabitName, setNewHabitName] = useState('');
  const [adding, setAdding] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    const { data: habitRows } = await supabase.from('habits').select('id, name, target_frequency').eq('user_id', user.id).order('created_at', { ascending: false });
    setHabits(habitRows ?? []);

    const { data: completions } = await supabase.from('habit_completions').select('habit_id, completed_at').eq('user_id', user.id);
    const todayKey = toLocalDateKey(new Date());
    const done = new Set(
      (completions ?? []).filter((c) => toLocalDateKey(new Date(c.completed_at)) === todayKey).map((c) => c.habit_id)
    );
    setCompletedToday(done);
  }, [user]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const addHabit = async () => {
    if (!user || !newHabitName.trim()) return;
    setAdding(true);
    const { error } = await supabase.from('habits').insert({ id: generateUUID(), user_id: user.id, name: newHabitName.trim() });
    setAdding(false);
    if (error) {
      Alert.alert('Error', 'Could not add habit.');
      return;
    }
    setNewHabitName('');
    load();
  };

  const toggleCompletion = async (habitId: string) => {
    if (!user) return;
    if (completedToday.has(habitId)) return;
    const { error } = await supabase.from('habit_completions').insert({
      id: generateUUID(),
      habit_id: habitId,
      user_id: user.id,
    });
    if (!error) {
      setCompletedToday((prev) => new Set(prev).add(habitId));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Habits" />
      <ScrollView contentContainerStyle={styles.content}>
        {habits.map((habit) => {
          const done = completedToday.has(habit.id);
          return (
            <Card key={habit.id}>
              <View style={styles.habitRow}>
                <Text style={[textStyles.bodyStrong, { color: colors.ink, flex: 1 }]}>{habit.name}</Text>
                <TouchableOpacity onPress={() => toggleCompletion(habit.id)} disabled={done}>
                  <Ionicons name={done ? 'checkmark-circle' : 'ellipse-outline'} size={28} color={done ? colors.success : colors.inkFaint} />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}

        <Card>
          <Text style={[textStyles.bodyStrong, styles.label]}>New habit</Text>
          <TextInput style={styles.input} placeholder="e.g. Drink water after waking up" value={newHabitName} onChangeText={setNewHabitName} />
          <Button label={adding ? 'Adding...' : 'Add Habit'} onPress={addHabit} disabled={!newHabitName.trim() || adding} style={styles.addButton} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120 },
  habitRow: { flexDirection: 'row', alignItems: 'center' },
  label: { color: colors.ink, marginBottom: spacing.sm },
  input: { borderWidth: 1, borderColor: colors.bgWash, borderRadius: 14, padding: spacing.md, fontFamily: 'Poppins_400Regular', fontSize: 16, backgroundColor: colors.surfaceAlt, marginBottom: spacing.md },
  addButton: {},
});
