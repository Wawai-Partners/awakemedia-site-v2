import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import logo from '../images/AMLOGO2022_03.png'
import { EASE } from './Reveal.jsx'
import { scrollToSection } from './SmoothScroll.jsx'

const MENU = [
  { label: 'Who builds it', target: 'studio', index: '01' },
  { label: "What's included", target: 'included', index: '02' },
  { label: 'Add-on services', target: 'services', index: '03' },
  { label: 'Start here', target: 'contact', index: '04' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Bar stays invisible over the hero and fades in once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!window.__lenis) return
    if (open) window.__lenis.stop()
    else window.__lenis.start()
  }, [open])

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (target) => {
    setOpen(false)
    // Let the overlay start closing before the scroll kicks in.
    setTimeout(() => scrollToSection(target), 240)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] flex items-center justify-between border-b px-5 py-4 transition-all duration-300 sm:px-8 ${
          scrolled
            ? 'border-white/5 bg-ink/40 backdrop-blur-lg'
            : 'border-transparent bg-transparent backdrop-blur-none'
        }`}
      >
        <button
          type="button"
          onClick={() => scrollToSection('top')}
          className="block"
          aria-label="Awake Media — back to top"
        >
          <img
            src={logo}
            alt="Awake Media"
            className="h-12 w-auto sm:h-16"
          />
        </button>

        <div className="flex items-center gap-3">
          <a
            href="https://www.jotform.com/70406502704143"
            target="_blank"
            rel="noopener noreferrer"
            className="label hidden rounded-full bg-dim px-5 py-2.5 text-ink transition-colors duration-300 hover:bg-white sm:block"
          >
            Start here
          </a>

          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="label flex items-center gap-3 rounded-full border border-white/30 px-5 py-2.5 text-dim transition-colors duration-300 hover:border-white hover:text-white"
          >
            {open ? 'Close' : 'Menu'}
            <span className="flex h-3 w-4 flex-col justify-center gap-[3px]">
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  open ? 'translate-y-[2px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  open ? '-translate-y-[2px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[70] flex flex-col justify-between bg-ink-soft px-5 pb-8 pt-24 sm:px-8"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav className="flex flex-1 flex-col justify-center gap-1">
              {MENU.map((item, index) => (
                <motion.button
                  key={item.target}
                  type="button"
                  onClick={() => go(item.target)}
                  className="group flex items-baseline gap-5 border-b border-ink-line py-3 text-left sm:py-5"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.6,
                    ease: EASE,
                    delay: 0.18 + index * 0.06,
                  }}
                >
                  <span className="label text-mute">{item.index}</span>
                  <span className="display text-[13vw] text-dim transition-colors duration-300 group-hover:text-white sm:text-[7vw]">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="flex flex-col gap-2 pt-8 text-sm text-mute sm:flex-row sm:justify-between">
              <a href="mailto:support@awake.net" className="hover:text-white">
                support@awake.net
              </a>
              <span>AwakeMedia.com</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
