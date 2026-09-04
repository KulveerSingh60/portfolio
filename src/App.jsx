import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import SectionBoundary from './components/SectionBoundary'
import Navbar from './components/Navbar'
import ChatSection from './components/ChatSection'
import useSmoothScroll from './hooks/useSmoothScroll'
import { initSound } from './lib/sound'
import Hero from './sections/Hero'
import About from './sections/About'
import Expertise from './sections/Expertise'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Lab from './sections/Lab'
import GitHub from './sections/GitHub'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initSound()
  }, [])

  useSmoothScroll(!loading)

  return (
    <>
      <Cursor />

      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        className="app"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <main>
          <SectionBoundary><Hero /></SectionBoundary>
          <ChatSection />
          <SectionBoundary fallback={null}><About /></SectionBoundary>
          <SectionBoundary fallback={null}><Expertise /></SectionBoundary>
          <SectionBoundary fallback={<div className="container pad" />}><Projects /></SectionBoundary>
          <SectionBoundary fallback={null}><Experience /></SectionBoundary>
          <SectionBoundary fallback={null}><Lab /></SectionBoundary>
          <SectionBoundary fallback={null}><GitHub /></SectionBoundary>
          <SectionBoundary fallback={null}><Contact /></SectionBoundary>
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
