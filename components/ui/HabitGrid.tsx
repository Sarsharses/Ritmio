import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Habit, AppState, loadAppState, saveAppState } from '@/utils/storage';
import GridHeader from './GridHeader';
import GridCell from './GridCell';
import { format } from 'date-fns';
import Constants from "expo-constants";

const today = format(new Date(), 'dd-MM');

export default function HabitGrid() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [grid, setGrid] = useState<AppState['grid']>({});
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const state = await loadAppState();
                if (state) {
                    setHabits(state.habits);
                    setGrid(state.grid);
                }
                setLoading(false);
            })();
        }, [])
    );

    useEffect(() => {
        if (!loading) {
            saveAppState({ habits, grid });
        }
    }, [habits, grid]);



    const toggleCell = (date: string, habitId: string) => {
        setGrid(prev => {
            const newDay = { ...(prev[date] ?? {}) };
            newDay[habitId] = !newDay[habitId];
            return { ...prev, [date]: newDay };
        });
    };

    if (loading) {
        return (
            <View style={{ padding: 20 }}>
                <Text>🔄 Loading habit data...</Text>
            </View>
        );
    }

    const dates = Object.keys(grid).sort().reverse();
    if (!dates.includes(today)) {
        dates.unshift(today); // ensure today is always shown
    }

    const sortedDates = Object.keys(grid).sort().reverse();

    return (
        <View style={styles.container}>
            <Text style={styles.versionText}>
                Ritmio v{Constants.expoConfig?.version}
            </Text>
            <GridHeader habits={habits.map(h => h.name)} />
            <ScrollView>
                {dates.map(date => (
                    <View key={date} style={styles.row}>
                        <Text style={styles.dayLabel}>{date}</Text>
                        {habits.map(habit => (
                            <GridCell
                                key={habit.id}
                                done={grid[date]?.[habit.id] ?? false}
                                onToggle={() => toggleCell(date, habit.id)}
                            />
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        borderRightWidth: 1,
        borderRightColor: '#333',
    },
    dayLabel: {
        width: 60,
        fontSize: 12,
        color: '#aaa',
        borderLeftWidth: 1,
        borderLeftColor: '#333',
        borderRightWidth: 2,
        borderRightColor: '#333',
        padding: 6,
        textAlign: 'center',
    },
    versionText: {
        fontSize: 10,
        color: '#ccc',
        textAlign: 'left',
    }
});