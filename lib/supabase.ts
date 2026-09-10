import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    // PKCE keeps the access/refresh tokens out of the redirect URL itself (only a
    // short-lived, single-use `code` travels over the deep link). The implicit
    // flow this replaced put live session tokens directly in the `hormoni://`
    // redirect, which any app registering that same custom scheme on Android
    // could intercept.
    flowType: 'pkce',
  },
})

export const createSessionFromUrl = async (url: string) => {
  try {
    if (!url) return { data: null, error: null };
    let hashOrQuery = '';
    const hashIndex = url.indexOf('#');
    const queryIndex = url.indexOf('?');

    if (hashIndex !== -1) {
      hashOrQuery = url.substring(hashIndex + 1);
    } else if (queryIndex !== -1) {
      hashOrQuery = url.substring(queryIndex + 1);
    }

    if (hashOrQuery) {
      const searchParams = new URLSearchParams(hashOrQuery);
      const code = searchParams.get('code');
      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        return { data, error };
      }
    }
  } catch (e) {
    console.error('Failed to parse session from URL', e);
  }
  return { data: null, error: null };
};

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

