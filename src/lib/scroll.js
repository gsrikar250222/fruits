import { prefersReducedMotion } from './motion';

// Single Lenis instance shared across the app (set by useSmoothScroll).
let lenis = null;
export const setLenis = (instance) => {
  lenis = instance;
};
export const getLenis = () => lenis;


/**
 * Smoothly scroll to a section by id. Waits (up to ~1.5s) for the element to
 * exist, so it also works right after a page switch / page transition.
 */
export function scrollToId(id) {
  const started = performance.now();
  const attempt = () => {
    const el = document.getElementById(id);
    if (!el) {
      if (performance.now() - started < 1500) requestAnimationFrame(attempt);
      return;
    }
    // Both paths honour the section's CSS scroll-margin-top (sticky header height).
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.15 });
    } else {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }
  };
  requestAnimationFrame(attempt);
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) lenis.scrollTo(0, { immediate, duration: 1 });
  else window.scrollTo({ top: 0, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
}

/** Lock page scroll (drawers / menus). */
export function lockScroll(locked) {
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
