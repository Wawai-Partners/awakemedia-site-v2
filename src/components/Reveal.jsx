import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Masked line reveal — each line sits in an overflow-hidden box and
 * slides up from below as it enters the viewport.
 */
export function RevealLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.08,
  once = true,
}) {
  return (
    <span className={className}>
      {lines.map((line, index) => (
        // The in-view trigger lives on the mask, not on the line inside it.
        // The line translates itself fully outside the mask's overflow-hidden
        // box, so an observer watching the line sees a clipped intersection
        // ratio of 0 and never fires — leaving the text stuck behind it.
        <motion.span
          key={`${line}-${index}`}
          className="block overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once, margin: '-10% 0px' }}
        >
          <motion.span
            className={`block ${lineClassName}`}
            variants={{ hidden: { y: '110%' }, visible: { y: '0%' } }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: delay + index * stagger,
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </span>
  )
}

/** Word-by-word opacity wash, used for longer statement paragraphs. */
export function RevealWords({ text, className = '', delay = 0 }) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={{ opacity: 0.16, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{
            duration: 0.5,
            ease: EASE,
            delay: delay + index * 0.022,
          }}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  )
}

/** Generic fade-and-rise for blocks that don't need per-line masking. */
export function RevealBlock({ children, className = '', delay = 0, y = 24 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export { EASE }
