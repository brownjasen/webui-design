import { motion } from 'framer-motion'

export default function GenerativePage() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Generative pattern background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Concentric spiral rings */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`ring-${i}`}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 100 + i * 70,
              height: 100 + i * 70,
              borderRadius: '50%',
              border: `1px solid hsla(${45 + i * 30}, 80%, 60%, 0.06)`,
              animation: `genSpiral ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * -1.5}s`,
            }}
          />
        ))}

        {/* Orbiting particles */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 160 + (i % 3) * 60
          const hue = (i * 45) % 360
          return (
            <div
              key={`particle-${i}`}
              style={{
                position: 'absolute',
                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                width: 4 + (i % 3) * 2,
                height: 4 + (i % 3) * 2,
                borderRadius: '50%',
                background: `hsl(${hue}, 80%, 60%)`,
                opacity: 0,
                animation: `genParticlePulse 3s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          )
        })}

        {/* Flowing sine wave paths */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.06,
          }}
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {[0, 1, 2].map((wave) => (
            <path
              key={`wave-${wave}`}
              d={`M0 ${300 + wave * 40} ${Array.from({ length: 20 }).map((_, i) => {
                const x = i * 55
                const y = 300 + wave * 40 + Math.sin((i + wave) * 0.8) * 80
                return `L${x} ${y}`
              }).join(' ')}`}
              fill="none"
              stroke={`hsl(${40 + wave * 20}, 80%, 60%)`}
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Center mandala pulse */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.1), transparent 70%)',
            transform: 'translate(-50%, -50%)',
            animation: 'genMandala 4s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes genSpiral {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes genParticlePulse {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.5; transform: scale(2); }
        }
        @keyframes genMandala {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.6); opacity: 1; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          textAlign: 'center',
          maxWidth: 560,
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 150 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'rgba(234, 179, 8, 0.1)',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            marginBottom: 32,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="10" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 5" />
            <circle cx="14" cy="14" r="5" stroke="#eab308" strokeWidth="1" opacity="0.6" />
            <circle cx="14" cy="14" r="1.5" fill="#eab308" opacity="0.8" />
            <line x1="14" y1="2" x2="14" y2="6" stroke="#eab308" strokeWidth="1" opacity="0.4" />
            <line x1="14" y1="22" x2="14" y2="26" stroke="#eab308" strokeWidth="1" opacity="0.4" />
            <line x1="2" y1="14" x2="6" y2="14" stroke="#eab308" strokeWidth="1" opacity="0.4" />
            <line x1="22" y1="14" x2="26" y2="14" stroke="#eab308" strokeWidth="1" opacity="0.4" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 48,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: '0 0 16px',
            lineHeight: 1.1,
          }}
        >
          Generative Art
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 17,
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            margin: 0,
          }}
        >
          Flow fields, fractal generators, particle systems, and procedural
          patterns. Where algorithms become aesthetics and code creates beauty --
          exploring the intersection of mathematics and visual art.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            marginTop: 32,
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {['Flow Fields', 'Fractals', 'Particles', 'Voronoi'].map((tag) => (
            <span
              key={tag}
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: 13,
                fontFamily: 'var(--font-mono)',
                background: 'var(--color-surface-2)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
