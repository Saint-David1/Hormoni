import { Redirect } from 'expo-router';

export default function RegisterScreen() {
  // We use unified OTP login, so registration redirects to the login screen.
  return <Redirect href="/auth/login" />;
}
