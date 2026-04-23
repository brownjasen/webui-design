import { motion } from 'framer-motion'

export default function GamesPage() {
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
      {/* Scanlines overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.03,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(99, 102, 241, 0.3) 2px, rgba(99, 102, 241, 0.3) 4px)',
        }}
      />

      {/* Floating pixel elements */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Pixel grid dots */}
        {Array.from({ length: 12 }).map((_, i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          return (
            <div
              key={`pixel-${i}`}
              style={{
                position: 'absolute',
                left: `${15 + col * 22}%`,
                top: `${15 + row * 28}%`,
                width: 6,
                height: 6,
                background: i % 3 === 0 ? 'var(--color-neon-green)' : i % 3 === 1 ? 'var(--color-neon-pink)' : 'var(--color-neon-blue)',
                opacity: 0,
                animation: 'pixelBlink 2s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          )
        })}

        {/* Retro ghost shape */}
        <div
          style={{
            position: 'absolute',
            left: '20%',
            top: '30%',
            animation: 'ghostFloat 4s ease-in-out infinite',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M8 20C8 12 14 6 20 6C26 6 32 12 32 20V34L28 30L24 34L20 30L16 34L12 30L8 34V20Z"
              fill="var(--color-neon-pink)"
              opacity="0.08"
            />
          </svg>
        </div>

        {/* Space invader shape */}
        <div
          style={{
            position: 'absolute',
            right: '18%',
            top: '25%',
            animation: 'invaderMove 6s ease-in-out infinite',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="10" y="6" width="4" height="4" fill="var(--color-neon-green)" opacity="0.1" />
            <rect x="22" y="6" width="4" height="4" fill="var(--color-neon-green)" opacity="0.1" />
            <rect x="8" y="10" width="20" height="4" fill="var(--color-neon-green)" opacity="0.1" />
            <rect x="6" y="14" width="24" height="4" fill="var(--color-neon-green)" opacity="0.1" />
            <rect x="8" y="18" width="20" height="4" fill="var(--color-neon-green)" opacity="0.1" />
            <rect x="6" y="22" width="8" height="4" fill="var(--color-neon-green)" opacity="0.1" />
            <rect x="22" y="22" width="8" height="4" fill="var(--color-neon-green)" opacity="0.1" />
          </svg>
        </div>
      </div>

      {/* Score display */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--color-text-muted)',
          opacity: 0.3,
          letterSpacing: 4,
        }}
      >
        SCORE 000000 HI 999999
      </div>

      <style>{`
        @keyframes pixelBlink {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        @keyframes ghostFloat {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-5px) translateX(-10px); }
          75% { transform: translateY(-25px) translateX(5px); }
        }
        @keyframes invaderMove {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(30px); }
          50% { transform: translateX(0); }
          75% { transform: translateX(-30px); }
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
          initial={{ opacity: 0, scale: 0, rotate: 180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            marginBottom: 32,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            {/* D-pad */}
            <rect x="10" y="4" width="8" height="20" rx="2" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="4" y="10" width="20" height="8" rx="2" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            {/* Buttons */}
            <circle cx="22" cy="5" r="2.5" fill="#ef4444" opacity="0.5" />
            <circle cx="26" cy="9" r="2.5" fill="#ef4444" opacity="0.3" />
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
          Games
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
          Canvas games, particle playgrounds, cursor effects, and interactive
          puzzles. From retro arcade homages to physics simulations -- where
          play meets engineering and every click sparks joy.
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
          {['Canvas', 'Particles', 'Physics', 'Puzzles'].map((tag) => (
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
