const theme = {
  colors: {
    blue: { 500: "#3498db", 600: "#3366ff", 700: "#2952cc", 800: "#032ad7" },
    green: { 700: "#00875F", 500: "#00B37E" },
    gray: { 100: "#F5F5F5", 200: "#DCD", 300: "#bdc3c7", 400: "#999", 500: "#888", 800: "#333" },
    white: "#FFFFFF",
    black: "#000000",
    danger: { 500: "#E74C3C" },
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148,
  },
} as const;

export default theme;
