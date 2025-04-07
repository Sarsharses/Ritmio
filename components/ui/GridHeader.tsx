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
                <View key={i} style={styles.rotatedHeaderCell}>
                    <Text style={styles.rotatedText}>{habit}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        borderTopWidth: 1,
        borderTopColor: '#333',
        borderRightWidth: 1,
        borderRightColor: '#333',
        height: 125,
    },
    cornerCell: {
        height: '100%',
        width: 60,
        fontWeight: 'bold',
        fontSize: 13,
        color: '#ccc',
        borderLeftWidth: 1,
        borderLeftColor: '#333',
        borderRightWidth: 1,
        borderRightColor: '#333',
        textAlign: 'center',
        textAlignVertical: 'bottom',
        justifyContent: 'flex-end',
        paddingBottom: 6,
    },
    rotatedHeaderCell: {
        height: '100%',
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#333',
    },
    rotatedText: {
        color: '#ccc',
        fontSize: 12,
        transform: [{ rotate: '-90deg' }],
        width: 80,
        textAlign: 'left',
    },
});
