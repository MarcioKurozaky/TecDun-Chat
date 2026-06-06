import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import theme from "@/utils/theme";

export default function Signup() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <Image
          source={require("@/assets/img-2.png")}
          style={styles.illustration}
        />
        <Text style={styles.title}> Cadastrar</Text>
        <Text style={styles.subtitle}> Crie a sua conta para acessar.</Text>
        <View style={styles.form}>
          <Input placeholder="Nome" />
          <Input placeholder="E-mail" keyboardType="email-address" />
          <Input placeholder="Senha" secureTextEntry />
          <Input placeholder="Confirmar Senha" secureTextEntry />
          <Button title="Cadastrar" />

          <Text style={styles.footerText}>
            Já tem uma conta ?{" "}
            <Link href="/" style={styles.footerLink}>
              {" "}
              Entre aqui
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 32,
  },

  illustration: {
    width: "100%",
    height: 330,
    resizeMode: "contain",
    marginTop: 62,
  },

  title: {
    fontSize: 32,
    fontWeight: 900,
  },

  subtitle: {
    fontSize: theme.fontSizes.md,
  },

  form: {
    marginTop: 24,
    gap: 12,
  },

  footerText: {
    textAlign: "center",
    marginTop: 24,
    color: theme.colors.gray["500"],
  },
  footerLink: {
    color: theme.colors.blue["800"],
    fontWeight: 600,
  },
});
