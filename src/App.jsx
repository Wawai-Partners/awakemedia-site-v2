import { useCallback, useEffect, useState } from 'react'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Preloader from './components/Preloader.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import BottomMarquee from './sections/BottomMarquee.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'
import Hero from './sections/Hero.jsx'
import Included from './sections/Included.jsx'
import Services from './sections/Services.jsx'
import Showreel from './sections/Showreel.jsx'
import Studio from './sections/Studio.jsx'

export default function App() {
  // Hero type stays masked until the preloader curtain has lifted.
  const [ready, setReady] = useState(false)

  // Safety net: if the curtain's exit callback never lands (background tab,
  // animation interrupted), reveal the hero anyway rather than hiding it.
  const handleReady = useCallback(() => setReady(true), [])

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 4000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <SmoothScroll>
      <Preloader onDone={handleReady} />
      <Cursor />
      <Nav />

      <main className="relative w-full overflow-x-hidden bg-ink">
        <Hero ready={ready} />
        <Studio />
        <Showreel />
        <Included />
        <Services />
        <Contact />
        <Footer />
        <BottomMarquee />
      </main>
    </SmoothScroll>
  )
}
