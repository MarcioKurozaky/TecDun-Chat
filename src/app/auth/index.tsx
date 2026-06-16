import { FontAwesome } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PageContainer } from "@/components/PageContainer";
import { loginSchema, type LoginFormDataProps } from "@/lib/validators";
import { AppError } from "@/utils/AppError";
import theme from "@/utils/theme";

import { useState } from "react";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormDataProps>({
    resolver: yupResolver(loginSchema),
  });

  async function handleLogin({ email, password }: LoginFormDataProps) {
    try {
      setIsLoading(true);

      console.log("Login", { email, password });

      Toast.show({
        type: "success",
        text1: "Login realizado com sucesso!",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde.";

      Toast.show({ type: "error", text1: title });
    } finally {
      setIsLoading(false);
    }
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
              <FontAwesome name="wechat" size={64} color={theme.colors.teal["500"]} />
              <Text style={styles.title}>App Chat</Text>
              <Text style={styles.subtitle}>Entre com sua conta</Text>
            </View>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  icon="envelope"
                  iconPack={FontAwesome}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Senha"
                  icon="lock"
                  iconPack={FontAwesome}
                  placeholder="Sua senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleLogin)}
                  returnKeyType="send"
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Link href="/auth/forgot-password" style={styles.forgotLink}>
              Esqueceu sua senha?
            </Link>

            <Button
              title="Entrar"
              onPress={handleSubmit(handleLogin)}
              isLoading={isLoading}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Não tem conta? </Text>
              <Link href="/auth/signup" style={styles.footerLink}>
                Cadastre-se
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

  forgotLink: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.teal["500"],
    fontWeight: 600,
    textAlign: "right",
    marginBottom: 16,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  footerText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray["500"],
  },

  footerLink: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.teal["500"],
    fontWeight: 600,
  },
});
