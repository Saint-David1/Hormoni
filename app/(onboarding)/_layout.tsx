import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="consent" />
      <Stack.Screen name="profile-setup" />
      <Stack.Screen name="assessment" />
      <Stack.Screen name="focus-summary" />
    </Stack>
  );
}
