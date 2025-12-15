import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, StyleSheet, ScrollView, Linking, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { User, Achievement, fetchUser } from '@/services/users'
import { Background } from '@/components/Background';
import Button from '@/components/Button';

const AchievementItem: React.FC<{ achievement: Achievement }> = ({ achievement }) => (
	<View style={styles.achievementCard}>
		{achievement.image && (
			<Image source={{ uri: achievement.image }} style={styles.achievementIcon} />
		)}
		<View style={styles.achievementContent}>
			<Text style={styles.achievementTitle}>{achievement.name}</Text>
			{achievement.description && (
				<Text style={styles.achievementDescription}>{achievement.description}</Text>
			)}
		</View>
	</View>
);

export default function ProfileScreen() {
	const { t } = useTranslation();
	const { id } = useLocalSearchParams();
	const login = id as string;

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		setLoading(true);

		fetchUser({ login })
		.then(setUser)
		.catch(console.error)
		.finally(() => setLoading(false))
	}, [login]);

	if (loading) {
		return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
	}

	const handleOpenProfile = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		Linking.openURL("https://intra.42.fr/users/" + login);
	};

	const achievements: Achievement[] = user?.achievements || [];

	return (
		<View style={styles.container}>
			<Background />

			<Pressable onPress={() => router.back()} style={styles.backButton}>
				<Ionicons name="arrow-back-outline" size={24} color="black" />
			</Pressable>

			<View style={styles.header}>
				<Image 
					source={{ uri: user?.image.link }} 
					style={styles.avatar}
				/>
				<View style={styles.subheader}>
					<Text style={styles.username}>{user?.displayname}</Text>
					{user?.groups[0] ? (
						<Text style={styles.badge}>{user?.groups[0].name}</Text>
					) :
						null
					}
				</View>
			</View>

			<Text style={styles.sectionTitle}>
				{t('achievements')} :
			</Text>

			<ScrollView 
				horizontal 
				showsHorizontalScrollIndicator={false}
				style={styles.achievementsScroll}
				contentContainerStyle={styles.achievementsContent}
			>
				{achievements.length > 0 ? (
					achievements.map((achievement) => (
						<AchievementItem key={achievement.id} achievement={achievement} />
					))
				) : (
					<Text style={styles.noAchievements}>No achievements yet</Text>
				)}
			</ScrollView>

			<Button type="primary" onPress={handleOpenProfile}>
				{t('open_profile')}
			</Button>
		</View>
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
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backButton: {
		position: 'absolute',
		top: 40,
		left: 20,
		zIndex: 10,
		padding: 10,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		borderRadius: 30,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 20,
		gap: 20,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: '#e0e0e0',
	},
	username: {
		flex: 1,
		fontSize: 30,
		fontFamily: 'SF-Bold',
		color: '#fff',
	},
	subheader: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	badge: {
		fontSize: 14,
		fontFamily: 'SF-Medium',
		color: '#fff',
		backgroundColor: 'rgba(22, 134, 214, 0.8)',
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 20,
		overflow: 'hidden',
	},
	sectionTitle: {
		fontSize: 20,
		fontFamily: 'SF-Semibold',
		color: '#fff',
		paddingVertical: 16,
	},
	achievementsScroll: {
		flex: 1,
	},
	achievementsContent: {
		paddingVertical: 8,
		gap: 12,
	},
	achievementCard: {
		width: 160,
		height: 200,
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		borderRadius: 16,
		padding: 14,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.5)',
		justifyContent: 'flex-start',
		alignItems: 'center',
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.08,
		shadowRadius: 12,
		elevation: 5,
	},
	achievementIcon: {
		width: 60,
		height: 60,
		borderRadius: 12,
		marginBottom: 10,
		backgroundColor: '#e0e0e0',
	},
	achievementContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	achievementTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: '#333',
		textAlign: 'center',
	},
	achievementDescription: {
		fontSize: 12,
		color: '#666',
		marginTop: 6,
		textAlign: 'center',
	},
	noAchievements: {
		fontSize: 14,
		color: '#999',
		textAlign: 'center',
		paddingVertical: 20,
		alignSelf: 'center',
	},
});
