# WhatsApp-Like com React Native + Expo + Firebase

> Guia completo de especificação e implementação usando **Superpowers** + **Spec Kit**.
> Cobre cada feature com prompts exatos para cada etapa do pipeline.

---

## Stack Técnico

| Camada | Tecnologia |
|--------|-----------|
| Mobile | React Native 0.81 + Expo SDK 54 |
| Navegação | Expo Router (file-based) |
| Autenticação | Firebase Auth (email + telefone) |
| Banco em tempo real | Cloud Firestore |
| Arquivos | Firebase Storage (limite: 50 MB por arquivo) |
| Push | Firebase Cloud Messaging (FCM) |
| Serverless | Cloud Functions |
| Estado | Zustand |
| Formulários | react-hook-form + yup |
| UI | StyleSheet.create + @expo/vector-icons |
| Mídia | expo-image-picker, expo-image-manipulator, expo-av, expo-video-thumbnails |

---

## Mapa: Skills × Etapas do Pipeline

Cada etapa do fluxo usa skills específicas do `.opencode/skills/`:

```
FASE 0: DESCOBERTA
  Skill: brainstorming
  O que faz: Explora a ideia, alinha expectativas, define abordagem

FASE 1: ESPECIFICAÇÃO (Spec Kit)
  Skills auxiliares:
    - clean-typescript (tipos)
    - zustand (state shape)
    - building-native-ui (componentes)
  O que faz: /speckit.specify + /speckit.clarify

FASE 2: PLANO TÉCNICO (Spec Kit)
  Skills auxiliares:
    - native-data-fetching (Firestore patterns)
    - vercel-react-native-skills (listas, performance)
    - react-native-best-practices (otimização)
    - jwt-authentication (auth patterns)
  O que faz: /speckit.plan → API Contract → /speckit.tasks

FASE 3: PLANO DE EXECUÇÃO
  Skill: writing-plans
  O que faz: Cria plano detalhado de implementação

FASE 4: IMPLEMENTAÇÃO
  Skills auxiliares (a depender da tarefa):
    - building-native-ui (telas e componentes)
    - zustand (stores)
    - axios (API calls)
    - native-data-fetching (Firestore)
    - clean-typescript (tipos)
    - vercel-react-native-skills (boas práticas RN)
    - react-native-best-practices (performance)
  Skill de orquestração: subagent-driven-dev (tarefas [P])

FASE 5: REVISÃO
  Skill: requesting-code-review

FASE 6: DEPLOY
  Skills:
    - expo-deployment (App Store + Play Store)
    - expo-cicd-workflows (EAS)
    - upgrading-expo (manutenção)
```

---

## Estado Atual do Projeto

O app já possui:

- **Auth**: Telas de login, cadastro e forgot-password com react-hook-form + yup
- **Chat**: ChatListScreen, ChatScreen, ChatSettingsScreen, SettingsScreen
- **Tabs**: Navegação inferior (Chats + Settings)
- **Componentes**: Button, Input, Loading, PageContainer
- **Tema**: Sistema de cores e fontes em `src/utils/theme.ts`

⚠️ **isAuth** atualmente é manual (`const isAuth = false` em `src/app/index.tsx:10`).
A primeira feature do pipeline será substituir isso por Firebase Auth real.

---

## Features (Ordem de Implementação)

| # | Feature | Depende de | Skills principais |
|---|---------|-----------|-------------------|
| 1 | Firebase Setup + Auth | — | `zustand`, `clean-typescript` |
| 2 | Perfil do Usuário | Auth | `building-native-ui` |
| 3 | Chat 1:1 em Tempo Real | Auth, Perfil | `native-data-fetching`, `react-native-best-practices` |
| 4 | Online Presence + Typing | Chat | `zustand` |
| 5 | Media Sharing (img + video + voice, 50MB) | Chat, Storage | `vercel-react-native-skills`, `building-native-ui` |
| 6 | Read Receipts | Chat | `native-data-fetching` |
| 7 | Notificações Push (FCM) | Chat | — |
| 8 | Grupos | Chat, Auth | `clean-typescript` |

---

## Feature 1: Firebase Setup + Auth

---

### Fase 0 — Superpowers Brainstorming

```
Qual método de autenticação usar?
  → Firebase Auth (email + telefone)

Precisa de login com Google/Apple?
  → Email + Telefone apenas (MVP)

O que acontece no primeiro login?
  → Redirecionar para tela de perfil (nome, foto)

Como armazenar token/local?
  → AsyncStorage + Zustand store
```

**Skill:** `brainstorming` — explorar e alinhar antes de especificar.

---

### Fase 1 — Spec Kit: `/speckit.specify`

```
/speckit.specify
Implement Firebase authentication for the chat app. Users can
sign up with email+password or phone number. After successful
authentication, redirect to the chat tab. If the user is a
first-time user, redirect to profile setup to enter their
display name and photo. On subsequent launches, check if the
user is already authenticated and skip the login screen.
Show loading screen while checking auth state. Handle errors:
wrong password, email already in use, invalid phone format,
network error. Show toast messages for each error type.
On logout, clear local state and redirect to login.
```

**Skills auxiliares:**
- `clean-typescript` — definir tipos AuthUser, AuthState, LoginForm, SignUpForm
- `zustand` — planejar auth store (user, isLoading, isAuthenticated)

---

### Fase 1.5 — `/speckit.clarify`

O spec-kit perguntará coisas como:

```
Q: What happens to isAuth when app is offline?
  → A) Show cached session from AsyncStorage
  → B) Show login screen, require online
  Resposta: "A"

Q: When does token refresh happen?
  → A) Firebase handles automatically
  → B) Manual refresh every 60 min
  Resposta: "A" (Firebase cuida disso)
```

---

### Fase 2 — Spec Kit: `/speckit.plan`

```
/speckit.plan
Auth: Firebase Auth (email + phone)
State: Zustand store (src/store/authStore.ts)
Persistence: AsyncStorage via Firebase Auth persistence
Navigation: Expo Router redirect based on isAuth
Forms: react-hook-form + yup (already exist)
Error: AppError utility (already exists)
Toast: react-native-toast-message (already exists)
```

**Skills auxiliares:**
- `jwt-authentication` — referência para entender fluxo de tokens (Firebase gerencia nativamente, mas útil para entender o padrão)
- `native-data-fetching` — padrão de loading/error/success

---

### Fase 2.5 — API Contract (Firebase)

Aqui o contrato não é REST — é Firebase:

```typescript
// Coleções Firestore
users/{uid} {
  displayName: string
  email: string
  phoneNumber: string
  photoURL: string | null
  createdAt: Timestamp
  isOnline: boolean
  lastSeen: Timestamp
}

// Auth Store (Zustand)
type AuthState = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  logout: () => Promise<void>
}
```

```javascript
// Firebase Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

---

### Fase 3 — Spec Kit: `/speckit.tasks`

```
## Phase 1: Firebase Setup
- [ ] T001 Initialize Firebase in project (src/lib/firebase.ts)
- [ ] T002 [P] Configure Firebase Auth with email provider
- [ ] T003 [P] Configure Firebase Auth with phone provider

## Phase 2: Auth Store + API
- [ ] T004 Create authStore (Zustand) in src/store/authStore.ts
- [ ] T005 [P] Implement email login + signUp functions
- [ ] T006 [P] Implement phone auth (send OTP + verify)
- [ ] T007 [P] Implement logout + onAuthStateChanged listener

## Phase 3: Integrate with Navigation
- [ ] T008 Replace hardcoded isAuth in src/app/index.tsx with authStore
- [ ] T009 Add loading screen while checking auth state
- [ ] T010 [P] Wire up existing LoginScreen to use authStore.login()
- [ ] T011 [P] Wire up existing SignupScreen to use authStore.signUp()
- [ ] T012 [P] Add error handling toast for each auth error type
**Checkpoint**: User can sign up, log in, log out, redirect works
```

---

### Fase 4 — Writing-Plans + Subagents

**Skill:** `writing-plans` → cria plano detalhado com ordem de execução.

**Skill:** `subagent-driven-dev` → executa tarefas `[P]` em paralelo:

```
[sessão 1] → T002 Firebase email auth  ────────┐
[sessão 2] → T003 Firebase phone auth ─────────┤
[sessão 3] → T005 email login/signUp  ─────────┤── 5 subagents
[sessão 4] → T006 phone OTP flow     ─────────┤
[sessão 5] → T007 logout + listener  ─────────┘
```

---

### Fase 5 — Code Review

**Skill:** `requesting-code-review` — validar:

- Auth store cobre todos os estados (loading, error, success)
- onAuthStateChanged não causa memory leak
- Formulários de login/cadastro funcionam com Firebase
- **isAuth** em `src/app/index.tsx` agora lê da store, não é mais `false`

---

## Feature 2: Chat 1:1 em Tempo Real

---

### Fase 0 — Superpowers Brainstorming

```
Estrutura do chat: coleção "chats" ou subcoleção?
  → Chats/{chatId}/messages/{messageId}

Participantes: array de UIDs ou map?
  → Array de UIDs + campo "participantDetails" (denormalized)

Offline: Firestore persistence ativada?
  → Sim, dados offline com pending states

Ordenação: por última mensagem ou por criação?
  → Última mensagem (timestamp)
```

**Skill:** `brainstorming`

---

### Fase 1 — `/speckit.specify`

```
/speckit.specify
Implement 1-on-1 real-time chat using Firestore. Users can
tap a contact to start a new chat or open an existing one.
Messages appear in real-time with no manual refresh. Each
message shows sender name, timestamp, and delivery status.
The chat list shows the last message preview and timestamp
for each conversation. Support text messages only initially.
New messages appear at the bottom with auto-scroll. Show
empty state when no messages exist. Support offline reading
and sending (messages queue and send when back online).
```

**Skills auxiliares:**
- `native-data-fetching` — Firestore snapshot listeners + loading states
- `clean-typescript` — tipos Message, Chat, Participant
- `building-native-ui` — MessageBubble, ChatInput componentes

---

### Fase 2 — `/speckit.plan`

```
/speckit.plan
Database: Cloud Firestore
Collections: chats/{chatId}, chats/{chatId}/messages/{msgId}
Listeners: onSnapshot with real-time updates
Offline: Firestore persistence enabled
State: Zustand (messages per chat, chat list)
UI: FlatList with inverted scroll, MessageBubble component
Performance: limit to 50 messages initially, paginate on scroll
```

---

### Fase 2.5 — Contrato Firestore

```typescript
chats/{chatId} {
  participantIds: string[]
  participantDetails: {
    [uid]: { displayName: string, photoURL: string | null }
  }
  lastMessage: {
    text: string
    senderId: string
    timestamp: Timestamp
    type: "text" | "image" | "voice"
  }
  updatedAt: Timestamp
  createdAt: Timestamp
}

chats/{chatId}/messages/{messageId} {
  senderId: string
  text: string
  type: "text"
  createdAt: Timestamp
  status: "sending" | "sent" | "delivered" | "seen"
}
```

```javascript
// Security Rules — adicional ao auth
match /chats/{chatId} {
  allow read: if request.auth != null
    && request.auth.uid in resource.data.participantIds;
  allow create: if request.auth != null
    && request.auth.uid in request.resource.data.participantIds;

  match /messages/{messageId} {
    allow read: if request.auth != null
      && request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participantIds;
    allow create: if request.auth != null
      && request.auth.uid == request.resource.data.senderId;
  }
}
```

---

### Fase 3 — `/speckit.tasks`

```
## Phase 1: Firestore Setup
- [ ] T001 Create chat service (src/services/chatService.ts)
- [ ] T002 [P] Create message listener with onSnapshot
- [ ] T003 [P] Create sendMessage function (add to subcollection + update lastMessage)

## Phase 2: Chat Store
- [ ] T004 Create chatStore (Zustand) — messages per chat
- [ ] T005 [P] Create chatListStore — conversations list with last message

## Phase 3: UI Components
- [ ] T006 Create MessageBubble component
- [ ] T007 [P] Create ChatInput component
- [ ] T008 [P] Create ChatListItem component (avatar + last message + time)
- [ ] T009 [P] Update ChatScreen to use real data (not placeholder)
- [ ] T010 Update ChatListScreen to use real data (not placeholder)
**Checkpoint**: Send message → appears in real-time on recipient's screen
```

---

### Fase 4 — Subagents Paralelos

```
[sessão 1] → T002 Message listener   ──── backend (Firestore) ──┐
[sessão 2] → T003 sendMessage func   ──── backend (Firestore) ──┤
[sessão 3] → T005 chatListStore      ──── mobile store ─────────┤── 4 subagents
[sessão 4] → T007 ChatInput          ──── mobile UI ────────────┘
```

**Skills para implementação:**
- `vercel-react-native-skills` — boas práticas de listas (FlatList performance)
- `react-native-best-practices` — otimização de FlatList, evitar re-renders
- `building-native-ui` — MessageBubble, ChatInput (native patterns)
- `zustand` — slices para chatStore + chatListStore

---

## Feature 3: Notificações Push (FCM)

---

### Fase 0 — Superpowers Brainstorming

```
FCM setup: Expo Notifications ou native?
  → Expo Notifications (mais simples, integrado com Expo)

Precisa de Cloud Function para enviar?
  → Sim: Firestore trigger on new message → FCM

Token rotation: quando o dispositivo muda?
  → Salvar token no Firestore, atualizar sempre que mudar

Notification data: o que enviar?
  → chatId, senderId, senderName, messagePreview

Tapping notification: navegar para o chat correto?
  → Sim: notification.data.chatId → navigation
```

**Skill:** `brainstorming`

---

### Fase 1 — `/speckit.specify`

```
/speckit.specify
Send push notifications when a new message arrives and the
recipient is not currently viewing that chat. When the app
is in foreground, show an in-app toast/banner instead of a
system notification. Tapping a notification navigates the
user directly to the relevant chat. Request notification
permission on first login. Store FCM tokens per user in
Firestore. Handle token refresh automatically. On logout,
remove the token from Firestore. Show a brief notification
preview (sender name + message snippet) without full content.
```

---

### Fase 2 — `/speckit.plan`

```
/speckit.plan
Push: Expo Notifications + FCM (native)
Backend: Cloud Functions (Firebase) — Firestore trigger
Trigger: onWrite to chats/{chatId}/messages/{msgId}
Token storage: Firestore users/{uid}/fcmTokens/{tokenId}
Permissions: request on login, handle denial gracefully
Data payload: chatId, senderId, senderName, preview
Foreground: notification handler → show in-app toast
Background: notification tap → deep link to chat screen
```

---

### Fase 2.5 — Contrato

```typescript
// Firestore (token storage)
users/{uid} {
  // ...existing fields
  fcmTokens: { [token: string]: Timestamp } // map de token → createdAt
}

// Cloud Function trigger
exports.onNewMessage = functions.firestore
  .document('chats/{chatId}/messages/{messageId}')
  .onWrite(async (change, context) => {
    // 1. Get recipient UIDs (exclude sender)
    // 2. Fetch FCM tokens from recipients' docs
    // 3. Send notification via admin.messaging()
  });

// Notification payload
{
  notification: { title: senderName, body: preview },
  data: { chatId, senderId, type: "new_message" },
  android: { channelId: "chat-messages" }
}
```

---

### Fase 3 — `/speckit.tasks`

```
## Phase 1: Cloud Function
- [ ] T001 Create onNewMessage Cloud Function (Firestore trigger)
- [ ] T002 [P] Add FCM token storage to user profile

## Phase 2: Mobile — Notifications Setup
- [ ] T003 Register for push notifications (Expo Notifications)
- [ ] T004 [P] Save FCM token to Firestore on login
- [ ] T005 [P] Remove FCM token on logout
- [ ] T006 Handle token refresh (Expo event listener)

## Phase 3: Mobile — Notification Handling
- [ ] T007 [P] Create foreground notification handler (in-app toast)
- [ ] T008 [P] Create background notification tap handler (navigate to chat)
- [ ] T009 Request notification permission on first login
**Checkpoint**: Receive message → notification appears → tap → opens chat
```

---

### Fase 4 — Subagents Paralelos

```
[sessão 1] → T002 Token storage     ──── backend ──┐
[sessão 2] → T004 Save token        ──── mobile ───┤
[sessão 3] → T007 Foreground handler ──── mobile ───┤── 4 subagents
[sessão 4] → T008 Tap handler       ──── mobile ───┘
```

---

## Feature 4: Online Presence + Typing Indicator

---

### Fase 0 — Superpowers Brainstorming

```
Presence: Firestore onDisconnect ou Realtime Database?
  → Firestore onDisconnect (mais simples, mesmo ecossistema)

Atualizar isOnline + lastSeen juntos?
  → Sim, timestamp + booleano

Typing: Firestore write ou Cloud Function?
  → Firestore write com debounce de 2s

Onde armazenar typing status?
  → chats/{chatId}/typing/{userId}: timestamp
```

**Skill:** `brainstorming`

---

### Fase 1 — `/speckit.specify`

```
/speckit.specify
Show online/offline status for each contact. A green dot
appears next to their avatar when online. Show "last seen
5 min ago" when offline. When the user starts typing, show
a typing indicator in the recipient's chat within 1 second.
The indicator disappears 2 seconds after the user stops
typing. In group chats, show the name of who is typing.
Use Firestore presence with onDisconnect to handle sudden
disconnects (app close, network loss). Update lastSeen
timestamp on disconnect.
```

**Skill auxiliar:** `zustand` — typing store por chat

---

### Fase 2 — `/speckit.plan`

```
/speckit.plan
Presence: Firestore with onDisconnect handler
Typing: Firestore subcollection chats/{chatId}/typing/{userId}
Debounce: 2s server-side (Cloud Function) or client-side
State: Zustand (typingUsers per chat, onlineUsers)
Cleanup: onDisconnect removes typing status automatically
Performance: min writes — only write on change, not on every keystroke
```

---

### Fase 2.5 — Contrato

```typescript
// Presence (no user doc)
users/{uid} {
  isOnline: boolean
  lastSeen: Timestamp
}

// Typing (subcollection do chat)
chats/{chatId}/typing/{userId} {
  isTyping: boolean
  updatedAt: Timestamp
}
```

```javascript
// Client-side: onDisconnect handler (web sdk equivalent)
// Nota: Firestore web SDK tem onDisconnect, React Native precisa de workaround
// Alternativa: Cloud Function via Realtime Database presence
```

---

### Fase 3 — `/speckit.tasks`

```
## Phase 1: Presence
- [ ] T001 Add presence service (src/services/presenceService.ts)
- [ ] T002 [P] Implement onDisconnect handler for isOnline + lastSeen
- [ ] T003 Subscribe to presence changes per contact

## Phase 2: Typing
- [ ] T004 Create typing subcollection + debounce logic
- [ ] T005 [P] Create typingStore (Zustand) per active chat

## Phase 3: UI
- [ ] T006 [P] Create OnlineStatusDot component
- [ ] T007 [P] Create TypingIndicator component
- [ ] T008 Integrate typing indicator into ChatScreen
- [ ] T009 Update ChatListItem to show online status
**Checkpoint**: Online dot + typing indicator working in real-time
```

---

### Fase 4 — Subagents + Skills

```
[sessão 1] → T002 onDisconnect   ──── service ──┐
[sessão 2] → T005 typingStore    ──── store ────┤── 4 subagents
[sessão 3] → T006 OnlineStatusDot ──── UI ──────┘
[sessão 4] → T007 TypingIndicator ──── UI ──────┘
```

**Skills:** `vercel-react-native-skills` (animações para typing dots), `react-native-best-practices` (evitar re-renders com onSnapshot)

---

## Feature 5: Media Sharing (Image + Voice + Video)

**Limite:** 50 MB por arquivo (validação no frontend e no backend).

---

### Fase 0 — Superpowers Brainstorming

```
Storage: Firebase Storage ou S3?
  → Firebase Storage (já estamos no ecossistema)

Compressão: antes de upload?
  → Sim, expo-image-manipulator para imagens, expo-video-thumbnails para vídeos

Voice: expo-av (recording + playback)?
  → Sim, expo-av para ambos

Video: expo-image-picker suporta vídeo?
  → Sim, configurar mediaTypes: videos + images

Limite de 50 MB: onde validar?
  → Frontend (antes do upload) + Storage Rules (server-side)

Upload progress: barra de progresso?
  → Sim, mostra progresso durante upload

Cancelar upload: permitido?
  → Sim, botão de cancelar enquanto está enviando

Pré-visualização: thumbnail antes de enviar?
  → Sim, imagem mostra preview, vídeo mostra frame inicial

Vídeos: streaming ou download para reproduzir?
  → Download via getDownloadURL + expo-video-player
```

**Skill:** `brainstorming`

---

### Fase 1 — `/speckit.specify`

```
/speckit.specify
Allow users to share images, videos, and voice messages in chats.
Tap the + button to show attachment menu with options: gallery,
camera, video, voice. Gallery picker supports both images and
videos. Max file size is 50 MB per file — show error toast if
exceeded. Show upload progress bar for each file. Compress
images before upload (max 1920px). Generate video thumbnail
automatically for preview. Voice messages: hold to record,
release to send, swipe to cancel. Each media bubble shows a
thumbnail (image/video frame) or audio waveform. Tap image
for full-screen viewer. Tap video to play inline. Auto-download
media on WiFi; download on tap on cellular. Show file size
label below each media message.
```

**Skills auxiliares:**
- `building-native-ui` — ImageBubble, VideoBubble, VoiceMessageBubble, full-screen viewer
- `vercel-react-native-skills` — boas práticas de imagens (expo-image), performance

---

### Fase 2 — `/speckit.plan`

```
/speckit.plan
Storage: Firebase Storage (gs://app-chat.appspot.com)
Max file size: 50 MB (validated client + server)
Images: expo-image-picker + expo-image-manipulator (compress to 1920px)
Video: expo-image-picker (mediaTypes: videos) + expo-video-thumbnails
Voice: expo-av (Audio.Recording + Audio.Sound)
Video playback: expo-video-player or expo-av Video component
Upload: Firebase Storage putFile with onProgress
Download: getDownloadURL → store in Firestore message
Message type: "text" | "image" | "video" | "voice"
Preview: expo-image for fast image display, thumbnail for video
Permissions: camera, microphone, media library
```

---

### Fase 2.5 — Contrato

```typescript
// Estender tipo Message com todos os tipos de mídia
type MediaType = "image" | "video" | "voice"

type Message = {
  senderId: string
  type: "text" | MediaType
  text?: string // optional caption
  mediaUrl?: string
  mediaType?: MediaType // para distinguir entre image/video/voice
  mediaWidth?: number
  mediaHeight?: number
  thumbnailUrl?: string // thumbnail para vídeos
  durationMs?: number // voice ou vídeo
  fileSize: number // em bytes, validado < 50MB
  mimeType: string // ex: image/jpeg, video/mp4, audio/ogg
  createdAt: Timestamp
  status: "sending" | "sent" | "delivered" | "seen"
  uploadProgress?: number // local only, não persistido
}

// Firebase Storage paths
/media/{userId}/{chatId}/{messageId}_image.jpg
/media/{userId}/{chatId}/{messageId}_video.mp4
/media/{userId}/{chatId}/{messageId}_voice.ogg
/media/{userId}/{chatId}/{messageId}_thumbnail.jpg
```

```javascript
// Storage Rules com validação de 50MB
service firebase.storage {
  match /b/{bucket}/o {
    match /media/{userId}/{allPaths=**} {
      allow read: if request.auth != null;

      allow write: if request.auth != null
        && request.auth.uid == userId
        && request.resource.size < 50 * 1024 * 1024; // 50MB limit

      // Validação extra: tipos permitidos
      allow write: if request.auth != null
        && request.auth.uid == userId
        && request.resource.contentType.matches('image/.*')
        || request.resource.contentType.matches('video/.*')
        || request.resource.contentType.matches('audio/.*');
    }
  }
}
```

---

### Fase 3 — `/speckit.tasks`

```
## Phase 1: Storage Service + Validação
- [ ] T001 Create mediaService (upload + download + progress + cancel)
- [ ] T002 Configure Firebase Storage bucket + rules (50MB + mime validation)
- [ ] T003 [P] Add 50MB validation helper (client-side, before upload starts)
- [ ] T004 [P] Add file type whitelist validation (image/*, video/*, audio/*)

## Phase 2: Image
- [ ] T005 [P] Create image picker (gallery + camera) with expo-image-picker
- [ ] T006 [P] Add image compression before upload (expo-image-manipulator, max 1920px)
- [ ] T007 [P] Create ImageMessageBubble component (thumbnail + full-screen)
- [ ] T008 [P] Create MediaPreview modal (preview before send with size label)

## Phase 3: Video
- [ ] T009 [P] Create video picker (gallery + camera recording)
- [ ] T010 [P] Generate video thumbnail (expo-video-thumbnails)
- [ ] T011 [P] Create VideoMessageBubble component (thumbnail + play inline)
- [ ] T012 [P] Create VideoPlayerScreen (full-screen playback with controls)

## Phase 4: Voice
- [ ] T013 [P] Create voice recorder (hold-to-record + swipe-to-cancel)
- [ ] T014 [P] Create VoiceMessageBubble component (play/pause + waveform)
- [ ] T015 Create media attachment menu (+ button → image/video/voice options)

## Phase 5: Integration
- [ ] T016 Integrate media upload flow in ChatScreen (send → validate → upload → message)
- [ ] T017 [P] Add upload progress indicator in message bubble
- [ ] T018 Add file size label below each media message
**Checkpoint**: Send image/video/voice → appears in chat → tap to view/play
```

---

### Fase 4 — Subagents + Skills

```
[sessão 1] → T003 50MB validation     ──── service ──┐
[sessão 2] → T005 image picker         ──── media ───┤
[sessão 3] → T007 ImageBubble          ──── UI ──────┤
[sessão 4] → T009 video picker         ──── media ───┤
[sessão 5] → T010 video thumbnail      ──── media ───┤── 10 subagents
[sessão 6] → T011 VideoBubble          ──── UI ──────┤
[sessão 7] → T012 VideoPlayerScreen    ──── UI ──────┤
[sessão 8] → T013 Voice recorder       ──── media ───┤
[sessão 9] → T014 VoiceBubble          ──── UI ──────┘
[sessão 10] → T017 Progress indicator  ──── UI ──────┘
```

**Skills:**
- `vercel-react-native-skills` → `ui-expo-image.md`, `ui-image-gallery.md` (boas práticas de imagem)
- `building-native-ui` → referências `media.md` (padrões de media)
- `react-native-best-practices` → compressão, cache
- `clean-typescript` → tipos MediaType, Message, validação de arquivo

---

## Feature 6: Read Receipts

---

### Fase 0 — Superpowers Brainstorming

```
Quando marcar como "seen"?
  → Quando a mensagem aparece no FlatList viewport

Ícone: check duplo azul (WhatsApp)?
  → Sim: check único = sent, check duplo = delivered, check duplo azul = seen

Atualizar status individualmente ou batch?
  → Batch: quando abrir chat, marcar todas do outro usuário como seen

Precisa de Cloud Function?
  → Não, Firestore direct write (simples)
```

**Skill:** `brainstorming`

---

### Fase 1 — `/speckit.specify`

```
/speckit.specify
Show message delivery status for each message. A single check
mark appears when the message is sent to the server. Double
check marks when the message is delivered to the recipient's
device. Blue double check marks when the recipient has read
the message. When the user opens a chat, mark all unread
messages from the other participant as "seen". Update the
status indicators in real-time via Firestore listeners. Show
"Seen at 10:30 AM" below the message on long-press info.
```

**Skill auxiliar:** `native-data-fetching` — padrão de atualização eficiente (batch)

---

### Fase 2 — `/speckit.plan`

```
/speckit.plan
Status: message.status field ("sent" | "delivered" | "seen")
Update: on mount of ChatScreen → batch update all unread
Listener: onSnapshot to react to status changes in real-time
UI: StatusIcon component (single check, double, double-blue)
Performance: batch writes, not individual — Firestore transaction
Unread count: chats/{chatId}.unreadCount per user
```

---

### Fase 2.5 — Contrato

```typescript
// Estender Chat
chats/{chatId} {
  unreadCount: {
    [userId]: number
  }
}

// Message (já tem status)
messages/{messageId} {
  status: "sent" | "delivered" | "seen"
  seenAt?: Timestamp
}
```

---

### Fase 3 — `/speckit.tasks`

```
## Phase 1: Service
- [ ] T001 Add markAsSeen function (batch update in ChatScreen)
- [ ] T002 [P] Add delivered status (when message enters recipient's snapshot)

## Phase 2: UI
- [ ] T003 [P] Create MessageStatusIcon component (check marks)
- [ ] T004 Integrate status icon in MessageBubble
- [ ] T005 [P] Add unread count badge in ChatListItem
**Checkpoint**: Sent → delivered → seen flow working end-to-end
```

---

## Feature 7: Grupos

---

### Fase 0 — Superpowers Brainstorming

```
Grupo é uma subclasse de chat ou coleção separada?
  → Mesma coleção "chats", com campo type: "group"

Quem pode criar grupo?
  → Qualquer usuário autenticado

Admin: quem é?
  → O criador do grupo

Máximo de participantes?
  → 100 (Firestore pode mais, mas performance importa)

Sair do grupo: deletar ou remover?
  → Remover do array de participantes
```

---

### Fase 1 — `/speckit.specify`

```
/speckit.specify
Allow users to create groups. Tap "New Group" → select
multiple contacts → set group name and photo → create.
Group chats show group name and member count in header.
Tap group header to see member list. Group creator is
admin. Admin can add or remove members. Any member can
leave the group. When a member leaves, remove them from
participant list. Show "Fulano joined/left" system messages.
Messages work the same as 1:1 chats (text, media, reactions).
```

---

### Fase 2 — `/speckit.plan`

```
/speckit.plan
Model: chat type field ("group" | "direct")
Admin: chat.adminId field (creator UID)
Members: participantIds array + participantDetails map
System messages: special message type "system" (not from a user)
UI: MemberListScreen, GroupInfoScreen
Permissions: only admin can add/remove
Performance: limit member select to 100 contacts
```

---

### Fase 2.5 — Contrato

```typescript
chats/{chatId} {
  type: "group" | "direct"
  name?: string // group name
  photoURL?: string // group photo
  adminId: string // creator UID
  participantIds: string[]
  participantDetails: {
    [uid]: { displayName: string, photoURL: string | null, role: "admin" | "member" }
  }
  createdAt: Timestamp
  updatedAt: Timestamp
}

// System message (type field)
messages/{messageId} {
  type: "text" | "image" | "voice" | "system"
  systemText?: "Fulano joined" | "Fulano left" | "Group renamed"
}
```

---

### Fase 3 — `/speckit.tasks`

```
## Phase 1: Model + Service
- [ ] T001 Add type field to chat model (group | direct)
- [ ] T002 [P] Create createGroup function
- [ ] T003 [P] Create addMember / removeMember functions

## Phase 2: UI
- [ ] T004 [P] Create ContactPickerScreen (multi-select)
- [ ] T005 [P] Create CreateGroupScreen (name + photo + members)
- [ ] T006 [P] Create GroupInfoScreen (member list + admin actions)
- [ ] T007 Add system message rendering in message list
- [ ] T008 Update ChatListScreen to show group name/photo
**Checkpoint**: Create group → invite members → send group messages
```

---

### Fase 4 — Subagents

```
[sessão 1] → T002 createGroup   ──── service ──┐
[sessão 2] → T004 ContactPicker ──── UI ───────┤
[sessão 3] → T005 CreateGroup   ──── UI ───────┤── 4 subagents
[sessão 4] → T006 GroupInfo     ──── UI ───────┘
```

---

## 7. Tabela Resumo: Feature × Skills × Pipeline

| Feature | Brainstorming | Spec Kit | Skills auxiliares | Subagents | Review |
|---------|--------------|----------|------------------|-----------|--------|
| **Firebase Auth** | ✅ | specify → plan → tasks | `zustand`, `clean-typescript`, `jwt-authentication` | 5 | ✅ |
| **Chat 1:1** | ✅ | specify → plan → tasks | `native-data-fetching`, `zustand`, `building-native-ui`, `vercel-react-native-skills`, `react-native-best-practices` | 4 | ✅ |
| **Notificações Push** | ✅ | specify → plan → tasks | — | 4 | ✅ |
| **Online Presence + Typing** | ✅ | specify → plan → tasks | `zustand`, `vercel-react-native-skills` | 4 | ✅ |
| **Media Sharing** (img+video+voice, 50MB) | ✅ | specify → plan → tasks | `building-native-ui`, `vercel-react-native-skills`, `react-native-best-practices`, `clean-typescript` | 10 | ✅ |
| **Read Receipts** | ✅ | specify → plan → tasks | `native-data-fetching` | 2 | ✅ |
| **Grupos** | ✅ | specify → plan → tasks | `clean-typescript` | 4 | ✅ |

---

## 8. Pipeline Visual (Resumo Final)

```
┌─────────────────────────────────────────────────────────────────────┐
│                      SUPERPOWERS BRAINSTORMING                      │
│         ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│         │  Auth  │ │  Chat  │ │ Notif  │ │Presence│ │ Media  │...│
│         └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                      SPEC KIT (por feature)                        │
│    /speckit.specify → clarify → plan → tasks                       │
│                                                                     │
│    Skills auxiliares em cada etapa:                                 │
│    ├── clean-typescript (tipos)                                     │
│    ├── zustand (stores)                                             │
│    ├── building-native-ui (componentes)                             │
│    ├── native-data-fetching (Firestore)                             │
│    ├── vercel-react-native-skills (boas práticas RN)               │
│    └── react-native-best-practices (performance)                   │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│              SUPERPOWERS WRITING-PLANS                              │
│    Plano detalhado por feature                                      │
├─────────────────────────────────────────────────────────────────────┤
│            SUPERPOWERS SUBAGENT-DRIVEN DEV                          │
│    Tarefas [P] rodando em paralelo (2-6 subagents por feature)      │
├─────────────────────────────────────────────────────────────────────┤
│            SUPERPOWERS REQUESTING CODE REVIEW                       │
│    Validar: segurança, performance, aderência à spec                │
├─────────────────────────────────────────────────────────────────────┤
│              SUPERPOWERS // SKILLS DE MANUTENÇÃO                    │
│    ├── expo-deployment      → App Store + Play Store               │
│    ├── expo-cicd-workflows  → EAS Build + Submit                   │
│    └── upgrading-expo       → SDK upgrades futuros                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 9. Nota sobre `isAuth`

> No código atual, `src/app/index.tsx:10` contém `const isAuth = false`.
> A **Feature 1 (Firebase Auth)** substituirá isso por `authStore.isAuthenticated`,
> que sincroniza com `onAuthStateChanged` do Firebase.
>
> Enquanto a Feature 1 não for implementada, o app permanece com `isAuth = false`
> e só acessa as rotas de autenticação.

---

## 10. Firestore Indexes Recomendados

```json
{
  "indexes": [
    {
      "collectionGroup": "messages",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "chatId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "messages",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "chatId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```
