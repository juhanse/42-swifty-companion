import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from 'react-native-reanimated';
import { User } from '@/services/users';
import { Colors } from '@/constants/colors';

interface LevelProps {
	user: User | null;
}

export const Level = ({ user }: LevelProps) => {
	const [trackWidth, setTrackWidth] = useState(0);

	const level = user?.cursus_users?.[0]?.level ?? 0;
	const majorLevel = Math.floor(level);
	const progressPercentage = Math.min(100, Math.max(0, Math.round((level - majorLevel) * 100)));

	const animatedWidth = useSharedValue(0);

	useEffect(() => {
		const targetWidth = (trackWidth * progressPercentage) / 100;
		animatedWidth.value = 0;
		animatedWidth.value = withTiming(targetWidth, {
			duration: 750,
			easing: Easing.out(Easing.cubic),
		});
	}, [trackWidth, progressPercentage, user?.login, animatedWidth]);

	const animatedFillStyle = useAnimatedStyle(() => ({
		width: animatedWidth.value,
	}));

	const handleLayout = (e: LayoutChangeEvent) => {
		const width = e.nativeEvent.layout.width;
		if (width > 0 && width !== trackWidth) {
			setTrackWidth(width);
		}
	};

	if (!user || !user.cursus_users?.[0]) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.topRow}>
				<Text style={styles.levelText}>Level : {majorLevel}</Text>
				<Text style={styles.walletText}>₳ {user.wallet}</Text>
			</View>

			<View style={styles.progressBarBackground} onLayout={handleLayout}>
				<Animated.View style={[styles.progressBarClip, animatedFillStyle]}>
					<LinearGradient
						colors={Colors.gradient}
						start={{ x: 0, y: 0.5 }}
						end={{ x: 1, y: 0.5 }}
						style={styles.progressBarFill}
					/>
				</Animated.View>
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
	progressBarClip: {
		height: '100%',
		overflow: 'hidden',
	},
	progressBarFill: {
		width: '100%',
		height: '100%',
		borderRadius: 30,
	},
});
