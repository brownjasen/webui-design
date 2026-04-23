import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp } from '@/design-system/tokens'

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-20">
    <h2 className="mb-8 text-2xl font-bold text-gradient">{title}</h2>
    {children}
  </motion.section>
)

/* ─── Phone Frame ─── */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[320px] overflow-hidden rounded-[36px] border-2 border-[var(--color-border)] bg-white shadow-xl">
      {/* Notch */}
      <div className="flex justify-center bg-[var(--color-surface-2)] px-6 pt-3 pb-1">
        <div className="h-5 w-24 rounded-full bg-[var(--color-border)]" />
      </div>
      <div className="h-[540px] overflow-y-auto">{children}</div>
      {/* Home indicator */}
      <div className="flex justify-center bg-[var(--color-surface-2)] py-2">
        <div className="h-1 w-24 rounded-full bg-[var(--color-border)]" />
      </div>
    </div>
  )
}

/* ─── Chat UI ─── */
const chatMessages = [
  { from: 'other', text: 'Hey! Have you seen the new design system? 🎨', time: '10:30' },
  { from: 'me', text: 'Yes! It looks amazing. Love the glassmorphism effects', time: '10:32' },
  { from: 'other', text: 'Right? The dark mode is 🔥 too', time: '10:33' },
  { from: 'me', text: 'We should use this for the next project', time: '10:35' },
  { from: 'other', text: 'Definitely! Let me share the Figma link...', time: '10:36' },
  { from: 'me', text: 'Perfect, thanks! 🙌', time: '10:37' },
]

function ChatUI() {
  const [messages, setMessages] = useState(chatMessages)
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages([...messages, { from: 'me', text: input, time: '10:38' }])
    setInput('')
    setTimeout(() => setMessages(prev => [...prev, { from: 'other', text: 'Great idea! 👍', time: '10:39' }]), 1000)
  }

  return (
    <PhoneFrame>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
        <div className="h-8 w-8 rounded-full bg-[var(--color-accent)]/20" />
        <div>
          <div className="text-sm font-semibold text-[var(--color-text-primary)]">Alex Chen</div>
          <div className="text-xs text-green-500">Online</div>
        </div>
        <div className="ml-auto flex gap-3 text-[var(--color-text-muted)]">📞⋮</div>
      </div>
      {/* Messages */}
      <div className="space-y-3 p-4">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.from === 'me' ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-surface-2)] text-[var(--color-text-primary)]'}`}>
              {m.text}
              <div className={`mt-1 text-[10px] ${m.from === 'me' ? 'text-white/60' : 'text-[var(--color-text-muted)]'}`}>{m.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Input */}
      <div className="absolute bottom-16 flex w-[320px] items-center gap-2 border-t border-[var(--color-border)] bg-white px-4 py-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message..." className="flex-1 rounded-full bg-[var(--color-surface-2)] px-4 py-2 text-sm outline-none" />
        <button onClick={send} className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)] text-white text-sm">↑</button>
      </div>
    </PhoneFrame>
  )
}

/* ─── Music Player ─── */
function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress] = useState(35)

  return (
    <PhoneFrame>
      <div className="flex flex-col items-center px-6 pt-8">
        {/* Album art */}
        <motion.div animate={{ rotate: playing ? 360 : 0 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="h-52 w-52 rounded-full bg-gradient-to-br from-[#6366f1] to-[#00d4ff] shadow-xl" />
        <h3 className="mt-8 text-lg font-bold text-[var(--color-text-primary)]">Midnight City</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">M83</p>
        {/* Progress */}
        <div className="mt-6 w-full">
          <div className="h-1 w-full rounded-full bg-[var(--color-surface-2)]">
            <div className="h-1 rounded-full bg-[var(--color-accent)]" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-[var(--color-text-muted)]">
            <span>1:24</span><span>4:03</span>
          </div>
        </div>
        {/* Controls */}
        <div className="mt-4 flex items-center gap-8 text-2xl">
          <button className="text-[var(--color-text-secondary)]">⏮</button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setPlaying(!playing)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-2xl text-white shadow-lg">
            {playing ? '⏸' : '▶'}
          </motion.button>
          <button className="text-[var(--color-text-secondary)]">⏭</button>
        </div>
        {/* Volume */}
        <div className="mt-6 flex w-full items-center gap-2">
          <span className="text-xs text-[var(--color-text-muted)]">🔈</span>
          <input type="range" min="0" max="100" value={70} className="flex-1 accent-[var(--color-accent)]" />
          <span className="text-xs text-[var(--color-text-muted)]">🔊</span>
        </div>
      </div>
    </PhoneFrame>
  )
}

/* ─── Social Feed ─── */
const feedPosts = [
  { user: 'Sarah K.', avatar: '#6366f1', text: 'Just launched our new design system! 🚀', likes: 42, color: '#6366f1' },
  { user: 'Mike R.', avatar: '#22c55e', text: 'Coffee and code. Perfect morning combo ☕', likes: 18, color: '#22c55e' },
  { user: 'Lisa W.', avatar: '#f59e0b', text: 'Working on something exciting... stay tuned!', likes: 95, color: '#f59e0b' },
]

function SocialFeed() {
  return (
    <PhoneFrame>
      {/* Stories bar */}
      <div className="flex gap-3 overflow-x-auto border-b border-[var(--color-border)] px-4 py-3">
        {['You', 'Sarah', 'Mike', 'Lisa', 'Tom'].map((s) => (
          <div key={s} className="flex flex-col items-center gap-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-neon-blue)] p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-xs font-bold text-[var(--color-accent)]">{s[0]}</div>
            </div>
            <span className="text-[10px] text-[var(--color-text-secondary)]">{s}</span>
          </div>
        ))}
      </div>
      {/* Posts */}
      <div className="divide-y divide-[var(--color-border)]">
        {feedPosts.map((post) => (
          <div key={post.user} className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full" style={{ background: post.color }} />
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">{post.user}</span>
              <span className="ml-auto text-xs text-[var(--color-text-muted)]">2h</span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-text-primary)]">{post.text}</p>
            <div className="mt-2 h-32 rounded-xl" style={{ background: `linear-gradient(135deg, ${post.color}30, ${post.color}10)` }} />
            <div className="mt-2 flex gap-4 text-sm text-[var(--color-text-secondary)]">
              <span>❤️ {post.likes}</span><span>💬 12</span><span>↗ Share</span>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  )
}

/* ─── Bottom Sheet ─── */
function BottomSheetDemo() {
  const [open, setOpen] = useState(false)
  return (
    <PhoneFrame>
      <div className="flex flex-col items-center justify-center p-8 pt-16">
        <p className="text-center text-sm text-[var(--color-text-secondary)] mb-6">Tap the button to open the bottom sheet</p>
        <button onClick={() => setOpen(true)}
          className="rounded-xl bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white">
          Open Sheet
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="absolute inset-0 bg-black/20" />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 shadow-xl">
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[var(--color-border)]" />
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Options</h3>
              {['Share', 'Save', 'Edit', 'Delete'].map((opt, i) => (
                <button key={opt} className={`w-full rounded-xl px-4 py-3 text-left text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] ${i === 3 ? 'text-red-500' : ''}`}>
                  {opt}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PhoneFrame>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function MobilePage() {
  return (
    <div className="px-8 py-12 lg:px-16">
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-16">
        <h1 className="text-5xl font-bold text-[var(--color-text-primary)]">Mobile UI</h1>
        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
          App interfaces, bottom sheets, and native-feeling mobile patterns
        </p>
      </motion.div>

      <Section title="01 — Chat Interface">
        <ChatUI />
      </Section>

      <Section title="02 — Music Player">
        <MusicPlayer />
      </Section>

      <Section title="03 — Social Feed">
        <SocialFeed />
      </Section>

      <Section title="04 — Bottom Sheet">
        <BottomSheetDemo />
      </Section>
    </div>
  )
}
