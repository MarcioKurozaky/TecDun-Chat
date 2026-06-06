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
import { signUpSchema, type FormDataProps } from "@/lib/validators";
import { AppError } from "@/utils/AppError";
import theme from "@/utils/theme";

import { useState } from "react";

export default function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  async function handleSignUp({
    name,
    email,
    phoneNumber,
    password,
  }: FormDataProps) {
    try {
      setIsLoading(true);

      console.log("SignUp", { name, email, phoneNumber, password });

      Toast.show({
        type: "success",
        text1: "Conta criada com sucesso!",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

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
              <FontAwesome
                name="wechat"
                size={64}
                color={theme.colors.blue["600"]}
              />
              <Text style={styles.title}>App Chat</Text>
              <Text style={styles.subtitle}>Crie sua conta</Text>
            </View>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nome"
                  icon="user"
                  iconPack={FontAwesome}
                  placeholder="Seu nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

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
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Telefone"
                  icon="phone"
                  iconPack={FontAwesome}
                  placeholder="Seu número"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.phoneNumber?.message}
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
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Confirmar senha"
                  icon="lock"
                  iconPack={FontAwesome}
                  placeholder="Confirme sua senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />

            <Button
              title="Cadastrar"
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Já tem conta? </Text>
              <Link href="/auth" style={styles.footerLink}>
                Entre aqui
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

  footerText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray["500"],
  },

  footerLink: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.blue["600"],
    fontWeight: 600,
  },
});
