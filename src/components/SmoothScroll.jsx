import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Mounts Lenis once and drives it from rAF. Exposes the instance on
 * window.__lenis so the nav can scroll to anchors without prop drilling.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    window.__lenis = lenis

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return children
}

export function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return

  if (window.__lenis) window.__lenis.scrollTo(target, { offset: 0 })
  else target.scrollIntoView({ behavior: 'smooth' })
}
