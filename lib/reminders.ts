import * as Notifications from 'expo-notifications';
import { supabase } from './supabase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export interface Reminder {
  id: string;
  title: string;
  scheduled_time: string; // HH:MM:SS
  repeat_pattern: string;
  enabled: boolean;
}

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function fetchReminders(userId: string): Promise<Reminder[]> {
  const { data } = await supabase
    .from('reminders')
    .select('id, title, scheduled_time, repeat_pattern, enabled')
    .eq('user_id', userId)
    .order('scheduled_time');
  return data ?? [];
}

// Cancels every locally scheduled notification and reschedules from the
// current set of enabled reminders. Simple and safe at this scale — this app
// only ever has a handful of reminders per user.
export async function reconcileScheduledNotifications(reminders: Reminder[]): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  for (const reminder of reminders) {
    if (!reminder.enabled) continue;
    const [hour, minute] = reminder.scheduled_time.split(':').map(Number);

    await Notifications.scheduleNotificationAsync({
      content: { title: 'Hormoni', body: reminder.title },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  }
}
