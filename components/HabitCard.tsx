import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Habit } from "../types";

interface HabitCardProps {
  habit: Habit;
  onLongPress: () => void;
}

export const HabitCard = ({ habit, onLongPress }: HabitCardProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark
    ? "bg-gray-800/40 border-[rgba(255,255,255,0.2)]"
    : "bg-white/80 border-[rgba(0,0,0,0.1)]";
  const reversedBackgroundColor = isDark
    ? "bg-white/40 border-[rgba(0,0,0,0.1)]"
    : "bg-gray-800/40 border-[rgba(255,255,255,0.2)]";
  const textColor = isDark ? "text-white" : "text-black";
  const reversedTextColor = isDark ? "text-black" : "text-white";

  return (
    <TouchableOpacity onLongPress={onLongPress} activeOpacity={0.7}>
      <View
        className={`${backgroundColor} rounded-2xl p-5 mb-4 shadow-md flex-row items-center backdrop-blur-[20px] border `}
      >
        <View
          className={`${reversedBackgroundColor} shadow-lg w-12 h-12 rounded-full items-center justify-center mr-4`}
        >
          <Text className={`${reversedTextColor} text-xl font-bold`}>
            {habit.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View className="flex-1">
          <Text className={`text-lg font-semibold ${textColor}`}>
            {habit.name}
          </Text>
          <Text className={`text-sm ${textColor} mt-1`}>
            Added {new Date(habit.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center">
          <Text className="text-green-600 text-lg">✓</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
