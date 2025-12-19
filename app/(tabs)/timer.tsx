import { Header } from "@/components";
import { AddTimeModal } from "@/components/AddTimeModal";
import { SafeAreaView } from "@/components/SafeAreaView";
import { SelectTime } from "@/components/SelectTime";
import TimerClock from "@/components/TimerClock";
import { useState } from "react";
import { ScrollView, useColorScheme } from "react-native";
export default function TimerScreen() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "text-white" : "text-black";

  const [time, setTime] = useState<number | null>(null);
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const handleSelectTime = (time: number) => {
    setTime(time);
  };
  const handleBack = () => {
    setTime(null);
  };
  const handleShowTimeModal = () => {
    setIsTimeModalVisible(true);
  };
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
        {!time && (
          <SelectTime
            handleSelectTime={handleSelectTime}
            handleShowTimeModal={handleShowTimeModal}
          />
        )}
        {time && <TimerClock time={time} handleBack={handleBack} />}
      </ScrollView>
      <AddTimeModal
        visible={isTimeModalVisible}
        onClose={() => setIsTimeModalVisible(false)}
      />
    </SafeAreaView>
  );
}
