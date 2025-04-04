import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

// Example habits and number of days
const habits = ['Meditate', 'Workout', 'Read', 'Write', 'Sleep early'];
const numDays = 7;

export default function HomeScreen() {
  const [grid, setGrid] = useState(
    Array.from({ length: numDays }, () => Array(habits.length).fill(false))
  );

  const toggleCell = (dayIndex: number, habitIndex: number) => {
    const newGrid = [...grid];
    newGrid[dayIndex][habitIndex] = !newGrid[dayIndex][habitIndex];
    setGrid(newGrid);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.cornerCell}>Day ↓</Text>
        {habits.map((habit, i) => (
          <Text key={i} style={styles.headerCell}>{habit}</Text>
        ))}
      </View>

      <ScrollView>
        {grid.map((row, dayIndex) => (
          <View key={dayIndex} style={styles.row}>
            <Text style={styles.dayLabel}>Day {dayIndex + 1}</Text>
            {row.map((completed, habitIndex) => (
              <Pressable
                key={habitIndex}
                style={[styles.cell, completed && styles.cellDone]}
                onPress={() => toggleCell(dayIndex, habitIndex)}
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
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
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
