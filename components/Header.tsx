import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { User } from '@/services/users';
import { Badge } from './ui/Badge';

interface HeaderProps {
	user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
	const router = useRouter();
	const primaryGroup = user?.groups?.[0]?.name;

	return (
		<View>
			<Pressable 
				onPress={() => router.back()} 
				style={({ pressed }) => [
					styles.backButton,
					{ opacity: pressed ? 0.7 : 1 }
				]}
			>
				<Ionicons name="arrow-back-outline" size={28} color="white" />
			</Pressable>

			<View style={styles.container}>
				<Image 
					source={{ uri: user?.image.link }} 
					style={styles.avatar}
				/>
				
				<View style={styles.subContainer}>
					<View style={styles.nameContainer}>
						<Text style={styles.displayname} numberOfLines={1}>
							{user?.displayname}
						</Text>
						<Text style={styles.login}>
							{user?.login}
						</Text>
					</View>

					<View style={styles.metaRow}>
						{primaryGroup ? (
                            <Badge label={primaryGroup} />
                        ) : (
                            <View />
                        )}
						<Text style={styles.points}>
							{user?.correction_point} Ev.P
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginBottom: 20,
	},
	container: {
		flexDirection: 'row',
		gap: 15,
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: '#2E3233',
	},
	subContainer: {
		flex: 1,
		justifyContent: 'space-between',
	},
	nameContainer: {
		width: '100%',
		alignItems: 'flex-start',
	},
	displayname: {
		fontSize: 30,
		fontFamily: "SF-Bold",
		color: '#fff',
		textAlign: 'center',
	},
	login: {
		fontSize: 12,
		fontFamily: "SF-Medium",
		color: '#fff',
		textAlign: 'center',
		textTransform: 'lowercase',
	},
	metaRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginTop: 10,
	},
	points: {
		fontSize: 18,
		fontFamily: "SF-Medium",
		color: '#fff',
	},
});
