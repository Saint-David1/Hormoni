import NetInfo from '@react-native-community/netinfo';
import { supabase } from './supabase';
import { getQueue, removeFromQueue } from './db';

let isSyncing = false;

export const syncOfflineData = async () => {
  if (isSyncing) return;

  const state = await NetInfo.fetch();
  if (!state.isConnected) return;

  isSyncing = true;

  try {
    const queue = await getQueue();
    if (queue.length === 0) {
      isSyncing = false;
      return;
    }

    for (const item of queue) {
      try {
        const payload = JSON.parse(item.payload);
        
        let error = null;
        if (item.action === 'INSERT') {
          const { error: insertError } = await supabase.from(item.table_name).insert(payload);
          error = insertError;
        } else if (item.action === 'UPDATE') {
          const { error: updateError } = await supabase.from(item.table_name).update(payload).eq('id', item.record_id);
          error = updateError;
        } else if (item.action === 'DELETE') {
          const { error: deleteError } = await supabase.from(item.table_name).delete().eq('id', item.record_id);
          error = deleteError;
        }

        if (!error) {
          await removeFromQueue(item.id);
        } else {
          console.error(`Error syncing item ${item.id}:`, error);
        }
      } catch (err) {
        console.error(`Failed to process queue item ${item.id}`, err);
      }
    }
  } catch (error) {
    console.error('Sync failed', error);
  } finally {
    isSyncing = false;
  }
};
