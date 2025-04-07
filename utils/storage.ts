import AsyncStorage from '@react-native-async-storage/async-storage';

export type Habit = {
    id: string;
    name: string;
};

export type GridState = {
    [date: string]: {
        [habitId: string]: boolean;
    };
};

export type AppState = {
    habits: Habit[];
    grid: GridState;
};

const STORAGE_KEY = 'appState';

export const loadAppState = async (): Promise<AppState | null> => {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json) : null;
    } catch (e) {
        console.error('Failed to load app state', e);
        return null;
    }
};

export const saveAppState = async (state: AppState) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save app state', e);
    }
};

export async function saveGridState(key: string, data: { [date: string]: boolean[] }) {
    try {
        const json = JSON.stringify(data);
        console.log('Saving grid JSON:', json);
        await AsyncStorage.setItem(key, json);
        console.log('Grid state saved.');
    } catch (e) {
        console.error('Failed to save grid state:', e);
    }
}

export async function loadGridState(key: string): Promise<{ [date: string]: boolean[] } | null> {
    try {
        console.log('Loading grid state...');
        const json = await AsyncStorage.getItem(key);
        if (!json) {
            console.log('No grid data found');
            return null;
        }

        const parsed = JSON.parse(json);
        if (
            typeof parsed === 'object' &&
            !Array.isArray(parsed) &&
            Object.values(parsed).every(
                row => Array.isArray(row) && row.every(cell => typeof cell === 'boolean')
            )
        ) {
            console.log('Loaded grid from storage.');
            return parsed;
        } else {
            console.warn('Invalid grid format in storage. Resetting...');
            return null;
        }
    } catch (e) {
        console.error('❌ Error loading grid state:', e);
        return null;
    }
}

export async function clearGridState(key: string) {
    await AsyncStorage.removeItem(key);
}