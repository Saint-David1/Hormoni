import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="intro" />
      <Stack.Screen name="consent" />
      <Stack.Screen name="profile-setup" />
      <Stack.Screen name="assessment" />
      <Stack.Screen name="personalize" />
      <Stack.Screen name="focus-summary" />
    </Stack>
  );
}
