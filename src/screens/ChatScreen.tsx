import { Feather } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import backgroundImage from "@/assets/images/droplet.jpeg";
import theme from "@/utils/theme";

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [messageText, setMessageText] = useState("");

  const sendMessage = useCallback(() => {
    if (!messageText.trim()) return;

    console.log(messageText);

    setMessageText("");
  }, [messageText]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: "height" })}
      keyboardVerticalOffset={50}
    >
      <SafeAreaView edges={["right", "left"]} style={styles.screen}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

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
            <Feather name="plus" size={24} color={theme.colors.blue["500"]} />
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
              <Feather name="camera" size={24} color={theme.colors.blue["500"]} />
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

  backgroundImage: {
    flex: 1,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 8,
    minHeight: 60,
    backgroundColor: theme.colors.white,
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
    backgroundColor: theme.colors.blue["500"],
    borderRadius: 999,
  },
});
