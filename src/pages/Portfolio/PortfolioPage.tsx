import { motion } from 'framer-motion'

export default function PortfolioPage() {
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
      {/* Masonry-style project tiles */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {[
          { x: '6%', y: '10%', w: 180, h: 120, rot: -2 },
          { x: '70%', y: '5%', w: 200, h: 140, rot: 1 },
          { x: '3%', y: '50%', w: 160, h: 200, rot: 3 },
          { x: '75%', y: '45%', w: 190, h: 150, rot: -4 },
          { x: '40%', y: '15%', w: 150, h: 100, rot: 2 },
          { x: '35%', y: '68%', w: 170, h: 130, rot: -1 },
        ].map((tile, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: tile.x,
              top: tile.y,
              width: tile.w,
              height: tile.h,
              borderRadius: 12,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              opacity: 0.15,
              transform: `rotate(${tile.rot}deg)`,
              animation: `portfolioFade ${6 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {/* Image area */}
            <div
              style={{
                height: '65%',
                borderRadius: '12px 12px 0 0',
                background: `linear-gradient(${135 + i * 30}deg, rgba(168, 85, 247, ${0.05 + i * 0.01}), rgba(99, 102, 241, ${0.05 + i * 0.01}))`,
              }}
            />
            {/* Text lines */}
            <div style={{ padding: '10px 12px' }}>
              <div
                style={{
                  width: '60%',
                  height: 6,
                  borderRadius: 3,
                  background: 'var(--color-border)',
                  marginBottom: 6,
                }}
              />
              <div
                style={{
                  width: '40%',
                  height: 5,
                  borderRadius: 3,
                  background: 'var(--color-border)',
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
        ))}

        {/* Spotlight circle */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08), transparent 70%)',
            transform: 'translate(-50%, -50%)',
            animation: 'portfolioGlow 4s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes portfolioFade {
          0%, 100% { opacity: 0.12; transform: rotate(-2deg) translateY(0); }
          50% { opacity: 0.22; transform: rotate(1deg) translateY(-8px); }
        }
        @keyframes portfolioGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
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
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            marginBottom: 32,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="3" y="3" width="10" height="10" rx="2" stroke="#a855f7" strokeWidth="1.5" />
            <rect x="15" y="3" width="10" height="10" rx="2" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />
            <rect x="3" y="15" width="10" height="10" rx="2" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />
            <rect x="15" y="15" width="10" height="10" rx="2" stroke="#a855f7" strokeWidth="1.5" opacity="0.4" />
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
          Portfolio
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
          Minimalist showcases, creative grids, immersive galleries, and
          experimental layouts. Discover portfolio patterns that make work
          shine -- from elegant case studies to bold artistic statements.
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
          {['Minimal', 'Creative Grid', 'Case Studies', 'Experimental'].map((tag) => (
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
