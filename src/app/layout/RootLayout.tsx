import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { ScrollProgress } from './ScrollProgress'
import { ThemeSwitcher } from '@/design-system/theme/ThemeSwitcher'
import { useTheme } from '@/design-system/theme/ThemeProvider'
import { useEffect } from 'react'

export function RootLayout() {
  const { colors } = useTheme()

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-bg', colors.bg)
    root.style.setProperty('--color-surface', colors.surface)
    root.style.setProperty('--color-surface-2', colors.surface2)
    root.style.setProperty('--color-border', colors.border)
    root.style.setProperty('--color-text-primary', colors.textPrimary)
    root.style.setProperty('--color-text-secondary', colors.textSecondary)
    root.style.setProperty('--color-accent', colors.accent)
    root.style.setProperty('--color-accent-light', colors.accentLight)
    root.style.backgroundColor = colors.bg
  }, [colors])

  return (
    <div className="min-h-screen" style={{ background: colors.bg, color: colors.textPrimary }}>
      <ScrollProgress />
      <Sidebar />
      <main className="ml-[240px] min-h-screen transition-all duration-300">
        <div className="fixed right-6 top-4 z-40">
          <ThemeSwitcher />
        </div>
        <Outlet />
      </main>
    </div>
  )
}
