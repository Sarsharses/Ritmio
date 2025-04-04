import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveGridState(key: string, data: boolean[][]) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('❌ Failed to save grid state:', e);
    }
}

export async function loadGridState(key: string): Promise<boolean[][] | null> {
    try {
        const json = await AsyncStorage.getItem(key);
        return json ? JSON.parse(json) : null;
    } catch (e) {
        console.error('❌ Failed to load grid state:', e);
        return null;
    }
}