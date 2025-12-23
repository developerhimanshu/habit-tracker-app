import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Habit } from "../types";
import { storage } from "../utils/storage";

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHabits = useCallback(async () => {
    try {
      setLoading(true);
      const loadedHabits = await storage.getHabits();
      setHabits(loadedHabits);
    } catch (error) {
      console.error("Error loading habits:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveHabits = useCallback(async (newHabits: Habit[]) => {
    try {
      await storage.saveHabits(newHabits);
      setHabits(newHabits);
    } catch (error) {
      Alert.alert("Error", "Failed to save habit");
    }
  }, []);

  const addHabit = useCallback(
    (name: string) => {
      if (name.trim() === "") {
        Alert.alert("Invalid Input", "Please enter a habit name");
        return;
      }

      const trimmedName = name.trim();
      
      // Check if habit with the same name already exists
      const existingHabit = habits.find(
        (habit) => habit.name.toLowerCase() === trimmedName.toLowerCase()
      );
      
      if (existingHabit) {
        // Habit already exists, don't add duplicate
        return;
      }

      const newHabit: Habit = {
        id: Date.now().toString(),
        name: trimmedName,
        createdAt: new Date().toISOString(),
      };

      const updatedHabits = [...habits, newHabit];
      saveHabits(updatedHabits);
    },
    [habits, saveHabits]
  );

  const deleteHabitDirect = useCallback(
    (id: string) => {
      const updatedHabits = habits.filter((habit) => habit.id !== id);
      saveHabits(updatedHabits);
    },
    [habits, saveHabits]
  );

  const deleteHabit = useCallback(
    (id: string) => {
      Alert.alert(
        "Delete Habit",
        "Are you sure you want to delete this habit?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              deleteHabitDirect(id);
            },
          },
        ]
      );
    },
    [deleteHabitDirect]
  );

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  return {
    habits,
    loading,
    addHabit,
    deleteHabit,
    deleteHabitDirect,
    refreshHabits: loadHabits,
  };
};
