import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/design-system/tokens'

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-20">
    <h2 className="mb-8 text-2xl font-bold text-gradient">{title}</h2>
    {children}
  </motion.section>
)

/* ─── Product Data ─── */
const products = [
  { id: 1, name: 'Wireless Headphones', price: 149, oldPrice: 199, category: 'Audio', color: '#6366f1', rating: 4.8, reviews: 234 },
  { id: 2, name: 'Smart Watch Pro', price: 299, oldPrice: 349, category: 'Wearable', color: '#00d4ff', rating: 4.6, reviews: 189 },
  { id: 3, name: 'Leather Backpack', price: 89, oldPrice: null, category: 'Accessories', color: '#f59e0b', rating: 4.9, reviews: 412 },
  { id: 4, name: 'Minimal Desk Lamp', price: 69, oldPrice: 89, category: 'Home', color: '#22c55e', rating: 4.7, reviews: 156 },
  { id: 5, name: 'Ceramic Mug Set', price: 34, oldPrice: null, category: 'Home', color: '#ec4899', rating: 4.5, reviews: 89 },
  { id: 6, name: 'Running Shoes', price: 179, oldPrice: 219, category: 'Sports', color: '#ef4444', rating: 4.8, reviews: 567 },
]

/* ─── 3D Tilt Card ─── */
function TiltCard({ product }: { product: typeof products[0] }) {
  const [style, setStyle] = useState({ transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)', transition: 'transform 0.1s ease-out' })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({ transform: `perspective(800px) rotateX(${-y * 15}deg) rotateY(${x * 15}deg) scale(1.02)`, transition: 'transform 0.1s ease-out' })
  }

  const handleMouseLeave = () => {
    setStyle({ transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)', transition: 'transform 0.5s ease-out' })
  }

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={style}
      className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
      <div className="relative h-44 overflow-hidden" style={{ background: `linear-gradient(135deg, ${product.color}20, ${product.color}08)` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-2xl shadow-lg" style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)` }} />
        </div>
        {product.oldPrice && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-[var(--color-text-muted)]">{product.category}</p>
        <h3 className="mt-1 font-semibold text-[var(--color-text-primary)]">{product.name}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
          {'★'.repeat(Math.floor(product.rating))} <span className="ml-1">{product.rating} ({product.reviews})</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[var(--color-text-primary)]">${product.price}</span>
            {product.oldPrice && <span className="text-sm text-[var(--color-text-muted)] line-through">${product.oldPrice}</span>}
          </div>
          <button className="rounded-lg bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white hover:bg-[var(--color-accent-light)] transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Glass Card ─── */
function GlassProductCard({ product }: { product: typeof products[0] }) {
  const [liked, setLiked] = useState(false)
  return (
    <motion.div whileHover={{ y: -4 }} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg"
      style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)' }}>
      <div className="relative h-40" style={{ background: `linear-gradient(135deg, ${product.color}15, ${product.color}05)` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-2xl" style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}99)` }} />
        </div>
        <button onClick={() => setLiked(!liked)} className="absolute right-3 top-3 text-lg transition-transform hover:scale-125">
          {liked ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[var(--color-text-primary)]">{product.name}</h3>
        <span className="text-sm font-bold text-[var(--color-accent)]">${product.price}</span>
      </div>
    </motion.div>
  )
}

/* ─── Minimal Card ─── */
function MinimalCard({ product }: { product: typeof products[0] }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-white p-3 shadow-sm">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl" style={{ background: `${product.color}15` }}>
        <div className="h-8 w-8 rounded-lg" style={{ background: product.color }} />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-[var(--color-text-primary)]">{product.name}</h3>
        <p className="text-xs text-[var(--color-text-muted)]">{product.category}</p>
      </div>
      <span className="font-bold text-[var(--color-text-primary)]">${product.price}</span>
    </motion.div>
  )
}

/* ─── Product Grid with Filters ─── */
function ProductGrid() {
  const categories = ['All', ...new Set(products.map(p => p.category))]
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? products : products.filter(p => p.category === active)

  return (
    <Section title="02 — Product Grid with Filters">
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => setActive(c)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${active === c ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
            {c}
          </button>
        ))}
      </div>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map(p => (
            <motion.div key={p.id} variants={fadeInUp} layout exit={{ opacity: 0, scale: 0.9 }}>
              <TiltCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}

/* ─── Checkout Flow ─── */
function CheckoutFlow() {
  const [step, setStep] = useState(0)
  const steps = ['Cart', 'Shipping', 'Payment', 'Confirm']

  return (
    <Section title="03 — Checkout Flow">
      <div className="glass rounded-2xl p-6">
        {/* Steps */}
        <div className="mb-8 flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`}>
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i <= step ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-surface-2)]'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-sm font-medium">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`mx-3 h-px w-12 ${i < step ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {step === 0 && (
              <div className="space-y-3">
                {products.slice(0, 3).map(p => (
                  <div key={p.id} className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] p-3">
                    <div className="h-12 w-12 rounded-lg" style={{ background: `${p.color}20` }} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">{p.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">Qty: 1</p>
                    </div>
                    <span className="font-medium text-[var(--color-text-primary)]">${p.price}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-[var(--color-border)] pt-3 text-sm">
                  <span className="text-[var(--color-text-secondary)]">Total</span>
                  <span className="font-bold text-[var(--color-text-primary)]">${products.slice(0, 3).reduce((s, p) => s + p.price, 0)}</span>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <div><label className="mb-1 block text-xs text-[var(--color-text-muted)]">Full Name</label><input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]" defaultValue="John Doe" /></div>
                <div><label className="mb-1 block text-xs text-[var(--color-text-muted)]">Address</label><input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]" defaultValue="123 Main St" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="mb-1 block text-xs text-[var(--color-text-muted)]">City</label><input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]" defaultValue="New York" /></div>
                  <div><label className="mb-1 block text-xs text-[var(--color-text-muted)]">ZIP</label><input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]" defaultValue="10001" /></div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div><label className="mb-1 block text-xs text-[var(--color-text-muted)]">Card Number</label><input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm font-mono outline-none focus:border-[var(--color-accent)]" defaultValue="•••• •••• •••• 4242" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="mb-1 block text-xs text-[var(--color-text-muted)]">Expiry</label><input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]" defaultValue="12/28" /></div>
                  <div><label className="mb-1 block text-xs text-[var(--color-text-muted)]">CVC</label><input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]" defaultValue="•••" /></div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="flex flex-col items-center gap-4 py-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                  ✓
                </motion.div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Order Confirmed!</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Your order has been placed successfully.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 3 && (
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(Math.max(0, step - 1))} className={`rounded-lg px-4 py-2 text-sm ${step === 0 ? 'invisible' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>Back</button>
            <button onClick={() => setStep(step + 1)} className="rounded-lg bg-[var(--color-accent)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-light)] transition-colors">
              {step === 2 ? 'Place Order' : 'Continue'}
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="mt-4 text-center">
            <button onClick={() => setStep(0)} className="text-sm text-[var(--color-accent)] hover:underline">Start over</button>
          </div>
        )}
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function EcommercePage() {
  return (
    <div className="px-8 py-12 lg:px-16">
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-16">
        <h1 className="text-5xl font-bold text-[var(--color-text-primary)]">E-commerce</h1>
        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
          Product cards, shopping grids, and checkout flows
        </p>
      </motion.div>

      {/* Card Styles */}
      <Section title="01 — Product Card Styles">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">3D Tilt Cards</h3>
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map(p => <TiltCard key={p.id} product={p} />)}
        </div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Glass Cards</h3>
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map(p => <GlassProductCard key={p.id} product={p} />)}
        </div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Minimal List</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {products.slice(0, 4).map(p => <MinimalCard key={p.id} product={p} />)}
        </div>
      </Section>

      <ProductGrid />
      <CheckoutFlow />
    </div>
  )
}
