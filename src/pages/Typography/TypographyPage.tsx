import { useState, useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/design-system/tokens'

// ─── Utility ────────────────────────────────────────────────────────
function randomChars(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

// ─── Styles ─────────────────────────────────────────────────────────
const sectionCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.04)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.07)',
  borderRadius: 24,
  padding: '48px 40px',
  position: 'relative',
  overflow: 'hidden',
}

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 28,
  fontWeight: 700,
  marginBottom: 40,
  letterSpacing: '-0.02em',
}

const sliderTrack: React.CSSProperties = {
  width: '100%',
  appearance: 'none',
  height: 4,
  borderRadius: 2,
  background: 'var(--color-border)',
  outline: 'none',
  cursor: 'pointer',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  color: 'var(--color-text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 6,
}

// ─── Section 1: Variable Font Playground ────────────────────────────
function VariableFontPlayground() {
  const weight = useMotionValue(400)
  const spacing = useMotionValue(0)
  const size = useMotionValue(72)

  const weightVal = useSpring(weight, { stiffness: 300, damping: 30 })
  const spacingVal = useSpring(spacing, { stiffness: 300, damping: 30 })
  const sizeVal = useSpring(size, { stiffness: 300, damping: 30 })

  const [w, setW] = useState(400)
  const [s, setS] = useState(0)
  const [fs, setFs] = useState(72)

  useEffect(() => {
    const unsub1 = weightVal.on('change', (v) => setW(Math.round(v)))
    const unsub2 = spacingVal.on('change', (v) => setS(Math.round(v * 10) / 10))
    const unsub3 = sizeVal.on('change', (v) => setFs(Math.round(v)))
    return () => { unsub1(); unsub2(); unsub3() }
  }, [weightVal, spacingVal, sizeVal])

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={sectionCard}
    >
      <h2 className="text-gradient" style={sectionTitle}>
        01 &mdash; Variable Font Playground
      </h2>

      {/* Font name badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          padding: '4px 14px',
          borderRadius: 999,
          background: 'rgba(99, 102, 241, 0.12)',
          color: 'var(--color-accent-light)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
        }}>
          Inter Variable
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-muted)' }}>
          weight {w} &middot; spacing {s}px &middot; size {fs}px
        </span>
      </div>

      {/* Preview */}
      <div style={{
        minHeight: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        padding: '24px 0',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: w,
          fontSize: fs,
          letterSpacing: s,
          color: 'var(--color-text-primary)',
          lineHeight: 1.1,
          whiteSpace: 'nowrap',
          transition: 'font-weight 0.15s ease',
        }}>
          The quick brown fox
        </span>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
        {([
          ['Font Weight', weight, 100, 900, 400],
          ['Letter Spacing', spacing, -10, 30, 0],
          ['Font Size', size, 24, 160, 72],
        ] as const).map(([label, mv, min, max, def]) => (
          <div key={label as string}>
            <div style={labelStyle}>{label as string}</div>
            <input
              type="range"
              min={min}
              max={max}
              defaultValue={def}
              onChange={(e) => mv.set(Number(e.target.value))}
              style={sliderTrack}
            />
          </div>
        ))}
      </div>
    </motion.section>
  )
}

// ─── Section 2: Kinetic Typography ──────────────────────────────────
function WaveText({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', overflow: 'hidden' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-display)',
            fontSize: 56,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            whiteSpace: 'pre',
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.07,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

function ScrambleText({ targetText }: { targetText: string }) {
  const [displayed, setDisplayed] = useState(() => randomChars(targetText.length))
  const [started, setStarted] = useState(false)
  const ref = useRef(false)

  useEffect(() => {
    ref.current = true
    const timeout = setTimeout(() => {
      if (!ref.current) return
      setStarted(true)
      let index = 0
      const interval = setInterval(() => {
        if (!ref.current || index >= targetText.length) {
          clearInterval(interval)
          return
        }
        index++
        setDisplayed(
          targetText.slice(0, index) + randomChars(targetText.length - index)
        )
      }, 50)
    }, 600)
    return () => {
      ref.current = false
      clearTimeout(timeout)
    }
  }, [targetText])

  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 32,
      color: started ? 'var(--color-neon-green)' : 'var(--color-text-muted)',
      textAlign: 'center',
      letterSpacing: '0.05em',
      minHeight: 48,
    }}>
      {displayed}
    </div>
  )
}

function StaggeredReveal({ text }: { text: string }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', overflow: 'hidden' }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={fadeInUp}
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-serif)',
            fontSize: 48,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            whiteSpace: 'pre',
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

function RotatingWords() {
  const words = ['websites', 'apps', 'brands', 'experiences', 'interfaces', 'systems']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      fontFamily: 'var(--font-display)',
      fontSize: 48,
      fontWeight: 700,
      flexWrap: 'wrap',
    }}>
      <span style={{ color: 'var(--color-text-secondary)' }}>We design</span>
      <span style={{
        position: 'relative',
        display: 'inline-block',
        minWidth: 260,
        textAlign: 'center',
        overflow: 'hidden',
        height: 60,
      }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: 40, opacity: 0, rotateX: -60 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -40, opacity: 0, rotateX: 60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-block',
              color: 'var(--color-accent-light)',
              position: 'absolute',
              left: 0,
              right: 0,
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}

function KineticTypographySection() {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={sectionCard}
    >
      <h2 className="text-gradient" style={sectionTitle}>
        02 &mdash; Kinetic Typography
      </h2>

      <div style={{ display: 'grid', gap: 56 }}>
        {/* Wave */}
        <div>
          <div style={{ ...labelStyle, marginBottom: 16, textAlign: 'center' }}>Sine Wave</div>
          <WaveText text="Motion is life" />
        </div>

        {/* Scramble */}
        <div>
          <div style={{ ...labelStyle, marginBottom: 16, textAlign: 'center' }}>Scramble / Decode</div>
          <ScrambleText targetText="DECRYPTING THE FUTURE" />
        </div>

        {/* Staggered */}
        <div>
          <div style={{ ...labelStyle, marginBottom: 16, textAlign: 'center' }}>Staggered Reveal</div>
          <StaggeredReveal text="Elegance in every letter" />
        </div>

        {/* Rotating */}
        <div>
          <div style={{ ...labelStyle, marginBottom: 16, textAlign: 'center' }}>Rotating Words</div>
          <RotatingWords />
        </div>
      </div>
    </motion.section>
  )
}

// ─── Section 3: Text Effects Gallery ────────────────────────────────
function GradientText() {
  return (
    <div style={{
      fontSize: 72,
      fontWeight: 800,
      fontFamily: 'var(--font-display)',
      lineHeight: 1,
      textAlign: 'center',
      background: 'linear-gradient(90deg, #00d4ff, #6366f1, #aa00ff, #ff00aa, #00ff88, #00d4ff)',
      backgroundSize: '300% 100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'gradientShift 4s linear infinite',
    }}>
      Chromatic Flow
    </div>
  )
}

function GlitchText() {
  return (
    <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
      <style>{`
        @keyframes glitch1 {
          0%, 100% { clip-path: inset(0 0 90% 0); transform: translate(-3px, -2px); }
          25% { clip-path: inset(20% 0 60% 0); transform: translate(3px, 1px); }
          50% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 3px); }
          75% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -1px); }
        }
        @keyframes glitch2 {
          0%, 100% { clip-path: inset(80% 0 0 0); transform: translate(3px, 2px); }
          25% { clip-path: inset(10% 0 70% 0); transform: translate(-3px, -1px); }
          50% { clip-path: inset(40% 0 40% 0); transform: translate(2px, -3px); }
          75% { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 1px); }
        }
      `}</style>
      <div style={{
        fontSize: 72,
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        color: 'var(--color-text-primary)',
        lineHeight: 1,
        position: 'relative',
        zIndex: 1,
      }}>
        GLITCH
      </div>
      <div style={{
        fontSize: 72,
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        color: 'var(--color-neon-blue)',
        position: 'absolute',
        top: 0,
        left: 0,
        lineHeight: 1,
        animation: 'glitch1 2.5s infinite linear',
        opacity: 0.7,
        mixBlendMode: 'screen',
      }}>
        GLITCH
      </div>
      <div style={{
        fontSize: 72,
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        color: 'var(--color-neon-pink)',
        position: 'absolute',
        top: 0,
        left: 0,
        lineHeight: 1,
        animation: 'glitch2 2.5s infinite linear',
        opacity: 0.7,
        mixBlendMode: 'screen',
      }}>
        GLITCH
      </div>
    </div>
  )
}

function NeonText() {
  return (
    <div style={{ textAlign: 'center' }}>
      <style>{`
        @keyframes neonFlicker {
          0%, 100% { opacity: 1; }
          5% { opacity: 0.4; }
          6% { opacity: 1; }
          10% { opacity: 0.6; }
          11% { opacity: 1; }
          50% { opacity: 1; }
          51% { opacity: 0.7; }
          52% { opacity: 1; }
          80% { opacity: 1; }
          81% { opacity: 0.3; }
          82% { opacity: 1; }
          83% { opacity: 0.5; }
          84% { opacity: 1; }
        }
      `}</style>
      <div style={{
        fontSize: 72,
        fontWeight: 200,
        fontFamily: 'var(--font-display)',
        color: 'var(--color-neon-pink)',
        textShadow: `
          0 0 7px rgba(255, 0, 170, 0.8),
          0 0 20px rgba(255, 0, 170, 0.6),
          0 0 42px rgba(255, 0, 170, 0.4),
          0 0 82px rgba(255, 0, 170, 0.2),
          0 0 120px rgba(255, 0, 170, 0.1)
        `,
        animation: 'neonFlicker 4s infinite',
        lineHeight: 1,
        letterSpacing: '0.1em',
      }}>
        NEON
      </div>
    </div>
  )
}

function StrokeText() {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 72,
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        textAlign: 'center',
        lineHeight: 1,
        color: hovered ? 'var(--color-accent-light)' : 'transparent',
        WebkitTextStroke: hovered ? '1px var(--color-accent-light)' : '2px var(--color-text-primary)',
        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        cursor: 'pointer',
      }}
    >
      OUTLINE
    </div>
  )
}

function ExtrudedText() {
  const layers = 12
  const shadows = Array.from({ length: layers }, (_, i) => {
    const depth = i + 1
    const ratio = depth / layers
    const r = Math.round(99 + (0 - 99) * ratio)
    const g = Math.round(102 + (212 - 102) * ratio)
    const b = Math.round(241 + (255 - 241) * ratio)
    return `${depth}px ${depth}px 0 rgb(${r},${g},${b})`
  }).join(', ')

  return (
    <div style={{
      fontSize: 64,
      fontWeight: 900,
      fontFamily: 'var(--font-display)',
      color: 'var(--color-text-primary)',
      textShadow: shadows,
      textAlign: 'center',
      lineHeight: 1,
      letterSpacing: '-0.02em',
    }}>
      DEPTH
    </div>
  )
}

function TypewriterText() {
  const text = 'The art of typography is the art of breathing life into words.'
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, 55)
    return () => clearInterval(interval)
  }, [text])

  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      color: 'var(--color-text-primary)',
      textAlign: 'center',
      lineHeight: 1.6,
      minHeight: 60,
    }}>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: 2,
        height: 24,
        background: 'var(--color-accent-light)',
        marginLeft: 2,
        verticalAlign: 'text-bottom',
        animation: done ? 'blink 0.8s step-end infinite' : 'none',
        opacity: done ? undefined : 1,
      }} />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function TextEffectsSection() {
  const effects = [
    { label: 'Gradient Text', component: <GradientText /> },
    { label: 'Glitch Effect', component: <GlitchText /> },
    { label: 'Neon Sign', component: <NeonText /> },
    { label: 'Stroke / Outline', component: <StrokeText /> },
    { label: '3D Extruded', component: <ExtrudedText /> },
    { label: 'Typewriter', component: <TypewriterText /> },
  ]

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={sectionCard}
    >
      <h2 className="text-gradient" style={sectionTitle}>
        03 &mdash; Text Effects Gallery
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 24,
      }}>
        {effects.map(({ label, component }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.01, y: -4 }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 16,
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <div style={{ ...labelStyle, alignSelf: 'flex-start' }}>{label}</div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 100,
              width: '100%',
            }}>
              {component}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// ─── Section 4: Creative Type Compositions ──────────────────────────
function MagazineDropCap() {
  return (
    <div style={{
      fontFamily: 'var(--font-serif)',
      fontSize: 16,
      lineHeight: 1.8,
      color: 'var(--color-text-secondary)',
      maxWidth: 540,
      columns: 2,
      columnGap: 32,
    }}>
      <span style={{
        float: 'left',
        fontFamily: 'var(--font-serif)',
        fontSize: 96,
        fontWeight: 700,
        lineHeight: 0.8,
        color: 'var(--color-accent-light)',
        marginRight: 12,
        marginTop: 8,
      }}>
        T
      </span>
      ypography is the craft of endowing human language with a durable visual form.
      It is an art that exists in the space between the reader and the writer,
      transforming abstract thought into tangible marks on a page or screen.
      Good typography is invisible &mdash; it serves the content without calling
      attention to itself. The best typefaces are designed with such care that they
      become transparent conduits for meaning. Every curve, every counter, every
      serif has been considered in relation to the whole. This is the silent art
      that shapes how we read, understand, and feel about the written word.
    </div>
  )
}

function MixedTypeGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20,
    }}>
      {[
        { font: 'var(--font-display)', weight: 700, size: 42, text: 'Space Grotesk', sub: 'Bold 700 / 42px' },
        { font: 'var(--font-sans)', weight: 300, size: 28, text: 'Inter Light', sub: 'Light 300 / 28px' },
        { font: 'var(--font-serif)', weight: 400, size: 36, text: 'Playfair', sub: 'Regular 400 / 36px' },
        { font: 'var(--font-mono)', weight: 500, size: 22, text: 'JetBrains Mono', sub: 'Medium 500 / 22px' },
        { font: 'var(--font-display)', weight: 300, size: 52, text: 'Thin Display', sub: 'Light 300 / 52px' },
        { font: 'var(--font-serif)', weight: 700, size: 48, text: 'Bold Serif', sub: 'Bold 700 / 48px' },
      ].map(({ font, weight, size, text, sub }) => (
        <div key={text + weight} style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 12,
          padding: '20px 24px',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ fontFamily: font, fontWeight: weight, fontSize: size, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
            {text}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-muted)', marginTop: 8 }}>
            {sub}
          </div>
        </div>
      ))}
    </div>
  )
}

function OverlappingText() {
  return (
    <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 120,
        fontWeight: 900,
        color: 'var(--color-neon-blue)',
        opacity: 0.5,
        mixBlendMode: 'screen',
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>
        TYPE
      </div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 120,
        fontWeight: 900,
        color: 'var(--color-neon-pink)',
        opacity: 0.5,
        mixBlendMode: 'screen',
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>
        FORM
      </div>
    </div>
  )
}

function TextAsMask() {
  return (
    <div style={{
      fontSize: 100,
      fontWeight: 900,
      fontFamily: 'var(--font-display)',
      textAlign: 'center',
      lineHeight: 1,
      background: 'linear-gradient(135deg, #00d4ff 0%, #6366f1 30%, #aa00ff 60%, #ff00aa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '-0.03em',
    }}>
      VISION
    </div>
  )
}

function CreativeCompositionsSection() {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={sectionCard}
    >
      <h2 className="text-gradient" style={sectionTitle}>
        04 &mdash; Creative Compositions
      </h2>

      <div style={{ display: 'grid', gap: 56 }}>
        {/* Drop Cap */}
        <div>
          <div style={{ ...labelStyle, marginBottom: 20 }}>Magazine Drop Cap</div>
          <MagazineDropCap />
        </div>

        {/* Mixed Type Grid */}
        <div>
          <div style={{ ...labelStyle, marginBottom: 20 }}>Mixed Type Grid</div>
          <MixedTypeGrid />
        </div>

        {/* Overlapping Text + Text as Mask side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <div style={{ ...labelStyle, marginBottom: 20 }}>Overlapping Blend</div>
            <OverlappingText />
          </div>
          <div>
            <div style={{ ...labelStyle, marginBottom: 20 }}>Text as Mask</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180 }}>
              <TextAsMask />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// ─── Section 5: Font Pairing Showcase ───────────────────────────────
const pairings = [
  {
    heading: 'Playfair Display',
    headingFont: 'var(--font-serif)',
    headingWeight: 700,
    body: 'Inter works beautifully as a neutral body companion, providing excellent readability at small sizes while the serif heading commands attention.',
    bodyFont: 'var(--font-sans)',
    bodyWeight: 400,
    tags: ['Serif + Sans', 'Editorial', 'Classic'],
  },
  {
    heading: 'Space Grotesk',
    headingFont: 'var(--font-display)',
    headingWeight: 700,
    body: 'JetBrains Mono adds a technical precision as body text, perfect for documentation, developer tools, and data-heavy interfaces that demand clarity.',
    bodyFont: 'var(--font-mono)',
    bodyWeight: 400,
    tags: ['Display + Mono', 'Technical', 'Modern'],
  },
  {
    heading: 'Space Grotesk',
    headingFont: 'var(--font-display)',
    headingWeight: 700,
    body: 'Paired with Inter for body copy, this combination delivers a contemporary feel with strong hierarchy and excellent legibility across all sizes.',
    bodyFont: 'var(--font-sans)',
    bodyWeight: 400,
    tags: ['Display + Sans', 'Corporate', 'Clean'],
  },
  {
    heading: 'Playfair Display',
    headingFont: 'var(--font-serif)',
    headingWeight: 400,
    body: 'Combined with JetBrains Mono for a luxurious yet technical aesthetic, bridging the gap between editorial elegance and digital precision.',
    bodyFont: 'var(--font-mono)',
    bodyWeight: 400,
    tags: ['Serif + Mono', 'Editorial Tech', 'Refined'],
  },
]

function FontPairingSection() {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={sectionCard}
    >
      <h2 className="text-gradient" style={sectionTitle}>
        05 &mdash; Font Pairing Showcase
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {pairings.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(99,102,241,0.12)' }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: 32,
              cursor: 'default',
            }}
          >
            <h3 style={{
              fontFamily: p.headingFont,
              fontWeight: p.headingWeight,
              fontSize: 28,
              color: 'var(--color-text-primary)',
              margin: '0 0 6px',
              lineHeight: 1.2,
            }}>
              {p.heading}
            </h3>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--color-text-muted)',
              marginBottom: 16,
            }}>
              {p.headingWeight} / {p.headingFont.includes('serif') ? 'Playfair Display' : p.headingFont.includes('display') ? 'Space Grotesk' : 'Inter'}
            </div>
            <p style={{
              fontFamily: p.bodyFont,
              fontWeight: p.bodyWeight,
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              margin: '0 0 16px',
            }}>
              {p.body}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {p.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  padding: '3px 10px',
                  borderRadius: 999,
                  background: 'rgba(99,102,241,0.1)',
                  color: 'var(--color-accent-light)',
                  border: '1px solid rgba(99,102,241,0.15)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────
export default function TypographyPage() {
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--color-bg)',
      overflowX: 'hidden',
    }}>
      {/* Global animations */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-accent-light);
          cursor: pointer;
          box-shadow: 0 0 8px rgba(129, 140, 248, 0.5);
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-accent-light);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(129, 140, 248, 0.5);
        }
      `}</style>

      {/* Ambient background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)',
          top: '5%',
          left: '10%',
          animation: 'typoOrb1 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%)',
          bottom: '10%',
          right: '5%',
          animation: 'typoOrb2 15s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,0,170,0.05), transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'typoOrb3 10s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes typoOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes typoOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.05); }
        }
        @keyframes typoOrb3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '100px 32px 0',
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              borderRadius: 20,
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              marginBottom: 28,
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--color-accent-light)',
            }}
          >
            Aa
          </motion.div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 56,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: '0 0 16px',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}>
            Typography Showcase
          </h1>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 17,
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            maxWidth: 600,
            margin: '0 auto 28px',
          }}>
            A comprehensive exploration of type: variable fonts, kinetic animations,
            creative effects, and curated pairings that bring words to life.
          </p>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Variable Fonts', 'Kinetic Type', 'Text Effects', 'Compositions', 'Pairings'].map((tag) => (
              <span key={tag} style={{
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                background: 'var(--color-surface-2)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <div style={{ display: 'grid', gap: 48, paddingBottom: 100 }}>
          <VariableFontPlayground />
          <KineticTypographySection />
          <TextEffectsSection />
          <CreativeCompositionsSection />
          <FontPairingSection />
        </div>
      </motion.div>
    </div>
  )
}
