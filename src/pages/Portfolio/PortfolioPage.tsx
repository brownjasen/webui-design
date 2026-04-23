import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/design-system/tokens'

/* ─── Section Wrapper ─── */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.section
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    className="mb-20"
  >
    <h2 className="mb-8 text-2xl font-bold text-gradient">{title}</h2>
    {children}
  </motion.section>
)

/* ─── Data ─── */

interface Project {
  id: number
  title: string
  category: string
  gradient: string
  height?: number
}

const minimalProjects: Project[] = [
  { id: 1, title: 'Ethereal Spaces', category: 'Branding', gradient: 'linear-gradient(135deg, #6366f1, #818cf8)' },
  { id: 2, title: 'Neon Wilderness', category: 'Web Design', gradient: 'linear-gradient(135deg, #00d4ff, #6366f1)' },
  { id: 3, title: 'Solar Drift', category: '3D Art', gradient: 'linear-gradient(135deg, #ff00aa, #ff6b6b)' },
]

const creativeProjects: Project[] = [
  { id: 1, title: 'Quantum Fields', category: 'Experimental', gradient: 'linear-gradient(180deg, #6366f1, #4f46e5)' },
  { id: 2, title: 'Liquid Chrome', category: '3D Art', gradient: 'linear-gradient(180deg, #00d4ff, #0891b2)' },
  { id: 3, title: 'Velvet Bloom', category: 'Branding', gradient: 'linear-gradient(180deg, #ff00aa, #db2777)' },
  { id: 4, title: 'Amber Haze', category: 'Photography', gradient: 'linear-gradient(180deg, #f59e0b, #d97706)' },
  { id: 5, title: 'Polar Shift', category: 'Web Design', gradient: 'linear-gradient(180deg, #22c55e, #16a34a)' },
]

const masonryItems: Project[] = [
  { id: 1, title: 'Coral Reef Study', category: 'Branding', gradient: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', height: 180 },
  { id: 2, title: 'Midnight Protocol', category: 'Web', gradient: 'linear-gradient(135deg, #6366f1, #4338ca)', height: 220 },
  { id: 3, title: 'Botanical Index', category: 'Mobile', gradient: 'linear-gradient(135deg, #22c55e, #15803d)', height: 140 },
  { id: 4, title: 'Synthwave Cinema', category: '3D', gradient: 'linear-gradient(135deg, #ff00aa, #be185d)', height: 200 },
  { id: 5, title: 'Arctic Lens', category: 'Photography', gradient: 'linear-gradient(135deg, #00d4ff, #0284c7)', height: 160 },
  { id: 6, title: 'Terracotta Dreams', category: 'Branding', gradient: 'linear-gradient(135deg, #f59e0b, #b45309)', height: 240 },
  { id: 7, title: 'Zen Interface', category: 'Web', gradient: 'linear-gradient(135deg, #818cf8, #6366f1)', height: 130 },
  { id: 8, title: 'Neon Flora', category: 'Mobile', gradient: 'linear-gradient(135deg, #ec4899, #ff00aa)', height: 190 },
  { id: 9, title: 'Obsidian UI Kit', category: 'Web', gradient: 'linear-gradient(135deg, #171717, #404040)', height: 210 },
  { id: 10, title: 'Aurora Borealis', category: '3D', gradient: 'linear-gradient(135deg, #22c55e, #00d4ff)', height: 170 },
]

const categories = ['All', 'Web', 'Mobile', 'Branding', '3D'] as const
type Category = typeof categories[number]

interface FilterProject {
  id: number
  title: string
  category: Category
  gradient: string
}

const filterProjects: FilterProject[] = [
  { id: 1, title: 'Vertex Dashboard', category: 'Web', gradient: 'linear-gradient(135deg, #6366f1, #818cf8)' },
  { id: 2, title: 'Pulse Fitness', category: 'Mobile', gradient: 'linear-gradient(135deg, #ff00aa, #ec4899)' },
  { id: 3, title: 'Ember Studios', category: 'Branding', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
  { id: 4, title: 'Crystal Renderer', category: '3D', gradient: 'linear-gradient(135deg, #00d4ff, #06b6d4)' },
  { id: 5, title: 'Lumen Landing', category: 'Web', gradient: 'linear-gradient(135deg, #22c55e, #4ade80)' },
  { id: 6, title: 'Nomad Travel App', category: 'Mobile', gradient: 'linear-gradient(135deg, #818cf8, #a78bfa)' },
  { id: 7, title: 'Forge Identity', category: 'Branding', gradient: 'linear-gradient(135deg, #ef4444, #f97316)' },
  { id: 8, title: 'Holographic Sphere', category: '3D', gradient: 'linear-gradient(135deg, #ff00aa, #6366f1)' },
]

/* ─── Section 1: Minimal Portfolio ─── */

const MinimalCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <motion.div
    variants={fadeInUp}
    custom={index}
    whileHover={{ scale: 1.03, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12)' }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
  >
    <div
      className="h-64 w-full transition-transform duration-500 group-hover:scale-105"
      style={{ background: project.gradient }}
    />
    <div className="p-6">
      <span className="mb-2 inline-block rounded-full bg-[var(--color-surface-2)] px-3 py-1 text-xs font-medium tracking-wide text-[var(--color-text-secondary)]">
        {project.category}
      </span>
      <h3 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">{project.title}</h3>
    </div>
  </motion.div>
)

/* ─── Section 2: Creative Grid (Horizontal Scroll) ─── */

const HorizontalScrollCard: React.FC<{ project: Project }> = ({ project }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    className="relative flex-shrink-0 overflow-hidden rounded-2xl"
    style={{ width: 300, height: 400 }}
  >
    <div className="absolute inset-0" style={{ background: project.gradient }} />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {project.category}
      </span>
      <h3 className="mt-2 text-xl font-bold text-white">{project.title}</h3>
    </div>
  </motion.div>
)

/* ─── Section 3: Masonry Grid ─── */

const MasonryItem: React.FC<{ item: Project }> = ({ item }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -6, boxShadow: '0 16px 32px -8px rgba(0,0,0,0.1)' }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
    style={{ minHeight: item.height ?? 160 }}
  >
    <div
      className="mb-4 w-full rounded-lg"
      style={{ background: item.gradient, height: (item.height ?? 160) * 0.55 }}
    />
    <span className="mb-1 inline-block rounded-full bg-[var(--color-surface-2)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
      {item.category}
    </span>
    <h3 className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">{item.title}</h3>
  </motion.div>
)

/* ─── Section 4: Filter + Grid ─── */

const FilterCard: React.FC<{ project: FilterProject }> = ({ project }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    whileHover={{ y: -4, boxShadow: '0 12px 28px -6px rgba(0,0,0,0.1)' }}
    className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
  >
    <div className="h-40 w-full" style={{ background: project.gradient }} />
    <div className="p-4">
      <span className="mb-1 inline-block rounded-full bg-[var(--color-surface-2)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        {project.category}
      </span>
      <h3 className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">{project.title}</h3>
    </div>
  </motion.div>
)

/* ─── Page ─── */

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')

  const filteredItems = activeFilter === 'All'
    ? filterProjects
    : filterProjects.filter((p) => p.category === activeFilter)

  return (
    <div className="mx-auto max-w-7xl px-6 py-16" style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* ─── Page Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="mb-20 text-center"
      >
        <h1 className="text-5xl font-bold text-gradient">Portfolio Showcase</h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--color-text-secondary)]">
          Four distinct layout patterns for presenting creative work &mdash; from clean minimalism to dynamic filtering.
        </p>
      </motion.div>

      {/* ─── Section 1: Minimal Portfolio ─── */}
      <Section title="Minimal Portfolio">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {minimalProjects.map((project, i) => (
            <MinimalCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </Section>

      {/* ─── Section 2: Creative Grid (Horizontal Scroll) ─── */}
      <Section title="Creative Grid Portfolio">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="overflow-x-auto pb-4"
          style={{
            display: 'flex',
            gap: 20,
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {creativeProjects.map((project) => (
            <div key={project.id} style={{ scrollSnapAlign: 'start' }}>
              <HorizontalScrollCard project={project} />
            </div>
          ))}
        </motion.div>
      </Section>

      {/* ─── Section 3: Masonry Grid ─── */}
      <Section title="Masonry Grid">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="columns-2 gap-4 md:columns-3"
        >
          {masonryItems.map((item) => (
            <MasonryItem key={item.id} item={item} />
          ))}
        </motion.div>
      </Section>

      {/* ─── Section 4: Filter + Grid ─── */}
      <Section title="Filter &amp; Grid">
        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeFilter === cat
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full px-5 py-2 text-sm font-medium transition-colors"
                style={{
                  background: isActive ? 'var(--color-accent)' : 'var(--color-surface)',
                  color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
                  border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                }}
              >
                {cat}
              </motion.button>
            )
          })}
        </div>

        {/* Filtered Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project) => (
              <FilterCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </div>
  )
}
