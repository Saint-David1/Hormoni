import { Stack } from 'expo-router';
import { colors } from '../../../theme/tokens';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.ink,
        headerTitleStyle: { fontWeight: '600' },
      }}>
      <Stack.Screen name="index" options={{ title: 'Profile Settings' }} />
      <Stack.Screen name="export" options={{ title: 'Export Data' }} />
      <Stack.Screen name="legal" options={{ title: 'Legal & Compliance' }} />
    </Stack>
  );
}
