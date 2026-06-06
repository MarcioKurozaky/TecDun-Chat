import * as yup from "yup";

export const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup
    .string()
    .required("Informe o e-mail.")
    .email("E-mail inválido."),
  phoneNumber: yup.string().required("Informe seu número."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere."),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Informe o e-mail.")
    .email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Informe o e-mail.")
    .email("E-mail inválido."),
});

export type FormDataProps = yup.InferType<typeof signUpSchema>;
export type LoginFormDataProps = yup.InferType<typeof loginSchema>;
export type ForgotPasswordFormDataProps = yup.InferType<typeof forgotPasswordSchema>;
