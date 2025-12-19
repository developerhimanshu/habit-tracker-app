import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

const TimerClock = ({
  time,
  handleBack,
}: {
  time: number;
  handleBack: () => void;
}) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const [seconds, setSeconds] = useState(time);

  function formatSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (seconds === 0) {
      handleBack();
      setSeconds(time);
    }
  }, [seconds]);

  return (
    <View className={`flex-1`}>
      <TouchableOpacity
        className="bg-gray-200 w-20 px-2 text-center rounded"
        onPress={handleBack}
      >
        <Text className="text-lg  text-gray-900 text-center w-full">Back</Text>
      </TouchableOpacity>
      <View className="flex-1 h-full justify-center items-center">
        <Text className={`text-[4rem]  ${textColor}`}>
          {formatSeconds(seconds)}
        </Text>
      </View>
    </View>
  );
};

export default TimerClock;
