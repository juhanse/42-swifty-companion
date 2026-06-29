import { useState } from 'react'
import { View, KeyboardAvoidingView, Text, TextInput, Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import Button from '@/components/ui/Button'
import { fetchUser } from '@/services/users';
import { Colors } from '@/constants/colors';

export default function HomeScreen() {
	const router = useRouter();
	const [login, setLogin] = useState<string>('');
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [errorState, setErrorState] = useState<{ hasError: boolean, status?: number }>({ hasError: false });

	const handleSearch = async () => {
		const cleanLogin = login.trim().toLowerCase();
		if (cleanLogin.length < 3) return;

		setIsFetching(true);
		setErrorState({ hasError: false });

		try {
			const data = await fetchUser({ login: cleanLogin });

			router.push({
				pathname: "/(tabs)/[id]",
				params: { id: data.login }
			});
		} catch (error: any) {
			setErrorState({
				hasError: true,
				status: error?.response?.status
			});
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<ScreenWrapper>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0}
			>
				<View style={{ flex: 1 }} />

				<View style={{ gap: 12 }}>
					<Text style={styles.title}>
						Username :
					</Text>
					<View style={styles.textAera}>
						<View style={styles.line} />
						<TextInput
							style={styles.input}
							placeholder="Search"
							placeholderTextColor="rgba(162,162,162,0.5)"
							value={login || ''}
							onChangeText={setLogin}
							autoCorrect={false}
						/>
					</View>
				</View>

				<View style={{ flex: 1 }} />

				{errorState.hasError && (
					<Text style={styles.errorText}>
						{errorState.status === 404
							? 'User not found'
							: 'API error'}
					</Text>
				)}

				<View style={{ marginBottom: 30 }}>
					<Button type="primary" onPress={handleSearch} disabled={!login || login.length < 3} pending={isFetching}>
						Search
					</Button>
				</View>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingBottom: Platform.OS === 'ios' ? 40 : 20,
		backgroundColor: 'transparent',
	},
	textAera: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		backgroundColor: "transparent",
	},
	title: {
		fontFamily: 'SF-Semibold',
		fontSize: 32,
		color: '#fff',
	},
	line: {
		width: 4,
		height: 55,
		backgroundColor: '#fff',
	},
	input: {
		height: 50,
		fontSize: 32,
		fontFamily: 'SF-Semibold',
		color: 'rgba(162, 162, 162, 0.8)',
		backgroundColor: 'transparent',
	},
	errorText: {
		fontSize: 20,
		fontFamily: "SF-Medium",
		color: Colors.red,
	},
});
