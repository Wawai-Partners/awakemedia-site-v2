/**
 * Letter-stack hover: the visible row slides up and out while a duplicate
 * row rises into its place. Pure CSS transitions, staggered per letter.
 */
export default function FlipLink({
  label,
  href = '#',
  onClick,
  className = '',
  as = 'a',
}) {
  const Tag = as
  const letters = label.split('')

  const stack = (offsetClass) =>
    letters.map((letter, index) => (
      <span
        key={`${letter}-${index}`}
        className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${offsetClass}`}
        style={{ transitionDelay: `${index * 18}ms` }}
      >
        {letter === ' ' ? ' ' : letter}
      </span>
    ))

  return (
    <Tag
      href={as === 'a' ? href : undefined}
      onClick={onClick}
      className={`group relative inline-block overflow-hidden align-middle ${className}`}
    >
      <span className="block">
        {stack('group-hover:-translate-y-full')}
      </span>
      <span className="absolute inset-0 block" aria-hidden>
        {stack('translate-y-full group-hover:translate-y-0')}
      </span>
    </Tag>
  )
}
