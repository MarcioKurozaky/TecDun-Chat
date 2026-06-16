import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { type CallItem, calls } from "@/data/mockData";
import theme from "@/utils/theme";

import { CallLinkRow } from "@/components/call-link-row";
import { CallListItem } from "@/components/call-list-item";
import { SectionHeader } from "@/components/SectionHeader";

type CallListProps = {
  readonly onCallPress?: (item: CallItem) => void;
  readonly onCallAction?: (item: CallItem) => void;
  readonly onLinkPress?: () => void;
};

export function CallList({ onCallPress, onCallAction, onLinkPress }: CallListProps) {
  return (
    <FlatList
      data={calls}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CallListItem
          item={item}
          onPress={() => onCallPress?.(item)}
          onCallPress={() => onCallAction?.(item)}
        />
      )}
      ListHeaderComponent={
        <>
          <CallLinkRow onPress={onLinkPress} />
          <SectionHeader label="RECENT" />
        </>
      }
      ListFooterComponent={PrivacyFooter}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

function PrivacyFooter() {
  return (
    <View style={styles.footer}>
      <Ionicons name="lock-closed" size={12} color={theme.colors.gray[800]} />
      <Text style={styles.footerText}>Your personal calls are end-to-end encrypted</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 100,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 32,
    paddingHorizontal: theme.spacing.edge,
  },

  footerText: {
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.gray[800],
    opacity: 0.6,
  },
});
