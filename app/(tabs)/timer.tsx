import { Header } from "@/components";
import { AddTimeModal } from "@/components/AddTimeModal";
import { AddTaskDetailsModal } from "@/components/modals/AddTaskDetailsModal";
import { SafeAreaView } from "@/components/SafeAreaView";
import { SelectTime } from "@/components/SelectTime";
import TimerClock from "@/components/TimerClock";
import { useHabits } from "@/hooks/useHabits";
import { useState } from "react";
import { ScrollView, useColorScheme } from "react-native";
export default function TimerScreen() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const { addHabit } = useHabits();

  const [time, setTime] = useState<number | null>(null);
  const [showTimerClock, setShowTimerClock] = useState(false);
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const [isTaskDetailsModalVisible, setIsTaskDetailsModalVisible] =
    useState(false);
  const [taskName, setTaskName] = useState<string | null>(null);

  const handleSelectTime = (time: number) => {
    setTime(time);
    setIsTaskDetailsModalVisible(true);
  };
  const handleBack = () => {
    setTime(null);
    setShowTimerClock(false);
    setTaskName(null);
  };
  const handleShowTimeModal = () => {
    setIsTimeModalVisible(true);
    setShowTimerClock(false);
  };

  const handleAddTask = (taskName: string) => {
    if (!taskName || taskName.trim() === "") {
      return;
    }

    const trimmedTaskName = taskName.trim();
    setTaskName(trimmedTaskName);

    // Save the task as a habit
    addHabit(trimmedTaskName);

    setShowTimerClock(true);
    setIsTaskDetailsModalVisible(false);
  };

  console.log(showTimerClock);

  return (
    <SafeAreaView>
      <Header title="Timer" subtitle="Track your time with a Timer" />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      >
        {(!showTimerClock || !time) && (
          <SelectTime
            handleSelectTime={handleSelectTime}
            handleShowTimeModal={handleShowTimeModal}
          />
        )}
        {showTimerClock && time && taskName && (
          <TimerClock time={time} handleBack={handleBack} taskName={taskName} />
        )}
      </ScrollView>
      <AddTaskDetailsModal
        visible={isTaskDetailsModalVisible}
        onClose={() => {
          setIsTaskDetailsModalVisible(false);
          setTaskName(null);
        }}
        onAdd={handleAddTask}
        setTaskName={setTaskName}
        taskName={taskName}
      />
      <AddTimeModal
        visible={isTimeModalVisible}
        onClose={() => setIsTimeModalVisible(false)}
        onAdd={handleSelectTime}
      />
    </SafeAreaView>
  );
}
