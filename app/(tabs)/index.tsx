import { AddHabitButton, AddHabitModal, HabitList, Header } from "@/components";
import { SafeAreaView } from "@/components/SafeAreaView";
import { useHabits } from "@/hooks/useHabits";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { habits, addHabit, deleteHabit, deleteHabitDirect, refreshHabits } =
    useHabits();
  const [modalVisible, setModalVisible] = useState(false);

  // Refresh habits when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refreshHabits();
    }, [refreshHabits])
  );

  const handleAddHabit = (name: string) => {
    addHabit(name);
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <View className="flex-1">
        <Header />
        <Text className={`text-3xl font-bold mb-2 text-white`}>
          Your today's tasks
        </Text>

        <HabitList
          habits={habits}
          onDeleteHabit={deleteHabit}
          onDeleteHabitDirect={deleteHabitDirect}
        />
        <AddHabitButton onPress={() => setModalVisible(true)} />
        <AddHabitModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={handleAddHabit}
        />
        {/* Remove the test View if not needed, or fix it like below */}
        {/* 
        <View
          style={{
            backgroundColor: isDark 
              ? "rgba(31, 41, 55, 0.4)"
              : "rgba(229, 231, 235, 0.6)",
            borderRadius: 24,
            padding: 48,
            alignItems: "center",
            borderWidth: 1,
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 12,
            overflow: "hidden",
          }}
        >
          <Text 
            style={{ 
              backgroundColor: "transparent",
              color: isDark ? "#FFFFFF" : "#111827" 
            }}
          >
            Hello
          </Text>
        </View>
        */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
