import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/**
 * Dot + trailing ring. The ring uses mix-blend-difference so it stays
 * visible across both the near-black and the paper-white sections.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    const over = (event) => {
      const target = event.target.closest(
        'a, button, [data-cursor], input, textarea'
      )
      setHovering(Boolean(target))
      setLabel(target?.dataset?.cursor ?? '')
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-white/70 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 68 : 30,
          height: hovering ? 68 : 30,
          opacity: hovering ? 1 : 0.55,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        {label && (
          <span className="label text-[9px] text-white">{label}</span>
        )}
      </motion.div>
    </>
  )
}
