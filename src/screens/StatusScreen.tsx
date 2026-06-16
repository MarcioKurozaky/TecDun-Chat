import { ScrollView, StyleSheet, View } from "react-native";

import { FAB } from "@/components/FAB";
import { MyStatusSection } from "@/components/MyStatusSection";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusListItem } from "@/components/StatusListItem";
import { statusList } from "@/data/mockData";
import theme from "@/utils/theme";

export default function StatusScreen() {
  const recentStatus = statusList.filter((s) => !s.isViewed);
  const viewedStatus = statusList.filter((s) => s.isViewed);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <MyStatusSection
          onPress={() => console.log("My status pressed")}
          onAddPress={() => console.log("Add status pressed")}
        />

        <SectionHeader label="Atualizações recentes" />

        {recentStatus.map((item) => (
          <StatusListItem
            key={item.id}
            item={item}
            onPress={() => console.log("Status pressed", item.id)}
          />
        ))}

        {viewedStatus.length > 0 && (
          <>
            <SectionHeader label="Atualizações vistas" />

            {viewedStatus.map((item) => (
              <View key={item.id} style={styles.viewed}>
                <StatusListItem
                  item={item}
                  onPress={() => console.log("Status pressed", item.id)}
                />
              </View>
            ))}
          </>
        )}
      </ScrollView>

      <FAB
        icon="pencil"
        size="sm"
        variant="surface"
        onPress={() => console.log("Text status")}
      />

      <FAB
        icon="camera"
        size="lg"
        variant="primary"
        onPress={() => console.log("Camera status")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
  },

  viewed: {
    opacity: 0.7,
  },
});
