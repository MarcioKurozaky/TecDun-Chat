import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PageContainer } from "@/components/PageContainer";
import theme from "@/utils/theme";

import { useState } from "react";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  function handleSubmit() {
    console.log("Forgot password", { email });
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <SafeAreaView style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <PageContainer>
            <View style={styles.header}>
              <FontAwesome name="wechat" size={64} color={theme.colors.blue["600"]} />
              <Text style={styles.title}>App Chat</Text>
              <Text style={styles.subtitle}>
                Digite seu email para recuperar
              </Text>
            </View>

            <Input
              label="Email"
              icon="envelope"
              iconPack={FontAwesome}
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Button title="Enviar link" onPress={handleSubmit} />

            <View style={styles.footer}>
              <Link href="/auth" style={styles.footerLink}>
                Voltar ao login
              </Link>
            </View>
          </PageContainer>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },

  scroll: {
    flexGrow: 1,
  },

  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 32,
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
    color: theme.colors.gray["800"],
    marginTop: 12,
  },

  subtitle: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.gray["500"],
    marginTop: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  footerLink: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.blue["600"],
    fontWeight: 600,
  },
});
