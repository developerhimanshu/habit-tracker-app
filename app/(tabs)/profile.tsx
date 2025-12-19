import { SafeAreaView } from "@/components/SafeAreaView";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-white">Profile</Text>
      </View>
    </SafeAreaView>
  );
}
