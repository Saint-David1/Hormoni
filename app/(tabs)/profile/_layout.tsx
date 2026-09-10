import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="export" />
      <Stack.Screen name="legal" />
      <Stack.Screen name="reminders" />
      <Stack.Screen name="health-summary" />
      <Stack.Screen name="speak-to-doctor" />
    </Stack>
  );
}
