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
