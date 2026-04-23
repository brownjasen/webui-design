import { motion } from 'framer-motion'

export default function MobilePage() {
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
      {/* Phone silhouettes */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {[
          { x: '10%', y: '15%', w: 160, h: 320, rot: -8, delay: 0 },
          { x: '38%', y: '8%', w: 170, h: 340, rot: 0, delay: 0.3 },
          { x: '70%', y: '18%', w: 155, h: 310, rot: 6, delay: 0.6 },
        ].map((phone, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: phone.x,
              top: phone.y,
              width: phone.w,
              height: phone.h,
              borderRadius: 24,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              opacity: 0.2,
              transform: `rotate(${phone.rot}deg)`,
              animation: `mobileFloat ${5 + i * 0.8}s ease-in-out infinite`,
              animationDelay: `${phone.delay}s`,
              overflow: 'hidden',
            }}
          >
            {/* Notch */}
            <div
              style={{
                width: 60,
                height: 6,
                borderRadius: 3,
                background: 'var(--color-border)',
                margin: '12px auto 0',
              }}
            />
            {/* Screen content lines */}
            <div style={{ padding: '16px 12px' }}>
              {[0, 1, 2, 3].map((line) => (
                <div
                  key={line}
                  style={{
                    height: 8,
                    borderRadius: 4,
                    background: 'var(--color-surface-2)',
                    marginBottom: 8,
                    width: `${60 + ((line * 17) % 40)}%`,
                  }}
                />
              ))}
              {/* Mock image block */}
              <div
                style={{
                  height: 60,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, rgba(20, 184, 166, ${0.08 + i * 0.03}), rgba(99, 102, 241, ${0.08 + i * 0.03}))`,
                  marginBottom: 10,
                }}
              />
              {[0, 1].map((line) => (
                <div
                  key={`b-${line}`}
                  style={{
                    height: 8,
                    borderRadius: 4,
                    background: 'var(--color-surface-2)',
                    marginBottom: 8,
                    width: `${50 + ((line * 23) % 40)}%`,
                  }}
                />
              ))}
            </div>
            {/* Bottom nav bar */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 40,
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '0 20px',
              }}
            >
              {[0, 1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  style={{
                    width: dot === 1 ? 16 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: dot === 1 ? 'var(--color-accent-light)' : 'var(--color-border)',
                    opacity: dot === 1 ? 0.8 : 0.4,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes mobileFloat {
          0%, 100% { transform: translateY(0) rotate(-4deg); opacity: 0.15; }
          50% { transform: translateY(-18px) rotate(0deg); opacity: 0.25; }
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
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'rgba(20, 184, 166, 0.1)',
            border: '1px solid rgba(20, 184, 166, 0.2)',
            marginBottom: 32,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="7" y="2" width="14" height="24" rx="3" stroke="#14b8a6" strokeWidth="1.5" />
            <line x1="12" y1="22" x2="16" y2="22" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
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
          Mobile UI
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
          App interfaces, bottom sheets, swipeable cards, and native-feeling
          mobile patterns. Explore touch-first design systems, gesture navigation,
          and responsive components built for the small screen.
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
          {['Chat UI', 'Bottom Sheets', 'Swipe Cards', 'Pull to Refresh'].map((tag) => (
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
