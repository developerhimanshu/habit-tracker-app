import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
export const SelectTime = ({
  handleSelectTime,
  handleShowTimeModal,
}: {
  handleSelectTime: (time: number) => void;
  handleShowTimeModal: () => void;
}) => {
  const timersInMinutes = [5, 10, 15, 20, 25, 30, 45];
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark
    ? "bg-gray-800/40 border-[rgba(255,255,255,0.2)]"
    : "bg-white/80 border-[rgba(0,0,0,0.1)]";

  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  return (
    <View className="flex-row gap-4 flex-wrap justify-center ">
      {timersInMinutes.map((time) => (
        <TouchableOpacity
          key={time}
          className={`flex-1 min-w-[10rem] h-[10rem]  items-center justify-center border ${backgroundColor} p-4 rounded-xl`}
          onPress={() => handleSelectTime(time * 60)}
        >
          <Text className={`text-2xl font-bold ${textColor}`}>{time}</Text>
          <Text className={` text-sm ${textColor}`}>mins</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        className="flex-1 min-w-[10rem] h-[10rem] items-center justify-center p-4 rounded-md"
        onPress={handleShowTimeModal}
      >
        <Text className={`text-[4rem]  ${textColor}`}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
