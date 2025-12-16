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
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0}
		>
			<Background />

			<TextInput
				style={styles.input}
				placeholder={t('search')}
				placeholderTextColor="rgba(162,162,162,0.5)"
				value={login || ''}
				onChangeText={setLogin}
				autoCorrect={false}
			/>

			<Button type="primary" onPress={() => handlePress(login!)} disabled={!login || login.length < 3}>
				{t('search')}
			</Button>
		</KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		paddingTop: 100,
		paddingBottom: 20,
		paddingHorizontal: 20,
		backgroundColor: 'transparent',
	},
	input: {
		flex: 1,
		height: 50,
		fontSize: 32,
		fontFamily: 'SF-Semibold',
		color: 'rgba(222, 222, 222, 0.8)',
		backgroundColor: 'transparent',
	},
});
