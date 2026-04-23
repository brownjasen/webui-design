import { motion } from 'framer-motion'

export default function InteractivePage() {
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
      {/* Ripple rings emanating from center */}
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
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 100 + i * 100,
              height: 100 + i * 100,
              borderRadius: '50%',
              border: '1px solid var(--color-neon-green)',
              opacity: 0,
              animation: 'rippleExpand 3s ease-out infinite',
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}

        {/* Cursor crosshair element */}
        <div
          style={{
            position: 'absolute',
            width: 40,
            height: 40,
            animation: 'cursorMove 8s ease-in-out infinite',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: 1,
              height: '100%',
              background: 'var(--color-neon-green)',
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              height: 1,
              width: '100%',
              background: 'var(--color-neon-green)',
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--color-neon-green)',
              opacity: 0.6,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes rippleExpand {
          0% { transform: scale(0.3); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes cursorMove {
          0%, 100% { transform: translate(-150px, -80px); }
          25% { transform: translate(100px, -60px); }
          50% { transform: translate(120px, 70px); }
          75% { transform: translate(-100px, 50px); }
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
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'rgba(0, 255, 136, 0.08)',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            marginBottom: 32,
            cursor: 'pointer',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle
              cx="14"
              cy="14"
              r="10"
              stroke="var(--color-neon-green)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <circle cx="14" cy="14" r="3" fill="var(--color-neon-green)" opacity="0.8" />
            <line x1="14" y1="2" x2="14" y2="8" stroke="var(--color-neon-green)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="20" x2="14" y2="26" stroke="var(--color-neon-green)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="14" x2="8" y2="14" stroke="var(--color-neon-green)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="14" x2="26" y2="14" stroke="var(--color-neon-green)" strokeWidth="1.5" strokeLinecap="round" />
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
          Interactive
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
          Experience gesture-driven interfaces, drag-and-drop systems,
          magnetic cursors, and real-time feedback loops. Where every
          interaction feels tangible, responsive, and delightfully intuitive.
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
          {['Gestures', 'Drag & Drop', 'Magnetic FX', 'Haptics'].map((tag) => (
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
