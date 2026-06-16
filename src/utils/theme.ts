const theme = {
  colors: {
    teal: {
      100: "#a8f0e3", // primary-fixed
      200: "#8cd4c7", // primary-fixed-dim / inverse-primary
      300: "#8dd5c8", // on-primary-container
      400: "#1c695f", // surface-tint
      500: "#075e54", // primary-container
      600: "#005047", // on-primary-fixed-variant
      700: "#00453d", // primary
      800: "#00201c", // on-primary-fixed
    },
    green: {
      50: "#dcf8c6",  // outgoing message bubble
      100: "#66ff8e", // tertiary-fixed
      200: "#3de273", // tertiary-fixed-dim
      300: "#3fe374", // on-tertiary-container
      400: "#8cf1e1", // secondary-container
      450: "#72d8c8", // secondary-fixed-dim
      500: "#00B37E", // success / existing
      600: "#006f64", // on-secondary-container
      700: "#00875F", // existing
      800: "#006129", // tertiary-container
      900: "#006b5f", // secondary
      950: "#00471c", // tertiary
    },
    blue: {
      500: "#34B7F1",
      600: "#3366ff",
      700: "#2952cc",
      800: "#032ad7",
    },
    gray: {
      50: "#ffffff", // surface-container-lowest
      100: "#f7f9fc", // surface / background
      150: "#d8dadd", // surface-dim
      200: "#f2f4f7", // surface-container-low
      300: "#eceef1", // surface-container
      400: "#e6e8eb", // surface-container-high
      500: "#e0e3e6", // surface-container-highest / surface-variant
      600: "#bec9c5", // outline-variant
      700: "#6f7976", // outline
      800: "#3f4946", // on-surface-variant
      900: "#191c1e", // on-surface / on-background
    },
    whatsapp: "#25D366",
    white: "#FFFFFF",
    black: "#000000",
    danger: {
      100: "#ffdad6", // error-container
      200: "#93000a", // on-error-container
      500: "#E74C3C",
      700: "#ba1a1a", // error
    },
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  spacing: {
    unit: 4,
    edge: 16,
    gutter: 12,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  sizes: {
    avatar: 56,
    avatarSm: 40,
    buttonHeight: 48,
    inputHeight: 48,
    chatInputHeight: 42,
    iconButton: 40,
    tabBar: 20,
    chatItem: 72,
    fab: 56,

    14: 56,
    33: 148,
  },
} as const;

export type Theme = typeof theme;

export default theme;
