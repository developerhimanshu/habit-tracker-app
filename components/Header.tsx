import { Text, useColorScheme, View } from "react-native";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header = ({
  title = "Habit Tracker",
  subtitle = "Build better habits, one day at a time",
}: HeaderProps) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "text-white" : "text-black";

  const subtitleColor =
    colorScheme === "dark" ? "text-gray-400" : "text-gray-600";
  return (
    <View
      className={`pt-4 pb-4  shadow-sm `}
      style={{
        paddingTop: 20,
        paddingBottom: 10,
      }}
    >
      <Text className={`text-4xl font-bold mb-2 ${textColor}`}>{title}</Text>
      <Text className={`text-base ${subtitleColor}`}>{subtitle}</Text>
    </View>
  );
};
