import { Stack } from 'expo-router';
import { colors } from '../../../theme/tokens';

export default function TrackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.ink,
        headerTitleStyle: { fontWeight: '600' },
      }}>
      <Stack.Screen name="index" options={{ title: 'Track Hub' }} />
      <Stack.Screen name="cycle" options={{ title: 'Log Cycle' }} />
      <Stack.Screen name="symptoms" options={{ title: 'Log Symptoms' }} />
      <Stack.Screen name="weight" options={{ title: 'Log Weight' }} />
      <Stack.Screen name="mood" options={{ title: 'Log Mood' }} />
    </Stack>
  );
}
