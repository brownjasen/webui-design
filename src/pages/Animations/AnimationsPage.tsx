import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/design-system/tokens'

/* ─── Shared ─── */
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

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`glass rounded-2xl p-6 ${className}`}>{children}</div>
)

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 — CSS-Only Animations
   ═══════════════════════════════════════════════════════════════════ */
const cssAnims = [
  { name: 'Pulse', style: { animation: 'cssPulse 1.5s ease-in-out infinite' } },
  { name: 'Float', style: { animation: 'cssFloat 2s ease-in-out infinite' } },
  { name: 'Spin', style: { animation: 'cssSpin 1.5s linear infinite' } },
  { name: 'Bounce', style: { animation: 'cssBounce 0.6s ease-in-out infinite' } },
  { name: 'Shake', style: { animation: 'cssShake 0.4s ease-in-out infinite' } },
  { name: 'Morph', style: { animation: 'cssMorph 2s ease-in-out infinite' } },
]

const spinners = [
  { name: 'Dual Ring', css: `width:28px;height:28px;border:3px solid var(--color-border);border-top-color:var(--color-accent);border-radius:50%;animation:cssSpin 0.8s linear infinite` },
  { name: 'Dots', css: null, dots: true },
  { name: 'Bar Chase', css: null, bars: true },
  { name: 'Circle', css: `width:28px;height:28px;border:3px solid transparent;border-top-color:var(--color-neon-blue);border-right-color:var(--color-neon-pink);border-radius:50%;animation:cssSpin 0.6s linear infinite` },
  { name: 'Square', css: `width:22px;height:22px;background:var(--color-accent);border-radius:4px;animation:cssSquareFlip 1s ease-in-out infinite` },
  { name: 'Gradient', css: `width:28px;height:28px;border-radius:50%;background:conic-gradient(var(--color-accent),var(--color-neon-blue),var(--color-accent));animation:cssSpin 1s linear infinite;-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#fff 0);mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#fff 0)` },
]

function CSSAnimations() {
  return (
    <Section title="01 — CSS-Only Animations">
      {/* Basic Animations */}
      <div className="mb-10 grid grid-cols-3 gap-4 sm:grid-cols-6">
        {cssAnims.map((a) => (
          <Card key={a.name} className="flex flex-col items-center gap-3 py-6">
            <div className="h-8 w-8 rounded-lg bg-[var(--color-accent)]" style={a.style} />
            <span className="text-xs font-mono text-[var(--color-text-secondary)]">{a.name}</span>
          </Card>
        ))}
      </div>

      {/* Spinner Gallery */}
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Loading Spinners</h3>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {spinners.map((s) => (
          <Card key={s.name} className="flex flex-col items-center gap-3 py-6">
            {s.css && <div style={{ ...Object.fromEntries(s.css.split(';').filter(Boolean).map(p => { const [k,v] = p.split(':').map(x=>x.trim()); return [k.replace(/-([a-z])/g,(_,c)=>c.toUpperCase()), v] })) }} />}
            {s.dots && (
              <div className="flex items-center gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]"
                    style={{ animation: 'cssDotPulse 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            )}
            {s.bars && (
              <div className="flex items-end gap-0.5">
                {[0,1,2,3].map(i => (
                  <div key={i} className="w-1 rounded-full bg-[var(--color-accent)]"
                    style={{ height: 20, animation: 'cssBarChase 1s ease-in-out infinite', animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            )}
            <span className="text-xs font-mono text-[var(--color-text-secondary)]">{s.name}</span>
          </Card>
        ))}
      </div>

      <style>{`
        @keyframes cssPulse { 0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:0.6} }
        @keyframes cssFloat { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes cssSpin { to{transform:rotate(360deg)} }
        @keyframes cssBounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)} }
        @keyframes cssShake { 0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)} }
        @keyframes cssMorph { 0%,100%{border-radius:4px}50%{border-radius:50%} }
        @keyframes cssDotPulse { 0%,100%{transform:scale(0.4);opacity:0.4}50%{transform:scale(1);opacity:1} }
        @keyframes cssBarChase { 0%,100%{height:8px}50%{height:24px} }
        @keyframes cssSquareFlip { 0%{transform:perspective(100px) rotateX(0)}50%{transform:perspective(100px) rotateX(180deg)}100%{transform:perspective(100px) rotateX(360deg)} }
      `}</style>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — Framer Motion Demos
   ═══════════════════════════════════════════════════════════════════ */
function SpringDemo() {
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const bg = useTransform(springX, [-150, 0, 150], ['#ff00aa', '#6366f1', '#00d4ff'])

  return (
    <Card className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Spring Physics</h3>
      <div className="relative h-24 w-full cursor-grab rounded-xl bg-[var(--color-surface-2)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--color-border)]" />
        <motion.div
          style={{ x: springX, background: bg }}
          drag="x"
          dragConstraints={{ left: -150, right: 150 }}
          dragElastic={0.1}
          className="relative z-10 h-12 w-12 cursor-grab rounded-xl shadow-lg active:cursor-grabbing"
        />
      </div>
      <p className="text-xs text-[var(--color-text-muted)]">Drag the box — it springs back</p>
    </Card>
  )
}

function LayoutAnimation() {
  const [items, setItems] = useState(['A', 'B', 'C', 'D'])
  const shuffle = () => setItems([...items].sort(() => Math.random() - 0.5))

  return (
    <Card className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Layout Animation</h3>
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item}
              layout
              className="flex h-14 items-center justify-center rounded-xl bg-[var(--color-accent)]/20 text-lg font-bold text-[var(--color-accent-light)]"
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button onClick={shuffle} className="rounded-lg bg-[var(--color-surface-2)] px-4 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
        Shuffle
      </button>
    </Card>
  )
}

function StaggerGrid() {
  const [show, setShow] = useState(true)
  return (
    <Card className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Stagger Reveal</h3>
      <motion.div variants={staggerContainer} initial="hidden" animate={show ? 'visible' : 'hidden'} className="grid grid-cols-4 gap-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="h-8 w-8 rounded-lg"
            style={{ background: `hsl(${230 + i * 8}, 80%, 60%)` }}
          />
        ))}
      </motion.div>
      <button onClick={() => setShow(s => !s)} className="rounded-lg bg-[var(--color-surface-2)] px-4 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
        Replay
      </button>
    </Card>
  )
}

function ExitDemo() {
  const [items, setItems] = useState(['Alpha', 'Beta', 'Gamma', 'Delta'])
  const add = () => setItems([...items, `Item ${items.length + 1}`])
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i))

  return (
    <Card className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Exit Animations</h3>
      <div className="flex w-full flex-col gap-2">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between rounded-lg bg-[var(--color-surface-2)] px-4 py-2.5"
            >
              <span className="text-sm text-[var(--color-text-primary)]">{item}</span>
              <button onClick={() => remove(i)} className="text-xs text-[var(--color-error)] hover:underline">Remove</button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button onClick={add} className="rounded-lg bg-[var(--color-accent)]/20 px-4 py-1.5 text-xs font-medium text-[var(--color-accent-light)] hover:bg-[var(--color-accent)]/30 transition-colors">
        + Add Item
      </button>
    </Card>
  )
}

function FramerShowcase() {
  return (
    <Section title="02 — Framer Motion">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SpringDemo />
        <LayoutAnimation />
        <StaggerGrid />
        <ExitDemo />
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — Scroll-Triggered Effects
   ═══════════════════════════════════════════════════════════════════ */
function CounterAnim({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1500
        const start = performance.now()
        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          setCount(Math.floor(t * target))
          if (t < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-gradient">{count}</div>
      <div className="mt-1 text-sm text-[var(--color-text-secondary)]">{label}</div>
    </div>
  )
}

function ScrollEffects() {
  return (
    <Section title="03 — Scroll Effects">
      {/* Counter row */}
      <div className="mb-10 glass rounded-2xl p-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <CounterAnim target={1280} label="Components" />
          <CounterAnim target={99} label="Score" />
          <CounterAnim target={4096} label="Colors" />
          <CounterAnim target={360} label="Animations" />
        </div>
      </div>

      {/* Scroll reveal cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { title: 'Fade In', anim: { opacity: [0, 1], y: [30, 0] } },
          { title: 'Slide Left', anim: { opacity: [0, 1], x: [-50, 0] } },
          { title: 'Scale Up', anim: { opacity: [0, 1], scale: [0.7, 1] } },
        ].map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30, x: 0, scale: 0.7 }}
            whileInView={item.anim}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex flex-col items-center gap-3 rounded-2xl p-8"
          >
            <div className="h-16 w-16 rounded-xl bg-[var(--color-accent)]/20" />
            <h3 className="font-semibold text-[var(--color-text-primary)]">{item.title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Triggered on scroll</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — Micro-Interactions
   ═══════════════════════════════════════════════════════════════════ */
function MicroInteractions() {
  const [toggle, setToggle] = useState(false)
  const [checked, setChecked] = useState(false)
  const [focused, setFocused] = useState(false)

  return (
    <Section title="04 — Micro-Interactions">
      {/* Button effects */}
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Button Effects</h3>
      <div className="mb-10 flex flex-wrap gap-4">
        {/* 1. Scale + Shadow */}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[var(--color-accent)]/25 transition-shadow hover:shadow-xl hover:shadow-[var(--color-accent)]/40">
          Scale & Shadow
        </motion.button>

        {/* 2. Slide bg */}
        <motion.button whileTap={{ scale: 0.97 }}
          className="group relative overflow-hidden rounded-xl border border-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[var(--color-accent-light)]">
          <span className="absolute inset-0 -translate-x-full bg-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-0" />
          <span className="relative z-10 transition-colors group-hover:text-white">Slide Fill</span>
        </motion.button>

        {/* 3. Glow */}
        <motion.button whileHover={{ boxShadow: '0 0 25px rgba(99,102,241,0.5)' }} whileTap={{ scale: 0.97 }}
          className="rounded-xl border border-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[var(--color-accent-light)]">
          Glow
        </motion.button>

        {/* 4. Underline draw */}
        <motion.button className="group relative px-1 py-2.5 text-sm font-medium text-[var(--color-text-primary)]">
          Underline Draw
          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
        </motion.button>

        {/* 5. Ripple */}
        <RippleButton />

        {/* 6. Morph */}
        <motion.button
          whileHover={{ borderRadius: '24px', scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="rounded-lg bg-[var(--color-neon-blue)]/20 px-5 py-2.5 text-sm font-medium text-[var(--color-neon-blue)]">
          Morph Shape
        </motion.button>
      </div>

      {/* Toggle + Checkbox + Input */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Toggle */}
        <Card className="flex flex-col items-center gap-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Toggle</h3>
          <button onClick={() => setToggle(!toggle)}
            className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${toggle ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`}>
            <motion.div
              animate={{ x: toggle ? 24 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
            />
          </button>
          <span className="text-xs text-[var(--color-text-muted)]">{toggle ? 'On' : 'Off'}</span>
        </Card>

        {/* Checkbox */}
        <Card className="flex flex-col items-center gap-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Checkbox</h3>
          <button onClick={() => setChecked(!checked)} className="flex items-center gap-3">
            <div className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors duration-200 ${checked ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-[var(--color-border)]'}`}>
              <motion.svg width="14" height="14" viewBox="0 0 14 14" fill="none" initial={false} animate={{ opacity: checked ? 1 : 0 }}>
                <motion.path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: checked ? 1 : 0 }} transition={{ duration: 0.3 }} />
              </motion.svg>
            </div>
            <span className="text-sm text-[var(--color-text-primary)]">Accept terms</span>
          </button>
        </Card>

        {/* Input Focus */}
        <Card className="flex flex-col items-center gap-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Input Focus</h3>
          <div className="relative w-full">
            <motion.div
              animate={{ scaleX: focused ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-[var(--color-accent)]"
            />
            <input
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Click to focus..."
              className="w-full border-b border-[var(--color-border)] bg-transparent py-2 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
            />
          </div>
        </Card>
      </div>
    </Section>
  )
}

function RippleButton() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const id = Date.now()
    setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600)
  }

  return (
    <button onClick={handleClick} className="relative overflow-hidden rounded-xl bg-[var(--color-surface-2)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)]">
      Ripple Click
      {ripples.map(r => (
        <motion.span key={r.id} initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 0.6 }}
          className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]/30"
          style={{ left: r.x, top: r.y }} />
      ))}
    </button>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5 — Transition Previews
   ═══════════════════════════════════════════════════════════════════ */
const transitions = [
  { name: 'Fade', variants: { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } } },
  { name: 'Slide', variants: { enter: { x: 80, opacity: 0 }, center: { x: 0, opacity: 1 }, exit: { x: -80, opacity: 0 } } },
  { name: 'Scale', variants: { enter: { scale: 0.4, opacity: 0 }, center: { scale: 1, opacity: 1 }, exit: { scale: 1.3, opacity: 0 } } },
  { name: 'Wipe', variants: { enter: { clipPath: 'circle(0% at 50% 50%)' }, center: { clipPath: 'circle(100% at 50% 50%)' }, exit: { clipPath: 'circle(0% at 50% 50%)' } } },
  { name: 'Blur', variants: { enter: { filter: 'blur(20px)', opacity: 0 }, center: { filter: 'blur(0px)', opacity: 1 }, exit: { filter: 'blur(20px)', opacity: 0 } } },
]

function TransitionPreviews() {
  const [active, setActive] = useState(0)
  const [show, setShow] = useState(true)

  const play = (i: number) => {
    setActive(i)
    setShow(false)
    setTimeout(() => setShow(true), 50)
  }

  return (
    <Section title="05 — Page Transitions">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {transitions.map((t, i) => (
          <Card key={t.name} className="flex flex-col items-center gap-3">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{t.name}</h3>
            <div className="relative h-24 w-full overflow-hidden rounded-xl bg-[var(--color-surface-2)]">
              <AnimatePresence mode="wait">
                {show && active === i && (
                  <motion.div
                    key="content"
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={t.variants}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-neon-blue)] rounded-xl"
                  >
                    <span className="text-sm font-bold text-white">Page</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={() => play(i)} className="rounded-lg bg-[var(--color-surface-2)] px-3 py-1 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Play
            </button>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function AnimationsPage() {
  return (
    <div className="px-8 py-12 lg:px-16">
      {/* Header */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-16">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
          <div className="h-7 w-7 rounded-full border-[3px] border-[var(--color-accent-light)] border-t-transparent" style={{ animation: 'cssSpin 1s linear infinite' }} />
        </div>
        <h1 className="text-5xl font-bold text-[var(--color-text-primary)]">Animations</h1>
        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
          CSS keyframes, Framer Motion spring physics, scroll-triggered reveals, micro-interactions &amp; page transitions
        </p>
      </motion.div>

      <CSSAnimations />
      <FramerShowcase />
      <ScrollEffects />
      <MicroInteractions />
      <TransitionPreviews />
    </div>
  )
}
