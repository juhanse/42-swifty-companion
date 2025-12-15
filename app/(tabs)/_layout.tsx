import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/theme';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
	return (
		<Tabs
		screenOptions={{
			tabBarActiveTintColor: Colors.tint,
			headerShown: false,
		}}>
			<Tabs.Screen
				name="index"
				options={{
				title: 'Home',
					tabBarIcon: ({ color }) => <Entypo name="home" size={28} color="black" />,
				}}
			/>
		</Tabs>
	);
}
