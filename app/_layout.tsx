import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import * as Linking from 'expo-linking';
import NetInfo from '@react-native-community/netinfo';
import { useColorScheme } from '@/components/useColorScheme';
import { AppLockGate } from '@/components/AppLockGate';
import { useAuthStore } from '../store/authStore';
import { supabase, createSessionFromUrl } from '../lib/supabase';
import { initDb } from '../lib/db';
import { syncOfflineData } from '../lib/syncService';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loadLocalState = useAuthStore(state => state.loadLocalState);
  const setSession = useAuthStore(state => state.setSession);
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    loadLocalState();
    initDb().then(() => syncOfflineData());

    // Retry the offline queue whenever connectivity comes back.
    const netInfoSubscription = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        syncOfflineData();
      }
    });

    // Handle initial deep link URL when app is launched via link
    Linking.getInitialURL().then((url) => {
      if (url) createSessionFromUrl(url);
    });

    // Listen for deep link URLs while app is open
    const subscription = Linking.addEventListener('url', (event) => {
      if (event?.url) createSessionFromUrl(event.url);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => {
      subscription.remove();
      netInfoSubscription();
    };
  }, []);


  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();
  
  const { session, hasSeenIntro, hasConsented, onboardingCompleted } = useAuthStore();
  
  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    
    if (!hasSeenIntro) {
      if (segments[1] !== 'intro') {
        router.replace('/(onboarding)/intro');
      }
    } else if (!session) {
      if (!inAuthGroup) {
        router.replace('/auth/login');
      }
    } else {
      if (!hasConsented) {
        if (segments[1] !== 'consent') router.replace('/(onboarding)/consent');
      } else if (!onboardingCompleted) {
        if (segments[1] !== 'profile-setup' && segments[1] !== 'assessment' && segments[1] !== 'personalize' && segments[1] !== 'focus-summary') {
          router.replace('/(onboarding)/profile-setup');
        }
      } else {
        if (inAuthGroup || inOnboardingGroup) {
          router.replace('/(tabs)/home');
        }
      }
    }
  }, [session, hasSeenIntro, hasConsented, onboardingCompleted, segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppLockGate>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </AppLockGate>
    </ThemeProvider>
  );
}
