import { Feather, Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import backgroundImage from "@/assets/images/droplet.jpeg";
import theme from "@/utils/theme";

import { MessageList } from "@/components/message-list";
import { UserPhoto } from "@/components/UserPhoto";

type ChatScreenProps = {
  chatId: string;
  chatName: string;
  chatAvatar: string;
};

export default function ChatScreen({ chatId, chatName, chatAvatar }: ChatScreenProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [messageText, setMessageText] = useState("");

  const sendMessage = useCallback(() => {
    if (!messageText.trim()) return;

    console.log(messageText);

    setMessageText("");
  }, [messageText]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView edges={["top"]} style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable
              style={({ pressed }) => [styles.headerBtn, pressed && styles.headerBtnPressed]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
            </Pressable>

            {chatAvatar ? (
              <UserPhoto source={{ uri: chatAvatar }} size={40} />
            ) : (
              <View style={styles.avatarSmall}>
                <Text style={styles.avatarSmallText}>
                  {chatName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <View>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {chatName}
              </Text>
              <Text style={styles.headerSubtitle}>online</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <Pressable
              style={({ pressed }) => [styles.headerBtn, pressed && styles.headerBtnPressed]}
              onPress={() => console.log("Call")}
            >
              <Ionicons name="call-outline" size={22} color={theme.colors.white} />
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.headerBtn, pressed && styles.headerBtnPressed]}
              onPress={() => console.log("Video")}
            >
              <Ionicons name="videocam-outline" size={22} color={theme.colors.white} />
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.headerBtn, pressed && styles.headerBtnPressed]}
              onPress={() => console.log("More")}
              accessibilityRole="button"
              accessibilityLabel="More options"
            >
              <Ionicons name="ellipsis-vertical" size={22} color={theme.colors.white} />
            </Pressable>
          </View>
        </View>

        <StatusBar style="light" />

        <View style={styles.canvas}>
          <Pressable style={styles.backgroundFill} onPress={Keyboard.dismiss}>
            <ImageBackground
              source={backgroundImage}
              style={styles.backgroundFill}
              resizeMode="cover"
            >
              <MessageList />
            </ImageBackground>
          </Pressable>
        </View>

        <View
          style={[styles.inputContainer, { paddingBottom: insets.bottom + 8 }]}
        >
          <Pressable
            style={({ pressed }) => [
              styles.mediaButton,
              pressed && styles.mediaButtonPressed,
            ]}
            onPress={() => console.log("Plus")}
          >
            <Feather name="plus" size={24} color={theme.colors.teal["500"]} />
          </Pressable>

          <TextInput
            style={styles.textbox}
            value={messageText}
            placeholder="Mensagem..."
            placeholderTextColor={theme.colors.gray["400"]}
            onChangeText={setMessageText}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />

          {messageText === "" ? (
            <Pressable
              style={({ pressed }) => [
                styles.mediaButton,
                pressed && styles.mediaButtonPressed,
              ]}
              onPress={() => console.log("Camera")}
            >
              <Feather name="camera" size={24} color={theme.colors.teal["500"]} />
            </Pressable>
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.mediaButton,
                styles.sendButton,
                pressed && styles.mediaButtonPressed,
              ]}
              onPress={sendMessage}
            >
              <Feather name="send" size={20} color={theme.colors.white} />
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  canvas: {
    flex: 1,
  },

  backgroundFill: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: theme.colors.teal[700],
    zIndex: 10,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  headerBtnPressed: {
    opacity: 0.7,
  },

  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: theme.colors.teal[500],
    alignItems: "center",
    justifyContent: "center",
  },

  avatarSmallText: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.white,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.white,
  },

  headerSubtitle: {
    fontSize: 12,
    color: theme.colors.teal[100],
    paddingTop: 1,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 8,
    minHeight: 60,
    backgroundColor: theme.colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.gray[300],
  },

  textbox: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: theme.colors.gray["300"],
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },

  mediaButton: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  mediaButtonPressed: {
    opacity: 0.5,
  },

  sendButton: {
    backgroundColor: theme.colors.teal["500"],
    borderRadius: 999,
  },
});
