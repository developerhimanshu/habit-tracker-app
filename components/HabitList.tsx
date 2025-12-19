import { ScrollView, View } from "react-native";
import { Habit } from "../types";
import { EmptyState } from "./EmptyState";
import { HabitCard } from "./HabitCard";

interface HabitListProps {
  habits: Habit[];
  onDeleteHabit: (id: string) => void;
}

export const HabitList = ({ habits, onDeleteHabit }: HabitListProps) => {
  if (habits.length === 0) {
    return <EmptyState />;
  }

  return (
    <ScrollView className="flex-1  pt-6 " showsVerticalScrollIndicator={false}>
      <View className="pb-24">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onLongPress={() => onDeleteHabit(habit.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};
