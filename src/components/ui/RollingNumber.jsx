import { AnimatePresence, motion } from 'motion/react';

/** Number that rolls vertically when it changes (cart counts, quantities, totals). */
const RollingNumber = ({ value, prefix = '', className = '' }) => (
  <span className={`rolling-number ${className}`} aria-live="polite">
    <AnimatePresence initial={false} mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      >
        {prefix}
        {value}
      </motion.span>
    </AnimatePresence>
  </span>
);

export default RollingNumber;
