import { useModalSwipeDown } from "@/hooks/useModalSwipeDown";
import {
  Animated,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const PREDEFINED_TASKS = ["Study", "Work", "Exercise", "Revision"];

export const AddTaskDetailsModal = ({
  visible,
  onClose,
  onAdd,
  setTaskName,
  taskName,
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
  setTaskName: (name: string) => void;
  taskName: string | null;
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { translateY, panHandlers } = useModalSwipeDown({
    onClose: onClose,
  });

  const handleSelectPredefinedTask = (task: string) => {
    setTaskName(task);
  };

  const handleAdd = () => {
    if (taskName && taskName.trim() !== "") {
      onAdd(taskName.trim());
    }
  };

  const isValid = taskName && taskName.trim() !== "";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <Animated.View
          className={`rounded-t-3xl p-6 ${isDark ? "bg-gray-900" : "bg-white"}`}
          style={{
            transform: [{ translateY: translateY }],
          }}
          {...panHandlers}
        >
          <View
            className={`w-12 h-1 rounded-full self-center mb-6 ${
              isDark ? "bg-gray-600" : "bg-gray-300"
            }`}
          />

          <Text
            className={`text-2xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Add Task Details
          </Text>
          <Text
            className={`mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Select a predefined task or enter a custom task name
          </Text>

          {/* Predefined Task Options */}
          <View className="flex-row flex-wrap gap-2 mb-4">
            {PREDEFINED_TASKS.map((task) => (
              <TouchableOpacity
                key={task}
                onPress={() => handleSelectPredefinedTask(task)}
                className={`px-4 py-2 rounded-full border-2 ${
                  taskName === task
                    ? isDark
                      ? "bg-blue-600 border-blue-500"
                      : "bg-blue-500 border-blue-600"
                    : isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-100 border-gray-300"
                }`}
                activeOpacity={0.7}
              >
                <Text
                  className={`font-semibold ${
                    taskName === task
                      ? "text-white"
                      : isDark
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`}
                >
                  {task}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text
            className={`text-sm mb-2 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Or enter custom task name:
          </Text>

          <TextInput
            className={`rounded-xl px-4 py-4 text-lg mb-6 ${
              isDark
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-gray-100 text-gray-900"
            }`}
            placeholder="e.g., Reading, Meditation"
            placeholderTextColor={isDark ? "#9CA3AF" : "#9CA3AF"}
            value={taskName ?? ""}
            onChangeText={setTaskName}
            autoFocus
          />

          <View className="flex-row justify-end gap-3">
            <TouchableOpacity
              onPress={onClose}
              className={`px-6 py-3 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
              activeOpacity={0.7}
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
              disabled={!isValid}
              className={`px-6 py-3 rounded-xl ${
                isValid
                  ? isDark
                    ? "bg-blue-600"
                    : "bg-blue-500"
                  : isDark
                  ? "bg-gray-700"
                  : "bg-gray-300"
              }`}
              activeOpacity={0.7}
            >
              <Text className="font-semibold text-white">Start Timer</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
