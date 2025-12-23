import { Animated, ScrollView, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Habit } from "../types";
import { EmptyState } from "./EmptyState";
import { HabitCard } from "./HabitCard";

interface HabitListProps {
  habits: Habit[];
  onDeleteHabit: (id: string) => void;
  onDeleteHabitDirect: (id: string) => void;
}

export const HabitList = ({
  habits,
  onDeleteHabit,
  onDeleteHabitDirect,
}: HabitListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fadeAnim = useRef<{ [key: string]: Animated.Value }>({});
  const slideAnim = useRef<{ [key: string]: Animated.Value }>({});

  // Initialize animations for habits
  useEffect(() => {
    habits.forEach((habit) => {
      if (!fadeAnim.current[habit.id]) {
        fadeAnim.current[habit.id] = new Animated.Value(1);
        slideAnim.current[habit.id] = new Animated.Value(0);
      }
    });
  }, [habits]);

  const handleSwipeDelete = (id: string) => {
    setDeletingId(id);
    const opacity = fadeAnim.current[id];
    const translateX = slideAnim.current[id];

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDeleteHabitDirect(id);
      setDeletingId(null);
      delete fadeAnim.current[id];
      delete slideAnim.current[id];
    });
  };

  if (habits.length === 0) {
    return <EmptyState />;
  }

  return (
    <ScrollView className="flex-1  pt-6 " showsVerticalScrollIndicator={false}>
      <View className="pb-24">
        {habits.map((habit) => {
          const opacity = fadeAnim.current[habit.id] || new Animated.Value(1);
          const translateX = slideAnim.current[habit.id] || new Animated.Value(0);

          return (
            <Animated.View
              key={habit.id}
              style={{
                opacity: deletingId === habit.id ? opacity : 1,
                transform: [
                  {
                    translateX: deletingId === habit.id ? translateX : 0,
                  },
                ],
              }}
            >
              <HabitCard
                habit={habit}
                onLongPress={() => onDeleteHabit(habit.id)}
                onDelete={() => handleSwipeDelete(habit.id)}
              />
            </Animated.View>
          );
        })}
      </View>
    </ScrollView>
  );
};
