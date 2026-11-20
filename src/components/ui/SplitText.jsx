import { motion } from 'motion/react';
import { ease } from '../../lib/motion';

/**
 * Word-by-word blur/rise entrance — adapted from React Bits' "SplitText" /
 * "BlurText" (https://github.com/DavidHDev/react-bits). Screen readers get the
 * plain sentence; the animated words are aria-hidden.
 */
const SplitText = ({ text, as = 'span', className = '', delay = 0, step = 0.08 }) => {
  const Tag = motion[as] || motion.span;
  const words = text.split(' ');
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '105%', opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease, delay: delay + i * step }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
