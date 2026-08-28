import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE } from './Reveal.jsx'

const WORDS = ['WEBSITES', 'PODCASTS', 'COMMUNITY']

/**
 * Counter runs 0 -> 100 while the words cycle, then the curtain lifts.
 * Scroll stays locked for the duration.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()

    const counter = setInterval(() => {
      setCount((value) => {
        const next = value + Math.ceil((100 - value) / 12) + 1
        return next >= 100 ? 100 : next
      })
    }, 55)

    const words = setInterval(() => {
      setWordIndex((index) => (index + 1) % WORDS.length)
    }, 460)

    return () => {
      clearInterval(counter)
      clearInterval(words)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (count < 100) return

    const timeout = setTimeout(() => setVisible(false), 420)
    return () => clearTimeout(timeout)
  }, [count])

  // Release as the curtain starts lifting, not after it lands: the reveal
  // reads better, and scroll never stays locked if the exit is interrupted.
  useEffect(() => {
    if (visible) return

    document.body.style.overflow = ''
    if (window.__lenis) {
      window.__lenis.start()
      window.__lenis.scrollTo(0, { immediate: true })
    }
    onDone?.()
  }, [visible, onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-5 py-5 sm:px-8 sm:py-8"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="label text-mute">Awake Media&reg;</div>

          <div className="flex items-end justify-between gap-6">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={WORDS[wordIndex]}
                  className="display text-[13vw] text-white sm:text-[9vw]"
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.42, ease: EASE }}
                >
                  {WORDS[wordIndex].split('').map((letter, index) => (
                    <motion.span
                      key={`${letter}-${index}`}
                      className="inline-block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="display shrink-0 text-[13vw] text-white sm:text-[9vw] tabular-nums">
              {count}
            </div>
          </div>

          <div className="h-px w-full bg-ink-line">
            <motion.div
              className="h-px bg-white"
              animate={{ width: `${count}%` }}
              transition={{ ease: 'linear', duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
