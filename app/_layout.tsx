import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/hooks/useTranslation';

const InitialLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
		</Stack>
	);
}

export default function RootLayout() {
	const [loaded] = useFonts({
		"SF-Bold": require('@/assets/fonts/SF-Pro-Display-Bold.otf'),
		"SF-Semibold": require('@/assets/fonts/SF-Pro-Display-Semibold.otf'),
		"SF-Medium": require('@/assets/fonts/SF-Pro-Display-Medium.otf'),
	});

	if (!loaded) {
		return null;
	}

	return (
		<I18nextProvider i18n={i18n}>
			<InitialLayout />
		</I18nextProvider>
	)
}
