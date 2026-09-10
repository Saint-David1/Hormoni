import { Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components';
import { colors, spacing, textStyles } from '../theme/tokens';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={[textStyles.screenTitle, styles.title]}>This screen doesn't exist.</Text>
        <Button label="Go to home screen" onPress={() => router.replace('/(tabs)/home')} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
    gap: spacing.lg,
  },
  title: {
    color: colors.ink,
    textAlign: 'center',
  },
});
