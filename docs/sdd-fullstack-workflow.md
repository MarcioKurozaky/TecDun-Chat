# Workflow Full-Stack: Superpowers + Spec Kit

> Metodologia combinada para desenvolvimento de features usando **Superpowers** (descoberta/orquestração) e **Spec Kit** (especificação/planejamento formal).

---

## 1. O que é este workflow?

É a combinação de duas ferramentas que se complementam:

**Superpowers** — Conjunto de skills do opencode para brainstorming, planejamento, implementação com subagents e code review. Cuida da **descoberta e orquestração**.

**Spec Kit** — Toolkit open-source do GitHub que implementa **Spec-Driven Development (SDD)**, onde especificações são o artefato principal. Cuida da **formalização e rastreabilidade**.

Juntos, formam um pipeline completo: da ideia ao código revisado.

---

## 2. Onde o Superpowers Entra

```
┌──────────────────────────────────────────────────────────────────┐
│                   SUPERPOWERS BRAINSTORMING                      │
│  Explora ideia, alinha visão, propõe abordagens                  │
│  (define O QUE construir e POR QUE)                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│                      SPEC KIT                                    │
│  /speckit.constitution  →  Princípios do projeto                 │
│  /speckit.specify       →  Especificação funcional               │
│  /speckit.clarify       →  Esclarece ambiguidades                │
│  /speckit.plan          →  Tech stack + contratos                │
│  /speckit.tasks         →  Tarefas com dependências              │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│               SUPERPOWERS WRITING-PLANS                          │
│  Plano detalhado de implementação com fases e dependências       │
├──────────────────────────────────────────────────────────────────┤
│            SUPERPOWERS SUBAGENT-DRIVEN DEV                       │
│  Implementa tarefas [P] em paralelo com agentes independentes     │
├──────────────────────────────────────────────────────────────────┤
│            SUPERPOWERS REQUESTING CODE REVIEW                    │
│  Gate de qualidade antes do merge                                │
└──────────────────────────────────────────────────────────────────┘
```

| Skill Superpowers | Quando entra | O que faz |
|------------------|-------------|-----------|
| **Brainstorming** | **Antes** do spec-kit | Explora ideias, alinha visão, propõe abordagens — o spec-kit parte do princípio que você já sabe o que quer |
| **Writing Plans** | **Depois** do `/speckit.tasks` | Cria plano de implementação detalhado, agrupando tarefas em fases executáveis |
| **Subagent-Driven Dev** | **Durante** implementação | Executa tarefas `[P]` em paralelo com agentes dedicados |
| **Requesting Code Review** | **Depois** da implementação | Revisa qualidade, consistência e aderência à spec |

### Por que não usar só um?

| Só Superpowers | Só Spec Kit | Combinado (recomendado) |
|---------------|-------------|------------------------|
| Rápido, sem dependência externa | Rigor formal e rastreabilidade | O melhor dos dois mundos |
| Ideal para componentes isolados | Ideal para times grandes | Ideal para features full-stack |
| Falta verificação automática de consistência | Falta fase de descoberta/exploração | Brainstorming descobre, spec-kit formaliza, subagents entregam, review garante |

---

## 3. Instalação e Setup

```bash
# Instalar a CLI do Spec Kit
uv tool install specify-cli

# Inicializar no projeto
specify init <nome-do-projeto> --integration copilot
```

Isso gera a estrutura:

```
.specify/
├── memory/
│   └── constitution.md    # ← Você edita aqui
├── templates/
└── extensions.yml

specs/                     # ← Features são criadas aqui
```

O Superpowers já está disponível via opencode — não requer instalação adicional.

---

## 4. Etapas do Fluxo

---

### 4.1 `/speckit.constitution` — Princípios do Projeto

**O que colocar no prompt:** Regras de arquitetura, padrões de código, princípios de design que o projeto deve seguir.

**Exemplo para este projeto (App Chat):**

```
/speckit.constitution
This is a React Native chat app with Expo SDK 54.
TypeScript strict mode required.
New Architecture enabled.
Expo Router for file-based routing.
Zustand for state management.
react-hook-form + yup for forms.
All API calls through a centralized api client.
UI components in src/components/ with named exports.
Screens in src/app/ with default exports (Expo Router).
Components must be reusable and typed with TypeScript.
No class components — only functional with hooks.
StyleSheet.create for styles, no inline styles.
Backend: Node.js + Express + PostgreSQL + Redis.
Real-time: WebSocket (Socket.IO).
JWT authentication with access + refresh tokens.
```

---

### 4.2 `/speckit.specify` — Especificação Funcional

> 💡 **Superpowers Brainstorming** deve ser usado ANTES desta etapa para explorar a ideia, alinhar visão com o usuário e decidir o que construir.

**FLUXO:** Você escreve o prompt → ele gera `spec.md`

| 🟢 O que escrever | 🔴 O que NÃO escrever |
|-------------------|----------------------|
| Comportamento que o usuário vê | Nomes de bibliotecas ou frameworks |
| Valor de negócio da feature | Endpoints de API |
| Regras de negócio | Nomes de componentes técnicos |
| Fluxos (feliz, erro, edge cases) | Estrutura de banco de dados |
| Quem usa e em qual contexto | Detalhes de implementação |

#### Exemplo 1: Message Reactions (full-stack)

```
/speckit.specify
Add emoji reactions to chat messages. Users should be able to
tap a message and select from a predefined set of emojis to react.
Each reaction shows who reacted and with which emoji. Reactions
are visible to all chat participants in real-time. A user can
toggle their reaction on/off. Total reaction count per emoji
should be displayed on the message bubble.
```

#### Exemplo 2: Avatar Component (só mobile)

```
/speckit.specify
Create a reusable Avatar component for the mobile chat app.
It displays a user photo, falls back to initials with a colored
background when no photo is available, shows an online status
indicator dot, and supports different sizes (small, medium, large).
Used in chat list, chat header, and settings screen.
```

#### Exemplo 3: Autenticação Biométrica

```
/speckit.specify
Allow users to unlock the app using fingerprint or face ID
instead of typing their password every time. When the user
logs in successfully with email+password, prompt to enable
biometric unlock. Once enabled, the next time they open the
app, show the biometric prompt instead of the login screen.
If biometrics fail 3 times, fall back to email+password.
```

#### Exemplo 4: Chat Search

```
/speckit.specify
Allow users to search through their chat history. A search bar
at the top of the chat list filters conversations by contact
name. Inside a specific chat, a search bar filters messages
by text content. Search results highlight the matching text
and tapping a result scrolls to that message. Show recent
searches as suggestions.
```

---

### 4.3 `/speckit.clarify` — Esclarecimento de Ambiguidades

**FLUXO:** Rode `/speckit.clarify` → ele faz perguntas → você **só responde**

| 🟢 O que fazer | 🔴 O que NÃO fazer |
|----------------|-------------------|
| Responder com a letra da opção (ex: "B") | Explicações longas ou justificativas |
| Aceitar a recomendação com "yes" | Discussão técnica — isso é para o plan |
| Resposta curta (≤5 palavras) | Adiantar detalhes de implementação |

#### Exemplo de interação:

```
Spec Kit: "How many emojis should be in the reaction picker?"
> A) 6 emojis (like iMessage)
> B) 12 emojis
> C) 20+ emojis

Você: "A"

Spec Kit: "Can a user react with multiple different emojis to the same message?"
> A) Yes, unlimited different emojis
> B) Yes, but max 3 per message
> C) No, only one emoji per message

Você: "yes" (aceita recomendação)
```

O spec-kit grava as respostas diretamente no `spec.md` e remove as ambiguidades.

---

### 4.4 `/speckit.plan` — Plano Técnico

**FLUXO:** spec pronta → rode `/speckit.plan` com tech stack

| 🟢 O que escrever no prompt | 🔴 O que NÃO escrever |
|----------------------------|----------------------|
| Linguagem e framework | Requisitos de negócio (já estão na spec) |
| Banco de dados e infra | Comportamento do usuário |
| Bibliotecas específicas | Regras de domínio |
| Protocolos de comunicação | Justificativas de negócio |
| Onde o código vive (estrutura) | |

#### Exemplo 1: Message Reactions (full-stack)

```
/speckit.plan
Backend: Node.js + Express + PostgreSQL + Redis
Real-time: WebSocket (Socket.IO)
Mobile: React Native + Expo SDK 54
API: REST + WebSocket events
Auth: JWT tokens
```

#### Exemplo 2: Avatar Component (só mobile)

```
/speckit.plan
React Native + Expo SDK 54
TypeScript strict
expo-image for photo loading
StyleSheet.create for styles
Component lives in src/components/
```

#### Exemplo 3: Chat Search

```
/speckit.plan
Backend: Node.js + Express + PostgreSQL (pg_trgm for fuzzy search)
Mobile: React Native + Expo SDK 54
API: REST with query params
Avoid adding new dependencies — use built-in FlatList search
```

---

### 4.5 API Contract — A Fonte da Verdade

Entre o `/speckit.plan` e o `/speckit.tasks`, o spec-kit gera `contracts/api-spec.json`.

**FLUXO:** Automático — você só valida.

**Por que é crucial em full-stack:**
- Backend e mobile podem ser implementados **em paralelo**
- Mobile usa contratos mockados enquanto backend não fica pronto
- Type safety ponta-a-ponta

#### Exemplo de contrato gerado:

```json
{
  "POST /api/messages/:id/reactions": {
    "body": { "emoji": "string" },
    "response": { "id": "string", "emoji": "string", "userId": "string" }
  },
  "DELETE /api/messages/:id/reactions/:emoji": {
    "response": { "success": true }
  },
  "WebSocket: message:reaction": {
    "event": "message:reaction",
    "data": {
      "messageId": "string",
      "emoji": "string",
      "userId": "string",
      "userName": "string",
      "action": "add | remove"
    }
  }
}
```

| 🟢 O que fazer | 🔴 O que NÃO fazer |
|----------------|-------------------|
| Validar se os endpoints cobrem a spec | Pular esta etapa |
| Ajustar names se necessário | Ignorar inconsistências |
| Usar como referência compartilhada | |

---

### 4.6 `/speckit.tasks` — Tarefas Executáveis

> 💡 **Superpowers Writing-Plans** pode ser usado DEPOIS desta etapa para criar um plano de implementação ainda mais detalhado, agrupando tarefas por fase e definindo checkpoints de review.

**FLUXO:** Rode `/speckit.tasks` → ele gera `tasks.md`

| 🟢 O que fazer | 🔴 O que NÃO fazer |
|----------------|-------------------|
| Rodar o comando e validar | Editar tasks.md manualmente sem motivo |
| Verificar dependências entre fases | Reordenar tarefas por conta própria |
| Identificar tarefas `[P]` (paralelizáveis) | Ignorar checkpoints entre fases |

#### Estrutura gerada:

```
## Phase 1: Setup (Shared Infrastructure)
- [ ] T001 Add reactions table migration
- [ ] T002 [P] Create ReactionPicker component
- [ ] T003 [P] Add reaction emoji assets

## Phase 2: Backend API
⚠ BLOCKS mobile integration
- [ ] T004 POST /api/messages/:id/reactions
- [ ] T005 DELETE /api/messages/:id/reactions/:emoji
- [ ] T006 [P] WebSocket event: message:reaction

## Phase 3: Mobile UI (User Story 1)
- [ ] T007 [US1] Integrate ReactionPicker in MessageBubble
- [ ] T008 [US1] Add reaction display row in MessageBubble
**Checkpoint**: Reactions working end-to-end
```

**Marcador `[P]`** = tarefas que podem rodar em paralelo com subagents separados (ótimo para full-stack).

---

### 4.7 `/speckit.analyze` — Verificação de Consistência

**FLUXO:** Rode `/speckit.analyze` → ele produz relatório

**O que ele checa:**

| Passagem | O que detecta |
|----------|--------------|
| Duplicação | Requisitos repetidos entre si |
| Ambiguidade | Termos vagos sem métrica ("rápido", "seguro") |
| Sub-especificação | Requisitos sem tarefas associadas |
| Alinhamento constitucional | Conflitos com constitution.md |
| Lacunas de cobertura | Histórias sem tarefas |
| Inconsistência | Mesmo conceito com nomes diferentes entre arquivos |

| 🟢 O que fazer | 🔴 O que NÃO fazer |
|----------------|-------------------|
| Revisar o relatório | Ignorar issues CRITICAL |
| Corrigir issues apontadas | Deixar placeholders (TBD, TODO) |
| Rodar de novo após correções | |

---

### 4.8 `/speckit.implement` — Execução

> 💡 **Superpowers Subagent-Driven Dev** pode ser usado AQUI para executar tarefas `[P]` em paralelo, cada uma em seu próprio agente.
> 
> 💡 **Superpowers Requesting Code Review** deve ser usado DEPOIS para revisar o código gerado antes do merge.

**FLUXO:** Rode `/speckit.implement` → ele executa `tasks.md` na ordem

| 🟢 O que fazer | 🔴 O que NÃO fazer |
|----------------|-------------------|
| Deixar ele seguir a ordem das tasks | Pular fases |
| Validar checkpoints entre fases | Ignorar falhas |
| Intervir só se algo der errado | Micro-gerenciar |

---

## 5. Dicas Sêniores

### 5.1 Subagents + Tarefas `[P]` = Paralelização Real

Tarefas com `[P]` podem ser executadas em paralelo com o **Subagent-Driven Dev**:

```
[sessão 1] → T002 [P] ReactionPicker (mobile) ────┐
                                                    │
[sessão 2] → T005 [P] WebSocket events (backend) ──┤─── merge simultâneo
                                                    │
[sessão 3] → T006 [P] Reaction display (mobile) ───┘
```

Cada subagent recebe apenas o contexto necessário (contrato de API + spec da tarefa).

### 5.2 Contrato como Fonte da Verdade

Em projetos full-stack, o contrato de API é o **commitment point**:
- Backend e mobile combinam o contrato **antes** de implementar
- Mudanças de contrato exigem análise de impacto
- Spec-kit detecta inconsistências no `/speckit.analyze`

### 5.3 Quando Pular Etapas

| Cenário | Fluxo | Skills Superpowers usados |
|---------|-------|--------------------------|
| **Feature full-stack nova** | Brainstorming → Spec Kit completo → Writing-Plans → Subagents → Review | Todos |
| **Feature full-stack pequena** | Brainstorming → specify → plan → tasks → implement | Brainstorming |
| **Componente mobile isolado** | Brainstorming (rápido) → specify → plan → implementar direto | Brainstorming |
| **Bug fix** | Só Superpowers (debugging skill + implementar) | Debugging |
| **Refatoração** | Só Superpowers (writing plans + subagents) | Writing-Plans, Subagents |

### 5.4 Fluxo Resumido por Skill Superpowers

```
                         ┌─────────────────────┐
                         │  BRAINSTORMING       │
                         │  Explora e alinha    │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │  SPEC KIT           │
                         │  Formaliza e planeja│
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │  WRITING-PLANS      │
                         │  Detalha execução   │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │  SUBAGENT-DRIVEN    │
                         │  Implementa paralelo│
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │  CODE REVIEW        │
                         │  Garante qualidade  │
                         └─────────────────────┘
```

---

## 6. Resumo Visual: Prompt ou Comando?

| Comando / Skill | Você escreve no prompt? | O que escrever | O que EVITAR |
|----------------|------------------------|---------------|--------------|
| **Superpowers Brainstorming** | ✅ Sim | Ideia, contexto, dúvidas | Pular direto para código |
| `/speckit.constitution` | ✅ Sim | Princípios, padrões, tech stack geral | Regras de features específicas |
| `/speckit.specify` | ✅ Sim | Comportamento do usuário, valor de negócio | Tech stack, libs, endpoints |
| `/speckit.clarify` | ❌ Só responde | Letra da opção (A/B/C) ou "yes" | Explicações longas |
| `/speckit.plan` | ✅ Sim | Tech stack real da feature | Requisitos de negócio |
| API Contract | ❌ Só valida | — | Pular ou ignorar |
| `/speckit.tasks` | ❌ Só roda | — | Editar manualmente |
| **Superpowers Writing-Plans** | ✅ Sim | Plano detalhado (se necessário) | Repetir o tasks.md |
| `/speckit.analyze` | ❌ Só roda | — | Ignorar issues CRITICAL |
| `/speckit.implement` | ❌ Só roda | — | Micro-gerenciar |
| **Superpowers Subagent-Driven Dev** | ✅ Sim | Tarefas específicas com contexto | Sobrecarregar o agente |
| **Superpowers Code Review** | ❌ Só revisa | — | Pular em features críticas |

---

## 7. Fluxo Visual Completo

```
┌─────────────────────────────────────────────────────────────────────┐
│                      SUPERPOWERS BRAINSTORMING                      │
│            "O que construir? Qual a melhor abordagem?"              │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                    ┌──────────────────────┐                         │
│                    │                      │                         │
│                    │  /speckit.constitution│  ← Escreve princípios  │
│                    │                      │                         │
│                    └──────────┬───────────┘                         │
│                               │                                     │
│                               ▼                                     │
│                    ┌──────────────────────┐                         │
│                    │                      │                         │
│                    │  /speckit.specify     │  ← Escreve: o que+por que
│                    │                      │                         │
│                    └──────────┬───────────┘                         │
│                               │                                     │
│                               ▼                                     │
│                    ┌──────────────────────┐                         │
│                    │                      │                         │
│         SPEC KIT   │  /speckit.clarify     │  ← Só responde (A/B/C) │
│                    │                      │                         │
│                    └──────────┬───────────┘                         │
│                               │                                     │
│                               ▼                                     │
│                    ┌──────────────────────┐                         │
│                    │                      │                         │
│                    │  /speckit.plan        │  ← Escreve: tech stack │
│                    │                      │                         │
│                    └──────────┬───────────┘                         │
│                               │                                     │
│                    ┌──────────▼───────────┐                         │
│                    │                      │                         │
│                    │  API Contract        │  ← Valida contratos     │
│                    │  (contracts/)        │                         │
│                    │                      │                         │
│                    └──────────┬───────────┘                         │
│                               │                                     │
│                               ▼                                     │
│                    ┌──────────────────────┐                         │
│                    │                      │                         │
│                    │  /speckit.tasks       │  ← Só roda             │
│                    │                      │                         │
│                    └──────────┬───────────┘                         │
│                               │                                     │
├───────────────────────────────┼─────────────────────────────────────┤
│                               ▼                                     │
│              SUPERPOWERS WRITING-PLANS                              │
│              Plano detalhado de implementação                       │
├───────────────────────────────┬─────────────────────────────────────┤
│                               ▼                                     │
│              SUPERPOWERS SUBAGENT-DRIVEN DEV                        │
│              Implementa [P] em paralelo                             │
├───────────────────────────────┬─────────────────────────────────────┤
│                               ▼                                     │
│              SUPERPOWERS REQUESTING CODE REVIEW                     │
│              Gate de qualidade antes do merge                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 8. Cheatsheet Rápido

```
┌──────────────────────────┬────────────────────────────────────────────────────┐
│ Quero criar feature      │ Brainstorming →                                   │
│ full-stack nova          │ /speckit.specify → /speckit.plan →                │
│                          │ /speckit.tasks → Writing-Plans →                  │
│                          │ Subagents → Code Review                           │
├──────────────────────────┼────────────────────────────────────────────────────┤
│ Quero adicionar          │ Brainstorming (rápido) →                          │
│ componente mobile        │ /speckit.specify → /speckit.plan →                │
│                          │ implementar direto                                │
├──────────────────────────┼────────────────────────────────────────────────────┤
│ Quero corrigir um bug    │ Debugging skill → implementar                      │
├──────────────────────────┼────────────────────────────────────────────────────┤
│ Quero refatorar código   │ Writing-Plans → Subagents → Code Review           │
├──────────────────────────┼────────────────────────────────────────────────────┤
│ Preciso esclarecer       │ /speckit.clarify                                   │
│ requisitos da spec       │                                                    │
├──────────────────────────┼────────────────────────────────────────────────────┤
│ Quero verificar          │ /speckit.analyze                                   │
│ consistência spec vs     │                                                    │
│ plano vs tasks           │                                                    │
└──────────────────────────┴────────────────────────────────────────────────────┘

---

## 9. Exemplos Completos Full-Stack

> Cada exemplo abaixo percorre **todas as etapas do pipeline** — do brainstorming às tarefas paralelizáveis — mostrando exatamente o que escrever em cada prompt.

---

### Exemplo A: Typing Indicator (Tempo Real)

**Descrição:** Mostrar quando um contato está digitando no chat, em tempo real.

---

#### A.1 — Superpowers Brainstorming

Discussão inicial para alinhar a abordagem:

```
O indicador deve aparecer em tempo real ou com delay?
  → Com delay: 2s sem digitar, remove indicador

Mostrar "fulano está digitando..." ou só um ícone?
  → Texto com nome + animação de três pontinhos

Funciona em chats em grupo?
  → Sim, mostra "Fulano está digitando..." e "Fulano +2 estão digitando..."
```

#### A.2 — `/speckit.specify`

```
/speckit.specify
Show a real-time typing indicator when a contact is composing
a message. When the user starts typing, emit a typing event
to the server. The server broadcasts to all chat participants
that this user is typing. The indicator disappears 2 seconds
after the user stops typing. In group chats, show the name of
who is typing. If multiple people are typing, show "Fulano
and 2 others are typing...". The indicator appears above the
text input area, not on the message list.
```

#### A.3 — `/speckit.plan`

```
/speckit.plan
Backend: Node.js + Express + Socket.IO
Real-time: WebSocket events (not REST — typing is transient)
Mobile: React Native + Expo SDK 54
Debounce: 2 seconds on server side after last keystroke
State: Zustand store for typing users per chat
Avoid: no database writes — typing is ephemeral
```

#### A.4 — API Contract

O spec-kit gera `contracts/websocket-spec.md`:

```json
{
  "WebSocket: client → typing:start": {
    "event": "typing:start",
    "data": { "chatId": "string", "userId": "string" }
  },
  "WebSocket: client → typing:stop": {
    "event": "typing:stop",
    "data": { "chatId": "string", "userId": "string" }
  },
  "WebSocket: server → typing": {
    "event": "typing",
    "data": {
      "chatId": "string",
      "users": [
        { "userId": "string", "name": "string", "startedAt": "ISO8601" }
      ]
    }
  }
}
```

#### A.5 — `/speckit.tasks`

```
## Phase 1: Setup
- [ ] T001 Add typing:start WebSocket event handler (backend)
- [ ] T002 [P] Add typing:stop WebSocket event handler (backend)
- [ ] T003 Add typing debounce timer logic (server-side, 2s)

## Phase 2: Mobile
- [ ] T004 Create TypingIndicator component (animated dots + name)
- [ ] T005 [P] Add typing store slice (Zustand — users typing per chat)
- [ ] T006 [P] Emit typing:start/stop on TextInput onChange
- [ ] T007 Subscribe to typing events on ChatScreen mount
**Checkpoint**: Typing indicator appears and disappears correctly
```

#### A.6 — Paralelização com Subagents

```
┌─ T002 [P] typing:stop handler ──── backend ──┐
│                                                │
┌─ T005 [P] Zustand typing store ─── mobile ────┤── merge simultâneo
│                                                │
┌─ T006 [P] TextInput events ─────── mobile ────┘
```

---

### Exemplo B: Voice Messages

**Descrição:** Gravar, enviar e reproduzir áudio dentro do chat.

---

#### B.1 — Superpowers Brainstorming

```
O áudio fica no servidor ou no dispositivo?
  → Servidor (S3/cloud storage), download sob demanda

Quanto tempo máximo de gravação?
  → 5 minutos

Playback: speaker do dispositivo ou alto-falante?
  → Speaker padrão, com toggle para alto-falante

UI: botão de microfone igual WhatsApp?
  → Segurar para gravar, soltar para enviar, deslizar para cancelar
```

#### B.2 — `/speckit.specify`

```
/speckit.specify
Allow users to send voice messages in chats. Press and hold a
microphone button to start recording. Release to send. Swipe
left to cancel the recording. Show recording waveform/animation
while recording. Max 5 minutes per message. After sending,
the voice message appears as a playable bubble in the chat.
Tap to play, tap again to pause. Show playback progress.
Auto-download on WiFi, download on tap on cellular.
```

#### B.3 — `/speckit.plan`

```
/speckit.plan
Backend: Node.js + Express + PostgreSQL + S3-compatible storage
Upload: multipart upload to /api/voice-messages
Audio: expo-av for recording and playback
Mobile: React Native + Expo SDK 54
Storage: S3/MinIO for audio files, PostgreSQL for metadata
Waveform: Canvas or Lottie animation during recording
Permissions: microphone + media library
```

#### B.4 — API Contract

```json
{
  "POST /api/voice-messages": {
    "body": "multipart/form-data (audio blob + chatId)",
    "response": {
      "id": "string",
      "chatId": "string",
      "userId": "string",
      "durationMs": "number",
      "fileUrl": "string",
      "createdAt": "ISO8601"
    }
  },
  "GET /api/files/:fileId": {
    "response": "audio/ogg stream (or redirect to S3 signed URL)"
  },
  "WebSocket: voice:new": {
    "event": "voice:new",
    "data": {
      "chatId": "string",
      "message": {
        "id": "string",
        "userId": "string",
        "userName": "string",
        "durationMs": "number",
        "fileUrl": "string"
      }
    }
  }
}
```

#### B.5 — `/speckit.tasks`

```
## Phase 1: Backend
- [ ] T001 Create voice_messages table migration
- [ ] T002 POST /api/voice-messages handler (upload + persist)
- [ ] T003 [P] GET /api/files/:fileId handler (serve/download)
- [ ] T004 [P] WebSocket voice:new event broadcast

## Phase 2: Mobile — Recording
- [ ] T005 [P] Request microphone permission on first use
- [ ] T006 Create AudioRecorder component (hold-to-record + swipe-to-cancel)
- [ ] T007 [P] Add waveform animation during recording

## Phase 3: Mobile — Playback
- [ ] T008 [P] Create VoiceMessageBubble component (play/pause + progress)
- [ ] T009 Integrate VoiceMessageBubble into MessageList
**Checkpoint**: Record → send → receive → play end-to-end
```

#### B.6 — Paralelização com Subagents

```
┌─ T003 [P] GET /api/files ────────── backend ──┐
│                                                  │
├─ T004 [P] voice:new WebSocket ───── backend ────┤
│                                                  │
├─ T005 [P] Mic permission + store ── mobile ─────┤── 4 subagents simultâneos
│                                                  │
├─ T007 [P] Waveform animation ────── mobile ─────┘
│
└─ T008 [P] VoiceMessageBubble UI ─── mobile ───
```

---

### Exemplo C: Message Forwarding

**Descrição:** Forward (encaminhar) uma mensagem para outro contato ou grupo.

---

#### C.1 — Superpowers Brainstorming

```
Forward texto apenas ou mídia também?
  → Tudo: texto, imagem, áudio, documento

Pode forward para múltiplos contatos de uma vez?
  → Sim, multi-select de contatos/grupos

Mantém referência da mensagem original?
  → Sim, exibe "Forwarded from Fulano" no topo

Precisa de "forwarded" label como WhatsApp?
  → Sim, ícone de forward + nome do remetente original
```

#### C.2 — `/speckit.specify`

```
/speckit.specify
Allow users to forward messages to other contacts or groups.
Long-press a message and select "Forward" from the context menu.
Select one or more contacts/groups from a searchable list.
The forwarded message preserves the original content type
(text/image/voice). Display a "Forwarded from [name]" label
at the top of the forwarded message. Multiple recipients can
be selected before sending. The recipient sees it as a new
message in their chat. Show a confirmation toast after sending.
```

#### C.3 — `/speckit.plan`

```
/speckit.plan
Backend: Node.js + Express + PostgreSQL
Endpoint: POST /api/messages/forward (bulk recipients)
Logic: duplicate message record per recipient chat
Mobile: React Native + Expo SDK 54
UI: Bottom sheet with searchable FlatList of contacts/groups
Toast: react-native-toast-message for confirmation
Performance: server-side bulk insert, not one-by-one
```

#### C.4 — API Contract

```json
{
  "POST /api/messages/forward": {
    "body": {
      "originalMessageId": "string",
      "recipientIds": ["string"]
    },
    "response": {
      "forwardedMessages": [
        {
          "id": "string",
          "chatId": "string",
          "recipientId": "string",
          "createdAt": "ISO8601"
        }
      ],
      "failedRecipients": ["string"]
    }
  }
}
```

#### C.5 — `/speckit.tasks`

```
## Phase 1: Backend
- [ ] T001 POST /api/messages/forward (bulk insert + validation)
- [ ] T002 [P] Add isForwarded and forwardedFrom fields to messages table
- [ ] T003 Emit WebSocket new-message events for each forwarded message

## Phase 2: Mobile
- [ ] T004 [P] Add "Forward" option in message context menu (long-press)
- [ ] T005 [P] Create ContactPicker bottom sheet (search + multi-select)
- [ ] T006 [P] Create Forwarded label UI component
- [ ] T007 Integrate forward flow: select message → pick contacts → confirm
- [ ] T008 [P] Add confirmation toast after forward completes
**Checkpoint**: Forward message → recipient receives → label shows
```

#### C.6 — Paralelização com Subagents

```
┌─ T002 [P] DB migration (isForwarded) ──── backend ──┐
│                                                       │
├─ T004 [P] Context menu option ─────────── mobile ────┤
│                                                       │
├─ T005 [P] ContactPicker bottom sheet ──── mobile ────┤── 4 em paralelo
│                                                       │
└─ T006 [P] Forwarded label component ──── mobile ─────┘
```

---

### Resumo dos Exemplos

| Feature | Complexidade | Contrato principal | `[P]` tasks | Subagents |
|---------|------------|-------------------|-------------|-----------|
| Typing Indicator | 🔵 Baixa | WebSocket only | 3 de 7 | 3 paralelos |
| Voice Messages | 🟡 Média | REST upload + WebSocket + File serving | 5 de 9 | 4 paralelos |
| Message Forwarding | 🟡 Média | REST bulk insert | 4 de 8 | 4 paralelos |
| Message Reactions | 🟡 Média | REST CRUD + WebSocket | 3 de 8 | 3 paralelos |
```
