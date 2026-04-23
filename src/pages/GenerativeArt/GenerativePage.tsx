import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/design-system/tokens'

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-20">
    <h2 className="mb-8 text-2xl font-bold text-gradient">{title}</h2>
    {children}
  </motion.section>
)

/* ─── Flow Field ─── */
function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [seed, setSeed] = useState(42)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width, H = canvas.height
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, W, H)

    const noise = (x: number, y: number) => {
      return Math.sin(x * 0.01 + seed) * Math.cos(y * 0.01 + seed * 0.7) +
             Math.sin((x + y) * 0.005 + seed * 1.3) * 0.5
    }

    for (let i = 0; i < 800; i++) {
      let x = Math.random() * W
      let y = Math.random() * H
      ctx.beginPath()
      ctx.moveTo(x, y)
      const hue = (noise(x, y) * 60 + 230 + 360) % 360
      ctx.strokeStyle = `hsla(${hue}, 70%, 55%, 0.3)`
      ctx.lineWidth = 1
      for (let s = 0; s < 80; s++) {
        const angle = noise(x, y) * Math.PI * 2
        x += Math.cos(angle) * 2
        y += Math.sin(angle) * 2
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
  }, [seed])

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Flow Field</h3>
        <button onClick={() => setSeed(s => s + 17)} className="rounded-lg bg-[var(--color-surface-2)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
          Regenerate
        </button>
      </div>
      <canvas ref={canvasRef} width={700} height={400} className="w-full rounded-xl" />
    </div>
  )
}

/* ─── Particle System ─── */
function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState<'fire' | 'rain' | 'galaxy'>('fire')
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width, H = canvas.height

    type P = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; hue: number; size: number }
    const particles: P[] = []

    const spawn = () => {
      if (particles.length > 500) return
      for (let i = 0; i < 3; i++) {
        let p: P
        if (mode === 'fire') {
          p = { x: W / 2 + (Math.random() - 0.5) * 60, y: H * 0.8, vx: (Math.random() - 0.5) * 2, vy: -(1 + Math.random() * 3), life: 1, maxLife: 60 + Math.random() * 40, hue: 20 + Math.random() * 30, size: 2 + Math.random() * 3 }
        } else if (mode === 'rain') {
          p = { x: Math.random() * W, y: -10, vx: -0.5, vy: 3 + Math.random() * 5, life: 1, maxLife: 80 + Math.random() * 40, hue: 200 + Math.random() * 40, size: 1 }
        } else {
          const angle = Math.random() * Math.PI * 2
          const speed = 0.2 + Math.random() * 0.8
          p = { x: W / 2, y: H / 2, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, maxLife: 200 + Math.random() * 200, hue: Math.random() * 360, size: 1.5 + Math.random() * 2 }
        }
        particles.push(p)
      }
    }

    const draw = () => {
      ctx.fillStyle = mode === 'galaxy' ? 'rgba(10,5,30,0.05)' : 'rgba(250,250,250,0.08)'
      ctx.fillRect(0, 0, W, H)
      spawn()
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy; p.life++
        if (mode === 'fire') p.vy -= 0.02
        if (mode === 'galaxy') { p.vx += (Math.random() - 0.5) * 0.01; p.vy += (Math.random() - 0.5) * 0.01 }
        const alpha = Math.max(0, 1 - p.life / p.maxLife)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${alpha})`
        ctx.fill()
        if (p.life >= p.maxLife) particles.splice(i, 1)
      }
      animRef.current = requestAnimationFrame(draw)
    }

    ctx.fillStyle = mode === 'galaxy' ? '#0a051e' : '#fafafa'
    ctx.fillRect(0, 0, W, H)
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [mode])

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Particle System</h3>
        <div className="flex gap-2">
          {(['fire', 'rain', 'galaxy'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`rounded-lg px-3 py-1.5 text-xs capitalize ${mode === m ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]'}`}>
              {m}
            </button>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} width={700} height={350} className="w-full rounded-xl" />
    </div>
  )
}

/* ─── Fractal Tree ─── */
function FractalTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [depth, setDepth] = useState(9)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width, H = canvas.height

    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, W, H)

    const drawBranch = (x: number, y: number, len: number, angle: number, d: number) => {
      if (d === 0 || len < 2) return
      const x2 = x + Math.cos(angle) * len
      const y2 = y + Math.sin(angle) * len
      const hue = 120 + (depth - d) * 15
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = `hsl(${hue}, 60%, ${30 + d * 5}%)`
      ctx.lineWidth = Math.max(1, d * 0.8)
      ctx.stroke()
      drawBranch(x2, y2, len * 0.72, angle - 0.5, d - 1)
      drawBranch(x2, y2, len * 0.72, angle + 0.5, d - 1)
    }

    drawBranch(W / 2, H - 20, 80, -Math.PI / 2, depth)
  }, [depth])

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Fractal Tree</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-muted)]">Depth: {depth}</span>
          <input type="range" min="3" max="12" value={depth} onChange={(e) => setDepth(+e.target.value)}
            className="w-24 accent-[var(--color-accent)]" />
        </div>
      </div>
      <canvas ref={canvasRef} width={700} height={400} className="w-full rounded-xl" />
    </div>
  )
}

/* ─── Geometric Patterns ─── */
function GeometricPatterns() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pattern, setPattern] = useState<'voronoi' | 'spirograph' | 'islamic'>('spirograph')

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width, H = canvas.height
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, W, H)
    const cx = W / 2, cy = H / 2

    if (pattern === 'spirograph') {
      const R = 120, r = 75, d = 100
      ctx.beginPath()
      for (let t = 0; t < Math.PI * 40; t += 0.01) {
        const x = cx + (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t)
        const y = cy + (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)
        t === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(99,102,241,0.5)'
      ctx.lineWidth = 0.5
      ctx.stroke()
    } else if (pattern === 'voronoi') {
      const points = Array.from({ length: 40 }, () => [Math.random() * W, Math.random() * H])
      const colors = ['#6366f1', '#00d4ff', '#22c55e', '#f59e0b', '#ec4899']
      for (let px = 0; px < W; px += 8) {
        for (let py = 0; py < H; py += 8) {
          let minD = Infinity, ci = 0
          points.forEach((p, i) => { const d = (p[0] - px) ** 2 + (p[1] - py) ** 2; if (d < minD) { minD = d; ci = i } })
          ctx.fillStyle = `${colors[ci % colors.length]}15`
          ctx.fillRect(px, py, 8, 8)
        }
      }
      points.forEach((p, i) => {
        ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, Math.PI * 2)
        ctx.fillStyle = colors[i % colors.length]; ctx.fill()
      })
    } else {
      // Islamic geometric pattern
      const size = 60
      for (let row = 0; row < Math.ceil(H / size) + 1; row++) {
        for (let col = 0; col < Math.ceil(W / size) + 1; col++) {
          const x = col * size, y = row * size
          ctx.save()
          ctx.translate(x + size / 2, y + size / 2)
          ctx.rotate(Math.PI / 4)
          ctx.strokeStyle = 'rgba(99,102,241,0.3)'
          ctx.lineWidth = 1
          for (let i = 0; i < 4; i++) {
            ctx.strokeRect(-size / 3, -size / 3, size * 2 / 3, size * 2 / 3)
            ctx.rotate(Math.PI / 4)
          }
          ctx.restore()
        }
      }
    }
  }, [pattern])

  useEffect(() => { draw() }, [draw])

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Geometric Patterns</h3>
        <div className="flex gap-2">
          {(['spirograph', 'voronoi', 'islamic'] as const).map(p => (
            <button key={p} onClick={() => setPattern(p)}
              className={`rounded-lg px-3 py-1.5 text-xs capitalize ${pattern === p ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} width={700} height={350} className="w-full rounded-xl" />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function GenerativePage() {
  return (
    <div className="px-8 py-12 lg:px-16">
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-16">
        <h1 className="text-5xl font-bold text-[var(--color-text-primary)]">Generative Art</h1>
        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
          Flow fields, fractals, particle systems, and procedural patterns
        </p>
      </motion.div>

      <Section title="01 — Flow Field">
        <FlowField />
      </Section>

      <Section title="02 — Particle System">
        <ParticleSystem />
      </Section>

      <Section title="03 — Fractal Tree">
        <FractalTree />
      </Section>

      <Section title="04 — Geometric Patterns">
        <GeometricPatterns />
      </Section>
    </div>
  )
}
