import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import StripeWipe from '../components/StripeWipe.jsx'
import { RevealLines, EASE } from '../components/Reveal.jsx'

const INCLUDED = [
  'Domain name registration',
  'Hosting setup',
  'Email setup',
  'WordPress pre-installed and ready for content',
  'Divi premium theme pre-installed ($90 value)',
  'Security, back-up, analytics and site speed plugins pre-installed',
  'Contact form & SMTP activation for deliverability',
  'Video tutorial walk-through on how to edit content on your website',
  'Ongoing daily website updates and maintenance',
  'Access to Website in a Week workshop, live or video tutorials',
]

export default function Included() {
  const ref = useRef(null)

  // Runs as the section's bottom edge climbs from the foot of the viewport
  // to its middle — scrolling that already exists, so the wipe costs no
  // extra page height.
  const { scrollYProgress } = useScroll({
    target: ref,
    // Motion's edge keywords are start/center/end only — 'bottom' is not one
    // of them, and an offset it cannot parse leaves progress pinned at 0.
    offset: ['end end', 'end center'],
  })

  return (
    <section
      id="included"
      ref={ref}
      className="relative z-10 w-full bg-ink px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-32"
    >
      {/* White bands close over this section, handing off to the light one
          below already matching its colour. */}
      <StripeWipe
        progress={scrollYProgress}
        mode="cover"
        anchor="bottom"
        color="#ffffff"
      />

      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <h2 className="display text-[9vw] text-white sm:text-[5vw]">
          <RevealLines lines={["What's included"]} />
        </h2>
      </div>

      <ul className="border-t border-ink-line">
        {INCLUDED.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.6, ease: EASE, delay: (index % 5) * 0.05 }}
            className="group flex items-baseline gap-5 border-b border-ink-line py-5 sm:gap-8 sm:py-6"
          >
            <span className="label shrink-0 text-mute">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-lg leading-snug text-dim transition-colors duration-300 group-hover:text-white sm:text-2xl">
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
