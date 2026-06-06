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
import {
  forgotPasswordSchema,
  type ForgotPasswordFormDataProps,
} from "@/lib/validators";
import { AppError } from "@/utils/AppError";
import theme from "@/utils/theme";

import { useState } from "react";

export default function ForgotPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormDataProps>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  async function handleForgotPassword({ email }: ForgotPasswordFormDataProps) {
    try {
      setIsLoading(true);

      console.log("Forgot password", { email });

      Toast.show({
        type: "success",
        text1: "Link de recuperação enviado para seu e-mail!",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível recuperar a senha. Tente novamente mais tarde.";

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
              <FontAwesome name="wechat" size={64} color={theme.colors.blue["600"]} />
              <Text style={styles.title}>App Chat</Text>
              <Text style={styles.subtitle}>
                Digite seu email para recuperar
              </Text>
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
                  onSubmitEditing={handleSubmit(handleForgotPassword)}
                  returnKeyType="send"
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Button
              title="Enviar link"
              onPress={handleSubmit(handleForgotPassword)}
              isLoading={isLoading}
            />

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
