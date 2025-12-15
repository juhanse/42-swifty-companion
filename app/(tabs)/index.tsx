import { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { User, fetchUser } from '@/services/users'

export default function HomeScreen() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		fetchUser({ login: 'juhanse' })
			.then(setUser)
			.catch(console.error);
	}, [fetchUser]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text>
					{user?.displayname}
				</Text>
				<Image src={user?.url} style={styles.avatar}/>
			</View>
		</View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		width: '100%',
		marginVertical: 55,
	},
	avatar: {
		width: '100%',
		height: '100%',
	}
});
