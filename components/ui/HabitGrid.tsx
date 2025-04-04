import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import GridHeader from './GridHeader';
import GridCell from './GridCell';
import { saveGridState, loadGridState } from '@/utils/storage';

const habits = ['Meditate', 'Workout', 'Read', 'Write', 'Sleep early'];
const numDays = 7;
const STORAGE_KEY = 'habitGrid';

export default function HabitGrid() {
    const [grid, setGrid] = useState<boolean[][] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const saved = await loadGridState(STORAGE_KEY);
            if (saved && validateGrid(saved)) {
                setGrid(saved);
            } else {
                setGrid(
                    Array.from({ length: numDays }, () =>
                        Array(habits.length).fill(false)
                    )
                );
            }
            setLoading(false);
        })();
    }, []);

    // Manual validation
    const validateGrid = (data: any): data is boolean[][] => {
        return (
            Array.isArray(data) &&
            data.every(
                row =>
                    Array.isArray(row) &&
                    row.length === habits.length &&
                    row.every(cell => typeof cell === 'boolean')
            )
        );
    };

    const updateCell = (dayIndex: number, habitIndex: number) => {
        if (!grid) return;
        const newGrid = grid.map(row => [...row]); // deep copy
        newGrid[dayIndex][habitIndex] = !newGrid[dayIndex][habitIndex];
        setGrid(newGrid);
        saveGridState(STORAGE_KEY, newGrid); // 🧠 Explicit save
    };

    if (loading || grid === null) {
        return (
            <View style={{ padding: 20 }}>
                <Text>🔄 Loading habit data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <GridHeader habits={habits} />
            <ScrollView>
                {grid.map((row, dayIndex) => (
                    <View key={dayIndex} style={styles.row}>
                        <Text style={styles.dayLabel}>Day {dayIndex + 1}</Text>
                        {row.map((done, habitIndex) => (
                            <GridCell
                                key={habitIndex}
                                done={done}
                                onToggle={() => updateCell(dayIndex, habitIndex)}
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
        paddingHorizontal: 10,
        paddingTop: 50,
        backgroundColor: '#fff',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    dayLabel: {
        width: 60,
        fontSize: 12,
    },
});
