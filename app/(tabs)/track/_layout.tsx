import { Stack } from 'expo-router';

export default function TrackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="cycle" />
      <Stack.Screen name="symptoms" />
      <Stack.Screen name="weight" />
      <Stack.Screen name="mood" />
      <Stack.Screen name="timeline" />
      <Stack.Screen name="journal/index" />
      <Stack.Screen name="journal/new" />
    </Stack>
  );
}
