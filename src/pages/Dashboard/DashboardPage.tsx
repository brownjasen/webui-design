import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/design-system/tokens'

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-20">
    <h2 className="mb-8 text-2xl font-bold text-gradient">{title}</h2>
    {children}
  </motion.section>
)

/* ─── Stat Cards ─── */
const stats = [
  { label: 'Total Revenue', value: '$48,294', change: '+12.5%', positive: true, sparkline: [20, 35, 25, 45, 30, 55, 40, 65, 50, 70, 60, 80] },
  { label: 'Active Users', value: '2,847', change: '+8.2%', positive: true, sparkline: [40, 30, 45, 35, 50, 45, 55, 50, 60, 55, 70, 65] },
  { label: 'Conversion', value: '3.42%', change: '-2.1%', positive: false, sparkline: [60, 55, 50, 52, 48, 45, 47, 42, 44, 40, 38, 35] },
  { label: 'Avg. Session', value: '4m 32s', change: '+5.7%', positive: true, sparkline: [30, 35, 40, 38, 45, 42, 48, 50, 47, 55, 52, 58] },
]

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const h = 32; const w = 80
  const step = w / (data.length - 1)
  const d = data.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(h - (p / max) * h).toFixed(1)}`).join(' ')
  return <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-20"><path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
}

function StatCards() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <motion.div key={s.label} variants={fadeInUp}
          className="glass flex items-start justify-between rounded-2xl p-5">
          <div>
            <p className="text-sm text-[var(--color-text-secondary)]">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-[var(--color-text-primary)]">{s.value}</p>
            <span className={`mt-1 inline-block text-xs font-medium ${s.positive ? 'text-green-600' : 'text-red-500'}`}>{s.change}</span>
          </div>
          <MiniSparkline data={s.sparkline} color={s.positive ? '#22c55e' : '#ef4444'} />
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Line Chart ─── */
function LineChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const data1 = [30, 45, 35, 60, 50, 75, 65, 85, 70, 90, 80, 95]
  const data2 = [20, 30, 25, 40, 35, 50, 45, 60, 55, 65, 60, 70]
  const max = 100
  const h = 200; const w = 500
  const step = w / (months.length - 1)
  const toPath = (data: number[]) => data.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(h - (p / max) * h).toFixed(1)}`).join(' ')
  const toArea = (data: number[]) => `${toPath(data)} L${w},${h} L0,${h} Z`

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Revenue Overview</h3>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-[#6366f1]" />Revenue</span>
          <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-[#00d4ff]" />Profit</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={0} y1={h - (v / max) * h} x2={w} y2={h - (v / max) * h} stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4" />
            <text x={0} y={h - (v / max) * h - 4} fontSize="8" fill="var(--color-text-muted)">{v}k</text>
          </g>
        ))}
        {/* Areas */}
        <path d={toArea(data1)} fill="rgba(99,102,241,0.1)" />
        <path d={toArea(data2)} fill="rgba(0,212,255,0.1)" />
        {/* Lines */}
        <path d={toPath(data1)} fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
        <path d={toPath(data2)} fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
        {/* Dots */}
        {data1.map((p, i) => <circle key={`a${i}`} cx={(i * step).toFixed(1)} cy={(h - (p / max) * h).toFixed(1)} r="3" fill="#6366f1" />)}
        {/* Labels */}
        {months.map((m, i) => <text key={m} x={(i * step).toFixed(1)} y={h + 14} fontSize="8" fill="var(--color-text-muted)" textAnchor="middle">{m}</text>)}
      </svg>
    </div>
  )
}

/* ─── Bar Chart ─── */
function BarChart() {
  const data = [
    { label: 'Mon', value: 65 }, { label: 'Tue', value: 45 }, { label: 'Wed', value: 80 },
    { label: 'Thu', value: 55 }, { label: 'Fri', value: 90 }, { label: 'Sat', value: 40 }, { label: 'Sun', value: 70 },
  ]
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Weekly Activity</h3>
      <div className="flex items-end justify-between gap-3" style={{ height: 160 }}>
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative w-full overflow-hidden rounded-lg bg-[var(--color-surface-2)]" style={{ height: 140 }}>
              <motion.div
                className="absolute inset-x-0 bottom-0 rounded-lg"
                style={{ background: 'linear-gradient(to top, #6366f1, #818cf8)' }}
                initial={{ height: 0 }}
                whileInView={{ height: `${d.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              />
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Donut Chart ─── */
function DonutChart() {
  const segments = [
    { label: 'Direct', value: 40, color: '#6366f1' },
    { label: 'Social', value: 25, color: '#00d4ff' },
    { label: 'Referral', value: 20, color: '#22c55e' },
    { label: 'Other', value: 15, color: '#f59e0b' },
  ]
  const total = segments.reduce((s, d) => s + d.value, 0)
  let cum = 0

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Traffic Source</h3>
      <div className="flex items-center gap-6">
        <svg viewBox="0 0 36 36" className="h-32 w-32 shrink-0 -rotate-90">
          {segments.map((s) => {
            const offset = cum; cum += s.value
            return <circle key={s.label} cx="18" cy="18" r="14" fill="none" stroke={s.color} strokeWidth="4"
              strokeDasharray={`${(s.value / total) * 87.96} 87.96`} strokeDashoffset={`${-(offset / total) * 87.96}`} />
          })}
        </svg>
        <div className="space-y-2">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              <span className="text-[var(--color-text-secondary)]">{s.label}</span>
              <span className="ml-auto font-medium text-[var(--color-text-primary)]">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Data Table ─── */
const tableData = [
  { id: '#ORD-7291', customer: 'Sarah Chen', product: 'Pro Plan', amount: '$299', status: 'Completed' },
  { id: '#ORD-7290', customer: 'Alex Rivera', product: 'Team Plan', amount: '$599', status: 'Processing' },
  { id: '#ORD-7289', customer: 'James Wilson', product: 'Starter', amount: '$49', status: 'Completed' },
  { id: '#ORD-7288', customer: 'Emily Park', product: 'Pro Plan', amount: '$299', status: 'Pending' },
  { id: '#ORD-7287', customer: 'Marcus Lee', product: 'Enterprise', amount: '$1,299', status: 'Completed' },
]

function DataTable() {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Recent Orders</h3>
        <button className="text-xs text-[var(--color-accent)] hover:underline">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
              <th className="px-6 py-3 font-medium text-[var(--color-text-muted)]">Order</th>
              <th className="px-6 py-3 font-medium text-[var(--color-text-muted)]">Customer</th>
              <th className="px-6 py-3 font-medium text-[var(--color-text-muted)]">Product</th>
              <th className="px-6 py-3 font-medium text-[var(--color-text-muted)]">Amount</th>
              <th className="px-6 py-3 font-medium text-[var(--color-text-muted)]">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-2)] transition-colors">
                <td className="px-6 py-3 font-mono text-xs text-[var(--color-accent)]">{row.id}</td>
                <td className="px-6 py-3 text-[var(--color-text-primary)]">{row.customer}</td>
                <td className="px-6 py-3 text-[var(--color-text-secondary)]">{row.product}</td>
                <td className="px-6 py-3 font-medium text-[var(--color-text-primary)]">{row.amount}</td>
                <td className="px-6 py-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    row.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    row.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── Real-Time Counter ─── */
function RealtimeCounter() {
  const [value, setValue] = useState(48294)
  const ref = useRef(false)
  useEffect(() => {
    if (ref.current) return
    ref.current = true
    const iv = setInterval(() => setValue(v => v + Math.floor(Math.random() * 10)), 2000)
    return () => clearInterval(iv)
  }, [])
  return (
    <div className="glass flex items-center justify-between rounded-2xl p-5">
      <div>
        <p className="text-sm text-[var(--color-text-secondary)]">Live Visitors</p>
        <motion.p key={value} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-[var(--color-text-primary)]">{value.toLocaleString()}</motion.p>
      </div>
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
        </span>
        <span className="text-xs text-green-600">Live</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  return (
    <div className="px-8 py-12 lg:px-16">
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-16">
        <h1 className="text-5xl font-bold text-[var(--color-text-primary)]">Dashboard</h1>
        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
          Charts, data tables, stat cards, and real-time data visualization
        </p>
      </motion.div>

      {/* Stats + Live Counter */}
      <Section title="Overview">
        <StatCards />
        <RealtimeCounter />
      </Section>

      {/* Charts */}
      <Section title="Charts">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2"><LineChart /></div>
          <DonutChart />
        </div>
        <div className="mt-6"><BarChart /></div>
      </Section>

      {/* Table */}
      <Section title="Data Table">
        <DataTable />
      </Section>
    </div>
  )
}
