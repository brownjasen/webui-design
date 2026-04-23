import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { ScrollProgress } from './ScrollProgress'
import { ThemeSwitcher } from '@/design-system/theme/ThemeSwitcher'
import { useTheme } from '@/design-system/theme/ThemeProvider'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home, Type, Sparkles, LayoutGrid, Box,
} from 'lucide-react'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/typography', label: 'Type', icon: Type },
  { path: '/animations', label: 'Anim', icon: Sparkles },
  { path: '/layouts', label: 'Grid', icon: LayoutGrid },
  { path: '/3d', label: '3D', icon: Box },
]

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-surface)] md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] transition-colors ${
                isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export function RootLayout() {
  const { colors } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: colors.bg, color: colors.textPrimary }}>
      <ScrollProgress />
      {/* Desktop: sidebar | Mobile: hidden */}
      {!isMobile && <Sidebar />}
      <main className={`min-h-screen transition-all duration-300 pb-20 md:pb-0 ${isMobile ? '' : 'ml-[240px]'}`}>
        <div className="fixed right-4 top-3 z-40 md:right-6 md:top-4">
          <ThemeSwitcher />
        </div>
        <Outlet />
      </main>
      {/* Mobile bottom nav */}
      <MobileBottomNav />
    </div>
  )
}
