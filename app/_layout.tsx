import { Stack } from 'expo-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/hooks/useTranslation';

export const unstable_settings = {
	anchor: '(tabs)',
};

const InitialLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<I18nextProvider i18n={i18n}>
			<InitialLayout />
		</I18nextProvider>
	)
}
