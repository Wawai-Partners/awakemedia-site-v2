import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { RevealWords } from '../components/Reveal.jsx'

export default function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['12%', '0%'])

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-30 w-full bg-ink px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32"
    >
      <motion.h2
        style={{ y }}
        className="display text-[7vw] leading-[1.2] text-white sm:text-[3.8vw]"
      >
        <RevealWords text="Web development services available for all membership levels, upgrade to Mediamakers or Mentors &amp; Masters to include hosting and email without extra charge." />
      </motion.h2>

      <div className="mt-20 border-t border-ink-line" />

    </section>
  )
}
