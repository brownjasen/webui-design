import { motion } from 'framer-motion'

export default function EcommercePage() {
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
      {/* Floating product card silhouettes */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {[
          { x: '8%', y: '12%', w: 140, h: 180, rot: -6 },
          { x: '75%', y: '8%', w: 120, h: 160, rot: 4 },
          { x: '5%', y: '55%', w: 110, h: 150, rot: 8 },
          { x: '80%', y: '58%', w: 130, h: 170, rot: -3 },
          { x: '38%', y: '75%', w: 100, h: 140, rot: 5 },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: card.x,
              top: card.y,
              width: card.w,
              height: card.h,
              borderRadius: 12,
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              opacity: 0.2,
              transform: `rotate(${card.rot}deg)`,
              animation: `ecomFloat ${5 + i * 0.7}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {/* Image placeholder area */}
            <div
              style={{
                height: '60%',
                background: `linear-gradient(135deg, rgba(249, 115, 22, ${0.05 + i * 0.02}), rgba(99, 102, 241, ${0.05 + i * 0.02}))`,
                borderRadius: '12px 12px 0 0',
              }}
            />
          </div>
        ))}

        {/* Price tag shapes */}
        {[
          { x: '60%', y: '25%', delay: 0 },
          { x: '25%', y: '40%', delay: 0.5 },
          { x: '70%', y: '72%', delay: 1 },
        ].map((tag, i) => (
          <div
            key={`tag-${i}`}
            style={{
              position: 'absolute',
              left: tag.x,
              top: tag.y,
              width: 48,
              height: 24,
              borderRadius: 4,
              background: 'rgba(249, 115, 22, 0.15)',
              border: '1px solid rgba(249, 115, 22, 0.2)',
              animation: `ecomTagBounce 3s ease-in-out infinite`,
              animationDelay: `${tag.delay}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes ecomFloat {
          0%, 100% { transform: translateY(0) rotate(-3deg); opacity: 0.15; }
          50% { transform: translateY(-15px) rotate(3deg); opacity: 0.25; }
        }
        @keyframes ecomTagBounce {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
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
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'rgba(249, 115, 22, 0.1)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            marginBottom: 32,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M4 4h3l1.5 3M10 16h11l3-9H8.5" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="11" cy="22" r="2" stroke="#f97316" strokeWidth="1.5" />
            <circle cx="20" cy="22" r="2" stroke="#f97316" strokeWidth="1.5" />
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
          E-commerce
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
          Product cards that pop, shopping experiences that flow, checkout
          processes that convert. Explore hover effects, cart animations,
          image galleries, and purchase interactions that delight users.
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
          {['Product Cards', 'Galleries', 'Checkout', 'Cart Animations'].map((tag) => (
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
