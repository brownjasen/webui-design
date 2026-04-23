export const colors = {
  bg: '#0a0a0f',
  surface: '#12121a',
  surface2: '#1a1a2e',
  border: '#2a2a3e',
  textPrimary: '#f0f0f5',
  textSecondary: '#8888a0',
  textMuted: '#55556a',
  accent: '#6366f1',
  accentLight: '#818cf8',
  accentDark: '#4f46e5',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  neonBlue: '#00d4ff',
  neonPink: '#ff00aa',
  neonGreen: '#00ff88',
  neonPurple: '#aa00ff',
} as const

export const neonGradients = {
  bluePink: 'linear-gradient(135deg, #00d4ff, #aa00ff, #ff00aa)',
  sunset: 'linear-gradient(135deg, #ff6b35, #f7c948, #ee4266)',
  ocean: 'linear-gradient(135deg, #0ea5e9, #6366f1, #8b5cf6)',
  forest: 'linear-gradient(135deg, #00ff88, #00d4ff, #6366f1)',
  fire: 'linear-gradient(135deg, #ff00aa, #ff6b35, #f59e0b)',
} as const
