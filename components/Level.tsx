import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User } from '@/services/users';
import { Colors } from '@/constants/colors';

interface LevelProps {
	user: User | null;
}

export const Level = ({ user }: LevelProps) => {
	if (!user || !user.cursus_users?.[0]) {
		return null;
	}

	const level = user.cursus_users[0].level;
	const majorLevel = Math.floor(level);
	const progressPercentage = Math.round((level - majorLevel) * 100);

	return (
		<View style={styles.container}>
			<View style={styles.topRow}>
				<Text style={styles.levelText}>Level : {majorLevel}</Text>
				<Text style={styles.walletText}>₳ {user.wallet}</Text>
			</View>

			<View style={styles.progressBarBackground}>
				<LinearGradient
					colors={Colors.gradient}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
					style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		gap: 10,
	},
	topRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	levelText: {
		fontSize: 20,
		fontFamily: "SF-Bold",
		color: '#fff',
	},
	walletText: {
		fontSize: 20,
		fontFamily: "SF-Bold",
		color: '#fff',
	},
	progressBarBackground: {
		height: 12,
		backgroundColor: '#F9F9F9',
		borderRadius: 30,
		boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
		overflow: 'hidden',
	},
	progressBarFill: {
		height: '100%',
		borderRadius: 30,
	},
});
