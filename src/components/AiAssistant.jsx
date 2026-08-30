import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, ArrowUpRight } from 'lucide-react'
import { LINKS } from '../data'
import {
  getAiApiUrl,
  requestReply,
  MAX_MESSAGE_LENGTH,
  MAX_BROWSER_HISTORY,
} from '../lib/aiClient'

const SUGGESTIONS = [
  "What's Kulveer's tech stack?",
  'Tell me about his projects',
  'What experience and education does he have?',
  'Is he available for work?',
]

const CONTACT = [
  { label: 'GitHub', href: LINKS.github },
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'Email', href: LINKS.email },
]

export default function AiAssistant() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const configured = useState(() => Boolean(getAiApiUrl()))[0]
  const apiUrl = getAiApiUrl()

  const scrollRef = useRef(null)
  const busyRef = useRef(false)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, loading])

  async function submit(text) {
    const value = (text ?? input).trim()
    if (!value || busyRef.current || !configured) return

    busyRef.current = true
    setLoading(true)
    setError(null)
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: value }])

    const history = messages
      .slice(-MAX_BROWSER_HISTORY)
      .map((m) => ({ role: m.role, content: m.content }))

    try {
      const reply = await requestReply({ apiUrl, message: value, history })
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setError(
        'AI assistant temporarily unavailable. Please try again later or use the contact links below.'
      )
    } finally {
      busyRef.current = false
      setLoading(false)
    }
  }

  function onFormSubmit(e) {
    e.preventDefault()
    submit()
  }

  const canSend = !loading && configured && input.trim().length > 0

  return (
    <motion.div
      className="kt"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="kt-head">
        <span className="kt-title mono">// KULVEER.AI</span>
        <span className="kt-status mono">
          <span className="kt-dot" aria-hidden="true" />
          {configured ? 'AI ONLINE' : 'AI OFFLINE'}
        </span>
      </div>

      <div className="kt-screen" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="kt-empty">
            <p className="kt-empty-title mono">ASK ME ANYTHING</p>
            <p>
              Ask about Kulveer's tech stack, projects, experience, education,
              or how to contact him.
            </p>

            {!configured && (
              <div className="kt-banner">
                AI assistant isn't configured yet — use the contact links below
                to reach Kulveer directly.
              </div>
            )}

            <div className="kt-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="kt-suggestion"
                  onClick={() => submit(s)}
                  disabled={!configured}
                >
                  {s}
                  <ArrowUpRight size={13} className="kt-arrow" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="kt-messages" aria-live="polite">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                className={`kt-msg ${m.role === 'user' ? 'user' : 'ai'}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {m.role === 'ai' && (
                  <span className="kt-msg-tag mono">KULVEER.AI</span>
                )}
                <span className="kt-msg-text">{m.content}</span>
              </motion.div>
            ))}

            {loading && (
              <div className="kt-msg ai">
                <span className="kt-msg-tag mono">KULVEER.AI</span>
                <span className="kt-typing">
                  <span className="kt-typing-dot" aria-hidden="true" />
                  thinking…
                </span>
              </div>
            )}

            {error && (
              <div className="kt-error" role="status">
                {error}
                <div className="kt-error-links">
                  {CONTACT.map((c) => (
                    <a key={c.label} href={c.href} className="kt-link">
                      {c.label}
                      <ArrowUpRight size={13} className="kt-arrow" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <form className="kt-form" onSubmit={onFormSubmit}>
        <label className="kt-input-wrap">
          <span className="kt-prompt-caret mono" aria-hidden="true">
            &gt;
          </span>
          <input
            className="kt-input"
            type="text"
            value={input}
            placeholder="Type your question… e.g. What's Kulveer's tech stack?"
            maxLength={MAX_MESSAGE_LENGTH}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading || !configured}
            aria-label="Ask KULVEER.AI a question"
          />
        </label>
        <button
          type="submit"
          className="kt-send"
          disabled={!canSend}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>

      <div className="kt-count mono" aria-hidden="true">
        {input.length}/{MAX_MESSAGE_LENGTH}
      </div>
    </motion.div>
  )
}
