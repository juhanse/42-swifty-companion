import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
	const { t } = useTranslation();
	const [login, setLogin] = useState<string | null>(null);

	const handlePress = (groupId: string) => {
		if (groupId.length < 3) {
			return ;
		}

		router.push({ pathname: "/(tabs)/profile/[id]", params: { id: groupId } });
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder={t('search')}
				placeholderTextColor="rgba(162,162,162,0.5)"
				value={login || ''}
				onChangeText={setLogin}
				multiline={true}
				autoCorrect={false}
			/>

			<View style={[styles.buttonContainer]}>
				<Button type="primary" onPress={handlePress} disabled={!login || login.length < 3}>
					{t('search')}
				</Button>
			</View>
		</View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	input: {
		flex: 1,
		height: 50,
		paddingHorizontal: 0,
		fontSize: 32,
		fontFamily: 'SF-Semibold',
		color: 'rgba(162,162,162,0.8)',
		backgroundColor: 'transparent',
	},
	buttonContainer: {
		width: '100%',
		position: 'absolute',
		top: 750,
		flexDirection: 'column',
		paddingHorizontal: 80,
	},
});
