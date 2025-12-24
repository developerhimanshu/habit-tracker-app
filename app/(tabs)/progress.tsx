import { Header } from "@/components";
import { SafeAreaView } from "@/components/SafeAreaView";
import { useEffect, useRef } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { ContributionGraph } from "react-native-chart-kit";

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const scrollViewRef = useRef<ScrollView>(null);
  const commitsData = [
    { date: "2025-01-02", count: 1 },
    { date: "2025-01-03", count: 2 },
    { date: "2025-01-04", count: 3 },
    { date: "2025-01-05", count: 4 },
    { date: "2025-01-06", count: 5 },
    { date: "2025-01-30", count: 2 },
    { date: "2025-01-31", count: 3 },
    { date: "2025-03-01", count: 2 },
    { date: "2025-04-02", count: 4 },
    { date: "2025-03-05", count: 2 },
    { date: "2025-12-23", count: 4 },
  ];
  const chartConfig = {
    backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
    backgroundGradientFrom: isDark ? "#1F2937" : "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: isDark ? "#111827" : "#F9FAFB",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => {
      if (isDark) {
        return `rgba(34, 197, 94, ${opacity})`; // Green for dark mode
      }
      return `rgba(22, 163, 74, ${opacity})`; // Darker green for light mode
    },
    strokeWidth: 2,
    barPercentage: 0.5,
    labelColor: (opacity = 1) =>
      isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
  };

  const screenWidth = Dimensions.get("window").width;
  // Calculate width needed for 365 days (approximately 11 pixels per day + spacing)
  const heatmapWidth = Math.max(screenWidth, 365 * 3.2);

  // Auto-scroll to show today's date (rightmost side) when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Header
        title="Your Progress"
        subtitle="Track your progress and improve your habits"
      />
      <Text
        className={`text-2xl font-bold ${
          isDark ? "text-white" : "text-black"
        } mt-4 px-4`}
      >
        Track how many days you showed up
      </Text>

      <View style={{ height: 350 }}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 16,
            width: heatmapWidth,
          }}
          style={{ flex: 1 }}
        >
          <ContributionGraph
            values={commitsData}
            endDate={new Date()}
            numDays={365}
            width={heatmapWidth}
            height={300}
            chartConfig={chartConfig}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
