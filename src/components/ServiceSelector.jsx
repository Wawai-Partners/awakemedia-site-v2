import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { EASE } from './Reveal.jsx'

const SERVICE_OPTIONS = [
  'Website',
  'Podcast',
  'Logo design',
  'Content',
  'Audio & video',
  'eCommerce',
  'Other',
]

/** Multi-select brief picker used in the contact block. */
export default function ServiceSelector() {
  const [services, setServices] = useState([])

  const toggleService = (option) => {
    setServices((current) =>
      current.includes(option)
        ? current.filter((service) => service !== option)
        : [...current, option]
    )
  }

  return (
    <div>
      <h3 className="display text-2xl text-white">
        What do you need?
      </h3>
      <p className="label mt-3 text-mute">Select all that apply</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {SERVICE_OPTIONS.map((option) => {
          const isActive = services.includes(option)

          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => toggleService(option)}
              aria-pressed={isActive}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-colors duration-300 ${
                isActive
                  ? 'bg-white text-ink'
                  : 'border border-ink-line text-dim hover:border-white/40 hover:text-white'
              }`}
            >
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, opacity: 0, y: -8 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-flex"
                  >
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </motion.span>
                )}
              </AnimatePresence>
              {option}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {services.length === 0 ? (
          <motion.p
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-8 text-xs italic text-mute"
          >
            Pick a starting point above.
          </motion.p>
        ) : (
          <motion.div
            key="banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-line bg-white/[0.03] px-6 py-5">
              <p className="text-sm text-dim">
                Brief starts with:{' '}
                <span className="text-white">{services.join(', ')}</span>
              </p>

              <a
                href={`mailto:support@awake.net?subject=${encodeURIComponent(
                  `New brief — ${services.join(', ')}`
                )}`}
                className="group label flex items-center gap-2 text-white"
              >
                Send it
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
