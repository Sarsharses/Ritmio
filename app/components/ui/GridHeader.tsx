import React from 'react';
import {StyleSheet, Text, View} from "react-native";

type Props = {
    habits: string[];
};

export default function GridHeader({habits}: Props) {
    return (
        <View style={styles.headerRow}>
            <Text style={styles.cornerCell}>Day ↓</Text>
            {habits.map((habit, i) => (
                <Text key={i} style={styles.headerCell}>{habit}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
    },
    cornerCell: {
        width: 60,
        fontWeight: 'bold',
        fontSize: 14,
    }
});