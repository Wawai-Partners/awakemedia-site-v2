import { RevealBlock, RevealLines } from '../components/Reveal.jsx'

const ACTIONS = [
  { label: 'Start here', href: 'https://www.jotform.com/70406502704143' },
  {
    label: 'Register a new domain',
    href: 'https://hosting.awakemedia.com/cart.php?a=add&domain=register',
  },
]

const ENQUIRY = [
  { key: 'E.', value: 'support@awake.net', href: 'mailto:support@awake.net' },
  { key: 'W.', value: 'AwakeMedia.com', href: 'https://awakemedia.com' },
]

const SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com/innerjourneywithentheogens' },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/an.entheogenic.noosphere',
  },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/37205939' },
  { label: 'X', href: 'https://x.com/IbogaSaves' },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCTgxoh8TO6sANDpBUwXtaGw',
  },
]

export default function Footer() {
  return (
    <footer className="relative z-30 w-full bg-ink px-5 pb-10 pt-16 sm:px-8 sm:pb-12 sm:pt-20">
      {/* Row 1 — standfirst */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <RevealBlock className="label text-white">
          Let&rsquo;s get your site live.
        </RevealBlock>
      </div>

      {/* Row 2 — headline left, actions right */}
      <div className="mt-6 grid gap-12 border-t border-ink-line pt-14 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h2 className="display text-[11vw] text-white sm:text-[7vw] lg:col-span-6 lg:text-[4.6vw]">
          <RevealLines lines={['Ready to', 'launch yours?']} />
        </h2>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-10 lg:col-span-6 lg:justify-end">
          {ACTIONS.map((action, index) => (
            <RevealBlock key={action.label} delay={index * 0.08}>
              <a
                href={action.href}
                {...(action.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                data-cursor="GO"
                className="label group flex w-full items-center justify-between gap-10 border-b border-ink-line pb-3 text-dim transition-colors duration-300 hover:border-white hover:text-white sm:w-auto"
              >
                {action.label}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </RevealBlock>
          ))}
        </div>
      </div>

      {/* Row 3 — copyright, enquiry, social */}
      <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-4 lg:col-span-6">
          <span className="label text-mute">
            &copy; Awake Media&reg; {new Date().getFullYear()}
          </span>
          <button
            type="button"
            onClick={() =>
              window.__lenis
                ? window.__lenis.scrollTo(0)
                : window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            className="label w-fit text-mute transition-colors duration-300 hover:text-white"
          >
            Back to top &uarr;
          </button>
        </div>

        <div className="lg:col-span-3">
          <div className="label mb-5 text-mute">Business enquiry</div>
          <ul className="flex flex-col gap-2">
            {ENQUIRY.map((item) => (
              <li key={item.key} className="flex items-baseline gap-3">
                <span className="label w-4 shrink-0 text-mute">{item.key}</span>
                <a
                  href={item.href}
                  className="text-dim transition-colors duration-300 hover:text-white"
                >
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="label mb-5 text-mute">Social</div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dim transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
