import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import GridHeader from "@/app/components/ui/GridHeader";
import GridCell from "@/app/components/ui/GridCell";

const habits = ['Meditate', 'Workout', 'Read', 'Write', 'Sleep Early'];
const numDays = 7;

export default function HabitGrid() {
    const [grid, setGrid] = useState(
        Array.from({length: numDays}, () => Array(habits.length).fill(false))
    );

    const toggleCell = (dayIndex: number, habitIndex: number) => {
        const newGrid = [...grid];
        newGrid[dayIndex][habitIndex] = !newGrid[dayIndex][habitIndex];
        setGrid(newGrid);
    };

    return (
        <View style={styles.container}>
            <GridHeader habits={habits}/>

            <ScrollView>
                {grid.map((row, dayIndex) => (
                    <View key={dayIndex} style={styles.row}>
                        <Text style={styles.dayLabel}>Day {dayIndex + 1}</Text>
                        {row.map((completed, habitIndex) => (
                            <GridCell
                                key={habitIndex}
                                done={completed}
                                onToggle={() => toggleCell(dayIndex, habitIndex)}
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