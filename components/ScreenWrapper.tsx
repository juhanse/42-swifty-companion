import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<LinearGradient
			colors={['#2E3233', '#181F2A', '#161527']}      
			locations={[0.25, 0.75, 1.0]}
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
