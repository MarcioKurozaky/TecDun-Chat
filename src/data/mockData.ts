export type ChatItem = {
  id: string;
  name: string;
  avatarUrl: string | null;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isGroup?: boolean;
  hasAttach?: boolean;
  isDelivered?: boolean;
  isRead?: boolean;
  isArchived?: boolean;
};

export const chats: ChatItem[] = [
  {
    id: "1",
    name: "Anderson ",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7P3uvpZ_taY-sV2_QI7KaYGaSZVCXDGqb3qbyv36ft-qkyDV59lotJApTZbs9gGGneGgmgj-EwSui8ADNWj4WjoGPrhpaCbMqoLZBbZWmQHhtgSDd-vfvwZua0-NsQ8Wf7yjS5BZRr8oJ88pz5V7rewEQvWbAgmbwAWvsSjke-rjsXUi46YDs_STsvwcQ8B9AUH7QREKEUy7ilpLgEWmLjVBoYTKJKobjWFpIBBBJewSEGQEDfJo85IRtWy5zBv_YWR9pWnKb35Q",
    lastMessage: "Tudo bem? Vamos marcar aquele café!",
    timestamp: "14:20",
    isDelivered: true,
    isRead: true,
  },
  {
    id: "2",
    name: "Maria Santos",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtie4YC2IMVJEOQYihjkoscrqi3r2O2kosrF5Lwlhr7nhJQw5D2MNrOhuy7YNxZXDtDg35TQfZeBZ-wg3I_-XzFOalHMSnaACflOJkIY9XxO1R-mnmRh1ujSy9fpVUXx634pDhFdJy7vSm-xCQ5W7JC1j3E2d3yX0CVXZRawNEwWuWBblI_WEN9zW7LhwBQQPAhXglrrNMep9nw-OaTSerMTfLuGeeUEnYUPqasCk9L_EiUlA2V9fX-0kbeK1MR0L_spC1hCF4M20",
    lastMessage: "Amanhã nos vemos na reunião.",
    timestamp: "12:05",
    unreadCount: 2,
    isDelivered: true,
    isRead: false,
  },
  {
    id: "3",
    name: "Grupo de Trabalho",
    avatarUrl: null,
    lastMessage: "Arquivo enviado por Ricardo",
    timestamp: "Ontem",
    isGroup: true,
    hasAttach: true,
    isDelivered: true,
    isRead: true,
  },
  {
    id: "4",
    name: "Carlos Mendes",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-V5Ef_dpG9u3AzYVXk1bfblHQaPoSuEbrGoVRRZBBGlOTvTuOF8_ZbRFHEZ8frjDrIiBScLV_GIcU_UNdGps1kRcobaBMi2qn9KOgythIp2kACYsnQefXBXpzuW1PyGak35GyKsEBjbSz6qTrL8_nmidP217OJVGBt7P-rKlyEs9_Yqkjb8OSVEsAa8n-fXgQEqthpOsj2Zi7skYV_pVeHPGgleoU9VTSXss-nmjNhI12oMfLQgsM7WbedoaCL9Q_s8xKGHTYoQI",
    lastMessage: "O relatório ficou excelente!",
    timestamp: "Ontem",
    isDelivered: true,
    isRead: true,
  },
  {
    id: "5",
    name: "Ana Paula",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDs949_dkp9rr-yK2QmabOjs2gHnmAWAZ3Ox6VIJvFrC4Q5svZhhB2KYh4jmNuAIaR6bboF3oLZi4a18_ZrJ-2pEHtNgoa7XyUaR9YfKyRh0iRZEwVVo4DMeoACbtLU2QDEX-CYE53gL3dHvrJt-25YSLo84TbIGBcQ98Y1vs06qZBjpf-9rqtTEeeDNKRCN1fVmUSdX5G3uFBKRBE2N2YSJhkUhRSTjk-lvAZ4zvzihJMoMkA8LUuy88nHT11PTZoGz0FX-5CWhwo",
    lastMessage: "Você viu as fotos que mandei?",
    timestamp: "18/05/24",
    unreadCount: 5,
    isDelivered: true,
    isRead: false,
  },
];

export type StatusItem = {
  id: string;
  name: string;
  avatarUrl: string | null;
  timestamp: string;
  isViewed?: boolean;
};

export const currentUser = {
  name: "Meu status",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDlENK-nQSdx1Sy2MAeI0Z45ju2rbaS-PQXimbZGIzEn8CUJBAcbTyJoKRFTufgRyeIbseC8yh8gbZLog7cUBXt9QSFUWqr6e5FL6cnDN2A_QXnIKsPlnjVVtRDmvKrBlnupcPZwO6yw9fICtjB77Vrqz1VzDvV7Z3GT2Y14kf4vAhNcTaSXlb1iwy2Kpupa-7QegBSwT3x9fDQbsPDoNRp1erY1JoqcYBdhFdJgKLmEP0nbFj3nb_t6I2VAIqTFBMWpdTWsHtOmGE",
};

export type CallDirection = "incoming" | "outgoing" | "missed";
export type CallType = "audio" | "video";

export type CallItem = {
  id: string;
  name: string;
  avatarUrl: string | null;
  timestamp: string;
  direction: CallDirection;
  callType: CallType;
  callCount?: number;
};

export const calls: CallItem[] = [
  {
    id: "1",
    name: "Julian Rossi",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLHc576Ai1vKtlUuV__6pVXzYG9VjfnyI01KnydkSwWxLDh7hzPetbgR9cW550IXD3Mxwv-Rom_ciTqi7TN47qFu8FpUyxtgzkrdWoGtWQX1VRwwBXEzIh1kT65YMJgkKHPUF8aXu8N7ZXM1N-VmuGWGohynRM98-BJ8zVayTCikMRfR5DfPi66wwGVxG5wvTEF36NTkSVs9B-LSwGPCt2hkWUYxTWEHzU6uY_R1I3QAlCkBAe_4zdOLgFNnYxe1FqxXpiknBCihU",
    timestamp: "October 12, 10:45 AM",
    direction: "missed",
    callType: "audio",
  },
  {
    id: "2",
    name: "Elena Wright",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBon3yxfWkKtzoqAuMmnnnBw0pveuD-KdUsR-NmKcLuDrWUDzROu-lOmoSVfnPenolJvIgImS9ho00zDnruJpTFUP6jJXft3towP60P9GkM4q138a0lxCFwMhxb1C_FUAMuhFMKNRoJFKEOIbGsR2uWg3yxm--ZvLSAW2auQ3IeTdmZYeO_naUpJvMpN10oxFITFGXBbXNPz7IiOQ04w5LxZjcPGENdgH1cFSihyCqAKJPpcibCRykQ0welmxNlcXBy_iM6UG-6xLk",
    timestamp: "Yesterday, 8:22 PM",
    direction: "outgoing",
    callType: "video",
  },
  {
    id: "3",
    name: "Michael Chen",
    avatarUrl: null,
    timestamp: "Yesterday, 2:15 PM",
    direction: "incoming",
    callType: "audio",
  },
  {
    id: "4",
    name: "Sarah Jenkins",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw1e8GSHPvbSwbSLBkbwwfjugjMfvijathCxCwGa4H_e1iRR3xtFcmuVFk6INNMDTOb2ZhH7yKyr-5EcbOQkmsuf6GzxGHKPwP9m35cTE1h-vs3R7ZvquKu_RrEjlNa_Ldu3bQoXQKCuTfuCzIBK1-27M30He4kzrK867RlNzeodiBaJDwT3u95WYZEUUkJ-FTx_PWh9ePYvstVoYRDrbnUdoM0zDzy8Dg6EudsY5u22EfAl29uKQLd3u1SdzuUD5Zp5HVAmnC3iU",
    timestamp: "October 10, 6:30 PM",
    direction: "missed",
    callType: "audio",
  },
  {
    id: "5",
    name: "David Miller",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvANR9SqwzQb-YtNXAc8Hq4wMlZTL0oct3uhPpCozYdNk_z1UqzRPjDMOXqxYluEZJrKwLeyN8kiBUFnm8C6-fca-niP7VTEMvi5ti5taPong1g0gADwKD2yGOsecBOcHDsaqO0FIPzntofkXm6_Ty0NDkq-islFOQx0JAWPDStNhiA_FyFUHDqeV01RJnBzb0Swc_XPREqZXuh5a74RutTCcXe5inUCQH7PslUdPWzoDe4eTLJetrrFA37hJnTMJJT4Dk0lAPezo",
    timestamp: "October 09, 11:20 AM",
    direction: "outgoing",
    callType: "video",
    callCount: 2,
  },
];

export type MessageType = "incoming" | "outgoing";

export type MessageItem = {
  id: string;
  text: string;
  timestamp: string;
  type: MessageType;
  isRead?: boolean;
  dateLabel: string;
};

export const messages: MessageItem[] = [
  {
    id: "m1",
    text: "Oi! Tudo bem?",
    timestamp: "15:01",
    type: "incoming",
    dateLabel: "Hoje",
  },
  {
    id: "m2",
    text: "Tudo ótimo, e com você?",
    timestamp: "15:02",
    type: "outgoing",
    isRead: true,
    dateLabel: "Hoje",
  },
  {
    id: "m3",
    text: "Vamos marcar aquele café amanhã?",
    timestamp: "15:03",
    type: "incoming",
    dateLabel: "Hoje",
  },
  {
    id: "m4",
    text: "Claro! Que horas você prefere?",
    timestamp: "15:05",
    type: "outgoing",
    isRead: false,
    dateLabel: "Hoje",
  },
  {
    id: "m5",
    text: "Pode ser às 10h?",
    timestamp: "15:06",
    type: "incoming",
    dateLabel: "Hoje",
  },
  {
    id: "m6",
    text: "Perfeito! Te vejo lá.",
    timestamp: "15:08",
    type: "outgoing",
    isRead: true,
    dateLabel: "Hoje",
  },
  {
    id: "m7",
    text: "O relatório ficou excelente!",
    timestamp: "22:30",
    type: "incoming",
    dateLabel: "Ontem",
  },
  {
    id: "m8",
    text: "Obrigado! Fizemos um bom trabalho em equipe.",
    timestamp: "22:45",
    type: "outgoing",
    isRead: true,
    dateLabel: "Ontem",
  },
];

export const statusList: StatusItem[] = [
  {
    id: "1",
    name: "Ana Beatriz",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-k3uzWTY7tUar_uF-9CAzH_JUKwfOHX1hXUL6JpZOP1MP5wHaX2p6Pb5tPUyYhRX7iZg65dVvyRP6iaox93BYjwfx1_gOH5rLHyi1uZDMd2rW4SvGgCZmhciOhsDxDgaok-8mLy_r1fz5Xh4eGU_Skk1ASG7pdvD4jOTT3y6nZcCpPmGAoYGlUzdC51K9atGLr_GXAqYz8TflPBhYCPySui1G_Z8dILAA2L6OpBJBJYJoCNygWR4KHz0jByjbt3s93wHJ-IP_vgE",
    timestamp: "Há 15 minutos",
  },
  {
    id: "2",
    name: "Carlos Eduardo",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbmfcmHy82B9L-6AeeiahFabTAkeSrOgeOTApwRHkt_thpM7BeWG7gAFq8DPnuKESUcjmZgu9Ghpa1KUUcPgFr57d_2faqkzzZ9xpc2vnk3pEoDfz6oMh3bDC5VMfhzlAiO2MkkAo-2kRme-RSP8o75rnnEMKyPcABnfBRFvgPg8bj9_M5M3djbN_I966xRb5zlfRU0o2BzvYUcr14o44uts8EOkCvCzgyNmWr0joKlH9jPXH-5Gb7LHPL1zqwQc7yMoYcV2CWNiI",
    timestamp: "Hoje 10:45",
  },
  {
    id: "3",
    name: "Juliana Silva",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATxDuPa9Fg1bYwGEnRgw1lPIoWzxFdKBPpE_2zbLfMmgCA5-buR3vyACfMMKDjhCqkrT_-i_PQpSzzNKBklKXk__ms4HXWiiFP3ogki41pWGW1OQXo0w-MIbabgTVXGQWiOkVlUqd9ESRFpGRPi23znLfXQ0XPMvBCuqf9SI3ScjNEeGlJhHH_eEy2LQFZoUB_fWHu6SFtK9GbOanV4enxr2oq71dXRbZoisvN0GIPtidF9LXrKXkYNflSOC-rgK4A0IXLVtl6vZM",
    timestamp: "Ontem 22:15",
  },
  {
    id: "4",
    name: "Ricardo Souza",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDA7KShG8oHP9N4-1Hc3GnUyuDkGp52epKo3906c1_7eeQ_C4muimsC5gIogX6ev-ubOwhT3xJoz4HGg17sNc0atQ7FRbxIrZM0gKKkmeUDbVgdfvle2Oz0Rjl2g8sHcInEgHC0wVySmM4La27fWb4UlKuX8H3awA1yxM3X8wQJY3ba2wOkBAxq5HhI_Pc1aeET56Pj9kl6_t7TKTUGL9SWQdnSGVXjMbHatgQWgEoOCnfAok_pMuBID4QLdaxmAJX6kujEDFT6GU",
    timestamp: "Ontem 18:30",
    isViewed: true,
  },
];
