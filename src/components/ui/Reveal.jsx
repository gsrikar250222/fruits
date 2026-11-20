import { motion } from 'motion/react';
import { ease, inView } from '../../lib/motion';

/**
 * Scroll-triggered reveal — adapted from Magic UI's "BlurFade" pattern
 * (https://github.com/magicuidesign/magicui), rewritten for plain CSS + Motion.
 */
const Reveal = ({ as = 'div', children, delay = 0, y = 26, blur = false, className, ...rest }) => {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, ...(blur ? { filter: 'blur(8px)' } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) }}
      viewport={inView}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
