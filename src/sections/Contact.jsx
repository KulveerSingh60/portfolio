import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import { Send, Github, Linkedin, Mail, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { LINKS, SOCIALS } from '../data'

const HEAD = ['LET\'S', 'BUILD', 'SOMETHING.']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [state, handleSubmit] = useForm('xnpqnrkn')
  const [resetKey, setResetKey] = useState(0)
  const sent = state.succeeded

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const reset = () => {
    setForm({ name: '', email: '', subject: '', message: '' })
    setResetKey((k) => k + 1)
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container">
        <div className="contact-top">
          <span className="chapter mono">07</span>
          <span className="eyebrow mono">Contact</span>
        </div>

        <h2 className="contact-headline">
          {HEAD.map((word, wi) => (
            <span className={`contact-headline-word${wi === HEAD.length - 1 ? ' accent' : ''}`} key={wi}>
              {word}
            </span>
          ))}
        </h2>

        <div className="contact-grid">
          <div className="contact-form-wrap">
            {sent ? (
              <div className="sent-state">
                <CheckCircle2 size={44} />
                <p>Your message has been sent — thanks for reaching out!</p>
                <button className="btn btn-ghost sm" onClick={reset}>Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" key={resetKey}>
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" value={form.name} onChange={update} required placeholder="Your name" />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={update} required placeholder="you@example.com" />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <div className="field">
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" type="text" value={form.subject} onChange={update} required placeholder="What is this about?" />
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={form.message} onChange={update} required rows={5} placeholder="Tell me about your project or opportunity..." />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={state.submitting}>
                  {state.submitting ? 'SENDING...' : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>

          <div className="contact-links">
            <div className="contact-links-head mono">Reach me</div>
            {SOCIALS.map((s) => (
              <motion.a
                key={s.name}
                className="clink"
                href={s.url}
                target={s.name === 'Email' ? undefined : '_blank'}
                rel={s.name === 'Email' ? undefined : 'noopener noreferrer'}
                whileHover={{ x: 4 }}
              >
                <span className="clink-ic">
                  {s.name === 'Email' ? <Mail size={20} /> : s.name === 'GitHub' ? <Github size={20} /> : <Linkedin size={20} />}
                </span>
                <span className="clink-text">
                  <strong>{s.name}</strong>
                  <small className="mono">{s.handle}</small>
                </span>
                <ArrowUpRight size={16} className="clink-arrow" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
