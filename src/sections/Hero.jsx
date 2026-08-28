import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Marquee from '../components/Marquee.jsx'
import { EASE } from '../components/Reveal.jsx'

const VIDEO_SRC =
  import.meta.env.BASE_URL +
  'videos/ai-human-creation-in-futuristic-lab-2026-01-28-04-57-28-utc.mp4'

const LINES = ['LAUNCH YOUR', 'WEBSITE OR PODCAST']

const ACTIONS = [
  {
    label: 'Start here',
    href: 'https://www.jotform.com/70406502704143',
    primary: true,
  },
  {
    label: 'Register a new domain',
    href: 'https://hosting.awakemedia.com/cart.php?a=add&domain=register',
    primary: false,
  },
]

/** Content holds off until the 3s mark so the film plays alone first. */
const CONTENT_DELAY_MS = 3000

export default function Hero({ ready }) {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const [elapsed, setElapsed] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Content drifts up slower than the page — cheap parallax on scroll out.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])

  useEffect(() => {
    const timeout = setTimeout(() => setElapsed(true), CONTENT_DELAY_MS)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true

    const attemptPlay = () => {
      const play = video.play()
      if (play && typeof play.catch === 'function') play.catch(() => {})
    }

    attemptPlay()

    // A background film frozen mid-clip reads as a broken page. The browser
    // resumes a plain buffer underrun on its own, but a decoder that gives up
    // under load leaves the element "playing" with a frozen currentTime and
    // fires nothing. Poll for that and reload the one stream that recovers it.
    let lastTime = -1
    let stalledTicks = 0

    // Re-fetching is capped: a source the browser simply cannot play (missing
    // H.264 support, a 404) fails again instantly, and an uncapped retry would
    // hammer the network forever behind a scrim nobody can see.
    let reloadsLeft = 3
    const recover = () => {
      if (reloadsLeft <= 0) return
      reloadsLeft -= 1
      video.load()
      attemptPlay()
    }

    // The clip plays once and holds its last frame. Every recovery path below
    // has to respect that: play() on an ended element rewinds to 0, so an
    // unguarded nudge would loop the film even with no `loop` attribute.
    let finished = false
    const onEnded = () => {
      finished = true
    }
    video.addEventListener('ended', onEnded)

    const watchdog = setInterval(() => {
      if (finished) {
        clearInterval(watchdog)
        return
      }
      if (document.hidden || video.readyState === 0) return

      if (video.paused) {
        attemptPlay()
        return
      }

      if (video.currentTime === lastTime) {
        stalledTicks += 1
        // ~3s of no progress: past any normal seek or rebuffer.
        if (stalledTicks >= 6) {
          stalledTicks = 0
          recover()
        }
      } else {
        stalledTicks = 0
        lastTime = video.currentTime
      }
    }, 500)

    // A decode error is terminal unless the stream is re-fetched.
    const onError = () => {
      if (!finished) recover()
    }
    video.addEventListener('error', onError)

    // Backgrounded tabs get playback suspended; resume on return.
    const onVisibility = () => {
      if (!document.hidden && !finished && video.paused) attemptPlay()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearInterval(watchdog)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('error', onError)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // Both gates: the curtain has to be gone AND the 3s mark reached.
  const show = ready && elapsed

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-dvh w-full flex-col justify-between overflow-hidden bg-ink-soft pb-8 pt-28 sm:pt-32"
    >
      {/* Background film */}
      <motion.div
        aria-hidden
        style={{ scale: videoScale }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          autoPlay
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Legibility stack: flat scrim, then top/bottom fades into the section.
          Kept deliberately light so the film reads through it — the type
          carries its own shadow rather than relying on a darker scrim. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-ink/35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,5,8,0.8) 0%, rgba(4,5,8,0.12) 38%, rgba(4,5,8,0.3) 72%, #0c0c0c 100%)',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center sm:px-8"
      >
        {/* Grows out of a small centre point. Children only fade, so nothing
            slides sideways against the scale. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.35 }}
          animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.35 }}
          transition={{ duration: 1.6, ease: EASE }}
          style={{ transformOrigin: 'center center' }}
          className="flex w-full flex-col items-center will-change-transform"
        >
          <h1
            className="display text-[10vw] text-white sm:text-[7.5vw] lg:text-[5.6vw]"
            style={{ textShadow: '0 2px 28px rgba(4,5,8,0.75)' }}
          >
            {LINES.map((line, index) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0 }}
                animate={show ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 1,
                  ease: EASE,
                  delay: 0.1 + index * 0.08,
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-10 max-w-xl text-base leading-relaxed text-dim/85 sm:text-lg"
            style={{ textShadow: '0 1px 16px rgba(4,5,8,0.8)' }}
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          >
            Websites and podcasts for the entheogenic community, built by the
            team at Awake Media.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          >
            {ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GO"
                className={`label w-full rounded-full px-8 py-4 text-center transition-colors duration-300 sm:w-auto ${
                  action.primary
                    ? 'bg-white text-ink hover:bg-dim'
                    : 'border border-white/25 text-dim hover:border-white hover:text-white'
                }`}
              >
                {action.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 border-t border-white/10 pt-5"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <Marquee
          items={['Design', 'Launch', 'Support']}
          duration={26}
          className="display text-[9vw] text-white/15 sm:text-[6vw]"
        />
      </motion.div>
    </section>
  )
}
