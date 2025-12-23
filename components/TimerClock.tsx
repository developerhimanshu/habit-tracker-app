import { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.7;
const STROKE_WIDTH = 12;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TimerClock = ({
  time,
  handleBack,
  taskName,
}: {
  time: number;
  handleBack: () => void;
  taskName: string | null;
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [seconds, setSeconds] = useState(time);
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  // Animation values
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);
  const pulseScale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  function formatSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  // Timer logic
  useEffect(() => {
    if (seconds > 0 && isRunning && !isPaused) {
      const interval = setInterval(() => {
        setSeconds((prev) => {
          const newSeconds = prev - 1;
          // Update progress
          progress.value = withTiming(newSeconds / time, {
            duration: 1000,
            easing: Easing.linear,
          });

          // Pulse animation on each second
          pulseScale.value = withSequence(
            withTiming(1.05, { duration: 200 }),
            withTiming(1, { duration: 200 })
          );

          if (newSeconds === 0) {
            // Timer finished animation
            scale.value = withSequence(
              withTiming(1.2, { duration: 300 }),
              withTiming(0, { duration: 200 })
            );
            opacity.value = withTiming(0, { duration: 200 });
            setTimeout(() => {
              handleBack();
              setSeconds(time);
              progress.value = 1;
              scale.value = 1;
              opacity.value = 1;
            }, 500);
          }
          return newSeconds;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, isRunning, isPaused, time, handleBack]);

  // Initial animation
  useEffect(() => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
    progress.value = 1;
  }, []);

  // Button pulse animation when running
  useEffect(() => {
    if (isRunning && !isPaused) {
      buttonScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        false
      );
    } else {
      buttonScale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
    }
  }, [isRunning, isPaused]);

  // Animated props for circle
  const animatedCircleProps = useAnimatedProps(() => {
    const strokeDashoffset = CIRCUMFERENCE * (1 - progress.value);
    return {
      strokeDashoffset: strokeDashoffset,
    };
  });

  // Animated styles
  const containerStyle = useAnimatedProps(() => {
    return {
      style: {
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
      },
    };
  });

  const pulseStyle = useAnimatedProps(() => {
    return {
      style: {
        transform: [{ scale: pulseScale.value }],
      },
    };
  });

  const buttonAnimatedStyle = useAnimatedProps(() => {
    return {
      style: {
        transform: [{ scale: buttonScale.value }],
      },
    };
  });

  const togglePause = () => {
    setIsPaused(!isPaused);
    scale.value = withSpring(isPaused ? 1 : 0.95, {
      damping: 10,
      stiffness: 200,
    });
  };

  const resetTimer = () => {
    setSeconds(time);
    setIsPaused(false);
    setIsRunning(true);
    progress.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    handleBack();
  };

  const progressColor = isDark ? "#60A5FA" : "#3B82F6"; // Blue
  const backgroundColor = isDark ? "#1F2937" : "#F3F4F6";
  const textColor = isDark ? "#FFFFFF" : "#111827";
  const buttonBg = isDark ? "#374151" : "#E5E7EB";
  const buttonTextColor = isDark ? "#FFFFFF" : "#111827";

  return (
    <Animated.View
      className="flex-1"
      style={{
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
      }}
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={stopTimer}
        className={`mb-6 self-start px-4 py-2 rounded-full ${
          isDark ? "bg-gray-800" : "bg-gray-200"
        }`}
        activeOpacity={0.7}
      >
        <Text
          className={`text-base font-semibold ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Back
        </Text>
      </TouchableOpacity>

      {/* Timer Circle */}
      <View className="flex-1 justify-center items-center">
        <Animated.View
          style={{
            transform: [{ scale: pulseScale.value }],
          }}
        >
          <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
            {/* Background Circle */}
            <Circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              stroke={isDark ? "#374151" : "#D1D5DB"}
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
            />
            {/* Progress Circle */}
            <AnimatedCircle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              stroke={progressColor}
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={CIRCUMFERENCE}
              strokeLinecap="round"
              transform={`rotate(-90 ${CIRCLE_SIZE / 2} ${CIRCLE_SIZE / 2})`}
              animatedProps={animatedCircleProps}
            />
          </Svg>
        </Animated.View>

        {/* Timer Text */}
        <View
          className="absolute items-center"
          style={{ top: CIRCLE_SIZE / 2 - 40 }}
        >
          <Animated.Text
            className={`text-7xl flex flex-col font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            style={{
              fontVariant: ["tabular-nums"],
              letterSpacing: 4,
            }}
          >
            <Text> {formatSeconds(seconds)}</Text>
          </Animated.Text>
          <Text
            className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {taskName}
          </Text>
        </View>

        {/* Progress Percentage */}
        <View className="mt-8">
          <Text
            className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {Math.round((seconds / time) * 100)}% remaining
          </Text>
        </View>
      </View>

      {/* Control Buttons */}
      <View className="flex-row justify-center items-center gap-4 pb-8">
        {/* Reset Button */}
        <TouchableOpacity
          onPress={resetTimer}
          className={`px-6 py-3 rounded-full ${
            isDark ? "bg-gray-800" : "bg-gray-200"
          }`}
          activeOpacity={0.7}
        >
          <Text
            className={`text-base font-semibold ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Reset
          </Text>
        </TouchableOpacity>

        {/* Play/Pause Button */}
        <Animated.View
          style={{
            transform: [{ scale: buttonScale.value }],
          }}
        >
          <TouchableOpacity
            onPress={togglePause}
            className={`w-20 h-20 rounded-full items-center justify-center ${
              isPaused ? progressColor : buttonBg
            }`}
            activeOpacity={0.8}
          >
            <Text
              className={`text-3xl ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {isPaused ? "▶" : "⏸"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Stop Button */}
        <TouchableOpacity
          onPress={stopTimer}
          className={`px-6 py-3 rounded-full  ${
            isDark ? "bg-red-900/30" : "bg-red-100"
          }`}
          activeOpacity={0.7}
        >
          <Text
            className={`text-base   font-semibold ${
              isDark ? "text-red-400" : "text-red-600"
            }`}
          >
            Stop
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default TimerClock;
