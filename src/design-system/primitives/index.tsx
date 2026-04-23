import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/design-system/tokens'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="mb-12"
    >
      <h2 className="text-4xl font-bold tracking-tight text-gradient">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">{subtitle}</p>
      )}
    </motion.div>
  )
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}

export function NeonBorder({ children, color = 'blue' }: { children: ReactNode; color?: 'blue' | 'pink' | 'green' | 'purple' }) {
  const colorMap = {
    blue: 'var(--color-neon-blue)',
    pink: 'var(--color-neon-pink)',
    green: 'var(--color-neon-green)',
    purple: 'var(--color-neon-purple)',
  }
  return (
    <div
      className="rounded-2xl border p-[1px]"
      style={{ borderColor: colorMap[color] }}
    >
      {children}
    </div>
  )
}
