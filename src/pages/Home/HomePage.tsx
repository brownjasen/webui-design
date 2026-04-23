import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { staggerContainer, fadeInUp } from '@/design-system/tokens'
import {
  Type, Sparkles, LayoutGrid, Box, MousePointer,
  Palette, BarChart3, ShoppingBag, Briefcase, Gamepad2,
  Smartphone, Wand2,
} from 'lucide-react'

function ParticleField() {
  const ref = useRef<THREE.Points>(null!)
  const count = 3000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      const posArray = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        posArray[i3 + 1] += Math.sin(state.clock.elapsedTime + posArray[i3]) * 0.001
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

const showcaseItems = [
  { path: '/typography', label: 'Typography', icon: Type, color: '#f59e0b', desc: 'Variable fonts, kinetic text, creative effects' },
  { path: '/animations', label: 'Animations', icon: Sparkles, color: '#ec4899', desc: 'CSS, GSAP, Framer Motion, scroll effects' },
  { path: '/layouts', label: 'Layouts', icon: LayoutGrid, color: '#22c55e', desc: 'Grid art, bento, flexbox, responsive' },
  { path: '/3d', label: '3D & WebGL', icon: Box, color: '#00d4ff', desc: 'Particles, shaders, interactive objects' },
  { path: '/interactive', label: 'Interactive', icon: MousePointer, color: '#8b5cf6', desc: 'Forms, drag & drop, gestures, data viz' },
  { path: '/colors', label: 'Colors', icon: Palette, color: '#f472b6', desc: 'Gradients, glass, neumorphism, themes' },
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3, color: '#06b6d4', desc: 'Charts, admin panels, real-time data' },
  { path: '/ecommerce', label: 'E-commerce', icon: ShoppingBag, color: '#f97316', desc: 'Product cards, shopping, checkout' },
  { path: '/portfolio', label: 'Portfolio', icon: Briefcase, color: '#a855f7', desc: 'Minimal, creative, grid, experimental' },
  { path: '/games', label: 'Games', icon: Gamepad2, color: '#ef4444', desc: 'Snake, memory, particles, playground' },
  { path: '/mobile', label: 'Mobile UI', icon: Smartphone, color: '#14b8a6', desc: 'App interfaces, bottom sheets, swipe' },
  { path: '/generative', label: 'Generative Art', icon: Wand2, color: '#eab308', desc: 'Flow fields, fractals, patterns' },
]

function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <motion.span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex h-screen items-center justify-center">
        {/* 3D Particle Background */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ParticleField />
          </Canvas>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />

        {/* Animated Gradient Blobs */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full opacity-20 blur-[120px] animate-pulse"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full opacity-15 blur-[120px] animate-pulse"
          style={{ background: 'radial-gradient(circle, #00d4ff, transparent)', animationDelay: '1s' }} />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedText
              text="WebUI.Design"
              className="text-7xl font-bold tracking-tight md:text-9xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6 text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto"
          >
            A showcase of everything beautiful in web design.
            <br />
            <span className="text-[var(--color-accent-light)]">13 pages. Infinite inspiration.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Link
              to="/animations"
              className="rounded-full bg-[var(--color-accent)] px-8 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-[var(--color-accent)]/25"
            >
              Explore Showcase
            </Link>
            <Link
              to="/3d"
              className="rounded-full border border-[var(--color-border)] px-8 py-3 font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)] hover:scale-105"
            >
              3D Demo
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-[var(--color-text-muted)]">Scroll to explore</span>
            <div className="h-8 w-5 rounded-full border-2 border-[var(--color-text-muted)] p-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="h-2 w-1.5 rounded-full bg-[var(--color-text-muted)]"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Showcase Grid */}
      <section className="relative px-6 py-20 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-center text-4xl font-bold"
          >
            <span className="text-gradient">Showcase Collection</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mb-16 text-center text-[var(--color-text-secondary)]"
          >
            Each page is a curated gallery of design patterns and interactive experiments
          </motion.p>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseItems.map((item, index) => (
              <motion.div key={item.path} variants={fadeInUp}>
                <Link
                  to={item.path}
                  className="group relative block overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-500 hover:border-transparent hover:scale-[1.02]"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {/* Hover Glow */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${item.color}15, transparent 70%)`,
                    }}
                  />

                  {/* Border Glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${item.color}40, 0 0 20px ${item.color}10`,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                      >
                        <item.icon size={20} />
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)]">
                      {item.label}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <div className="glass rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              {[
                { label: 'Showcase Pages', value: '13' },
                { label: 'Animation Types', value: '100+' },
                { label: 'Design Patterns', value: '50+' },
                { label: 'Interactive Demos', value: '200+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="mt-1 text-sm text-[var(--color-text-secondary)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] px-6 py-8 text-center">
        <p className="text-sm text-[var(--color-text-muted)]">
          Built with React · Three.js · Framer Motion · Tailwind CSS
        </p>
      </footer>
    </div>
  )
}
