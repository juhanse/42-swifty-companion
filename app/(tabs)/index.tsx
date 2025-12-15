import React, { useState } from 'react'
import { View, TextInput, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Background } from '@/components/Background';
import Button from '@/components/Button'

export default function HomeScreen() {
	const { t } = useTranslation();
	const [login, setLogin] = useState<string | null>(null);

	const handlePress = (groupId: string) => {
		if (groupId.length < 3) {
			return ;
		}

		router.push({ pathname: "/(tabs)/[id]", params: { id: groupId } });
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0}
		>
			<Background />

			<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder={t('search')}
					placeholderTextColor="rgba(162,162,162,0.5)"
					value={login || ''}
					onChangeText={setLogin}
					autoCorrect={false}
				/>
			</View>

			<View style={[styles.buttonContainer]}>
				<Button type="primary" onPress={() => handlePress(login!)} disabled={!login || login.length < 3}>
					{t('search')}
				</Button>
			</View>
		</KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 40,
		paddingTop: 80,
		paddingHorizontal: 40,
	},
	input: {
		flex: 1,
		height: 50,
		fontSize: 32,
		fontFamily: 'SF-Semibold',
		color: 'rgba(222, 222, 222, 0.8)',
		backgroundColor: 'transparent',
	},
	buttonContainer: {
		width: '100%',
		flexDirection: 'column',
		paddingHorizontal: 80,
		paddingBottom: 40,
	},
});
