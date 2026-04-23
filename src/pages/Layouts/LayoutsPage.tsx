import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/design-system/tokens'

/* ───────────────────────────── helpers ───────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      variants={fadeInUp}
      className="text-gradient mb-10 font-display text-3xl font-bold tracking-tight"
    >
      {children}
    </motion.h2>
  )
}

function GlassCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`glass rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 inline-block font-mono text-xs tracking-wider text-[var(--color-text-muted)] uppercase">
      {children}
    </span>
  )
}

/* ───────────────────────── CSS keyframes (injected once) ───────────────────────── */

const globalKeyframes = `
@keyframes masonry-lift {
  0% { transform: translateY(0); }
  100% { transform: translateY(-6px); }
}
@keyframes dot-float {
  0%,100% { transform: translateY(0) scale(1); opacity:.6; }
  50% { transform: translateY(-8px) scale(1.3); opacity:1; }
}
@keyframes progress-spin {
  to { --progress: 360deg; }
}
`

/* ════════════════════════════════════════════════════════════════════
   SECTION 1 — CSS Grid Art
   ════════════════════════════════════════════════════════════════════ */

function CSSGridArt() {
  return (
    <section>
      <SectionTitle>CSS Grid Art</SectionTitle>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-8 lg:grid-cols-3"
      >
        {/* ── Asymmetric Grid ── */}
        <GlassCard>
          <CardLabel>Asymmetric Grid</CardLabel>
          <div
            className="grid auto-rows-[48px] gap-2"
            style={{
              gridTemplateColumns: 'repeat(4, 1fr)',
            }}
          >
            {[
              { cs: '1/3', rs: '1/3', bg: 'var(--color-accent)', label: 'Hero' },
              { cs: '3/5', rs: '1/2', bg: 'var(--color-neon-blue)', label: 'Card A' },
              { cs: '3/4', rs: '2/4', bg: 'var(--color-neon-purple)', label: 'Tall' },
              { cs: '4/5', rs: '2/3', bg: 'var(--color-neon-green)', label: 'B' },
              { cs: '1/2', rs: '3/5', bg: 'var(--color-neon-pink)', label: 'Sidebar' },
              { cs: '2/3', rs: '3/4', bg: 'var(--color-neon-blue)', label: 'C' },
              { cs: '2/4', rs: '4/5', bg: 'var(--color-accent-light)', label: 'Wide' },
              { cs: '4/5', rs: '3/5', bg: 'var(--color-accent)', label: 'End' },
            ].map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-lg font-mono text-[10px] text-white/80"
                style={{
                  gridColumn: c.cs,
                  gridRow: c.rs,
                  background: c.bg,
                  opacity: 0.75,
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* ── Magazine Layout ── */}
        <GlassCard>
          <CardLabel>Magazine Layout</CardLabel>
          <div
            className="grid auto-rows-[36px] gap-[3px]"
            style={{
              gridTemplateColumns: 'repeat(6, 1fr)',
            }}
          >
            {/* Hero */}
            <div
              className="col-span-4 row-span-4 flex flex-col justify-end rounded-lg p-2"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-accent-dark), var(--color-neon-blue))',
              }}
            >
              <span className="text-[10px] font-bold text-white/90">Featured Story</span>
              <span className="mt-0.5 text-[8px] text-white/60 line-clamp-2">
                How layout transforms raw content into visual storytelling
              </span>
            </div>
            {/* Sidebar cells */}
            {[
              { cs: '5/7', rs: '1/3', bg: 'var(--color-surface-2)', border: true, t: 'Editorial' },
              { cs: '5/7', rs: '3/5', bg: 'var(--color-surface-2)', border: true, t: 'Trending' },
              { cs: '1/3', rs: '5/7', bg: 'var(--color-surface-2)', border: true, t: 'Politics' },
              { cs: '3/5', rs: '5/7', bg: 'var(--color-surface-2)', border: true, t: 'Culture' },
              { cs: '5/7', rs: '5/7', bg: 'var(--color-surface-2)', border: true, t: 'Tech' },
            ].map((c, i) => (
              <div
                key={i}
                className={`flex items-center justify-center rounded-lg font-mono text-[9px] text-[var(--color-text-secondary)] ${c.border ? 'border border-[var(--color-border)]' : ''}`}
                style={{
                  gridColumn: c.cs,
                  gridRow: c.rs,
                  background: c.bg,
                }}
              >
                {c.t}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* ── Dashboard Grid ── */}
        <GlassCard>
          <CardLabel>Dashboard Grid</CardLabel>
          <div
            className="grid auto-rows-[28px] gap-[3px]"
            style={{
              gridTemplateColumns: 'repeat(6, 1fr)',
            }}
          >
            {/* Header */}
            <div
              className="col-span-6 flex items-center rounded-lg px-2 font-mono text-[9px] text-white/70"
              style={{ background: 'var(--color-accent)', opacity: 0.6 }}
            >
              Header
            </div>
            {/* Sidebar */}
            <div
              className="row-span-4 flex flex-col gap-1 rounded-lg p-1"
              style={{
                gridColumn: '1/2',
                gridRow: '2/6',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
              }}
            >
              {['Nav', 'Dash', 'Stats', 'Set'].map((l) => (
                <div key={l} className="rounded bg-[var(--color-border)] px-1 py-0.5 text-center font-mono text-[7px] text-[var(--color-text-muted)]">
                  {l}
                </div>
              ))}
            </div>
            {/* Widgets */}
            <div className="col-span-3 row-span-2 flex items-center justify-center rounded-lg font-mono text-[9px] text-[var(--color-neon-blue)]" style={{ gridColumn: '2/5', gridRow: '2/4', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              Chart Area
            </div>
            <div className="flex items-center justify-center rounded-lg font-mono text-[9px] text-[var(--color-neon-green)]" style={{ gridColumn: '5/7', gridRow: '2/3', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              KPI
            </div>
            <div className="flex items-center justify-center rounded-lg font-mono text-[9px] text-[var(--color-neon-purple)]" style={{ gridColumn: '5/7', gridRow: '3/4', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              Users
            </div>
            <div className="flex items-center justify-center rounded-lg font-mono text-[9px] text-[var(--color-text-muted)]" style={{ gridColumn: '2/4', gridRow: '4/5', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              Table
            </div>
            <div className="flex items-center justify-center rounded-lg font-mono text-[9px] text-[var(--color-text-muted)]" style={{ gridColumn: '4/7', gridRow: '4/5', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              Activity
            </div>
            <div className="col-span-6 flex items-center rounded-lg px-2 font-mono text-[9px] text-[var(--color-text-muted)]" style={{ gridRow: '5/6', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              Footer
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 2 — Bento Grid
   ════════════════════════════════════════════════════════════════════ */

function BentoGrid() {
  return (
    <section>
      <SectionTitle>Bento Grid</SectionTitle>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid auto-rows-[160px] gap-4"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {/* Big stat — col 1-2 row 1-2 */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(99,102,241,.18)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="col-span-2 row-span-2 flex flex-col items-center justify-center rounded-3xl border border-[var(--color-border)]"
          style={{ background: 'var(--color-surface)' }}
        >
          <span className="font-mono text-6xl font-bold text-gradient">99.9%</span>
          <span className="mt-2 font-mono text-sm text-[var(--color-text-muted)]">Uptime</span>
        </motion.div>

        {/* Mini bar chart — col 3-4 row 1 */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,212,255,.15)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="col-span-2 flex flex-col justify-end rounded-3xl border border-[var(--color-border)] p-4"
          style={{ background: 'var(--color-surface)' }}
        >
          <span className="mb-2 font-mono text-[10px] tracking-wider text-[var(--color-text-muted)] uppercase">
            Revenue
          </span>
          <div className="flex items-end gap-1.5" style={{ height: 60 }}>
            {[40, 70, 55, 90, 65, 80, 95, 60, 85, 50, 75, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(to top, var(--color-accent), var(--color-neon-blue))`,
                  opacity: 0.6 + (i / 12) * 0.4,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Gradient + text — col 3 row 2 */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex flex-col items-center justify-center rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, var(--color-neon-purple), var(--color-neon-pink))',
          }}
        >
          <span className="font-display text-lg font-bold text-white">Ship Fast</span>
          <span className="mt-1 font-mono text-[10px] text-white/70">Zero downtime deploys</span>
        </motion.div>

        {/* Icon + label — col 4 row 2 */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-[var(--color-border)]"
          style={{ background: 'var(--color-surface)' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-neon-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span className="font-mono text-xs text-[var(--color-text-secondary)]">Layers</span>
        </motion.div>

        {/* Circular progress — col 1 row 3 */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex flex-col items-center justify-center rounded-3xl border border-[var(--color-border)]"
          style={{ background: 'var(--color-surface)' }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: `conic-gradient(var(--color-neon-green) 0deg, var(--color-neon-green) 266deg, var(--color-border) 266deg)`,
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--color-surface)',
              }}
            >
              <span className="font-mono text-sm font-bold text-[var(--color-neon-green)]">74%</span>
            </div>
          </div>
          <span className="mt-2 font-mono text-[10px] text-[var(--color-text-muted)]">Progress</span>
        </motion.div>

        {/* Animated dots — col 2 row 3 */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-[var(--color-border)]"
          style={{ background: 'var(--color-surface)' }}
        >
          <span className="mb-2 font-mono text-[10px] text-[var(--color-text-muted)]">Activity</span>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--color-accent-light)',
                  animation: `dot-float 1.4s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Wide card — col 3-4 row 3 */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="col-span-2 flex items-center justify-between rounded-3xl border border-[var(--color-border)] px-6"
          style={{ background: 'var(--color-surface)' }}
        >
          <div>
            <span className="font-display text-lg font-bold text-[var(--color-text-primary)]">2,847</span>
            <span className="ml-2 font-mono text-xs text-[var(--color-text-muted)]">Requests / sec</span>
          </div>
          <div className="flex gap-0.5">
            {[80, 60, 90, 70, 85, 55, 95].map((h, i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{
                  width: 4,
                  height: h * 0.5,
                  background: 'var(--color-neon-blue)',
                  opacity: 0.4 + i * 0.08,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 3 — Flexbox Patterns
   ════════════════════════════════════════════════════════════════════ */

function FlexboxPatterns() {
  return (
    <section>
      <SectionTitle>Flexbox Patterns</SectionTitle>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {/* ── Holy Grail ── */}
        <GlassCard>
          <CardLabel>Holy Grail</CardLabel>
          <div className="flex flex-col gap-[2px]" style={{ height: 160 }}>
            <div className="rounded bg-[var(--color-accent)] px-2 py-1 text-center font-mono text-[9px] text-white/70">Header</div>
            <div className="flex flex-1 gap-[2px]">
              <div className="w-10 rounded bg-[var(--color-neon-blue)] p-1 text-center font-mono text-[7px] text-white/60" style={{ opacity: 0.5 }}>Nav</div>
              <div className="flex-1 rounded bg-[var(--color-surface-2)] border border-[var(--color-border)] p-1 text-center font-mono text-[8px] text-[var(--color-text-muted)]">Main</div>
              <div className="w-10 rounded bg-[var(--color-neon-purple)] p-1 text-center font-mono text-[7px] text-white/60" style={{ opacity: 0.5 }}>Side</div>
            </div>
            <div className="rounded bg-[var(--color-accent)] px-2 py-1 text-center font-mono text-[9px] text-white/70">Footer</div>
          </div>
        </GlassCard>

        {/* ── Card Row ── */}
        <GlassCard>
          <CardLabel>Card Row</CardLabel>
          <div className="flex gap-2">
            {['Alpha', 'Beta', 'Gamma'].map((name, i) => (
              <div
                key={name}
                className="flex flex-1 flex-col items-center justify-center rounded-lg border border-[var(--color-border)] p-3"
                style={{
                  background: 'var(--color-surface-2)',
                }}
              >
                <div
                  className="mb-2 rounded-full"
                  style={{
                    width: 24,
                    height: 24,
                    background: [
                      'var(--color-neon-blue)',
                      'var(--color-neon-green)',
                      'var(--color-neon-pink)',
                    ][i],
                    opacity: 0.6,
                  }}
                />
                <span className="font-mono text-[9px] text-[var(--color-text-secondary)]">{name}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* ── Centering Demo ── */}
        <GlassCard>
          <CardLabel>Centering Techniques</CardLabel>
          <div className="flex gap-2">
            {['flex', 'grid', 'margin'].map((method) => (
              <div
                key={method}
                className="flex-1 rounded-lg border border-[var(--color-border)]"
                style={{
                  height: 90,
                  background: 'var(--color-surface-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="rounded px-2 py-0.5 font-mono text-[8px] text-white"
                  style={{ background: 'var(--color-accent)', opacity: 0.8 }}
                >
                  {method}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* ── Navigation Bar ── */}
        <GlassCard>
          <CardLabel>Navigation Bar</CardLabel>
          <div
            className="flex items-center rounded-lg border border-[var(--color-border)] px-3 py-2"
            style={{ background: 'var(--color-surface-2)' }}
          >
            <span className="font-display text-xs font-bold text-[var(--color-accent-light)]">Logo</span>
            <div className="ml-auto flex gap-3">
              {['Home', 'About', 'Work'].map((link) => (
                <span key={link} className="font-mono text-[9px] text-[var(--color-text-muted)]">
                  {link}
                </span>
              ))}
            </div>
            <div
              className="ml-3 rounded-md px-2 py-0.5 font-mono text-[9px] text-white"
              style={{ background: 'var(--color-accent)' }}
            >
              CTA
            </div>
          </div>
        </GlassCard>

        {/* ── Media Object ── */}
        <GlassCard>
          <CardLabel>Media Object</CardLabel>
          <div className="flex gap-3">
            <div
              className="flex-shrink-0 rounded-full"
              style={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, var(--color-neon-blue), var(--color-accent))',
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="h-2.5 w-3/4 rounded bg-[var(--color-text-primary)]" style={{ opacity: 0.2 }} />
              <div className="mt-1.5 h-2 w-full rounded bg-[var(--color-text-secondary)]" style={{ opacity: 0.1 }} />
              <div className="mt-1 h-2 w-2/3 rounded bg-[var(--color-text-secondary)]" style={{ opacity: 0.08 }} />
            </div>
          </div>
          <div className="mt-3 flex gap-3">
            <div
              className="flex-shrink-0 rounded-full"
              style={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, var(--color-neon-pink), var(--color-neon-purple))',
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="h-2.5 w-2/3 rounded bg-[var(--color-text-primary)]" style={{ opacity: 0.2 }} />
              <div className="mt-1.5 h-2 w-full rounded bg-[var(--color-text-secondary)]" style={{ opacity: 0.1 }} />
            </div>
          </div>
        </GlassCard>

        {/* ── Sticky Footer ── */}
        <GlassCard>
          <CardLabel>Sticky Footer</CardLabel>
          <div className="flex flex-col gap-[2px]" style={{ height: 110 }}>
            <div className="rounded bg-[var(--color-surface-2)] border border-[var(--color-border)] px-2 py-1 font-mono text-[8px] text-[var(--color-text-muted)]">Content grows...</div>
            <div className="flex-1" />
            <div className="rounded bg-[var(--color-accent)] px-2 py-1 text-center font-mono text-[9px] text-white/70">
              Footer sticks to bottom
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 4 — Responsive Demo
   ════════════════════════════════════════════════════════════════════ */

type Viewport = 'mobile' | 'tablet' | 'desktop'

function ResponsiveDemo() {
  const [viewport, setViewport] = useState<Viewport>('desktop')

  const widths: Record<Viewport, number> = { mobile: 375, tablet: 768, desktop: 1100 }
  const w = widths[viewport]

  return (
    <section>
      <SectionTitle>Responsive Demo</SectionTitle>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <GlassCard className="flex flex-col items-center">
          {/* Preset buttons */}
          <div className="mb-6 flex gap-2">
            {(['mobile', 'tablet', 'desktop'] as Viewport[]).map((vp) => (
              <button
                key={vp}
                onClick={() => setViewport(vp)}
                className="rounded-lg border px-4 py-1.5 font-mono text-xs capitalize transition-all"
                style={{
                  background:
                    viewport === vp ? 'var(--color-accent)' : 'var(--color-surface-2)',
                  color: viewport === vp ? '#fff' : 'var(--color-text-secondary)',
                  borderColor:
                    viewport === vp ? 'var(--color-accent)' : 'var(--color-border)',
                  cursor: 'pointer',
                }}
              >
                {vp}
                <span className="ml-1 text-[10px] opacity-60">
                  {widths[vp]}px
                </span>
              </button>
            ))}
          </div>

          {/* Viewport frame */}
          <div
            className="relative overflow-hidden rounded-xl border-2 transition-all duration-500"
            style={{
              width: w,
              maxWidth: '100%',
              borderColor: 'var(--color-border)',
              background: 'var(--color-bg)',
              height: 300,
            }}
          >
            {/* Mini webpage inside — reflows with width */}
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
              {/* Header */}
              <div
                className="flex items-center px-3 py-2"
                style={{
                  background: 'var(--color-surface)',
                  borderBottom: '1px solid var(--color-border)',
                  flexWrap: viewport === 'mobile' ? 'wrap' : 'nowrap',
                  gap: 4,
                }}
              >
                <span className="font-display text-[10px] font-bold text-[var(--color-accent-light)]">Brand</span>
                {viewport !== 'mobile' && (
                  <div className="ml-auto flex gap-2">
                    {['Home', 'About', 'Contact'].map((l) => (
                      <span key={l} className="font-mono text-[8px] text-[var(--color-text-muted)]">{l}</span>
                    ))}
                  </div>
                )}
                {viewport === 'mobile' && (
                  <div className="ml-auto font-mono text-[10px] text-[var(--color-text-muted)]">&#9776;</div>
                )}
              </div>

              {/* Body */}
              <div
                className="p-3"
                style={{
                  display: 'flex',
                  flexDirection: viewport === 'mobile' ? 'column' : 'row',
                  gap: 8,
                  height: 'calc(100% - 34px)',
                }}
              >
                {/* Sidebar (hidden on mobile) */}
                {viewport !== 'mobile' && (
                  <div
                    className="flex-shrink-0 rounded-lg border p-2"
                    style={{
                      width: viewport === 'tablet' ? 80 : 100,
                      background: 'var(--color-surface-2)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <div className="font-mono text-[7px] text-[var(--color-text-muted)]">Sidebar</div>
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="mt-1 rounded px-1 py-0.5 font-mono text-[7px] text-[var(--color-text-muted)]"
                        style={{ background: 'var(--color-border)' }}
                      >
                        Link {n}
                      </div>
                    ))}
                  </div>
                )}

                {/* Main */}
                <div className="flex-1">
                  <div className="grid gap-2" style={{
                    gridTemplateColumns:
                      viewport === 'mobile'
                        ? '1fr'
                        : viewport === 'tablet'
                          ? '1fr 1fr'
                          : '1fr 1fr 1fr',
                  }}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div
                        key={n}
                        className="flex items-center justify-center rounded-lg border border-[var(--color-border)]"
                        style={{
                          height: viewport === 'mobile' ? 28 : 40,
                          background: 'var(--color-surface-2)',
                        }}
                      >
                        <span className="font-mono text-[8px] text-[var(--color-text-muted)]">Card {n}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 5 — Masonry / Waterfall
   ════════════════════════════════════════════════════════════════════ */

const masonryItems = [
  { h: 120, bg: 'linear-gradient(135deg, var(--color-accent), var(--color-neon-blue))', text: 'Grid' },
  { h: 80, bg: 'var(--color-surface-2)', border: true, text: 'Flex' },
  { h: 160, bg: 'linear-gradient(180deg, var(--color-neon-purple), var(--color-neon-pink))', text: 'Layers' },
  { h: 100, bg: 'var(--color-surface-2)', border: true, text: 'Box Model' },
  { h: 140, bg: 'linear-gradient(135deg, var(--color-neon-green), var(--color-neon-blue))', text: 'Container Queries' },
  { h: 90, bg: 'var(--color-surface-2)', border: true, text: 'Position' },
  { h: 130, bg: 'linear-gradient(135deg, var(--color-neon-pink), var(--color-accent))', text: 'Transform' },
  { h: 70, bg: 'var(--color-surface-2)', border: true, text: 'Float' },
  { h: 150, bg: 'linear-gradient(180deg, var(--color-accent), var(--color-neon-green))', text: 'Responsive' },
  { h: 100, bg: 'var(--color-surface-2)', border: true, text: 'Columns' },
  { h: 110, bg: 'linear-gradient(135deg, var(--color-neon-blue), var(--color-accent))', text: 'Area' },
  { h: 85, bg: 'var(--color-surface-2)', border: true, text: 'Span' },
  { h: 125, bg: 'linear-gradient(135deg, var(--color-neon-purple), var(--color-accent))', text: 'Template' },
  { h: 95, bg: 'var(--color-surface-2)', border: true, text: 'Gap' },
]

function MasonryLayout() {
  return (
    <section>
      <SectionTitle>Masonry / Waterfall</SectionTitle>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div
          className="columns-2 gap-4 sm:columns-3 lg:columns-4"
        >
          {masonryItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{
                y: -6,
                boxShadow: '0 12px 40px rgba(0,0,0,.35)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="mb-4 break-inside-avoid rounded-2xl border border-[var(--color-border)] flex items-center justify-center"
              style={{
                height: item.h,
                background: item.bg,
                ...(item.border ? {} : {}),
              }}
            >
              <span
                className={`font-mono text-xs ${item.border ? 'text-[var(--color-text-muted)]' : 'text-white/80'}`}
              >
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 6 — Creative Compositions
   ════════════════════════════════════════════════════════════════════ */

function CreativeCompositions() {
  return (
    <section>
      <SectionTitle>Creative Compositions</SectionTitle>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-10"
      >
        {/* ── Overlapping Cards ── */}
        <GlassCard>
          <CardLabel>Overlapping Cards</CardLabel>
          <div className="relative mx-auto" style={{ height: 200, width: 320 }}>
            {[
              { x: 0, rotate: -6, bg: 'var(--color-neon-blue)', z: 1, label: 'Layer 1' },
              { x: 50, rotate: -2, bg: 'var(--color-accent)', z: 2, label: 'Layer 2' },
              { x: 100, rotate: 3, bg: 'var(--color-neon-purple)', z: 3, label: 'Layer 3' },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute top-0 left-0 flex items-center justify-center rounded-2xl"
                style={{
                  width: 180,
                  height: 120,
                  background: card.bg,
                  opacity: 0.8,
                  transform: `translateX(${card.x}px) translateY(${i * 20}px) rotate(${card.rotate}deg)`,
                  zIndex: card.z,
                }}
              >
                <span className="font-mono text-xs text-white/80">{card.label}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* ── Full-Bleed Hero ── */}
        <motion.div variants={fadeInUp}>
          <CardLabel>Full-Bleed Hero</CardLabel>
          <div
            className="relative flex items-center justify-center overflow-hidden rounded-2xl"
            style={{
              height: 220,
              background: 'linear-gradient(135deg, var(--color-neon-blue), var(--color-accent), var(--color-neon-pink))',
            }}
          >
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,.35)' }}
            />
            <div className="relative z-10 text-center">
              <span className="font-display text-3xl font-bold text-white">Full-Bleed Hero</span>
              <p className="mx-auto mt-2 max-w-xs font-mono text-xs text-white/70">
                Content overlaid on a gradient that extends edge-to-edge within the container.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Diagonal Section ── */}
        <motion.div variants={fadeInUp}>
          <CardLabel>Diagonal Section</CardLabel>
          <div className="relative overflow-hidden rounded-2xl" style={{ height: 200 }}>
            {/* Top section */}
            <div
              className="absolute inset-0"
              style={{
                background: 'var(--color-surface-2)',
                clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 100%)',
              }}
            >
              <div className="flex h-full items-center px-8">
                <span className="font-display text-xl font-bold text-[var(--color-text-primary)]">Section A</span>
              </div>
            </div>
            {/* Bottom section */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent), var(--color-neon-blue))',
                clipPath: 'polygon(0 100%, 100% 65%, 100% 100%)',
                opacity: 0.8,
              }}
            >
              <div className="flex h-full items-end px-8 pb-6">
                <span className="font-display text-xl font-bold text-white/90">Section B</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════════ */

export default function LayoutsPage() {
  return (
    <>
      <style>{globalKeyframes}</style>
      <div
        className="min-h-screen overflow-y-auto px-6 py-16 md:px-10 lg:px-16"
        style={{ background: 'var(--color-bg)' }}
      >
        {/* ── Hero header ── */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex h-[72px] w-[72px] items-center justify-center rounded-2xl"
            style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}
          >
            <div className="grid grid-cols-3 gap-[3px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[2px]"
                  style={{
                    width: 10,
                    height: 10,
                    background: i % 3 === 0 ? 'var(--color-accent-light)' : 'var(--color-accent-light)',
                    opacity: 0.3 + (i % 3) * 0.25,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl font-bold leading-tight text-[var(--color-text-primary)]"
          >
            Layouts
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 max-w-xl font-sans text-[17px] leading-relaxed text-[var(--color-text-secondary)]"
          >
            Master responsive grids, flexible containers, masonry arrangements,
            and adaptive compositions. Learn how spatial structure creates visual
            harmony and guides the user&apos;s eye across complex interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {['CSS Grid', 'Flexbox', 'Masonry', 'Responsive', 'Bento'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 font-mono text-xs text-[var(--color-text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.header>

        {/* Sections */}
        <div className="mx-auto flex max-w-[1200px] flex-col gap-24">
          <CSSGridArt />
          <BentoGrid />
          <FlexboxPatterns />
          <ResponsiveDemo />
          <MasonryLayout />
          <CreativeCompositions />
        </div>

        {/* Bottom spacer */}
        <div className="h-20" />
      </div>
    </>
  )
}
