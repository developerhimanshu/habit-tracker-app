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
  const backgroundColor = colorScheme === "dark" ? "bg-gray-600" : "bg-white";
  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  return (
    <View className="flex-row gap-4 flex-wrap justify-center ">
      {timersInMinutes.map((time) => (
        <TouchableOpacity
          key={time}
          className={`flex-1 min-w-[10rem] h-[10rem]  items-center justify-center ${backgroundColor} p-4 rounded-xl`}
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
