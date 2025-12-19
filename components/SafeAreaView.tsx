// components/SafeAreaView.tsx
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaViewProps extends ViewProps {
  edges?: ("top" | "bottom" | "left" | "right")[];
  defaultHorizontalPadding?: number;
}

export function SafeAreaView({
  className = "",
  edges = ["top", "left", "right"],
  defaultHorizontalPadding = 24, // Default 24px (px-6)
  style,
  ...props
}: SafeAreaViewProps) {
  const insets = useSafeAreaInsets();

  const paddingStyle = {
    paddingTop: edges.includes("top") ? insets.top : 0,
    paddingBottom: edges.includes("bottom") ? insets.bottom : 0,
    paddingLeft: edges.includes("left")
      ? Math.max(insets.left, defaultHorizontalPadding)
      : 0,
    paddingRight: edges.includes("right")
      ? Math.max(insets.right, defaultHorizontalPadding)
      : 0,
  };

  return (
    <View
      className={`flex-1 ${className}`}
      style={[paddingStyle, style]}
      {...props}
    />
  );
}
