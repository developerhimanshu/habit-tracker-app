import { useModalSwipeDown } from "@/hooks/useModalSwipeDown";
import { useState } from "react";
import {
  Animated,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export const AddTimeModal = ({
  visible,
  onClose,
  onAdd,
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: (time: number) => void;
}) => {
  const [time, setTime] = useState<number | undefined>(undefined);
  const [timeInput, setTimeInput] = useState<string>("");
  const { translateY, panHandlers } = useModalSwipeDown({ onClose });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const isValidInput = (input: string): boolean => {
    if (input.trim() === "") return false;
    // Check if input contains only digits (0-9)
    return /^\d+$/.test(input.trim()) && parseInt(input.trim()) > 0;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <Animated.View
          className={`rounded-t-3xl p-6 ${isDark ? "bg-gray-800" : "bg-white"}`}
          style={{
            transform: [{ translateY: translateY }],
          }}
          {...panHandlers}
        >
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

          <Text
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            } mb-2`}
          >
            Add Time
          </Text>
          <Text
            className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}
          >
            What time would you like to track?
          </Text>
          <TextInput
            className={`rounded-xl px-4 py-4 text-lg mb-6 ${
              isDark
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-gray-100 text-gray-900"
            }`}
            placeholder="e.g. 10, 15, 20, etc."
            placeholderTextColor={isDark ? "#9CA3AF" : "#9CA3AF"}
            value={timeInput}
            onChangeText={(text) => setTimeInput(text)}
          />
          {timeInput !== "" && !isValidInput(timeInput) && (
            <Text className="text-red-500 text-sm mb-6 -mt-6">
              *Please enter a valid time in numbers
            </Text>
          )}
          <TouchableOpacity
            disabled={!isValidInput(timeInput)}
            onPress={() => {
              if (isValidInput(timeInput)) {
                onAdd(parseInt(timeInput) * 60);
                setTimeInput("");
                onClose();
              }
            }}
            className={`px-6 py-3 rounded-xl ${
              isDark ? "bg-blue-600" : "bg-blue-500"
            }`}
            activeOpacity={0.7}
          >
            <Text
              className={`text-center font-semibold ${
                isDark ? "text-white" : "text-gray-700"
              }`}
            >
              Add Time
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};
