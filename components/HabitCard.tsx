import { useRef } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Habit } from "../types";

interface HabitCardProps {
  habit: Habit;
  onLongPress: () => void;
  onDelete: () => void;
}

export const HabitCard = ({ habit, onLongPress, onDelete }: HabitCardProps) => {
  const swipeableRef = useRef<Swipeable>(null);
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

  const renderRightAction = (
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    });

    const opacity = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    });

    const handleDelete = () => {
      swipeableRef.current?.close();
      onDelete();
    };

    return (
      <TouchableOpacity
        onPress={handleDelete}
        activeOpacity={0.9}
        className="justify-center items-center mb-4"
        style={{ width: 100 }}
      >
        <Animated.View
          className="flex-1 justify-center items-center w-full rounded-2xl"
          style={{
            transform: [{ scale }],
            opacity,
          }}
        >
          {/* Gradient effect using multiple overlays */}
          <View
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundColor: "#DC2626", // Darker red (red-600)
            }}
          />
          <View
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundColor: "#EF4444", // Medium red (red-500) - 70% opacity
              opacity: 0.7,
            }}
          />

          <View className="relative z-10">
            <Text className="text-white font-bold text-base">Delete</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightAction}>
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
    </Swipeable>
  );
};
