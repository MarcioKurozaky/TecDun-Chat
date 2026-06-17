<div align="center">

# TecDun-Chat

### Mensageiro instantâneo feito com Expo + Firebase
### Instant messenger built with Expo + Firebase

[![Expo SDK](https://img.shields.io/badge/Expo_SDK-54-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![New Architecture](https://img.shields.io/badge/New_Architecture-enabled-00B37E?style=flat-square)](https://reactnative.dev/docs/the-new-architecture/landing-page)
[![Expo Router](https://img.shields.io/badge/Expo_Router-6.0-000020?style=flat-square&logo=expo&logoColor=white)](https://docs.expo.dev/router/introduction/)

---

</div>

<br>

## Sobre / About

**PT** — TecDun-Chat é um aplicativo de mensagens instantâneas inspirado no WhatsApp, construído com Expo SDK 54 e React Native 0.81 (New Architecture). Oferece autenticação Firebase, chat em tempo real com bolhas de mensagem, lista de conversas, status, chamadas e muito mais. Projetado com TypeScript strict, design system próprio e padrões modernos de navegação file-based.

**EN** — TecDun-Chat is an instant messaging app inspired by WhatsApp, built with Expo SDK 54 and React Native 0.81 (New Architecture). It features Firebase authentication, real-time chat with message bubbles, conversation list, status, calls, and more. Engineered with TypeScript strict, a custom design system, and modern file-based routing.

<br>

## Stack / Stack

| Camada / Layer | Tecnologia / Technology |
|---------------|------------------------|
| **Mobile** | React Native 0.81 + Expo SDK 54 |
| **Navegação / Navigation** | Expo Router 6 (file-based) |
| **Autenticação / Auth** | Firebase Auth (email + telefone) |
| **Banco / Database** | Cloud Firestore |
| **Arquivos / Storage** | Firebase Storage |
| **Push** | Firebase Cloud Messaging |
| **Estado / State** | Zustand |
| **Formulários / Forms** | react-hook-form + yup |
| **UI** | StyleSheet.create + @expo/vector-icons |
| **Ícones / Icons** | @expo/vector-icons (Ionicons + FontAwesome) |
| **Lint** | ESLint + eslint-config-expo |
| **Git Hooks** | Husky + commitlint |

<br>

## Funcionalidades / Features

| Feature | Status |
|---------|--------|
| Login / Signup / Forgot Password | ✅ |
| Chat List com previews | ✅ |
| Chat Screen com bolhas de mensagem | ✅ |
| Bolhas de entrada (branca) / saída (verde) | ✅ |
| Auto-scroll em novas mensagens | ✅ |
| Aba Status | ✅ |
| Aba Communities | ✅ |
| Aba Calls (lista + FAB de chamada) | ✅ |
| Tela de Settings | ✅ |
| Splash Screen + Font Loading | ✅ |
| Design System próprio (cores teal/green) | ✅ |
| Firebase configurado | ✅ |
| TypeScript strict mode | ✅ |
| New Architecture habilitada | ✅ |

<br>

## Estrutura de Diretórios / Directory Structure

```
src/
├── app/                   # Expo Router (file-based routing)
│   ├── _layout.tsx        # Layout raiz (Stack navigator)
│   ├── index.tsx          # Rota inicial (splash → redirect)
│   ├── auth/              # Rotas de autenticação
│   │   ├── index.tsx      # Login
│   │   ├── signup.tsx     # Cadastro
│   │   └── forgot-password.tsx
│   ├── (tabs)/            # Abas principais
│   │   ├── _layout.tsx    # Tab navigator
│   │   ├── index.tsx      # Chats
│   │   ├── status.tsx     # Status
│   │   ├── communities.tsx
│   │   ├── calls.tsx
│   │   └── settings.tsx
│   └── chat/              # Tela de conversa
│       ├── index.tsx
│       └── screen.tsx
├── screens/               # Telas (lógica + layout)
├── components/            # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── TopBar.tsx
│   ├── FAB.tsx
│   ├── UserPhoto.tsx
│   ├── ChatList.tsx / ChatListItem.tsx
│   ├── message-bubble.tsx / message-list.tsx
│   ├── StatusIcon / StatusRing / StatusListItem
│   ├── call-list-item / call-link-row / call-list
│   └── ...
├── data/                  # Mock data
├── lib/                   # Firebase config + validators
├── utils/                 # Tema + AppError
└── assets/                # Fontes + imagens
```

<br>

## Design System

O tema usa uma paleta teal/green inspirada no WhatsApp, com escala de cinza para superfícies e cores de status/destaque.

| Token | Valor | Uso |
|-------|-------|-----|
| `teal.700` | `#00453d` | Primary / Header |
| `teal.500` | `#075e54` | Interactive elements |
| `green.50` | `#dcf8c6` | Outgoing bubble |
| `whatsapp` | `#25D366` | Status ring / accent |
| `blue.500` | `#34B7F1` | Read receipt |
| `gray.100` | `#f7f9fc` | Screen background |
| `gray.900` | `#191c1e` | Text on surface |

<br>

## Começando / Getting Started

### Pré-requisitos / Prerequisites

- Node.js >= 20
- Expo CLI (`npx expo`)
- Android Studio (Android) ou Xcode (iOS)

### Instalação / Installation

```bash
# Clone o repositório / Clone the repository
git clone https://github.com/seu-usuario/tecdun-chat.git

# Entre no diretório / Navigate to the directory
cd tecdun-chat

# Instale as dependências / Install dependencies
npm install
```

### Rodar / Run

```bash
# Desenvolvimento / Development
npm start             # Expo dev server

# Plataformas específicas / Specific platforms
npm run android       # Android
npm run ios           # iOS
npm run web           # Web

# Lint
npm run lint

# TypeScript check
npx tsc --noEmit

# Expo doctor
npx expo-doctor
```

<br>

## Scripts Disponíveis / Available Scripts

| Script | Descrição / Description |
|--------|------------------------|
| `npm start` | Inicia o servidor de desenvolvimento Expo |
| `npm run android` | Build + run no Android |
| `npm run ios` | Build + run no iOS |
| `npm run web` | Inicia dev server para web |
| `npm run lint` | ESLint (eslint-config-expo) |

---

<div align="center">

<sub>Built with ❤️ using Expo, React Native & Firebase</sub>

</div>
