import { STORAGE_KEYS } from "@/constants";
import { Habit } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  async getHabits(): Promise<Habit[]> {
    try {
      const storedHabits = await AsyncStorage.getItem(STORAGE_KEYS.HABITS);
      return storedHabits ? JSON.parse(storedHabits) : [];
    } catch (error) {
      console.error("Error loading habits:", error);
      return [];
    }
  },

  async saveHabits(habits: Habit[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    } catch (error) {
      console.error("Error saving habits:", error);
      throw error;
    }
  },
};
