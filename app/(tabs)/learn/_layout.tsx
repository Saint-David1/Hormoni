import { Stack } from 'expo-router';
import { colors } from '../../../theme/tokens';

export default function LearnLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.ink,
        headerTitleStyle: { fontWeight: '600' },
      }}>
      <Stack.Screen name="index" options={{ title: 'Education Hub' }} />
      <Stack.Screen name="article/[id]" options={{ title: 'Article' }} />
    </Stack>
  );
}
