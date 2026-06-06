# Downgrade Expo SDK 56 → 54.0.8

> **Skills usadas por fase:** Cada fase carrega skills específicas do `.opencode/skills/`.

**Goal:** Downgradear o projeto de Expo SDK 56 para SDK 54.0.8 para compatibilidade com Expo Go.

**Architecture:** Projeto usa CNG (Continuous Native Generation — sem pastas `ios/` ou `android/`), sem `metro.config.js`, `babel.config.js`, ou `patches/`. O downgrade será feito via edição manual do `package.json` seguido de instalação limpa.

**Tech Stack:** Expo SDK 54.0.8, React Native 0.81.1, React 19.1.0, TypeScript strict

---

### Fase 1: Preparação e Backup

**Skills:** `writing-plans` (estrutura do plano), `upgrading-expo` (verificação de housekeeping pré-migração)

**Arquivos:**
- Backup: `package.json.bak`
- Backup: `package-lock.json.bak` (se existir)

- [ ] **Step 1: Criar backup do package.json e lockfile**

```bash
cp package.json package.json.bak
cp package-lock.json package-lock.json.bak 2>/dev/null || true
```

- [ ] **Step 2: Verificar estado atual do repositório**

```bash
git status
git log --oneline -5
```

---

### Fase 2: Atualizar package.json para SDK 54.0.8

**Skills:** `upgrading-expo` (version mapping SDK 54, housekeeping checklist, deprecated packages)

**Arquivos:**
- Modificar: `package.json`

- [ ] **Step 1: Alterar `expo` para versão exata 54.0.8**

```
"expo": "^56.0.8" → "expo": "54.0.8"
```

- [ ] **Step 2: Alterar todos os pacotes `expo-*` de `~56.x.x` para `~54.0.0`**

| Package | Antes | Depois |
|---------|-------|--------|
| `expo-constants` | `~56.0.16` | `~54.0.0` |
| `expo-font` | `~56.0.5` | `~54.0.0` |
| `expo-haptics` | `~56.0.3` | `~54.0.0` |
| `expo-image` | `~56.0.9` | `~54.0.0` |
| `expo-linking` | `~56.0.13` | `~54.0.0` |
| `expo-router` | `~56.2.8` | `~54.0.0` |
| `expo-splash-screen` | `~56.0.10` | `~54.0.0` |
| `expo-status-bar` | `~56.0.4` | `~54.0.0` |
| `expo-symbols` | `~56.0.5` | `~54.0.0` |
| `expo-system-ui` | `~56.0.5` | `~54.0.0` |
| `expo-web-browser` | `~56.0.5` | `~54.0.0` |

- [ ] **Step 3: Alterar React e React Native**

```
"react": "19.2.3"        → "react": "19.1.0"
"react-dom": "19.2.3"    → "react-dom": "19.1.0"
"react-native": "0.85.3" → "react-native": "0.81.1"
```

> SDK 54 usa React 19.1.0 e RN 0.81. Usar 0.81.1 para evitar bug do XCFramework (Release mode no iOS).

- [ ] **Step 4: Alterar react-native-gesture-handler**

```
"react-native-gesture-handler": "~2.31.1" → "~2.20.2"
```

- [ ] **Step 5: Alterar react-native-reanimated (v4 → v3)**

```
"react-native-reanimated": "4.3.1" → "~3.16.7"
```

> SDK 54 usa Reanimated v3 por padrão. Verificar código após `npx tsc`.

- [ ] **Step 6: Alterar react-native-safe-area-context**

```
"react-native-safe-area-context": "~5.7.0" → "~4.14.1"
```

- [ ] **Step 7: Alterar react-native-screens**

```
"react-native-screens": "4.25.2" → "~4.5.0"
```

- [ ] **Step 8: Alterar eslint-config-expo**

```
"eslint-config-expo": "~56.0.4" → "~54.0.0"
```

- [ ] **Step 9: Manter packages que não mudam**

Manter como estão:
- `react-native-worklets`: `0.8.3` (exigido no SDK 54+)
- `react-native-web`: `~0.21.0` (compatível)
- `@expo/vector-icons`: `^15.0.3` (compatível)
- `@types/react`: `~19.2.14` (compatível)
- `typescript`: `~6.0.3` (compatível)
- `eslint`: `^9.25.0` (compatível)

---

### Fase 3: Reinstalar Dependências e Limpar Cache

**Skills:** `upgrading-expo` (cleanup steps: remover node_modules, limpar cache)

- [ ] **Step 1: Remover node_modules e lockfile**

```bash
rm -rf node_modules
rm -f package-lock.json
```

- [ ] **Step 2: Instalar dependências do zero**

```bash
npm install
```

- [ ] **Step 3: Sincronizar versões dos pacotes Expo**

```bash
npx expo install --fix
```

> Isso alinha automaticamente as versões dos pacotes `expo-*` para as compatíveis com expo@54.0.8.

- [ ] **Step 4: Limpar cache do Expo**

```bash
npx expo start --clear
```

> Dê Ctrl+C após o servidor iniciar (só precisa limpar o cache).

---

### Fase 4: Expo Doctor e Housekeeping

**Skills:** `upgrading-expo` (doctor, housekeeping checklist), `verification-before-completion` (evidência antes de claims)

- [ ] **Step 1: Rodar expo-doctor**

```bash
npx expo-doctor
```

**Esperado:** `✔ No issues found`

- [ ] **Step 2: Verificar configurações do SDK 54 no app.json**

`"experiments": { "reactCompiler": true }` — SDK 54 suporta React Compiler. Manter.

- [ ] **Step 3: Verificar se react-native-worklets está presente**

Já está em `dependencies`. SDK 54+ exige este pacote para Reanimated funcionar.

- [ ] **Step 4: Verificar expo-env.d.ts**

Regenerar se necessário:
```bash
npx expo customize tsconfig.json 2>/dev/null || true
```

---

### Fase 5: TypeScript Check e Correções de Código

**Skills:** `clean-typescript` (type safety, evitar `any`, null safety), `react-native-best-practices` (verificar performance pós-downgrade), `vercel-react-native-skills` (boas práticas RN)

- [ ] **Step 1: Rodar TypeScript check**

```bash
npx tsc --noEmit
```

**Pontos de atenção:**
- `react-native-reanimated` v3: `useSharedValue`, `useAnimatedStyle`, `withTiming`, `withSpring` — iguais. Verificar APIs exclusivas do v4.
- `react-native-gesture-handler` ~2.20: API compatível, mas verificar tipos.
- `react-native-screens` ~4.5: API compatível.

- [ ] **Step 2: Corrigir erros de tipo (se houver)**

Analisar cada erro do `tsc` e corrigir.

- [ ] **Step 3: Rodar lint**

```bash
npm run lint
```

**Esperado:** sem erros.

---

### Fase 6: Verificação Final

**Skills:** `verification-before-completion` (verificação rigorosa antes de declarar conclusão)

- [ ] **Step 1: Verificar SDK version**

```bash
npx expo config --type public
```

Confirmar que `sdkVersion` retorna `"54.0.0"`.

- [ ] **Step 2: Testar start do servidor**

```bash
npx expo start
```

> Confirmar que o servidor sobe sem erros. Verificar se o QR code aparece.

- [ ] **Step 3: Verificar diff do git**

```bash
git diff --stat
```

Confirmar que apenas `package.json` e `package-lock.json` foram alterados.

- [ ] **Step 4: Declarar conclusão**

Apenas após TODAS as verificações passarem.

---

## Resumo das Mudanças

```diff
- "expo": "^56.0.8",
+ "expo": "54.0.8",

- "expo-constants": "~56.0.16",     → "~54.0.0"
- "expo-font": "~56.0.5",           → "~54.0.0"
- "expo-haptics": "~56.0.3",        → "~54.0.0"
- "expo-image": "~56.0.9",          → "~54.0.0"
- "expo-linking": "~56.0.13",       → "~54.0.0"
- "expo-router": "~56.2.8",         → "~54.0.0"
- "expo-splash-screen": "~56.0.10", → "~54.0.0"
- "expo-status-bar": "~56.0.4",     → "~54.0.0"
- "expo-symbols": "~56.0.5",        → "~54.0.0"
- "expo-system-ui": "~56.0.5",      → "~54.0.0"
- "expo-web-browser": "~56.0.5",    → "~54.0.0"

- "react": "19.2.3",                → "19.1.0"
- "react-dom": "19.2.3",            → "19.1.0"
- "react-native": "0.85.3",         → "0.81.1"

- "react-native-gesture-handler": "~2.31.1",  → "~2.20.2"
- "react-native-reanimated": "4.3.1",          → "~3.16.7"
- "react-native-safe-area-context": "~5.7.0",  → "~4.14.1"
- "react-native-screens": "4.25.2",            → "~4.5.0"

- "eslint-config-expo": "~56.0.4",  → "~54.0.0"
```

**Não mudam:** `react-native-worklets` `0.8.3`, `react-native-web` `~0.21.0`, `@expo/vector-icons` `^15.0.3`, `@types/react` `~19.2.14`, `typescript` `~6.0.3`, `eslint` `^9.25.0`.

---

## Riscos

| Risco | Mitigação |
|-------|-----------|
| Reanimated v4 → v3: APIs diferentes | Rodar `npx tsc --noEmit` e corrigir |
| Gesture Handler ~2.31 → ~2.20: API changes menores | Verificar tipos no `tsc` |
| Expo Router ~56.2 → ~54.0: possíveis breaking changes | Verificar se há imports diretos de `@react-navigation/*` |
