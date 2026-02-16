import React, { useState } from 'react'
import { View, KeyboardAvoidingView, Text, TextInput, Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import Button from '@/components/ui/Button'
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/services/users';
import { Colors } from '@/constants/colors';

export default function HomeScreen() {
	const router = useRouter();
	const { t } = useTranslation();
	const [login, setLogin] = useState<string>('');

	const { refetch, isFetching, isError, error } = useQuery({
		queryKey: ['userSearch', login.trim().toLowerCase()],
		queryFn: () => fetchUser({ login: login.trim().toLowerCase() }),
		enabled: false,
		retry: false,
	});

    const handleSearch = async () => {
        const cleanLogin = login.trim().toLowerCase();
        if (cleanLogin.length < 3) return;

        const { data, isSuccess } = await refetch();

        if (isSuccess && data) {
            router.push({ 
                pathname: "/(tabs)/[id]", 
                params: { id: data.login } 
            });
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
						Identifiant :
					</Text>
					<View style={styles.textAera}>
						<View style={styles.line} />
						<TextInput
							style={styles.input}
							placeholder={t('search')}
							placeholderTextColor="rgba(162,162,162,0.5)"
							value={login || ''}
							onChangeText={setLogin}
							autoCorrect={false}
						/>
					</View>
				</View>

				<View style={{ flex: 1 }} />

				{isError && (
					<Text style={styles.errorText}>
						{(error as any)?.response?.status === 404 
							? t('user_not_found') 
							: t('api_error')}
					</Text>
				)}

				<View style={{ marginBottom: 30 }}>
					<Button type="primary" onPress={handleSearch} disabled={!login || login.length < 3} pending={isFetching}>
						{t('search')}
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
