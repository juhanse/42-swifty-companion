import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from 'react-native-reanimated';
import { User } from '@/services/users';
import { Colors } from '@/constants/colors';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

interface LevelProps {
	user: User | null;
}

export const Level = ({ user }: LevelProps) => {
	const level = user?.cursus_users?.[0]?.level ?? 0;
	const majorLevel = Math.floor(level);
	const progressPercentage = Math.min(100, Math.max(0, Math.round((level - majorLevel) * 100)));

	const progress = useSharedValue(0);

	useEffect(() => {
		progress.value = 0;
		progress.value = withTiming(progressPercentage / 100, {
			duration: 750,
			easing: Easing.out(Easing.cubic),
		});
	}, [user?.login, progressPercentage, progress]);

	const animatedFillStyle = useAnimatedStyle(() => ({
		transform: [{ scaleX: progress.value }],
		transformOrigin: 'left center',
	}));

	if (!user || !user.cursus_users?.[0]) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.topRow}>
				<Text style={styles.levelText}>Level : {majorLevel}</Text>
				<Text style={styles.walletText}>₳ {user.wallet}</Text>
			</View>

			<View style={styles.progressBarBackground}>
				<AnimatedGradient
					colors={Colors.gradient}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
					style={[styles.progressBarFill, animatedFillStyle]}
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
		fontFamily: 'SF-Bold',
		color: '#fff',
	},
	walletText: {
		fontSize: 20,
		fontFamily: 'SF-Bold',
		color: '#fff',
	},
	progressBarBackground: {
		height: 20,
		backgroundColor: '#F9F9F9',
		borderRadius: 30,
		boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
		overflow: 'hidden',
	},
	progressBarFill: {
		width: '100%',
		height: '100%',
		borderRadius: 30,
	},
});
