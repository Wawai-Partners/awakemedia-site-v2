import { motion } from 'motion/react'
import { RevealBlock, EASE } from '../components/Reveal.jsx'

const ADDITIONAL = [
  'Logo design',
  'Podcast brands & episode production',
  'Web design & development',
  'Content creation',
  'Audio & video production',
  'eCommerce & booking systems',
  'Email & social media marketing',
  'Filmmaking',
]

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-20 w-full bg-[linear-gradient(0deg,#d2d2d2_0%,#ffffff_100%)] px-5 pb-24 pt-10 text-ink sm:px-8 sm:pb-32 sm:pt-12"
    >
      <div className="grid gap-8 pb-14 lg:grid-cols-2 lg:gap-16">
        <RevealBlock>
          <p className="text-lg leading-relaxed text-ink/70 sm:text-xl">
            Additional digital media services are available through Awake Media
            at 30% discounted rates for Awake.net members.
          </p>
        </RevealBlock>
        <RevealBlock delay={0.1}>
          <p className="text-lg leading-relaxed text-ink/60 sm:text-xl">
            To order directly, visit AwakeMedia.com. After checkout you will be
            redirected to a page that collects details about your website, where
            you can indicate which services you want.
          </p>
        </RevealBlock>
      </div>

      <ul className="grid border-t border-ink/15 sm:grid-cols-2 sm:gap-x-12">
        {ADDITIONAL.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.6, ease: EASE, delay: (index % 4) * 0.06 }}
            className="group flex items-baseline gap-5 border-b border-ink/15 py-5 sm:gap-8 sm:py-6"
          >
            <span className="label shrink-0 text-ink/40">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="display text-2xl text-ink/70 transition-colors duration-300 group-hover:text-ink sm:text-[2.2vw]">
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
