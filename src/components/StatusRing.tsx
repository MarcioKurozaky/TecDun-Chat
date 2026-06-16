import { StyleSheet, View } from "react-native";

import { UserPhoto } from "@/components/UserPhoto";
import theme from "@/utils/theme";

type StatusRingProps = {
  readonly avatarUrl: string | null;
  readonly isViewed?: boolean;
};

export function StatusRing({ avatarUrl, isViewed = false }: StatusRingProps) {
  return (
    <View style={[styles.ring, isViewed && styles.ringViewed]}>
      <UserPhoto
        source={avatarUrl ? { uri: avatarUrl } : undefined}
        size={52}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    width: 56,
    height: 56,
    borderRadius: 28,
    padding: 2,
    backgroundColor: theme.colors.whatsapp,
    alignItems: "center",
    justifyContent: "center",
  },

  ringViewed: {
    backgroundColor: theme.colors.gray[500],
  },
});
