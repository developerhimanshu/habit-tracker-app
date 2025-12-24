import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { EntypoSymbol, IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: "Pomodoro",
          tabBarIcon: ({ color }) => (
            <EntypoSymbol size={28} name="stopwatch" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="bar-chart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
