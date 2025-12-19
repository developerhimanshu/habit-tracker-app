import { useModalSwipeDown } from "@/hooks/useModalSwipeDown";
import { useState } from "react";
import {
  Animated,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <Animated.View
          className="bg-white rounded-t-3xl p-6"
          style={{
            transform: [{ translateY: translateY }],
          }}
          {...panHandlers}
        >
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Add New Habit
          </Text>
          <Text className="text-gray-600 mb-6">
            What habit would you like to track?
          </Text>

          <TextInput
            className="bg-gray-100 rounded-xl px-4 py-4 text-lg text-gray-900 mb-6"
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
                className={`rounded-xl px-4 py-2 ${
                  habitType === type
                    ? "bg-black text-white"
                    : "text-gray-700 bg-gray-100"
                }`}
                onPress={() => setHabitType(type)}
              >
                <Text
                  className={`text-gray-700 font-semibold text-lg
                  ${habitType === type ? "text-white" : "text-gray-700"}
                  `}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleClose}
              className="flex-1 bg-gray-100 rounded-xl py-4 items-center"
            >
              <Text className="text-gray-700 font-semibold text-lg">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAdd}
              className="flex-1 rounded-xl overflow-hidden"
            >
              <View className="bg-black shadow-lg py-4 items-center justify-center">
                <Text className="text-white font-semibold text-lg">
                  Add Habit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
