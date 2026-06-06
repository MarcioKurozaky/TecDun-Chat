import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import theme from "@/utils/theme";

type PageContainerProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function PageContainer({ children, style }: PageContainerProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
  },
});
