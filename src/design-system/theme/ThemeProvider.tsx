import { create } from 'zustand'

export type ThemeName = 'dark' | 'light' | 'neon' | 'pastel' | 'contrast'

interface ThemeColors {
  bg: string
  surface: string
  surface2: string
  border: string
  textPrimary: string
  textSecondary: string
  accent: string
  accentLight: string
}

const themes: Record<ThemeName, ThemeColors> = {
  dark: {
    bg: '#0a0a0f',
    surface: '#12121a',
    surface2: '#1a1a2e',
    border: '#2a2a3e',
    textPrimary: '#f0f0f5',
    textSecondary: '#8888a0',
    accent: '#6366f1',
    accentLight: '#818cf8',
  },
  light: {
    bg: '#fafafa',
    surface: '#ffffff',
    surface2: '#f5f5f5',
    border: '#e5e5e5',
    textPrimary: '#171717',
    textSecondary: '#737373',
    accent: '#6366f1',
    accentLight: '#818cf8',
  },
  neon: {
    bg: '#050510',
    surface: '#0a0a1a',
    surface2: '#0f0f2a',
    border: '#1a1a4a',
    textPrimary: '#e0e0ff',
    textSecondary: '#7070aa',
    accent: '#00d4ff',
    accentLight: '#44ddff',
  },
  pastel: {
    bg: '#fef7f0',
    surface: '#fff5eb',
    surface2: '#ffedd5',
    border: '#fed7aa',
    textPrimary: '#4a3520',
    textSecondary: '#9a7a5a',
    accent: '#f472b6',
    accentLight: '#f9a8d4',
  },
  contrast: {
    bg: '#000000',
    surface: '#0a0a0a',
    surface2: '#151515',
    border: '#333333',
    textPrimary: '#ffffff',
    textSecondary: '#aaaaaa',
    accent: '#ffff00',
    accentLight: '#ffff44',
  },
}

interface ThemeState {
  theme: ThemeName
  colors: ThemeColors
  setTheme: (theme: ThemeName) => void
}

export const useTheme = create<ThemeState>((set) => ({
  theme: 'light',
  colors: themes.light,
  setTheme: (theme) => set({ theme, colors: themes[theme] }),
}))

export { themes }
