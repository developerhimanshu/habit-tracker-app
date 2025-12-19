import { TouchableOpacity, useColorScheme, View } from "react-native";
import { AntDesignSymbol } from "./ui/icon-symbol";

interface AddHabitButtonProps {
  onPress: () => void;
}

export const AddHabitButton = ({ onPress }: AddHabitButtonProps) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const backgroundColor = colorScheme === "dark" ? "bg-gray-600" : "bg-white";
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="absolute bottom-8 right-6"
      style={{
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <View
        className={` shadow-lg w-12 h-12 rounded-full items-center justify-center ${backgroundColor}`}
      >
        <AntDesignSymbol size={24} name="plus" color={textColor} />
      </View>
    </TouchableOpacity>
  );
};
