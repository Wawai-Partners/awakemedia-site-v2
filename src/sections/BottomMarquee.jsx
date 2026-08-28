import Marquee from '../components/Marquee.jsx'

/** Closing band beneath the footer. */
export default function BottomMarquee() {
  return (
    <div className="relative z-30 w-full border-t border-ink-line bg-ink py-8">
      <Marquee
        items={['Websites', 'Podcasts', 'Non-profit rates', 'Awake Media']}
        duration={34}
        className="display text-[10vw] text-white/10 sm:text-[5vw]"
      />
    </div>
  )
}
