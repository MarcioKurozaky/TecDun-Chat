import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import theme from "@/utils/theme";

type InputProps = TextInputProps & {
  label?: string;
  icon?: string;
  iconPack?: React.ComponentType<any>;
  iconSize?: number;
  errorMessage?: string | null;
  isInvalid?: boolean;
};

export function Input({
  label,
  icon,
  iconPack: Icon,
  iconSize = 24,
  errorMessage = null,
  isInvalid = false,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const invalid = !!errorMessage || isInvalid;

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputContainer,
          isFocused && !invalid && styles.inputFocused,
          invalid && styles.inputInvalid,
        ]}
      >
        {icon && Icon ? (
          <Icon
            name={icon}
            size={iconSize}
            color={isFocused ? theme.colors.gray["800"] : theme.colors.gray["400"]}
            style={styles.icon}
          />
        ) : null}

        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.gray["400"]}
          {...rest}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
        />
      </View>

      {invalid ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },

  label: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray["800"],
    marginBottom: 6,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.gray["200"],
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.gray["100"],
  },

  inputFocused: {
    borderColor: theme.colors.green["500"],
    backgroundColor: theme.colors.white,
  },

  inputInvalid: {
    borderColor: theme.colors.danger["500"],
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: theme.fontSizes.md,
    color: theme.colors.gray["800"],
  },

  error: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.danger["500"],
    marginTop: 4,
  },
});
