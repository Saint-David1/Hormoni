import { Stack } from 'expo-router';

export default function LifestyleLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="exercise" />
      <Stack.Screen name="sleep" />
      <Stack.Screen name="hydration" />
      <Stack.Screen name="habits" />
      <Stack.Screen name="nutrition/index" />
      <Stack.Screen name="nutrition/[id]" />
    </Stack>
  );
}
