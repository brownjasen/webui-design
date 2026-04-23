import { useTheme, type ThemeName } from './ThemeProvider'

const themeOptions: { name: ThemeName; label: string; icon: string }[] = [
  { name: 'dark', label: 'Dark', icon: '🌙' },
  { name: 'light', label: 'Light', icon: '☀️' },
  { name: 'neon', label: 'Neon', icon: '⚡' },
  { name: 'pastel', label: 'Pastel', icon: '🌸' },
  { name: 'contrast', label: 'Contrast', icon: '🔲' },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-1 rounded-full bg-[var(--color-surface)] p-1">
      {themeOptions.map((opt) => (
        <button
          key={opt.name}
          onClick={() => setTheme(opt.name)}
          className={`
            flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-300
            ${theme === opt.name
              ? 'bg-[var(--color-accent)] text-white scale-110 shadow-lg'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]'
            }
          `}
          title={opt.label}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  )
}
