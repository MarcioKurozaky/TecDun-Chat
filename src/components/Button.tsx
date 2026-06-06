import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from "react-native";

import theme from "@/utils/theme";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: "solid" | "outline";
  isLoading?: boolean;
};

export function Button({
  title,
  variant = "solid",
  isLoading = false,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled || isLoading}
      style={({ pressed }) => [
        styles.base,
        variant === "solid" ? styles.solid : styles.outline,
        pressed &&
          (variant === "solid" ? styles.solidPressed : styles.outlinePressed),
        (disabled || isLoading) && styles.disabled,
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === "solid" ? theme.colors.white : theme.colors.green["700"]}
        />
      ) : (
        <Text
          style={[
            styles.text,
            variant === "solid" ? styles.solidText : styles.outlineText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  solid: {
    backgroundColor: theme.colors.green["700"],
  },

  solidPressed: {
    backgroundColor: theme.colors.green["500"],
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.green["700"],
  },

  outlinePressed: {
    borderColor: theme.colors.green["500"],
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    fontSize: theme.fontSizes.md,
    fontWeight: 600,
  },

  solidText: {
    color: theme.colors.white,
  },

  outlineText: {
    color: theme.colors.green["700"],
  },
});
