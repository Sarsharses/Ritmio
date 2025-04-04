import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
    done: boolean;
    onToggle: () => void;
};

export default function GridCell({ done, onToggle }: Props) {
    return (
        <Pressable
            style={[styles.cell, done && styles.cellDone]}
            onPress={onToggle}
        />
    );
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        aspectRatio: 1,
        marginHorizontal: 2,
        backgroundColor: '#eee',
        borderRadius: 4,
    },
    cellDone: {
        backgroundColor: '#4caf50',
    },
});
