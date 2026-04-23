import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Home, Type, Sparkles, LayoutGrid, Box, MousePointer,
  Palette, BarChart3, ShoppingBag, Briefcase, Gamepad2,
  Smartphone, Wand2, ChevronLeft, ChevronRight,
} from 'lucide-react'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/typography', label: 'Typography', icon: Type },
  { path: '/animations', label: 'Animations', icon: Sparkles },
  { path: '/layouts', label: 'Layouts', icon: LayoutGrid },
  { path: '/3d', label: '3D & WebGL', icon: Box },
  { path: '/interactive', label: 'Interactive', icon: MousePointer },
  { path: '/colors', label: 'Colors', icon: Palette },
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { path: '/ecommerce', label: 'E-commerce', icon: ShoppingBag },
  { path: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { path: '/games', label: 'Games', icon: Gamepad2 },
  { path: '/mobile', label: 'Mobile UI', icon: Smartphone },
  { path: '/generative', label: 'Generative Art', icon: Wand2 },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="flex h-14 items-center justify-between px-4">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-bold text-gradient whitespace-nowrap"
            >
              WebUI.Design
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                group relative mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent-light)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]'
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-xl bg-[var(--color-accent)]/15"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon size={18} className="relative z-10 shrink-0" />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="relative z-10 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-[var(--color-border)] p-3">
        <div className="text-center text-xs text-[var(--color-text-muted)]">
          {collapsed ? 'v1' : 'v1.0.0 · Showcase'}
        </div>
      </div>
    </motion.aside>
  )
}
