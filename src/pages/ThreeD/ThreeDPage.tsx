import { motion } from 'framer-motion'

export default function ThreeDPage() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        perspective: 800,
      }}
    >
      {/* Rotating 3D cube wireframe */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 240,
            height: 240,
            transformStyle: 'preserve-3d',
            animation: 'cubeRotate 12s linear infinite',
          }}
        >
          {[
            'rotateY(0deg) translateZ(120px)',
            'rotateY(90deg) translateZ(120px)',
            'rotateY(180deg) translateZ(120px)',
            'rotateY(270deg) translateZ(120px)',
            'rotateX(90deg) translateZ(120px)',
            'rotateX(-90deg) translateZ(120px)',
          ].map((transform, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 240,
                height: 240,
                border: '1px solid var(--color-accent)',
                opacity: 0.12,
                transform,
                backfaceVisibility: 'visible',
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating vertices */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 280
        return (
          <div
            key={`dot-${i}`}
            style={{
              position: 'absolute',
              left: `calc(50% + ${Math.cos(angle) * radius}px)`,
              top: `calc(50% + ${Math.sin(angle) * radius}px)`,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'var(--color-neon-blue)',
              opacity: 0.4,
              animation: `vertexPulse 2s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        )
      })}

      <style>{`
        @keyframes cubeRotate {
          0% { transform: rotateX(20deg) rotateY(0deg); }
          100% { transform: rotateX(20deg) rotateY(360deg); }
        }
        @keyframes vertexPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(2); }
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
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 150 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            marginBottom: 32,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4L28 12V24L16 28L4 24V12L16 4Z" stroke="var(--color-accent-light)" strokeWidth="1.5" fill="none" />
            <path d="M16 4V16M16 16L28 12M16 16L4 12M16 16V28" stroke="var(--color-neon-blue)" strokeWidth="1" opacity="0.6" />
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
          3D & WebGL
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
          Step into immersive 3D experiences powered by Three.js and React Three
          Fiber. Explore interactive scenes, shader effects, post-processing, and
          spatial interfaces that push the boundaries of the browser.
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
          {['Three.js', 'Shaders', 'Post-Processing', 'Spatial UI'].map((tag) => (
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
