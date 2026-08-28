import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Github, Linkedin, Mail, MapPin, CheckCircle2 } from 'lucide-react'
import { LINKS } from '../data'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `${LINKS.emailRaw}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container">
        <div className="contact-wrap">
          <div className="section-head">
            <p className="eyebrow justify-center"><span className="pulse-dot" /> Get In Touch</p>
            <h2 className="section-title">Let's build something <span className="accent">together.</span></h2>
            <p className="section-sub">
              Looking for a developer who learns fast and delivers quality work? Feel free to reach
              out directly via email or connect with me on LinkedIn.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <h3 className="contact-card-title mono">$ send_message</h3>
              {sent ? (
                <div className="sent-state">
                  <CheckCircle2 size={40} />
                  <p>Message queued — I'll reply within 24h.</p>
                  <button className="btn btn-ghost sm" onClick={() => setSent(false)}>Send another</button>
                </div>
              ) : (
                <form onSubmit={submit} className="contact-form">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" value={form.name} onChange={update} required placeholder="Your name" />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={update} required placeholder="you@example.com" />
                  </div>
                  <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" value={form.message} onChange={update} required rows={5} placeholder="Tell me about your project..." />
                  </div>
                  <button type="submit" className="btn btn-primary full">
                    Send Message <Send size={16} />
                  </button>
                </form>
              )}
            </div>

            <div className="contact-links">
              <motion.a
                className="clink"
                href={LINKS.email}
                whileHover={{ y: -3 }}
              >
                <span className="clink-ic"><Mail size={20} /></span>
                <span><strong>Email</strong><small>{LINKS.emailRaw}</small></span>
              </motion.a>
              <motion.a className="clink" href={LINKS.github} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}>
                <span className="clink-ic"><Github size={20} /></span>
                <span><strong>GitHub</strong><small>@KulveerSingh60</small></span>
              </motion.a>
              <motion.a className="clink" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}>
                <span className="clink-ic"><Linkedin size={20} /></span>
                <span><strong>LinkedIn</strong><small>Kulveer Singh</small></span>
              </motion.a>
              <div className="clink static">
                <span className="clink-ic"><MapPin size={20} /></span>
                <span><strong>Location</strong><small>Gidderbaha, Punjab, India</small></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
