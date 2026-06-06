# AGENTS.md

## Projeto
App de chat (WhatsApp-like) feito com **Expo SDK 54**, **React Native 0.81**, **Expo Router** (file-based routing), **TypeScript** strict mode e **New Architecture** habilitada.

---

## Build / Lint / Test

```bash
npm run start           # Iniciar dev server (expo)
npm run android         # Build + run Android
npm run ios             # Build + run iOS
npm run web             # Iniciar dev server p/ web
npm run lint            # ESLint (eslint-config-expo flat config)
npx tsc --noEmit        # Type checking (strict mode)
npx expo-doctor         # Verificar config do Expo
```

**Testes**: Nenhum framework de teste está configurado atualmente. Se for adicionar testes, prefira **Jest** com `jest-expo` (padrão do ecossistema Expo).

---

## Estrutura de diretórios

```
src/
  app/           # Rotas do Expo Router (file-based routing)
    _layout.tsx  # Layout raiz (Stack navigator)
    index.tsx    # Rota inicial
    signup.tsx   # Rota de cadastro
  components/    # Componentes reutilizáveis
    Button.tsx
    Input.tsx
  assets/        # Imagens, fontes, etc
```

- Telas/rotas em `src/app/` usam **default export**
- Componentes reutilizáveis em `src/components/` usam **named export**

---

## Convenções de código

### Imports
1. Pacotes RN/Expo primeiro (separados por blank line entre grupos)
2. Imports locais com alias `@/` (ex: `@/components/Button`)
3. Imports de React (`useState`, `useEffect`, etc.) no final

```typescript
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import { Button } from "@/components/Button";

import { useState } from "react";
```

### Formatação
- `"editor.codeActionsOnSave"` com `source.fixAll`, `source.organizeImports`, `source.sortMembers` habilitados
- ESLint com `eslint-config-expo` (flat config)
- 2 espaços de indentação

### Tipos
- **strict: true** no tsconfig
- Props de componentes: `type ComponentProps = NativeProps & { ... }`
- Preferir `type` sobre `interface` para props
- Estender tipos nativos do RN quando possível (`TextInputProps`, `TouchableOpacityProps`)
- Evitar `any` — usar `unknown` se necessário

### Nomenclatura
- **Componentes**: PascalCase (`Button`, `Input`, `Signup`)
- **Arquivos**: camelCase (kebab-case para rotas `_layout.tsx`)
- **Funções/variáveis**: camelCase (`appIsLoaded`, `setAppIsLoaded`)
- **Constantes**: camelCase (evitar UPPER_SNAKE_CASE)
- **Estilos**: `styles` (objeto criado com `StyleSheet.create`)
- **Handle functions**: `handlePress`, `handleChangeText` (prefixo `handle`)

### Estilos
- `StyleSheet.create()` no final do arquivo (depois do componente)
- Nome do objeto sempre `styles`
- Chaves em camelCase: `container`, `footerText`, `footerLink`
- Espaço em branco entre blocos de estilo
- `flex: 1` para layouts que ocupam tela toda
- Cores em hexadecimal

### Componentes
- Funções componentes com arrow function ou `function` — consistente com o existente
- Props tipadas com `type`, estendendo props nativas via intersection (`&`)
- Spread do `...rest` para passar props não desestruturadas
- Default export para telas (rotas), named export para componentes reutilizáveis

### Tratamento de erros
- `try/catch/finally` para operações assíncronas (splash screen, loading inicial)
- `console.log(error)` em catches — substituir por logging mais robusto se crescer
- Loading states com `useState` booleano

### React/Expo patterns
- `SafeAreaProvider` + `SafeAreaView` para área segura
- `KeyboardAvoidingView` com `behavior` condicional por plataforma
- `ScrollView` com `keyboardShouldPersistTaps="handled"`
- Expo Router: `Link` component para navegação, `Stack` no layout raiz
- SplashScreen: `preventAutoHideAsync()` no módulo, `hideAsync()` após loading

### Path aliases
- `@/` mapeia para `src/` (configurado no tsconfig.json)
- Usar `require("@/assets/img-1.png")` para imagens locais

---

## VS Code

Extensões recomendadas: `expo.vscode-expo-tools`

Settings:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "explicit",
    "source.sortMembers": "explicit"
  }
}
```
