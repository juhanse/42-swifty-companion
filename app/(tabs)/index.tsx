import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { User, fetchUser } from '@/services/users'

export default function HomeScreen() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		fetchUser({ login: 'juhanse' })
			.then(setUser)
			.catch(console.error);
	}, []);

	return (
		<View style={styles.container}>

		</View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
