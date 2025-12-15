import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { User, fetchUser } from '@/services/users'

export default function ProfileScreen() {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User | null>(null);

	const { id } = useLocalSearchParams();
	const login = id as string;

	useEffect(() => {
		setLoading(true);

		fetchUser({ login })
		.then(response => {
			setLoading(false);
			setUser(response);
		})
		.catch(error => {
			console.error('Oops! Error:', error);
			setLoading(false);
		});
	});

	if (loading) {
		<ActivityIndicator size="large" color="#0000ff" />
	}

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
