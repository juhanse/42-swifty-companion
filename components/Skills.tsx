import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';

const MAX_LEVEL = 21;

export interface Skill {
	id: number;
	name: string;
	level: number;
}

export interface SkillsProps {
	skills: Skill[];
}

interface SkillProgressBarProps {
	percentage: number;
	resetKey: string;
}

const SkillProgressBar = ({ percentage, resetKey }: SkillProgressBarProps) => {
	const [trackWidth, setTrackWidth] = useState(0);
	const animatedWidth = useSharedValue(0);

	useEffect(() => {
		const targetWidth = (trackWidth * percentage) / 100;
		animatedWidth.value = 0;
		animatedWidth.value = withTiming(targetWidth, {
			duration: 700,
			easing: Easing.out(Easing.cubic),
		});
	}, [trackWidth, percentage, resetKey, animatedWidth]);

	const animatedFillStyle = useAnimatedStyle(() => ({
		width: animatedWidth.value,
	}));

	const handleLayout = (e: LayoutChangeEvent) => {
		const width = e.nativeEvent.layout.width;
		if (width > 0 && width !== trackWidth) {
			setTrackWidth(width);
		}
	};

	return (
		<View style={styles.track} onLayout={handleLayout}>
			<Animated.View style={[styles.fillClip, animatedFillStyle]}>
				<LinearGradient
					colors={Colors.gradient}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
					style={styles.fill}
				/>
			</Animated.View>
		</View>
	);
};

export default function Skills({ skills }: SkillsProps) {
	if (!skills || skills.length === 0) {
		return null;
	}

	const sortedSkills = [...skills].sort((a, b) => b.level - a.level);
	const resetKey = sortedSkills.map((s) => `${s.id}:${s.level}`).join('|');

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Skills</Text>
			<View style={styles.skillsList}>
				{sortedSkills.map((skill) => {
					const percentage = Math.min(100, Math.max(0, (skill.level / MAX_LEVEL) * 100));

					return (
						<View key={skill.id} style={styles.skillWrapper}>
							<View style={styles.textRow}>
								<Text style={styles.skillName} numberOfLines={1}>
									{skill.name}
								</Text>
								<Text style={styles.skillLevel}>
									{skill.level.toFixed(2)}
								</Text>
							</View>
							<SkillProgressBar
								percentage={percentage}
								resetKey={resetKey}
							/>
						</View>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		borderRadius: 16,
		marginTop: 16,
	},
	title: {
		fontSize: 24,
		fontFamily: 'SF-Bold',
		color: '#fff',
		marginBottom: 10,
	},
	skillsList: {
		gap: 16,
	},
	skillWrapper: {
		width: '100%',
	},
	textRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 6,
	},
	skillName: {
		fontSize: 18,
		color: '#A2A2A2',
		flex: 1,
		marginRight: 10,
		fontFamily: 'SF-Medium',
	},
	skillLevel: {
		fontSize: 14,
		color: '#FFFFFF',
		fontFamily: 'SF-Semibold',
	},
	track: {
		height: 10,
		backgroundColor: '#333333',
		borderRadius: 3,
		overflow: 'hidden',
	},
	fillClip: {
		height: '100%',
		overflow: 'hidden',
	},
	fill: {
		width: '100%',
		height: '100%',
		borderRadius: 3,
	},
});
