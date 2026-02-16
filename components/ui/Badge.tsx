import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface BadgeProps {
    label: string;
}

export const Badge = ({ label }: BadgeProps) => {
    const backgroundColor = Colors.badge[label as keyof typeof Colors.badge] || '#555';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    text: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: "SF-Medium",
    },
});
