import { Text, useColorScheme, View } from "react-native";

export const EmptyState = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="items-center justify-center py-20">
      <View
        className={`${
          isDark ? "bg-gray-800/40" : "bg-white"
        } rounded-3xl p-12 items-center backdrop-blur-[20px]`}
        style={{
          // Subtle border glow
          borderWidth: 1,
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
          // Enhanced glow effect
          shadowColor: isDark ? "#000" : "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 12,
        }}
      >
        <Text className="text-6xl mb-4">📝</Text>
        <Text
          className={`text-xl font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          No habits yet
        </Text>
        <Text
          className={`text-center ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Tap the + button to add your first habit
        </Text>
      </View>
    </View>
  );
};
