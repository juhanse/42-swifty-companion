import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<LinearGradient
			colors={['#232526', '#252526', '#292a2b']}
			locations={[0, 0.5, 1]}
			start={{ x: 0.5, y: 0 }}
			end={{ x: 0.5, y: 1 }}
			style={{ flex: 1 }}
		>
			<View style={{ flex: 1 }}>
				{children}
			</View>
		</LinearGradient>
	);
};
