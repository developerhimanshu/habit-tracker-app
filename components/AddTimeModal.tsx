import { useModalSwipeDown } from "@/hooks/useModalSwipeDown";
import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { Animated, Modal, Text, TextInput, View } from "react-native";

export const AddTimeModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [time, setTime] = useState(0);
  const { translateY, panHandlers } = useModalSwipeDown({ onClose });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <Animated.View
          className="bg-white rounded-t-3xl p-6"
          style={{
            transform: [{ translateY: translateY }],
          }}
          {...panHandlers}
        >
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Add Time
          </Text>
          <Text className="text-gray-600 mb-6">
            What time would you like to track?
          </Text>
          <TextInput
            className="bg-gray-100 rounded-xl px-4 py-4 text-lg text-gray-900 mb-6"
            placeholder="e.g., 10 minutes"
            value={time.toString()}
            onChangeText={(text) => setTime(parseInt(text) || 0)}
          />
          <Button>Add Time</Button>
        </Animated.View>
      </View>
    </Modal>
  );
};
