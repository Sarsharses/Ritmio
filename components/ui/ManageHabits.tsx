import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Habit, loadAppState, saveAppState } from '@/utils/storage';

const uuidv4 = () =>
    Math.random().toString(36).substring(2, 10) +
    Date.now().toString(36);

export default function ManageHabits() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [newHabitName, setNewHabitName] = useState('');

    useEffect(() => {
        (async () => {
            const state = await loadAppState();
            if (state) setHabits(state.habits);
        })();
    }, []);

    useEffect(() => {
        saveAppState({ habits, grid: {} }); // note: this overrides grid if not fetched
    }, [habits]);

    const addHabit = () => {
        if (!newHabitName.trim()) return;
        setHabits([...habits, { id: uuidv4(), name: newHabitName.trim() }]);
        setNewHabitName('');
    };

    const deleteHabit = (id: string) => {
        setHabits(habits.filter(h => h.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Habits</Text>
            <TextInput
                placeholder="New habit name"
                value={newHabitName}
                onChangeText={setNewHabitName}
                style={styles.input}
                placeholderTextColor="#888"
            />
            <Button title="Add Habit" onPress={addHabit} />
            <FlatList
                data={habits}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.habitRow}>
                        <Text style={styles.habitText}>{item.name}</Text>
                        <TouchableOpacity onPress={() => deleteHabit(item.id)}>
                            <Text style={styles.delete}>🗑</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        padding: 20,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#333',
        color: '#fff',
        padding: 10,
        marginBottom: 10,
    },
    habitRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderBottomColor: '#444',
        borderBottomWidth: 1,
    },
    habitText: {
        color: '#ccc',
    },
    delete: {
        color: '#f55',
        fontSize: 18,
    },
});
