import * as SQLite from 'expo-sqlite';

export type SyncAction = 'INSERT' | 'UPDATE' | 'DELETE';
export type SyncTable =
  | 'cycles'
  | 'symptom_logs'
  | 'weight_logs'
  | 'mood_checkins'
  | 'journal_entries'
  | 'exercise_logs'
  | 'sleep_logs'
  | 'hydration_logs'
  | 'habit_completions';

export interface SyncQueueItem {
  id: number;
  table_name: SyncTable;
  action: SyncAction;
  record_id: string; // The UUID of the record
  payload: string; // JSON stringified data
  created_at: string;
}

export const initDb = async () => {
  const db = await SQLite.openDatabaseAsync('hornomi_offline.db');
  
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sync_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_name TEXT NOT NULL,
      action TEXT NOT NULL,
      record_id TEXT NOT NULL,
      payload TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
};

export const queueAction = async (tableName: SyncTable, action: SyncAction, recordId: string, payload: any) => {
  const db = await SQLite.openDatabaseAsync('hornomi_offline.db');
  await db.runAsync(
    'INSERT INTO sync_queue (table_name, action, record_id, payload) VALUES (?, ?, ?, ?)',
    [tableName, action, recordId, JSON.stringify(payload)]
  );
};

export const getQueue = async (): Promise<SyncQueueItem[]> => {
  const db = await SQLite.openDatabaseAsync('hornomi_offline.db');
  return await db.getAllAsync<SyncQueueItem>('SELECT * FROM sync_queue ORDER BY id ASC');
};

export const removeFromQueue = async (id: number) => {
  const db = await SQLite.openDatabaseAsync('hornomi_offline.db');
  await db.runAsync('DELETE FROM sync_queue WHERE id = ?', [id]);
};

export const clearQueue = async () => {
  const db = await SQLite.openDatabaseAsync('hornomi_offline.db');
  await db.runAsync('DELETE FROM sync_queue');
};
