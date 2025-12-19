import { useRef } from "react";
import { Animated, PanResponder } from "react-native";

interface UseModalSwipeDownOptions {
  onClose: () => void;
  threshold?: number; // Distance in pixels to trigger close (default: 100)
  closeVelocity?: number; // Velocity threshold to trigger close (optional)
}

export function useModalSwipeDown({
  onClose,
  threshold = 100,
  closeVelocity,
}: UseModalSwipeDownOptions) {
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to downward swipes
        return gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow downward movement
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const shouldClose =
          gestureState.dy > threshold ||
          (closeVelocity && gestureState.vy > closeVelocity);

        if (shouldClose) {
          // Animate out and close
          Animated.timing(translateY, {
            toValue: 1000,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            translateY.setValue(0);
            onClose();
          });
        } else {
          // Snap back to original position
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
          }).start();
        }
      },
    })
  ).current;

  return {
    translateY,
    panHandlers: panResponder.panHandlers,
  };
}

