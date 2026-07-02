import { ReactNode } from "react";
import {
	Pressable,
	Text,
	View,
	Image,
	ViewStyle,
	TextStyle,
	StyleSheet,
	ActivityIndicator,
} from "react-native";

type ButtonType = "primary" | "secondary" | "warning";

interface ButtonProps {
	type?: ButtonType;
	onPress?: () => void;
	children: ReactNode;
	style?: ViewStyle;
	textStyle?: TextStyle;
	disabled?: boolean;
	pending?: boolean;
}

const Button = ({
	type = "primary",
	onPress,
	children,
	style,
	textStyle,
	disabled = false,
	pending = false,
}: ButtonProps) => {
	const getBackgroundColor = (pressed: boolean) => {
		switch (type) {
			case "secondary":
				return pressed ? "#000000cc" : "#000000";
			case "warning":
				return pressed ? "#FF453Acc" : "#FF453A";
			default:
				return pressed ? "#FFFFFFcc" : "#FFFFFF";
		}
	};

	const getTextColor = () => {
		switch (type) {
			case "primary":
				return "#000000";
			default:
				return "#FFFFFF";
		}
	};

	return (
		<Pressable
			onPress={disabled || pending ? undefined : onPress}
			disabled={disabled || pending}
			style={({ pressed }) => [
				styles.base,
				{ backgroundColor: disabled ? "#afafafff" : getBackgroundColor(pressed) },
				{ pointerEvents: (disabled || pending) ? "none" : "auto" },
				style,
			]}
		>
			{pending ? (
				<ActivityIndicator color={getTextColor()} />
			) : (
				<View style={styles.content}>
					{type === "primary" && (
						<Image
							source={require("../../assets/images/42.png")}
							style={styles.logo}
							resizeMode="contain"
						/>
					)}
					<Text style={[styles.text, { color: getTextColor() }, textStyle]}>
						{children}
					</Text>
				</View>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	base: {
		width: "100%",
		height: 55,
		borderRadius: 36,
		paddingHorizontal: 20,
		paddingVertical: 8,
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "stretch",
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		width: 22,
		height: 22,
		marginRight: 10,
	},
	text: {
		fontFamily: "SF-Medium",
		fontSize: 20,
	},
});

export default Button;
