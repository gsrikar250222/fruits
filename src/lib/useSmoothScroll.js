import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from './scroll';
import { prefersReducedMotion } from './motion';

// Lenis smooth scrolling (https://github.com/darkroomengineering/lenis).
// Desktop wheel only; touch devices keep native scrolling, and it is skipped
// entirely when the user prefers reduced motion.
export default function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true, anchors: true });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);
}
