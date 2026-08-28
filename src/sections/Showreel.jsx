import { useEffect, useRef, useState } from 'react'
import { RevealBlock } from '../components/Reveal.jsx'

// All-intra re-encode of the reel clip: every frame is a keyframe, so
// seeking costs milliseconds instead of ~80ms per step.
const VIDEO_SRC = import.meta.env.BASE_URL + 'videos/reel-scrub.mp4'

// A full-window sweep covers 80% of the clip.
const SCRUB_SENSITIVITY = 0.8

/**
 * Full-bleed video scrubbed by horizontal cursor direction: moving right
 * runs the clip forward, moving left runs it back, and the timeline maps
 * one-to-one onto cursor travel. Falls back to a plain loop when the
 * pointer is coarse or motion is reduced.
 */
export default function Showreel() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [scrubbing, setScrubbing] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const video = videoRef.current
    if (!video) return

    if (reduced || coarse) {
      setScrubbing(false)
      video.loop = true
      video.autoplay = true
      const play = video.play()
      if (play && typeof play.catch === 'function') play.catch(() => {})
      return
    }

    setScrubbing(true)
  }, [])

  useEffect(() => {
    if (!scrubbing) return

    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    let prevX = null
    let target = 0
    let seeking = false

    // Measured per move rather than observed: IntersectionObserver only
    // delivers during a rendering update, so it never reports in a tab
    // that isn't painting.
    const isOnScreen = () => {
      const rect = section.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < window.innerHeight
    }

    const applySeek = () => {
      if (seeking) return
      seeking = true
      video.currentTime = target
    }

    // Only queue the next seek once the previous one landed, otherwise
    // the browser drops them and the scrub stutters.
    const onSeeked = () => {
      seeking = false
      if (Math.abs(video.currentTime - target) > 0.02) applySeek()
    }

    const onMouseMove = (event) => {
      if (!isOnScreen()) {
        prevX = event.clientX
        return
      }

      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return

      if (prevX === null) {
        prevX = event.clientX
        return
      }

      const delta = event.clientX - prevX
      prevX = event.clientX

      const next =
        target + (delta / window.innerWidth) * SCRUB_SENSITIVITY * duration

      // Clamp, never wrap: the head turns left-to-right across the clip, so
      // looping back to 0 would snap it to facing left mid-gesture.
      target = Math.min(Math.max(next, 0), duration)
      applySeek()
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    video.addEventListener('seeked', onSeeked)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [scrubbing])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-dvh w-full overflow-hidden bg-ink"
      aria-label="Studio reel"
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      {/* Dark vignette: radial falloff that pulls the corners down and keeps
          the eye on the centre of frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 78% 68% at 50% 48%, rgba(4,5,8,0) 0%, rgba(4,5,8,0.28) 52%, rgba(4,5,8,0.68) 78%, rgba(4,5,8,0.94) 100%)',
        }}
      />

      {/* Top/bottom fades so the clip melts into the section either side. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #040508 0%, rgba(4,5,8,0) 28%, rgba(4,5,8,0) 62%, #040508 100%)',
        }}
      />

      <div className="pointer-events-none relative flex min-h-dvh flex-col justify-between px-5 py-24 sm:px-8 sm:py-28">
        <div className="max-w-3xl">
          <RevealBlock>
            <p className="display text-[8vw] text-white sm:text-[4.2vw]">
              We understand the ineffable.
            </p>
          </RevealBlock>
        </div>
      </div>
    </section>
  )
}
