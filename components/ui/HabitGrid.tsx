import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import GridHeader from './GridHeader';
import GridCell from './GridCell';
import { saveGridState, loadGridState } from '@/utils/storage';

const habits = ['Meditate', 'Workout', 'Read', 'Write', 'Sleep early'];
const STORAGE_KEY = 'habitGrid';

type GridState = {
    [date: string]: boolean[];
};

export default function HabitGrid() {
    const [grid, setGrid] = useState<GridState | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const saved = await loadGridState(STORAGE_KEY);
            const today = getTodayKey();
            const initial: GridState = saved && isValidState(saved) ? { ...saved } : {};

            // Add today if missing
            if (!initial[today]) {
                initial[today] = createEmptyRow();
            }

            setGrid(initial);
            setLoading(false);
        })();
    }, []);

    const createEmptyRow = () => Array(habits.length).fill(false);

    const getTodayKey = () =>
        new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    const isValidState = (data: any): data is GridState => {
        return (
            typeof data === 'object' &&
            Object.values(data).every(
                row =>
                    Array.isArray(row) &&
                    row.length === habits.length &&
                    row.every(cell => typeof cell === 'boolean')
            )
        );
    };

    const isDateEditable = (dateStr: string) => {
        const today = new Date();
        const date = new Date(dateStr);
        const diff = (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 1; // today or yesterday
    };

    const toggleCell = (date: string, habitIndex: number) => {
        if (!grid) return;

        const newGrid = { ...grid };
        newGrid[date] = [...(newGrid[date] ?? createEmptyRow())];
        newGrid[date][habitIndex] = !newGrid[date][habitIndex];

        setGrid(newGrid);
        saveGridState(STORAGE_KEY, newGrid);
    };

    const formatDisplayDate = (iso: string): string => {
        const d = new Date(iso);
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
        });
    };

    if (loading || !grid) {
        return (
            <View style={{ padding: 20 }}>
                <Text>🔄 Loading habit data...</Text>
            </View>
        );
    }

    const sortedDates = Object.keys(grid).sort().reverse();

    return (
        <View style={styles.container}>
            <GridHeader habits={habits} />
            <ScrollView>
                {sortedDates.map(date => (
                    <View key={date} style={styles.row}>
                        <Text style={styles.dayLabel}>{formatDisplayDate(date)}</Text>
                        {grid[date].map((done, habitIndex) => (
                            <GridCell
                                key={habitIndex}
                                done={done}
                                onToggle={() => isDateEditable(date) && toggleCell(date, habitIndex)}
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
});