import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export const Background = () => {
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={['#005C97', '#4b6cb7']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				style={StyleSheet.absoluteFill}
			>
				{/* <BlurView intensity={100} style={StyleSheet.absoluteFill} />
				<View style={styles.overlay} /> */}
			</LinearGradient>
			<View style={styles.noise} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		zIndex: -1,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(30,30,30,0.5)',
	},
	noise: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.05)',
	},
});
