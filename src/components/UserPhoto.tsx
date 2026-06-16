import { Image, ImageProps, StyleSheet } from "react-native";

import theme from "@/utils/theme";

type UserPhotoProps = ImageProps & {
  size: number;
};

export function UserPhoto({ size, ...rest }: UserPhotoProps) {
  return (
    <Image
      style={[
        styles.base,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 2,
    borderColor: theme.colors.gray[400],
  },
});
