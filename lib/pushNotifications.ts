import * as Notifications from 'expo-notifications';
import { supabase } from './supabase';
import { requestNotificationPermissions } from './reminders';

const PROJECT_ID = '69d4c938-1b6a-4c08-a7a4-d511f2918d71';

// Registers this device for push notifications and stores the Expo push
// token against the signed-in user, so the notify-new-content Edge Function
// (triggered by a Database Webhook on educational_content/foods) has
// somewhere to send to. Safe to call repeatedly — upserts on the token.
export async function registerForPushNotificationsAsync(userId: string): Promise<void> {
  try {
    const granted = await requestNotificationPermissions();
    if (!granted) return;

    const token = await Notifications.getExpoPushTokenAsync({ projectId: PROJECT_ID });

    await supabase
      .from('push_tokens')
      .upsert({ user_id: userId, expo_push_token: token.data }, { onConflict: 'expo_push_token' });
  } catch (error) {
    console.error('Failed to register for push notifications', error);
  }
}
