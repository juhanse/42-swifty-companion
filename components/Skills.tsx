import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';

export interface Skill {
	id: number;
	name: string;
	level: number;
}

export interface SkillsProps {
	skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
	const MAX_LEVEL = 21;

	if (!skills || skills.length === 0) {
		return null;
	}

	const sortedSkills = [...skills].sort((a, b) => b.level - a.level);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Skills</Text>
			<View style={styles.skillsList}>
				{sortedSkills.map((skill) => {
					const percentage = Math.min((skill.level / MAX_LEVEL) * 100, 100);

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
							<View style={styles.track}>
								<LinearGradient
									colors={Colors.gradient}
									start={{ x: 0, y: 0.5 }}
									end={{ x: 1, y: 0.5 }}
									style={[
										styles.fill,
										{ width: `${percentage}%` }
									]}
								/>
							</View>
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
		fontFamily: "SF-Bold",
		color: "#fff",
		marginBottom: 10
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
		height: 6,
		backgroundColor: '#333333',
		borderRadius: 3,
		overflow: 'hidden',
	},
	fill: {
		height: '100%',
		borderRadius: 3,
	},
});
