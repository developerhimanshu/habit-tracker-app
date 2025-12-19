import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NavBar = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const isActive = (routeName: string) => {
    return route.name === routeName;
  };

  return (
    <View className="absolute bottom-8 left-0 right-0 items-center">
      <View className="flex-row items-center gap-2 px-4 py-3 bg-black rounded-full shadow-lg">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className={`px-4 py-2 rounded-full ${
            isActive("Home") ? "bg-white/20" : ""
          }`}
        >
          <Text
            className={`text-sm font-semibold ${
              isActive("Home") ? "text-white" : "text-gray-400"
            }`}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${
            isActive("Tasks") ? "bg-white/20" : ""
          }`}
          onPress={() => navigation.navigate("Tasks")}
        >
          <Text className="text-sm font-semibold text-gray-400">Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Timer")}
          className={`px-4 py-2 rounded-full ${
            isActive("Timer") ? "bg-white/20" : ""
          }`}
        >
          <Text
            className={`text-sm font-semibold ${
              isActive("Timer") ? "text-white" : "text-gray-400"
            }`}
          >
            Timer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavBar;
