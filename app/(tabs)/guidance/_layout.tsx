import { Stack } from 'expo-router';
import { colors } from '../../../theme/tokens';

export default function GuidanceLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.ink,
        headerTitleStyle: { fontWeight: '600' },
      }}>
      <Stack.Screen name="index" options={{ title: 'Library' }} />
      <Stack.Screen name="[id]" options={{ title: 'Library' }} />
    </Stack>
  );
}
