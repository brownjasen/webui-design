import { motion } from 'framer-motion'

export default function DashboardPage() {
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
      {/* Simulated chart bars */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '20%',
          gap: 12,
        }}
      >
        {[40, 65, 35, 80, 55, 90, 45, 70, 50, 85, 60, 75].map((height, i) => (
          <div
            key={i}
            style={{
              width: 24,
              height: `${height}%`,
              maxHeight: 300,
              background: 'linear-gradient(to top, var(--color-accent), var(--color-accent-light))',
              borderRadius: 4,
              opacity: 0.08,
              animation: 'dashBarGrow 2s ease-out infinite',
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>

      {/* Floating stat cards */}
      {[
        { x: '12%', y: '20%', w: 90, label: 'KPI' },
        { x: '78%', y: '15%', w: 100, label: '+24%' },
        { x: '8%', y: '65%', w: 85, label: 'Rate' },
        { x: '82%', y: '70%', w: 95, label: 'Data' },
      ].map((card, i) => (
        <div
          key={`card-${i}`}
          style={{
            position: 'absolute',
            left: card.x,
            top: card.y,
            width: card.w,
            height: 48,
            borderRadius: 8,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            opacity: 0.3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-muted)',
            animation: `dashCardFloat ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {card.label}
        </div>
      ))}

      <style>{`
        @keyframes dashBarGrow {
          0% { transform: scaleY(0.3); opacity: 0.04; }
          50% { transform: scaleY(1); opacity: 0.1; }
          100% { transform: scaleY(0.3); opacity: 0.04; }
        }
        @keyframes dashCardFloat {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(-8px); opacity: 0.35; }
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
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            marginBottom: 32,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="3" y="16" width="5" height="9" rx="1.5" fill="var(--color-accent-light)" opacity="0.5" />
            <rect x="11" y="10" width="5" height="15" rx="1.5" fill="var(--color-accent-light)" opacity="0.7" />
            <rect x="19" y="4" width="5" height="21" rx="1.5" fill="var(--color-accent-light)" opacity="0.9" />
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
          Dashboard
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
          Data visualization, real-time metrics, analytics panels, and KPI
          dashboards. Transform complex datasets into clear, actionable insights
          with charts, graphs, and beautifully organized information architecture.
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
          {['Charts', 'KPIs', 'Real-time', 'Analytics'].map((tag) => (
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
