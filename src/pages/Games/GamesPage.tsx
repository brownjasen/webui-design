import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ── Constants ── */
const CANVAS_SIZE = 320
const GRID_CELL = 20
const GRID_COUNT = CANVAS_SIZE / GRID_CELL
const MAX_PARTICLES = 200

/* ── Shared Card ── */
function GlassCard({
  title,
  children,
  style,
}: {
  title: string
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 20,
        padding: 28,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        ...style,
      }}
    >
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: 20,
          letterSpacing: -0.3,
        }}
      >
        {title}
      </h3>
      {children}
    </motion.div>
  )
}

/* ── Button ── */
function ActionButton({
  label,
  onClick,
  small,
}: {
  label: string
  onClick: () => void
  small?: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: small ? '6px 16px' : '8px 20px',
        fontSize: small ? 12 : 13,
        fontWeight: 600,
        color: '#fff',
        background: 'var(--color-accent)',
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer',
        transition: 'background 0.2s, transform 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--color-accent-light)'
        e.currentTarget.style.transform = 'scale(1.04)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--color-accent)'
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {label}
    </button>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 1 — Snake Game
   ══════════════════════════════════════════════════════════════════════ */

interface Point {
  x: number
  y: number
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [running, setRunning] = useState(false)

  const snakeRef = useRef<Point[]>([{ x: 8, y: 8 }])
  const dirRef = useRef<Direction>('RIGHT')
  const nextDirRef = useRef<Direction>('RIGHT')
  const foodRef = useRef<Point>({ x: 12, y: 8 })
  const scoreRef = useRef(0)
  const gameOverRef = useRef(false)
  const runningRef = useRef(false)
  const rafRef = useRef<number>(0)
  const lastTickRef = useRef(0)

  const spawnFood = useCallback((snake: Point[]): Point => {
    let pos: Point
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_COUNT),
        y: Math.floor(Math.random() * GRID_COUNT),
      }
    } while (snake.some((s) => s.x === pos.x && s.y === pos.y))
    return pos
  }, [])

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 8, y: 8 }]
    dirRef.current = 'RIGHT'
    nextDirRef.current = 'RIGHT'
    scoreRef.current = 0
    gameOverRef.current = false
    runningRef.current = false
    setScore(0)
    setGameOver(false)
    setRunning(false)
    foodRef.current = spawnFood(snakeRef.current)
    cancelAnimationFrame(rafRef.current)
    drawFrame()
  }, [spawnFood])

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const snake = snakeRef.current
    const food = foodRef.current

    // Dark background
    ctx.fillStyle = '#0f0f1a'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID_COUNT; i++) {
      ctx.beginPath()
      ctx.moveTo(i * GRID_CELL, 0)
      ctx.lineTo(i * GRID_CELL, CANVAS_SIZE)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * GRID_CELL)
      ctx.lineTo(CANVAS_SIZE, i * GRID_CELL)
      ctx.stroke()
    }

    // Food - neon pink glow
    ctx.save()
    ctx.shadowColor = '#ff006e'
    ctx.shadowBlur = 14
    ctx.fillStyle = '#ff006e'
    ctx.beginPath()
    ctx.arc(
      food.x * GRID_CELL + GRID_CELL / 2,
      food.y * GRID_CELL + GRID_CELL / 2,
      GRID_CELL / 2 - 2,
      0,
      Math.PI * 2
    )
    ctx.fill()
    ctx.restore()

    // Snake
    snake.forEach((seg, i) => {
      const t = 1 - i / snake.length
      const r = Math.round(99 + t * 0)
      const g = Math.round(102 + t * 106)
      const b = Math.round(241)
      ctx.save()
      if (i === 0) {
        ctx.shadowColor = `rgb(${r},${g},${b})`
        ctx.shadowBlur = 12
      }
      ctx.fillStyle = `rgb(${r},${g},${b})`
      const pad = i === 0 ? 1 : 2
      ctx.beginPath()
      ctx.roundRect(
        seg.x * GRID_CELL + pad,
        seg.y * GRID_CELL + pad,
        GRID_CELL - pad * 2,
        GRID_CELL - pad * 2,
        4
      )
      ctx.fill()
      ctx.restore()
    })

    // Game over text
    if (gameOverRef.current) {
      ctx.fillStyle = 'rgba(0,0,0,0.55)'
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      ctx.fillStyle = '#ff006e'
      ctx.font = 'bold 28px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('GAME OVER', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 10)
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.font = '14px sans-serif'
      ctx.fillText(
        `Score: ${scoreRef.current}`,
        CANVAS_SIZE / 2,
        CANVAS_SIZE / 2 + 18
      )
    }
  }, [])

  const tick = useCallback(() => {
    const snake = snakeRef.current
    const head = { ...snake[0] }

    dirRef.current = nextDirRef.current

    switch (dirRef.current) {
      case 'UP':
        head.y -= 1
        break
      case 'DOWN':
        head.y += 1
        break
      case 'LEFT':
        head.x -= 1
        break
      case 'RIGHT':
        head.x += 1
        break
    }

    // Wall collision
    if (
      head.x < 0 ||
      head.x >= GRID_COUNT ||
      head.y < 0 ||
      head.y >= GRID_COUNT
    ) {
      gameOverRef.current = true
      setGameOver(true)
      setRunning(false)
      runningRef.current = false
      drawFrame()
      return
    }

    // Self collision
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      gameOverRef.current = true
      setGameOver(true)
      setRunning(false)
      runningRef.current = false
      drawFrame()
      return
    }

    const newSnake = [head, ...snake]

    // Eat food?
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      scoreRef.current += 10
      setScore(scoreRef.current)
      foodRef.current = spawnFood(newSnake)
    } else {
      newSnake.pop()
    }

    snakeRef.current = newSnake
  }, [drawFrame, spawnFood])

  const gameLoop = useCallback(
    (timestamp: number) => {
      if (!runningRef.current) return
      if (timestamp - lastTickRef.current > 120) {
        lastTickRef.current = timestamp
        tick()
        if (gameOverRef.current) return
      }
      drawFrame()
      rafRef.current = requestAnimationFrame(gameLoop)
    },
    [tick, drawFrame]
  )

  const startGame = useCallback(() => {
    if (gameOverRef.current) {
      snakeRef.current = [{ x: 8, y: 8 }]
      dirRef.current = 'RIGHT'
      nextDirRef.current = 'RIGHT'
      scoreRef.current = 0
      gameOverRef.current = false
      setScore(0)
      setGameOver(false)
      foodRef.current = spawnFood(snakeRef.current)
    }
    runningRef.current = true
    setRunning(true)
    lastTickRef.current = 0
    rafRef.current = requestAnimationFrame(gameLoop)
  }, [gameLoop, spawnFood])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!runningRef.current) return
      const map: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      }
      const newDir = map[e.key]
      if (!newDir) return
      e.preventDefault()
      const opposites: Record<Direction, Direction> = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT',
      }
      if (opposites[newDir] !== dirRef.current) {
        nextDirRef.current = newDir
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    drawFrame()
    return () => cancelAnimationFrame(rafRef.current)
  }, [drawFrame])

  return (
    <GlassCard title="Snake Game">
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: CANVAS_SIZE,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              color: 'var(--color-text-secondary)',
            }}
          >
            Score:{' '}
            <span
              style={{
                color: 'var(--color-accent)',
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {score}
            </span>
          </span>
          <ActionButton
            label={running ? 'Reset' : gameOver ? 'Restart' : 'Start'}
            onClick={running ? resetGame : startGame}
            small
          />
        </div>
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          style={{
            borderRadius: 12,
            border: '2px solid var(--color-border)',
            display: 'block',
          }}
        />
        <p
          style={{
            marginTop: 10,
            fontSize: 12,
            color: 'var(--color-text-muted)',
          }}
        >
          Use arrow keys to move
        </p>
      </div>
    </GlassCard>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 2 — Memory Card Game
   ══════════════════════════════════════════════════════════════════════ */

const EMOJIS = ['🎮', '🎲', '🎯', '🏆', '⚡', '🔥']

interface CardData {
  id: number
  emoji: string
  flipped: boolean
  matched: boolean
}

function createCards(): CardData[] {
  const pairs = [...EMOJIS, ...EMOJIS]
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pairs[i], pairs[j]] = [pairs[j], pairs[i]]
  }
  return pairs.map((emoji, i) => ({
    id: i,
    emoji,
    flipped: false,
    matched: false,
  }))
}

function MemoryGame() {
  const [cards, setCards] = useState<CardData[]>(createCards)
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [locked, setLocked] = useState(false)
  const [won, setWon] = useState(false)

  const handleFlip = useCallback(
    (id: number) => {
      if (locked) return
      const card = cards.find((c) => c.id === id)
      if (!card || card.flipped || card.matched) return

      const newFlipped = [...flippedIds, id]
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, flipped: true } : c))
      )
      setFlippedIds(newFlipped)

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1)
        setLocked(true)
        const [firstId, secondId] = newFlipped
        const first = cards.find((c) => c.id === firstId)!
        const second = cards.find((c) => c.id === secondId)!

        if (first.emoji === second.emoji) {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, matched: true }
                : c
            )
          )
          const newMatches = matches + 1
          setMatches(newMatches)
          if (newMatches === EMOJIS.length) {
            setWon(true)
          }
          setFlippedIds([])
          setLocked(false)
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, flipped: false }
                  : c
              )
            )
            setFlippedIds([])
            setLocked(false)
          }, 1000)
        }
      }
    },
    [cards, flippedIds, locked, matches]
  )

  const resetMemory = useCallback(() => {
    setCards(createCards())
    setFlippedIds([])
    setMoves(0)
    setMatches(0)
    setLocked(false)
    setWon(false)
  }, [])

  return (
    <GlassCard title="Memory Cards">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 340,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: 'var(--color-text-secondary)',
              fontFamily: 'monospace',
            }}
          >
            Moves: <strong style={{ color: 'var(--color-accent)' }}>{moves}</strong>
            {' | '}
            Matches:{' '}
            <strong style={{ color: 'var(--color-accent)' }}>
              {matches}/{EMOJIS.length}
            </strong>
          </span>
          <ActionButton label="Reset" onClick={resetMemory} small />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 76px)',
            gap: 10,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleFlip(card.id)}
              style={{
                perspective: 600,
                cursor: card.flipped || card.matched ? 'default' : 'pointer',
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                  transform:
                    card.flipped || card.matched
                      ? 'rotateY(180deg)'
                      : 'rotateY(0deg)',
                }}
              >
                {/* Back */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 12,
                    background: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    color: '#fff',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(99,102,241,0.25)',
                  }}
                >
                  ?
                </div>
                {/* Front */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 12,
                    background: card.matched
                      ? 'var(--color-surface-2)'
                      : '#fff',
                    border: card.matched
                      ? '2px solid var(--color-accent)'
                      : '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 30,
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {card.emoji}
                </div>
              </div>
            </div>
          ))}
        </div>

        {won && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              marginTop: 16,
              padding: '10px 24px',
              background: 'var(--color-accent)',
              color: '#fff',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            You won in {moves} moves!
          </motion.div>
        )}
      </div>
    </GlassCard>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 3 — Particle Playground
   ══════════════════════════════════════════════════════════════════════ */

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  life: number
  maxLife: number
}

function randomColor(): string {
  const hue = Math.random() * 360
  return `hsl(${hue}, 85%, 60%)`
}

function ParticlePlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  const spawnParticles = useCallback(
    (x: number, y: number, count: number) => {
      const newParticles: Particle[] = []
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 1 + Math.random() * 3
        const maxLife = 60 + Math.random() * 60
        newParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 2 + Math.random() * 4,
          color: randomColor(),
          alpha: 1,
          life: 0,
          maxLife,
        })
      }
      const combined = [...particlesRef.current, ...newParticles]
      particlesRef.current = combined.slice(-MAX_PARTICLES)
    },
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Auto-spawn initial particles
    for (let i = 0; i < 5; i++) {
      spawnParticles(
        60 + Math.random() * (CANVAS_SIZE - 120),
        60 + Math.random() * (CANVAS_SIZE - 120),
        8
      )
    }

    let running = true

    const loop = () => {
      if (!running) return
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

      // Subtle grid bg
      ctx.fillStyle = '#fafafa'
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      ctx.strokeStyle = 'rgba(0,0,0,0.03)'
      ctx.lineWidth = 0.5
      for (let i = 0; i <= CANVAS_SIZE; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, CANVAS_SIZE)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(CANVAS_SIZE, i)
        ctx.stroke()
      }

      const alive: Particle[] = []
      for (const p of particlesRef.current) {
        p.life += 1
        p.vy += 0.04 // gravity
        p.x += p.vx
        p.y += p.vy
        p.alpha = 1 - p.life / p.maxLife

        if (p.alpha <= 0) continue
        alive.push(p)

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * p.alpha, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
        ctx.restore()
      }
      particlesRef.current = alive

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [spawnParticles])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const scaleX = CANVAS_SIZE / rect.width
      const scaleY = CANVAS_SIZE / rect.height
      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY
      spawnParticles(x, y, 15)
    },
    [spawnParticles]
  )

  return (
    <GlassCard title="Particle Playground">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onClick={handleClick}
          style={{
            borderRadius: 12,
            border: '2px solid var(--color-border)',
            display: 'block',
            cursor: 'crosshair',
          }}
        />
        <p
          style={{
            marginTop: 10,
            fontSize: 12,
            color: 'var(--color-text-muted)',
          }}
        >
          Click anywhere to spawn particles
        </p>
      </div>
    </GlassCard>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   SECTION 4 — Cursor Trail Effects
   ══════════════════════════════════════════════════════════════════════ */

interface TrailDot {
  x: number
  y: number
  alpha: number
  color: string
  size: number
  vy: number
  shape: 'circle' | 'star' | 'fire'
}

/* --- Rainbow Trail --- */
function RainbowTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<TrailDot[]>([])
  const rafRef = useRef<number>(0)
  const hueRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let active = true

    const loop = () => {
      if (!active) return
      ctx.clearRect(0, 0, 280, 200)

      const alive: TrailDot[] = []
      for (const d of dotsRef.current) {
        d.alpha -= 0.02
        if (d.alpha <= 0) continue
        alive.push(d)
        ctx.save()
        ctx.globalAlpha = d.alpha
        ctx.fillStyle = d.color
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      dotsRef.current = alive
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      active = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      hueRef.current = (hueRef.current + 8) % 360
      dotsRef.current.push({
        x,
        y,
        alpha: 1,
        color: `hsl(${hueRef.current}, 90%, 55%)`,
        size: 3 + Math.random() * 4,
        vy: 0,
        shape: 'circle',
      })
    },
    []
  )

  return (
    <div>
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 8,
        }}
      >
        Rainbow Trail
      </p>
      <canvas
        ref={canvasRef}
        width={280}
        height={200}
        onMouseMove={handleMove}
        style={{
          borderRadius: 10,
          border: '1px solid var(--color-border)',
          background: '#111118',
          display: 'block',
          cursor: 'crosshair',
        }}
      />
    </div>
  )
}

/* --- Sparkle Trail --- */
function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<TrailDot[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let active = true

    const loop = () => {
      if (!active) return
      ctx.clearRect(0, 0, 280, 200)

      const alive: TrailDot[] = []
      for (const d of dotsRef.current) {
        d.alpha -= 0.025
        d.y += d.vy
        if (d.alpha <= 0) continue
        alive.push(d)

        // Draw star
        ctx.save()
        ctx.globalAlpha = d.alpha
        ctx.fillStyle = d.color
        ctx.translate(d.x, d.y)
        ctx.beginPath()
        const spikes = 4
        const outerR = d.size
        const innerR = d.size * 0.4
        for (let i = 0; i < spikes * 2; i++) {
          const r = i % 2 === 0 ? outerR : innerR
          const angle = (Math.PI / spikes) * i - Math.PI / 2
          if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
          else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
      dotsRef.current = alive
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      active = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const gold = Math.random() > 0.5
      dotsRef.current.push({
        x,
        y,
        alpha: 1,
        color: gold
          ? `hsl(${40 + Math.random() * 20}, 95%, 65%)`
          : `hsl(${180 + Math.random() * 40}, 80%, 70%)`,
        size: 3 + Math.random() * 5,
        vy: -0.3 - Math.random() * 0.5,
        shape: 'star',
      })
    },
    []
  )

  return (
    <div>
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 8,
        }}
      >
        Sparkle Trail
      </p>
      <canvas
        ref={canvasRef}
        width={280}
        height={200}
        onMouseMove={handleMove}
        style={{
          borderRadius: 10,
          border: '1px solid var(--color-border)',
          background: '#111118',
          display: 'block',
          cursor: 'crosshair',
        }}
      />
    </div>
  )
}

/* --- Fire Trail --- */
function FireTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<TrailDot[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let active = true

    const loop = () => {
      if (!active) return
      ctx.clearRect(0, 0, 280, 200)

      const alive: TrailDot[] = []
      for (const d of dotsRef.current) {
        d.alpha -= 0.018
        d.y += d.vy
        d.x += (Math.random() - 0.5) * 0.8
        if (d.alpha <= 0) continue
        alive.push(d)

        ctx.save()
        ctx.globalAlpha = d.alpha
        ctx.fillStyle = d.color
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size * d.alpha, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      dotsRef.current = alive
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      active = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      for (let i = 0; i < 3; i++) {
        const t = Math.random()
        let color: string
        if (t < 0.33) color = '#ff4500'
        else if (t < 0.66) color = '#ff8c00'
        else color = '#ffd700'

        dotsRef.current.push({
          x: x + (Math.random() - 0.5) * 6,
          y,
          alpha: 1,
          color,
          size: 3 + Math.random() * 5,
          vy: -1 - Math.random() * 2,
          shape: 'fire',
        })
      }
      // trim
      if (dotsRef.current.length > 300) {
        dotsRef.current = dotsRef.current.slice(-300)
      }
    },
    []
  )

  return (
    <div>
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 8,
        }}
      >
        Fire Trail
      </p>
      <canvas
        ref={canvasRef}
        width={280}
        height={200}
        onMouseMove={handleMove}
        style={{
          borderRadius: 10,
          border: '1px solid var(--color-border)',
          background: '#111118',
          display: 'block',
          cursor: 'crosshair',
        }}
      />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════════════ */

export default function GamesPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        padding: '60px 24px 80px',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <h1
            style={{
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              marginBottom: 12,
              background:
                'linear-gradient(135deg, var(--color-accent-light), #a78bfa, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Games Showcase
          </h1>
          <p
            style={{
              fontSize: 16,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            Interactive games and visual effects built with React, Canvas, and
            Framer Motion. Click, play, and explore.
          </p>
        </motion.div>

        {/* Games grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: 28,
            alignItems: 'start',
          }}
        >
          <SnakeGame />
          <MemoryGame />
          <ParticlePlayground />

          {/* Cursor Trails card */}
          <GlassCard title="Cursor Trail Effects">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                alignItems: 'center',
              }}
            >
              <RainbowTrail />
              <SparkleTrail />
              <FireTrail />
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-muted)',
                  textAlign: 'center',
                }}
              >
                Hover over each canvas to see the effect
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
