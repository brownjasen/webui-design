import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/design-system/tokens'

/* ------------------------------------------------------------------ */
/*  Helper: convert hex to HSL and back                               */
/* ------------------------------------------------------------------ */
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) h = ((b - r) / d + 2) / 6
    else h = ((r - g) / d + 4) / 6
  }
  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360
  s = Math.max(0, Math.min(100, s)) / 100
  l = Math.max(0, Math.min(100, l)) / 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * Math.max(0, Math.min(1, color)))
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

/* ------------------------------------------------------------------ */
/*  Shared style blocks                                                */
/* ------------------------------------------------------------------ */
const keyframes = `
  @keyframes meshMove1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.15)} }
  @keyframes meshMove2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,25px) scale(1.1)} }
  @keyframes meshMove3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(15px,15px) scale(1.2)} }
  @keyframes conicSpin { to { transform:rotate(360deg) } }
  @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes textGradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes aurora1 { 0%,100%{opacity:.4;transform:translateX(0)} 50%{opacity:.8;transform:translateX(30px)} }
  @keyframes aurora2 { 0%,100%{opacity:.5;transform:translateX(0)} 50%{opacity:.7;transform:translateX(-20px)} }
  @keyframes aurora3 { 0%,100%{opacity:.3;transform:scaleY(1)} 50%{opacity:.6;transform:scaleY(1.4)} }
  @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
`

const sectionCard: React.CSSProperties = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 20,
  padding: 32,
  marginBottom: 40,
}

const gradientTitle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 24,
  fontWeight: 700,
  background: 'linear-gradient(135deg, var(--color-accent), var(--color-neon-blue), var(--color-neon-purple))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: 8,
}

const subtitleStyle: React.CSSProperties = {
  color: 'var(--color-text-secondary)',
  fontSize: 14,
  marginBottom: 24,
}

/* ------------------------------------------------------------------ */
/*  Section 1 - Animated Gradient Gallery                              */
/* ------------------------------------------------------------------ */
function GradientGallery() {
  const mouseCardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseCardRef.current) return
    const rect = mouseCardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }, [])

  const cards: { label: string; content: React.ReactNode }[] = [
    {
      label: 'Mesh Gradient',
      content: (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 12 }}>
          <div style={{ position:'absolute', width:'60%', height:'60%', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,212,255,0.7), transparent 70%)', top:'10%', left:'10%', animation:'meshMove1 6s ease-in-out infinite' }} />
          <div style={{ position:'absolute', width:'50%', height:'50%', borderRadius:'50%', background:'radial-gradient(circle, rgba(170,0,255,0.6), transparent 70%)', bottom:'10%', right:'5%', animation:'meshMove2 8s ease-in-out infinite' }} />
          <div style={{ position:'absolute', width:'40%', height:'40%', borderRadius:'50%', background:'radial-gradient(circle, rgba(255,0,170,0.5), transparent 70%)', top:'30%', right:'20%', animation:'meshMove3 7s ease-in-out infinite' }} />
        </div>
      ),
    },
    {
      label: 'Conic Spinner',
      content: (
        <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', borderRadius: 12, overflow:'hidden', background:'#0d0d0d' }}>
          <div style={{ width: 140, height: 140, borderRadius:'50%', background:'conic-gradient(from 0deg, #00d4ff, #6366f1, #aa00ff, #ff00aa, #00ff88, #00d4ff)', animation:'conicSpin 3s linear infinite', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width: 100, height: 100, borderRadius:'50%', background:'#0d0d0d' }} />
          </div>
        </div>
      ),
    },
    {
      label: 'Shifting Linear',
      content: (
        <div
          style={{
            width:'100%', height:'100%', borderRadius: 12,
            background:'linear-gradient(90deg, #00d4ff, #6366f1, #ff00aa, #00ff88, #aa00ff, #00d4ff)',
            backgroundSize:'200% 100%',
            animation:'gradientShift 4s ease infinite',
          }}
        />
      ),
    },
    {
      label: 'Radial Follow Mouse',
      content: (
        <div
          ref={mouseCardRef}
          onMouseMove={handleMouseMove}
          style={{
            width:'100%', height:'100%', borderRadius: 12,
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0,212,255,0.8), rgba(99,102,241,0.4) 40%, rgba(23,23,23,0.9) 80%)`,
            cursor:'crosshair',
            transition:'background 0.08s ease',
          }}
        />
      ),
    },
    {
      label: 'Gradient Text',
      content: (
        <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', borderRadius: 12, background:'#0d0d0d' }}>
          <span
            style={{
              fontFamily:'var(--font-display)',
              fontSize: 32,
              fontWeight: 800,
              background:'linear-gradient(90deg, #00d4ff, #6366f1, #ff00aa, #00ff88, #00d4ff)',
              backgroundSize:'200% 100%',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent',
              backgroundClip:'text',
              animation:'textGradientShift 3s ease infinite',
            }}
          >
            Gradient
          </span>
        </div>
      ),
    },
    {
      label: 'Aurora Borealis',
      content: (
        <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', borderRadius: 12, background:'linear-gradient(180deg, #0a0a2e 0%, #1a0a3e 50%, #0a1a2e 100%)' }}>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(120deg, rgba(0,255,136,0.4) 0%, transparent 40%)', animation:'aurora1 5s ease-in-out infinite' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(200deg, rgba(0,212,255,0.35) 0%, transparent 50%)', animation:'aurora2 7s ease-in-out infinite' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, rgba(170,0,255,0.3) 0%, transparent 45%)', animation:'aurora3 6s ease-in-out infinite' }} />
        </div>
      ),
    },
  ]

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={sectionCard}
    >
      <h2 style={gradientTitle}>Animated Gradient Gallery</h2>
      <p style={subtitleStyle}>Six CSS gradient techniques with live animation and interactivity.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:20 }}>
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.5, delay: i * 0.08, ease:[0.22,1,0.36,1] as [number,number,number,number] }}
          >
            <div
              style={{
                height:200,
                borderRadius:12,
                overflow:'hidden',
                border:'1px solid var(--color-border)',
                position:'relative',
              }}
            >
              {c.content}
            </div>
            <p style={{ marginTop:8, fontSize:13, fontFamily:'var(--font-mono)', color:'var(--color-text-secondary)' }}>
              {c.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 2 - Glassmorphism Collection                               */
/* ------------------------------------------------------------------ */
function GlassmorphismCollection() {
  const glassCards = [
    { blur: 4, opacity: 0.12, label: 'Blur 4px' },
    { blur: 12, opacity: 0.15, label: 'Blur 12px' },
    { blur: 20, opacity: 0.18, label: 'Blur 20px' },
  ]

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={sectionCard}
    >
      <h2 style={gradientTitle}>Glassmorphism Collection</h2>
      <p style={subtitleStyle}>Frosted-glass effects using backdrop-filter blur with varying intensity.</p>

      {/* Stacked glass cards over gradient background */}
      <div
        style={{
          position:'relative',
          height:340,
          borderRadius:16,
          overflow:'hidden',
          background:'linear-gradient(135deg, #6366f1 0%, #00d4ff 30%, #aa00ff 60%, #ff00aa 100%)',
          marginBottom:32,
        }}
      >
        {/* Decorative shapes */}
        <div style={{ position:'absolute', width:180, height:180, borderRadius:'50%', background:'rgba(0,255,136,0.25)', top:'-40px', right:'60px' }} />
        <div style={{ position:'absolute', width:120, height:120, borderRadius:'50%', background:'rgba(255,0,170,0.3)', bottom:'20px', left:'40px' }} />

        {/* Stacked cards */}
        <div style={{ position:'absolute', top:24, left:24, zIndex:2 }}>
          {glassCards.map((gc, i) => (
            <motion.div
              key={gc.label}
              initial={{ opacity:0, x:-30 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5, delay: i * 0.12, ease:[0.22,1,0.36,1] as [number,number,number,number] }}
              style={{
                width: 200 + i * 20,
                height: 70,
                borderRadius: 12,
                background: `rgba(255,255,255,${gc.opacity})`,
                backdropFilter: `blur(${gc.blur}px)`,
                WebkitBackdropFilter: `blur(${gc.blur}px)`,
                border: '1px solid rgba(255,255,255,0.35)',
                marginBottom: 12,
                display:'flex',
                alignItems:'center',
                padding:'0 20px',
                color:'#fff',
                fontSize:13,
                fontFamily:'var(--font-mono)',
                textShadow:'0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {gc.label}
            </motion.div>
          ))}
        </div>

        {/* Glass nav bar mock */}
        <motion.div
          initial={{ opacity:0, y:-20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.5, delay:0.4, ease:[0.22,1,0.36,1] as [number,number,number,number] }}
          style={{
            position:'absolute',
            bottom: 24,
            left:'50%',
            transform:'translateX(-50%)',
            width:'80%',
            maxWidth:500,
            height:48,
            borderRadius:24,
            background:'rgba(255,255,255,0.14)',
            backdropFilter:'blur(16px)',
            WebkitBackdropFilter:'blur(16px)',
            border:'1px solid rgba(255,255,255,0.3)',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            gap:24,
          }}
        >
          {['Home', 'Explore', 'Profile', 'Settings'].map((item) => (
            <span key={item} style={{ color:'#fff', fontSize:13, fontFamily:'var(--font-sans)', textShadow:'0 1px 2px rgba(0,0,0,0.2)' }}>
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Glass modal mock */}
      <div
        style={{
          position:'relative',
          height:260,
          borderRadius:16,
          overflow:'hidden',
          background:'linear-gradient(160deg, #00d4ff 0%, #aa00ff 50%, #ff00aa 100%)',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
        }}
      >
        <div style={{ position:'absolute', width:200, height:200, borderRadius:'50%', background:'rgba(0,212,255,0.2)', top:'-60px', left:'-40px' }} />
        <div style={{ position:'absolute', width:150, height:150, borderRadius:'50%', background:'rgba(255,0,170,0.2)', bottom:'-30px', right:'20px' }} />
        <motion.div
          initial={{ opacity:0, scale:0.9 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.5, ease:[0.22,1,0.36,1] as [number,number,number,number] }}
          style={{
            width:320,
            borderRadius:16,
            background:'rgba(255,255,255,0.15)',
            backdropFilter:'blur(20px)',
            WebkitBackdropFilter:'blur(20px)',
            border:'1px solid rgba(255,255,255,0.35)',
            padding:28,
            textAlign:'center',
            color:'#fff',
          }}
        >
          <div style={{ width:48, height:48, borderRadius:14, background:'rgba(255,255,255,0.2)', margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>
            &#10024;
          </div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, marginBottom:8 }}>Glass Modal</div>
          <div style={{ fontSize:13, opacity:0.85, lineHeight:1.5, marginBottom:20 }}>
            A frosted dialog with backdrop-filter blur and semi-transparent background.
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
            <span style={{ padding:'8px 20px', borderRadius:10, background:'rgba(255,255,255,0.2)', fontSize:13, fontWeight:500 }}>Cancel</span>
            <span style={{ padding:'8px 20px', borderRadius:10, background:'rgba(255,255,255,0.35)', fontSize:13, fontWeight:600 }}>Confirm</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 3 - Neumorphism UI Kit                                     */
/* ------------------------------------------------------------------ */
function NeumorphismKit() {
  const [toggleOn, setToggleOn] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [progress, setProgress] = useState(62)

  const neuBase: React.CSSProperties = {
    background: 'var(--color-surface-2)',
    borderRadius: 16,
  }
  const raisedShadow = '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff'
  const pressedShadow = 'inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff'

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={sectionCard}
    >
      <h2 style={gradientTitle}>Neumorphism UI Kit</h2>
      <p style={subtitleStyle}>Soft extruded UI with paired light/dark box-shadows on a light surface.</p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:28 }}>
        {/* Button */}
        <div style={{ ...neuBase, padding:28, display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
          <span style={{ fontSize:13, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', marginBottom:4 }}>Button</span>
          <motion.button
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            animate={{ boxShadow: pressed ? pressedShadow : raisedShadow }}
            transition={{ duration:0.15 }}
            style={{
              ...neuBase,
              width:140,
              height:48,
              border:'none',
              cursor:'pointer',
              fontFamily:'var(--font-sans)',
              fontSize:14,
              fontWeight:600,
              color: pressed ? 'var(--color-accent)' : 'var(--color-text-primary)',
              boxShadow: raisedShadow,
            }}
          >
            {pressed ? 'Pressed' : 'Click Me'}
          </motion.button>
        </div>

        {/* Card */}
        <div style={{ ...neuBase, padding:28, display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:13, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', marginBottom:4 }}>Card</span>
          <div
            style={{
              ...neuBase,
              width:'100%',
              padding:20,
              boxShadow: raisedShadow,
            }}
          >
            <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg, var(--color-accent-light), var(--color-neon-blue))', marginBottom:12 }} />
            <div style={{ fontSize:15, fontWeight:600, color:'var(--color-text-primary)', marginBottom:4 }}>Neumorphic Card</div>
            <div style={{ fontSize:12, color:'var(--color-text-secondary)', lineHeight:1.5 }}>A softly raised container with paired shadows.</div>
          </div>
        </div>

        {/* Toggle */}
        <div style={{ ...neuBase, padding:28, display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
          <span style={{ fontSize:13, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', marginBottom:4 }}>Toggle</span>
          <div
            onClick={() => setToggleOn((v) => !v)}
            style={{
              ...neuBase,
              width:64,
              height:34,
              boxShadow: pressedShadow,
              cursor:'pointer',
              position:'relative',
              display:'flex',
              alignItems:'center',
              padding:'0 4px',
              transition:'background 0.3s',
            }}
          >
            <motion.div
              animate={{ x: toggleOn ? 30 : 0, background: toggleOn ? 'var(--color-accent)' : '#c4c4c4' }}
              transition={{ type:'spring', stiffness:400, damping:28 }}
              style={{
                width:26,
                height:26,
                borderRadius:'50%',
                boxShadow: '3px 3px 6px #d1d1d1, -3px -3px 6px #ffffff',
              }}
            />
          </div>
          <span style={{ fontSize:13, color:'var(--color-text-secondary)' }}>{toggleOn ? 'On' : 'Off'}</span>
        </div>

        {/* Input */}
        <div style={{ ...neuBase, padding:28, display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
          <span style={{ fontSize:13, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', marginBottom:4 }}>Input</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type here..."
            style={{
              ...neuBase,
              width:'100%',
              height:44,
              border:'none',
              outline:'none',
              padding:'0 16px',
              fontFamily:'var(--font-sans)',
              fontSize:14,
              color:'var(--color-text-primary)',
              boxShadow: pressedShadow,
            }}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop:28, ...neuBase, padding:24, boxShadow: raisedShadow }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
          <span style={{ fontSize:13, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)' }}>Progress Bar</span>
          <span style={{ fontSize:13, fontFamily:'var(--font-mono)', color:'var(--color-accent)' }}>{progress}%</span>
        </div>
        <div
          style={{
            width:'100%',
            height:12,
            borderRadius:6,
            boxShadow: pressedShadow,
            overflow:'hidden',
          }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration:0.5, ease:[0.22,1,0.36,1] as [number,number,number,number] }}
            style={{
              height:'100%',
              borderRadius:6,
              background:'linear-gradient(90deg, var(--color-accent), var(--color-neon-blue))',
            }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          style={{ width:'100%', marginTop:12, accentColor:'var(--color-accent)' }}
        />
      </div>
    </motion.section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 4 - CSS Filter Playground                                  */
/* ------------------------------------------------------------------ */
function FilterPlayground() {
  const [filters, setFilters] = useState({
    blur: 0,
    brightness: 100,
    contrast: 100,
    hueRotate: 0,
    saturate: 100,
    grayscale: 0,
  })

  const filterString = [
    filters.blur > 0 ? `blur(${filters.blur}px)` : '',
    filters.brightness !== 100 ? `brightness(${filters.brightness}%)` : '',
    filters.contrast !== 100 ? `contrast(${filters.contrast}%)` : '',
    filters.hueRotate !== 0 ? `hue-rotate(${filters.hueRotate}deg)` : '',
    filters.saturate !== 100 ? `saturate(${filters.saturate}%)` : '',
    filters.grayscale > 0 ? `grayscale(${filters.grayscale}%)` : '',
  ]
    .filter(Boolean)
    .join(' ') || 'none'

  type FilterKey = keyof typeof filters

  const sliders: { key: FilterKey; label: string; min: number; max: number; unit: string }[] = [
    { key: 'blur', label: 'Blur', min: 0, max: 20, unit: 'px' },
    { key: 'brightness', label: 'Brightness', min: 0, max: 200, unit: '%' },
    { key: 'contrast', label: 'Contrast', min: 0, max: 200, unit: '%' },
    { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360, unit: 'deg' },
    { key: 'saturate', label: 'Saturate', min: 0, max: 200, unit: '%' },
    { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, unit: '%' },
  ]

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={sectionCard}
    >
      <h2 style={gradientTitle}>CSS Filter Playground</h2>
      <p style={subtitleStyle}>Adjust sliders to apply real-time CSS filter effects.</p>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignItems:'start' }}>
        {/* Preview */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div
            style={{
              width:'100%',
              height:200,
              borderRadius:16,
              background:'linear-gradient(135deg, #00d4ff, #6366f1, #aa00ff, #ff00aa)',
              filter: filterString,
              transition:'filter 0.15s ease',
              boxShadow:'0 8px 32px rgba(99,102,241,0.2)',
            }}
          />
          <div
            style={{
              marginTop:16,
              padding:'10px 16px',
              borderRadius:10,
              background:'var(--color-surface-2)',
              border:'1px solid var(--color-border)',
              fontFamily:'var(--font-mono)',
              fontSize:12,
              color:'var(--color-text-secondary)',
              width:'100%',
              wordBreak:'break-all',
              lineHeight:1.6,
            }}
          >
            filter: {filterString};
          </div>
        </div>

        {/* Sliders */}
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          {sliders.map((s) => (
            <div key={s.key}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:13, fontFamily:'var(--font-mono)', color:'var(--color-text-secondary)' }}>{s.label}</span>
                <span style={{ fontSize:13, fontFamily:'var(--font-mono)', color:'var(--color-accent)' }}>
                  {filters[s.key]}{s.unit}
                </span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                value={filters[s.key]}
                onChange={(e) => setFilters((prev) => ({ ...prev, [s.key]: Number(e.target.value) }))}
                style={{ width:'100%', accentColor:'var(--color-accent)' }}
              />
            </div>
          ))}
          <button
            onClick={() =>
              setFilters({ blur:0, brightness:100, contrast:100, hueRotate:0, saturate:100, grayscale:0 })
            }
            style={{
              marginTop:8,
              padding:'8px 20px',
              borderRadius:10,
              border:'1px solid var(--color-border)',
              background:'var(--color-surface-2)',
              cursor:'pointer',
              fontFamily:'var(--font-mono)',
              fontSize:13,
              color:'var(--color-text-secondary)',
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </motion.section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section 5 - Color Palette Generator                                */
/* ------------------------------------------------------------------ */
function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#6366f1')
  const [copied, setCopied] = useState<string | null>(null)

  const { h, s, l } = hexToHSL(baseColor)

  const analogous = [
    hslToHex(h - 60, s, l),
    hslToHex(h - 30, s, l),
    baseColor,
    hslToHex(h + 30, s, l),
    hslToHex(h + 60, s, l),
  ]

  const complementary = [
    baseColor,
    hslToHex(h + 150, s, l),
    hslToHex(h + 180, s, l),
    hslToHex(h + 210, s, l),
    hslToHex(h + 30, s * 0.6, l + 15),
  ]

  const copyHex = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => { /* no-op */ })
    setCopied(hex)
  }, [])

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(null), 1200)
    return () => clearTimeout(timer)
  }, [copied])

  const renderSwatches = (colors: string[], title: string) => (
    <div style={{ marginBottom:24 }}>
      <div style={{ fontSize:14, fontWeight:600, color:'var(--color-text-primary)', marginBottom:10 }}>{title}</div>
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
        {colors.map((hex) => (
          <motion.div
            key={hex}
            whileHover={{ scale:1.08 }}
            whileTap={{ scale:0.96 }}
            onClick={() => copyHex(hex)}
            style={{
              width:80,
              cursor:'pointer',
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
            }}
          >
            <div
              style={{
                width:64,
                height:64,
                borderRadius:14,
                background: hex,
                border: '1px solid var(--color-border)',
                boxShadow:'0 4px 12px rgba(0,0,0,0.08)',
                marginBottom:6,
                position:'relative',
              }}
            >
              {copied === hex && (
                <div style={{
                  position:'absolute',
                  inset:0,
                  borderRadius:14,
                  background:'rgba(0,0,0,0.45)',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  color:'#fff',
                  fontSize:11,
                  fontFamily:'var(--font-mono)',
                }}>
                  Copied!
                </div>
              )}
            </div>
            <span style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--color-text-secondary)' }}>
              {hex.toUpperCase()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={sectionCard}
    >
      <h2 style={gradientTitle}>Color Palette Generator</h2>
      <p style={subtitleStyle}>Pick a base color to generate analogous and complementary palettes. Click a swatch to copy its hex value.</p>

      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
        <label style={{ fontSize:14, fontWeight:500, color:'var(--color-text-primary)' }}>Base Color</label>
        <input
          type="color"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          style={{ width:48, height:36, border:'none', borderRadius:8, cursor:'pointer', background:'transparent' }}
        />
        <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--color-text-secondary)' }}>
          {baseColor.toUpperCase()}
        </span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--color-text-muted)' }}>
          HSL({Math.round(h)}, {Math.round(s)}%, {Math.round(l)}%)
        </span>
      </div>

      {renderSwatches(analogous, 'Analogous (hue +/- 30/60)')}
      {renderSwatches(complementary, 'Complementary / Split-Complementary')}
    </motion.section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ColorPage() {
  return (
    <div
      style={{
        minHeight:'100vh',
        background:'var(--color-bg)',
        padding:'48px 24px',
      }}
    >
      <style>{keyframes}</style>
      <div style={{ maxWidth:960, margin:'0 auto' }}>
        {/* Page header */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, ease:[0.22,1,0.36,1] as [number,number,number,number] }}
          style={{ textAlign:'center', marginBottom:56 }}
        >
          <h1
            style={{
              fontFamily:'var(--font-display)',
              fontSize:40,
              fontWeight:700,
              background:'linear-gradient(135deg, var(--color-accent-light), var(--color-neon-blue), var(--color-neon-purple))',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent',
              backgroundClip:'text',
              marginBottom:12,
            }}
          >
            Colors &amp; Gradients
          </h1>
          <p style={{ color:'var(--color-text-secondary)', fontSize:16, maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>
            Explore animated gradients, glassmorphism, neumorphism, CSS filters, and dynamic color palettes.
          </p>
        </motion.div>

        <GradientGallery />
        <GlassmorphismCollection />
        <NeumorphismKit />
        <FilterPlayground />
        <PaletteGenerator />
      </div>
    </div>
  )
}
