import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type Props = {
    done: boolean;
    onToggle: () => void;
};

export default function GridCell({done, onToggle}: Props) {
    return (
        <Pressable style={styles.cell} onPress={onToggle}>
            <Text style={[styles.text, done && styles.textDone]}>
                {done ? '✖' : ' '}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#333',
    },
    text: {
        color: '#555',
        fontSize: 18,
    },
    textDone: {
        color: '#ccc',
    },
});
