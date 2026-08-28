/**
 * Seamless CSS marquee. The track holds two identical halves and slides
 * -50%, so the loop never shows a seam.
 *
 * Each half repeats the item list `repeat` times: with -50% the join is only
 * invisible when a half is at least as wide as the container, otherwise the
 * tail of the cycle leaves a gap and the loop reads as a restart.
 */
export default function Marquee({
  items,
  duration = 24,
  reverse = false,
  separator = '·',
  repeat = 2,
  className = '',
  itemClassName = '',
}) {
  const half = Array.from({ length: repeat }, () => items).flat()
  const track = [...half, ...half]

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        className={`flex w-max leading-[1.25] ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`flex shrink-0 items-center whitespace-nowrap ${itemClassName}`}
          >
            {item}
            <span className="mx-6 opacity-40 lg:mx-10">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
