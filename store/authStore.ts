import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  session: Session | null;
  hasSeenIntro: boolean;
  hasConsented: boolean;
  onboardingCompleted: boolean;
  biometricEnabled: boolean;
  // In-memory only (not persisted) — carries the user's onboarding selections
  // from profile-setup/assessment forward to the personalize recap screen.
  onboardingGoals: string[];
  onboardingFocusAreas: string[];
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setHasSeenIntro: (seen: boolean) => void;
  setHasConsented: (consented: boolean) => void;
  setOnboardingCompleted: (completed: boolean) => void;
  setBiometricEnabled: (enabled: boolean) => void;
  setOnboardingGoals: (goals: string[]) => void;
  setOnboardingFocusAreas: (areas: string[]) => void;
  loadLocalState: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  hasSeenIntro: false,
  hasConsented: false,
  onboardingCompleted: false,
  biometricEnabled: false,
  onboardingGoals: [],
  onboardingFocusAreas: [],
  setOnboardingGoals: (goals) => set({ onboardingGoals: goals }),
  setOnboardingFocusAreas: (areas) => set({ onboardingFocusAreas: areas }),
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setHasSeenIntro: async (seen) => {
    await AsyncStorage.setItem('hasSeenIntro', JSON.stringify(seen));
    set({ hasSeenIntro: seen });
  },
  setHasConsented: async (consented) => {
    await AsyncStorage.setItem('hasConsented', JSON.stringify(consented));
    set({ hasConsented: consented });
  },
  setOnboardingCompleted: async (completed) => {
    await AsyncStorage.setItem('onboardingCompleted', JSON.stringify(completed));
    set({ onboardingCompleted: completed });
  },
  setBiometricEnabled: async (enabled) => {
    await AsyncStorage.setItem('biometricEnabled', JSON.stringify(enabled));
    set({ biometricEnabled: enabled });
  },
  loadLocalState: async () => {
    try {
      const seenIntro = await AsyncStorage.getItem('hasSeenIntro');
      const consented = await AsyncStorage.getItem('hasConsented');
      const completed = await AsyncStorage.getItem('onboardingCompleted');
      const biometric = await AsyncStorage.getItem('biometricEnabled');
      
      set({
        hasSeenIntro: seenIntro ? JSON.parse(seenIntro) : false,
        hasConsented: consented ? JSON.parse(consented) : false,
        onboardingCompleted: completed ? JSON.parse(completed) : false,
        biometricEnabled: biometric ? JSON.parse(biometric) : false,
      });
    } catch (e) {
      console.error('Failed to load local auth state', e);
    }
  },
}));
