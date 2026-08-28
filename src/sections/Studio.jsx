import { RevealBlock, RevealWords } from '../components/Reveal.jsx'

const PILLARS = [
  {
    title: 'Design-to-launch',
    body: 'A streamlined process that takes you from first conversation to a live site without the usual stalls.',
  },
  {
    title: 'Managed hosting',
    body: 'A stable managed WordPress platform, set up and maintained for you.',
  },
  {
    title: 'Ongoing support',
    body: 'Daily updates, maintenance, and media services after launch — not just at handover.',
  },
  {
    title: 'Non-profit rates',
    body: 'Pricing built for the community rather than for margin.',
  },
]

export default function Studio() {
  return (
    <section
      id="studio"
      className="relative z-10 flex min-h-dvh w-full flex-col justify-center bg-ink px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* The intro copy is the headline here — set at display scale and left
          to wrap naturally rather than on fixed line breaks. */}
      <h2 className="display text-[7vw] leading-[1.2] text-dim sm:text-[3.8vw]">
        <RevealWords text="Website services are fulfilled by the team at Awake Media, who bring a streamlined design-to-launch process, a stable managed WordPress hosting platform, and ongoing support and media services at non-profit rates." />
      </h2>

      <div className="mt-16 grid gap-y-12 border-t border-ink-line pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
        {PILLARS.map((pillar, index) => (
          <RevealBlock key={pillar.title} delay={index * 0.08} className="pr-6">
            <div className="label text-mute">0{index + 1}</div>
            <h3 className="display mt-4 text-2xl text-white sm:text-3xl">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              {pillar.body}
            </p>
          </RevealBlock>
        ))}
      </div>
    </section>
  )
}
