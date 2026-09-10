import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TopAppBar, Button, Card } from '../../../components';
import { colors, spacing, textStyles } from '../../../theme/tokens';
import { useAuthStore } from '../../../store/authStore';
import { supabase } from '../../../lib/supabase';
import { generateUUID } from '../../../lib/uuid';
import { Reminder, fetchReminders, reconcileScheduledNotifications, requestNotificationPermissions } from '../../../lib/reminders';

export default function RemindersScreen() {
  const user = useAuthStore((state) => state.user);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('09:00');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    const data = await fetchReminders(user.id);
    setReminders(data);
    await reconcileScheduledNotifications(data);
  }, [user]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleAdd = async () => {
    if (!user || !title.trim()) return;
    const granted = await requestNotificationPermissions();
    if (!granted) {
      Alert.alert('Notifications disabled', 'Enable notifications in Settings to get reminders.');
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('reminders').insert({
      id: generateUUID(),
      user_id: user.id,
      title: title.trim(),
      scheduled_time: `${time}:00`,
    });
    setSaving(false);

    if (error) {
      Alert.alert('Error', 'Could not save reminder.');
      return;
    }
    setTitle('');
    load();
  };

  const toggleReminder = async (reminder: Reminder) => {
    await supabase.from('reminders').update({ enabled: !reminder.enabled }).eq('id', reminder.id);
    load();
  };

  const deleteReminder = async (reminder: Reminder) => {
    await supabase.from('reminders').delete().eq('id', reminder.id);
    load();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopAppBar title="Reminders" />
      <ScrollView contentContainerStyle={styles.content}>
        {reminders.map((reminder) => (
          <Card key={reminder.id}>
            <View style={styles.row}>
              <View style={styles.textCol}>
                <Text style={[textStyles.bodyStrong, { color: colors.ink }]}>{reminder.title}</Text>
                <Text style={[textStyles.caption, { color: colors.inkFaint }]}>{reminder.scheduled_time.slice(0, 5)} · Daily</Text>
              </View>
              <Switch
                value={reminder.enabled}
                onValueChange={() => toggleReminder(reminder)}
                trackColor={{ false: colors.bgWash, true: colors.primarySoft }}
                thumbColor={reminder.enabled ? colors.primary : colors.inkFaint}
              />
              <TouchableOpacity onPress={() => deleteReminder(reminder)} style={styles.deleteButton} hitSlop={8}>
                <Ionicons name="trash-outline" size={18} color={colors.errorMuted} />
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        <Card>
          <Text style={[textStyles.bodyStrong, styles.label]}>New reminder</Text>
          <TextInput style={styles.input} placeholder="e.g. Drink water" value={title} onChangeText={setTitle} />
          <Text style={[textStyles.bodyStrong, styles.label]}>Time (24h, HH:MM)</Text>
          <TextInput style={styles.input} placeholder="09:00" value={time} onChangeText={setTime} />
          <Button label={saving ? 'Saving...' : 'Add Reminder'} onPress={handleAdd} disabled={!title.trim() || saving} style={styles.addButton} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screen, paddingBottom: 120 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  textCol: { flex: 1 },
  deleteButton: { padding: spacing.xs },
  label: { color: colors.ink, marginBottom: spacing.sm, marginTop: spacing.sm },
  input: { borderWidth: 1, borderColor: colors.bgWash, borderRadius: 14, padding: spacing.md, fontFamily: 'Poppins_400Regular', fontSize: 16, backgroundColor: colors.surfaceAlt, marginBottom: spacing.sm },
  addButton: { marginTop: spacing.sm },
});
