import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

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
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
		</Stack>
	);
}
