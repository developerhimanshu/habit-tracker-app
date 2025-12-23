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

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export const AddHabitModal = ({
  visible,
  onClose,
  onAdd,
}: AddHabitModalProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [habitName, setHabitName] = useState("");
  const [habitType, setHabitType] = useState("");
  const habitsType = [
    "Health",
    "Finance",
    "Upskill",
    "Personal",
    "Work",
    "Other",
  ];

  const handleAdd = () => {
    onAdd(habitName);
    setHabitName("");
    onClose();
  };

  const handleClose = () => {
    setHabitName("");
    onClose();
  };

  const { translateY, panHandlers } = useModalSwipeDown({
    onClose: handleClose,
  });

  const isValid = habitName.length >= 3 && habitName.trim() !== "";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <Animated.View
          className={`rounded-t-3xl p-6 ${isDark ? "bg-gray-900" : "bg-white"}`}
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
            Add New Habit
          </Text>
          <Text
            className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}
          >
            What habit would you like to track?
          </Text>

          <TextInput
            className={`rounded-xl px-4 py-4 text-lg mb-6 ${
              isDark
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-gray-100 text-gray-900"
            }`}
            placeholder="e.g., Exercise daily, Read 30 minutes"
            placeholderTextColor="#9CA3AF"
            value={habitName}
            onChangeText={setHabitName}
            autoFocus
            onSubmitEditing={handleAdd}
          />

          <View className="flex-row flex-wrap gap-3 mb-6">
            {habitsType.map((type) => (
              <TouchableOpacity
                key={type}
                className={`rounded-full border-2 px-4 py-2 ${
                  habitType === type
                    ? isDark
                      ? "bg-blue-600 border-blue-500"
                      : "bg-blue-500 border-blue-600"
                    : isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-100 border-gray-300"
                }`}
                onPress={() => setHabitType(type)}
              >
                <Text
                  className={`font-semibold 
                  ${
                    habitType === type
                      ? isDark
                        ? "text-white"
                        : "text-gray-700"
                      : isDark
                      ? "text-gray-300"
                      : "text-gray-700"
                  }
                  `}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {!isValid && (
            <Text
              className={`${
                isDark ? "text-red-400" : "text-gray-600"
              } mb-2 text-sm`}
            >
              *Add at least 3 characters to add a habit
            </Text>
          )}
          <View className="flex-row gap-3 justify-end">
            <TouchableOpacity
              onPress={handleClose}
              className={`px-6 py-3 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              <Text
                className={`font-semibold ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAdd}
              className={`px-6 py-3 rounded-xl ${
                isValid
                  ? isDark
                    ? "bg-blue-600"
                    : "bg-blue-500"
                  : isDark
                  ? "bg-gray-700"
                  : "bg-gray-300"
              }`}
              disabled={!isValid}
            >
              <Text
                className={`font-semibold ${
                  isValid
                    ? isDark
                      ? "text-white"
                      : "text-gray-700"
                    : isDark
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Add Habit
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
