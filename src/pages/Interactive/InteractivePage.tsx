import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { fadeInUp } from '@/design-system/tokens'

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-20">
    <h2 className="mb-8 text-2xl font-bold text-gradient">{title}</h2>
    {children}
  </motion.section>
)

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`glass rounded-2xl p-6 ${className}`}>{children}</div>
)

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 — Advanced Forms
   ═══════════════════════════════════════════════════════════════════ */

/* Multi-step Wizard */
function MultiStepForm() {
  const [step, setStep] = useState(0)
  const steps = ['Account', 'Profile', 'Review']
  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Multi-Step Wizard</h3>
      {/* Progress bar */}
      <div className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 ${i <= step ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)]'}`}>
              {i + 1}
            </div>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 transition-colors duration-300 ${i < step ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`} />}
          </div>
        ))}
      </div>
      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
          {step === 0 && (
            <div className="space-y-4">
              <FloatingLabelInput label="Email" type="email" />
              <FloatingLabelInput label="Password" type="password" />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <FloatingLabelInput label="Full Name" />
              <FloatingLabelInput label="Bio" />
            </div>
          )}
          {step === 2 && (
            <div className="rounded-xl bg-[var(--color-surface-2)] p-4 text-sm text-[var(--color-text-secondary)]">
              Review your information and submit when ready.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {/* Buttons */}
      <div className="mt-6 flex justify-between">
        <button onClick={() => setStep(Math.max(0, step - 1))} className={`rounded-lg px-4 py-2 text-sm ${step === 0 ? 'invisible' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
          Back
        </button>
        <button onClick={() => step < 2 ? setStep(step + 1) : setStep(0)}
          className="rounded-lg bg-[var(--color-accent)] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-light)]">
          {step < 2 ? 'Next' : 'Submit'}
        </button>
      </div>
    </Card>
  )
}

/* Floating Label Input */
function FloatingLabelInput({ label, type = 'text' }: { label: string; type?: string }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const active = focused || value.length > 0
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-lg border border-[var(--color-border)] bg-transparent px-4 pt-5 pb-2 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-accent)]"
      />
      <label className={`pointer-events-none absolute left-4 transition-all duration-200 ${active ? 'top-1.5 text-xs text-[var(--color-accent)]' : 'top-3.5 text-sm text-[var(--color-text-muted)]'}`}>
        {label}
      </label>
    </div>
  )
}

/* Color Picker */
function ColorPicker() {
  const [hue, setHue] = useState(230)
  const color = `hsl(${hue}, 80%, 60%)`
  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Color Picker</h3>
      <div className="flex items-center gap-6">
        <div className="h-24 w-24 rounded-2xl shadow-lg transition-colors duration-200" style={{ background: color }} />
        <div className="flex-1 space-y-3">
          <div>
            <label className="mb-1 block text-xs text-[var(--color-text-muted)]">Hue: {hue}</label>
            <input type="range" min="0" max="360" value={hue} onChange={(e) => setHue(+e.target.value)}
              className="w-full accent-[var(--color-accent)]" style={{ accentColor: color }} />
          </div>
          <div className="font-mono text-sm text-[var(--color-text-secondary)]">{color}</div>
        </div>
      </div>
    </Card>
  )
}

/* Star Rating */
function StarRating() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Star Rating</h3>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button key={star} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            className="text-2xl transition-colors" style={{ color: (hover || rating) >= star ? '#f59e0b' : 'var(--color-border)' }}>
            ★
          </motion.button>
        ))}
      </div>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{rating > 0 ? `You rated ${rating}/5` : 'Click to rate'}</p>
    </Card>
  )
}

/* File Upload Zone */
function FileUpload() {
  const [files, setFiles] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const names = Array.from(e.dataTransfer.files).map(f => f.name)
    setFiles(prev => [...prev, ...names])
  }, [])

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">File Upload</h3>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 transition-colors ${dragging ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' : 'border-[var(--color-border)] hover:border-[var(--color-accent)]'}`}
      >
        <div className="text-3xl text-[var(--color-text-muted)]">📁</div>
        <p className="text-sm text-[var(--color-text-secondary)]">Drop files here or click to browse</p>
        <input ref={inputRef} type="file" multiple className="hidden"
          onChange={(e) => { const names = Array.from(e.target.files || []).map(f => f.name); setFiles(prev => [...prev, ...names]) }} />
      </div>
      {files.length > 0 && (
        <div className="mt-3 space-y-1">
          {files.map((f, i) => (
            <motion.div key={f + i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-lg bg-[var(--color-surface-2)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)]">
              <span>📄</span>{f}
              <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="ml-auto text-[var(--color-error)]">✕</button>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  )
}

function FormsSection() {
  return (
    <Section title="01 — Advanced Forms">
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MultiStepForm />
        <div className="space-y-6">
          <ColorPicker />
          <StarRating />
        </div>
      </div>
      <FileUpload />
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — Drag & Drop
   ═══════════════════════════════════════════════════════════════════ */
function KanbanBoard() {
  const [columns, setColumns] = useState<Record<string, string[]>>({
    'To Do': ['Design mockups', 'Write tests', 'Setup CI/CD'],
    'In Progress': ['Build component', 'Code review'],
    'Done': ['Project setup', 'Design system'],
  })
  const [dragItem, setDragItem] = useState<{ col: string; idx: number } | null>(null)

  const handleDragStart = (col: string, idx: number) => setDragItem({ col, idx })
  const handleDrop = (targetCol: string) => {
    if (!dragItem) return
    const item = columns[dragItem.col][dragItem.idx]
    setColumns(prev => {
      const src = prev[dragItem.col].filter((_, i) => i !== dragItem.idx)
      const dst = [...prev[targetCol], item]
      return { ...prev, [dragItem.col]: src, [targetCol]: dst }
    })
    setDragItem(null)
  }

  const colColors = ['var(--color-neon-blue)', 'var(--color-accent)', 'var(--color-neon-green)']

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Kanban Board</h3>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(columns).map(([col, items], ci) => (
          <div key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col)}
            className="rounded-xl bg-[var(--color-surface-2)] p-3">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ background: colColors[ci] }} />
              <span className="text-xs font-semibold text-[var(--color-text-primary)]">{col}</span>
              <span className="ml-auto text-xs text-[var(--color-text-muted)]">{items.length}</span>
            </div>
            <div className="space-y-2 min-h-[80px]">
              {items.map((item, i) => (
                <motion.div key={item} layout draggable
                  onDragStart={() => handleDragStart(col, i)}
                  className="cursor-grab rounded-lg bg-white p-2.5 text-xs text-[var(--color-text-primary)] shadow-sm active:cursor-grabbing hover:shadow-md transition-shadow">
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--color-text-muted)]">Drag items between columns</p>
    </Card>
  )
}

function SortableGrid() {
  const [items, setItems] = useState(['A', 'B', 'C', 'D', 'E', 'F'])
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Sortable Grid</h3>
      <div className="grid grid-cols-3 gap-3">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div key={item} layout draggable
              onDragStart={() => setDragIdx(i)}
              onDragOver={(e) => { e.preventDefault(); if (dragIdx !== null && dragIdx !== i) {
                const newItems = [...items]; [newItems[dragIdx], newItems[i]] = [newItems[i], newItems[dragIdx]]
                setItems(newItems); setDragIdx(i)
              }}}
              onDragEnd={() => setDragIdx(null)}
              className="flex h-16 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-lg font-bold text-[var(--color-accent)] cursor-grab active:cursor-grabbing"
              style={{ background: `hsl(${230 + i * 25}, 80%, 95%)` }}>
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  )
}

function DragDropSection() {
  return (
    <Section title="02 — Drag & Drop">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <KanbanBoard />
        <SortableGrid />
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — Gesture Controls
   ═══════════════════════════════════════════════════════════════════ */
function SwipeCards() {
  const [cards, setCards] = useState(['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5'])
  const x = useMotionValue(0)

  const remove = (_dir: number) => {
    setCards(prev => prev.slice(1))
    x.set(0)
  }

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Swipe Cards</h3>
      <div className="relative flex h-48 items-center justify-center">
        <AnimatePresence>
          {cards.length > 0 ? (
            <motion.div key={cards[0]}
              style={{ x }}
              drag="x" dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 100) remove(info.offset.x > 0 ? 1 : -1) }}
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              exit={{ x: 300, opacity: 0, rotate: 15 }}
              className="absolute flex h-36 w-56 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-neon-blue)] text-white font-bold shadow-xl cursor-grab">
              {cards[0]}
            </motion.div>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[var(--color-text-muted)]">
              All cards swiped!
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => remove(-1)} className="rounded-full bg-[var(--color-surface-2)] px-4 py-1.5 text-xs text-[var(--color-error)]">← Skip</button>
        <button onClick={() => setCards(['Card 1','Card 2','Card 3','Card 4','Card 5'])} className="rounded-full bg-[var(--color-surface-2)] px-4 py-1.5 text-xs text-[var(--color-text-secondary)]">Reset</button>
        <button onClick={() => remove(1)} className="rounded-full bg-[var(--color-surface-2)] px-4 py-1.5 text-xs text-[var(--color-neon-green)]">Like →</button>
      </div>
    </Card>
  )
}

function MagneticButton() {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.3
    const dy = (e.clientY - cy) * 0.3
    btn.style.transform = `translate(${dx}px, ${dy}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = ''
  }, [])

  return (
    <Card className="flex flex-col items-center justify-center gap-4">
      <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Magnetic Button</h3>
      <div className="flex h-32 items-center justify-center" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <button ref={btnRef}
          className="rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-medium text-white transition-shadow hover:shadow-xl hover:shadow-[var(--color-accent)]/30"
          style={{ transition: 'transform 0.15s ease-out' }}>
          Hover me
        </button>
      </div>
    </Card>
  )
}

function GestureSection() {
  return (
    <Section title="03 — Gesture Controls">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SwipeCards />
        <MagneticButton />
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — Data Visualization
   ═══════════════════════════════════════════════════════════════════ */
function AnimatedBarChart() {
  const [data, setData] = useState([
    { label: 'React', value: 85, color: '#6366f1' },
    { label: 'Vue', value: 72, color: '#22c55e' },
    { label: 'Angular', value: 58, color: '#ef4444' },
    { label: 'Svelte', value: 45, color: '#f59e0b' },
    { label: 'Solid', value: 32, color: '#00d4ff' },
  ])
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setAnimated(true)
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const randomize = () => setData(prev => prev.map(d => ({ ...d, value: 20 + Math.floor(Math.random() * 80) })))

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Bar Chart</h3>
        <button onClick={randomize} className="rounded-lg bg-[var(--color-surface-2)] px-3 py-1 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Randomize</button>
      </div>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <span className="w-14 text-xs font-medium text-[var(--color-text-secondary)]">{d.label}</span>
            <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-[var(--color-surface-2)]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: d.color }}
                initial={{ width: 0 }}
                animate={{ width: animated ? `${d.value}%` : '0%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="w-8 text-right text-xs font-mono text-[var(--color-text-secondary)]">{d.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function DonutChart() {
  const data = [
    { label: 'Desktop', value: 55, color: '#6366f1' },
    { label: 'Mobile', value: 30, color: '#00d4ff' },
    { label: 'Tablet', value: 15, color: '#f59e0b' },
  ]
  const total = data.reduce((s, d) => s + d.value, 0)
  let cumulative = 0

  return (
    <Card className="flex flex-col items-center">
      <h3 className="mb-4 self-start text-sm font-semibold text-[var(--color-text-primary)]">Donut Chart</h3>
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          {data.map((d) => {
            const offset = cumulative
            cumulative += d.value
            return (
              <circle key={d.label} cx="18" cy="18" r="14" fill="none"
                stroke={d.color} strokeWidth="4"
                strokeDasharray={`${(d.value / total) * 87.96} 87.96`}
                strokeDashoffset={`${-(offset / total) * 87.96}`}
                className="transition-all duration-700"
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-[var(--color-text-primary)]">100%</span>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />{d.label}
          </div>
        ))}
      </div>
    </Card>
  )
}

function SparklineChart() {
  const points = [20, 45, 30, 60, 35, 70, 50, 80, 65, 90, 75, 95]
  const max = Math.max(...points)
  const w = 300
  const h = 80
  const step = w / (points.length - 1)
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${i * step},${h - (p / max) * h}`).join(' ')
  const areaD = `${pathD} L${w},${h} L0,${h} Z`

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Sparkline</h3>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#sparkGrad)" />
        <path d={pathD} fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Card>
  )
}

function DataVizSection() {
  return (
    <Section title="04 — Data Visualization">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnimatedBarChart />
        <div className="grid grid-cols-1 gap-6">
          <DonutChart />
          <SparklineChart />
        </div>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function InteractivePage() {
  return (
    <div className="px-8 py-12 lg:px-16">
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-16">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="10" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="14" cy="14" r="3" fill="var(--color-accent)" opacity="0.8" />
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-[var(--color-text-primary)]">Interactive</h1>
        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
          Forms, drag & drop, gesture controls, and data visualization — all interactive, all live
        </p>
      </motion.div>
      <FormsSection />
      <DragDropSection />
      <GestureSection />
      <DataVizSection />
    </div>
  )
}
