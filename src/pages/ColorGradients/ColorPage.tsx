import { motion } from 'framer-motion'

export default function ColorPage() {
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
      {/* Animated gradient orbs */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)',
            left: '20%',
            top: '10%',
            animation: 'colorDrift1 8s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.12), transparent 70%)',
            right: '15%',
            bottom: '15%',
            animation: 'colorDrift2 10s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 0, 170, 0.1), transparent 70%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'colorDrift3 6s ease-in-out infinite',
          }}
        />

        {/* Spectrum bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            right: '10%',
            height: 3,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #00d4ff, #6366f1, #aa00ff, #ff00aa, #f59e0b, #00ff88)',
            opacity: 0.3,
            animation: 'spectrumShift 4s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes colorDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes colorDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(1.05); }
          66% { transform: translate(25px, -15px) scale(1.1); }
        }
        @keyframes colorDrift3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.3); }
        }
        @keyframes spectrumShift {
          0%, 100% { opacity: 0.2; filter: hue-rotate(0deg); }
          50% { opacity: 0.4; filter: hue-rotate(30deg); }
        }
        @keyframes spectrumSpin {
          to { transform: rotate(360deg); }
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(170, 0, 255, 0.15))',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #00d4ff, #6366f1, #aa00ff, #ff00aa, #f59e0b, #00ff88, #00d4ff)',
              animation: 'spectrumSpin 6s linear infinite',
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 48,
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--color-accent-light), var(--color-neon-blue), var(--color-neon-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 16px',
            lineHeight: 1.1,
          }}
        >
          Colors &amp; Gradients
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
          Dive into vibrant palettes, mesh gradients, color theory in action,
          and dynamic theming. See how hue, saturation, and luminance converge
          to create mood, depth, and unforgettable visual identity.
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
          {['Palettes', 'Mesh Gradients', 'Color Theory', 'Theming'].map((tag) => (
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
