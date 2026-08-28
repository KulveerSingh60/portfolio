import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Statistics from './sections/Statistics'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import GitHub from './sections/GitHub'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Statistics />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <GitHub />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
