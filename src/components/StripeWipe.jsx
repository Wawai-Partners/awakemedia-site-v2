import { motion, useTransform } from 'motion/react'

const BAND_COUNT = 12

// Each band retreats over this much of the range, offset by index, so they
// peel away in sequence rather than all at once.
const BAND_SPAN = 0.45
const STAGGER_WINDOW = 0.5

function Band({ progress, index, color, mode }) {
  const start = (index / BAND_COUNT) * STAGGER_WINDOW
  const scaleY = useTransform(
    progress,
    [start, start + BAND_SPAN],
    mode === 'cover' ? [0, 1] : [1, 0],
    { clamp: true }
  )

  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 will-change-transform"
      style={{
        top: `${(index / BAND_COUNT) * 100}%`,
        // +1px so neighbouring bands overlap: exact percentages round to
        // sub-pixel gaps and leave hairline seams at some viewport heights.
        height: `calc(${100 / BAND_COUNT}% + 1px)`,
        background: color,
        scaleY,
        // Alternating origin gives the bands a woven feel as they peel back.
        transformOrigin: index % 2 === 0 ? 'top' : 'bottom',
      }}
    />
  )
}

/**
 * A plate of horizontal bands spanning one viewport-height of its parent.
 *
 * mode="cover"  — bands close in sequence, painting over the parent.
 * mode="reveal" — bands retreat in sequence, uncovering the parent.
 *
 * It is absolutely positioned, so it adds no scroll height: the wipe plays
 * out over scrolling the page already has, rather than over a spacer
 * section of its own. The parent must be `relative`.
 */
export default function StripeWipe({
  progress,
  color = '#040508',
  mode = 'reveal',
  anchor = 'top',
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-30 h-dvh overflow-hidden ${
        anchor === 'bottom' ? 'bottom-0' : 'top-0'
      }`}
    >
      {Array.from({ length: BAND_COUNT }).map((_, index) => (
        <Band
          key={index}
          progress={progress}
          index={index}
          color={color}
          mode={mode}
        />
      ))}
    </div>
  )
}
