import { prefersReducedMotion } from './motion';

/**
 * Lightweight "fly to cart" effect using the Web Animations API — no extra
 * dependency. Clones the product photo and arcs it into the header cart icon.
 */
export default function flyToCart(imgEl) {
  if (!imgEl || prefersReducedMotion()) return;
  const target = document.getElementById('cart-button');
  if (!target) return;

  const from = imgEl.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  if (!from.width || !to.width) return;

  const size = Math.min(from.width, from.height, 140);
  const startX = from.left + from.width / 2 - size / 2;
  const startY = from.top + from.height / 2 - size / 2;
  const dx = to.left + to.width / 2 - (startX + size / 2);
  const dy = to.top + to.height / 2 - (startY + size / 2);

  const ghost = document.createElement('img');
  ghost.src = imgEl.currentSrc || imgEl.src;
  ghost.alt = '';
  Object.assign(ghost.style, {
    position: 'fixed',
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${size}px`,
    height: `${size}px`,
    objectFit: 'cover',
    borderRadius: '50%',
    background: '#fff',
    boxShadow: '0 18px 40px -12px rgba(15,61,30,.45)',
    zIndex: 9999,
    pointerEvents: 'none',
    willChange: 'transform, opacity',
  });
  document.body.appendChild(ghost);

  const anim = ghost.animate(
    [
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 90}px) scale(0.6)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0.4 },
    ],
    { duration: 800, easing: 'cubic-bezier(.45,0,.2,1)' }
  );
  anim.onfinish = () => {
    ghost.remove();
    target.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.18) rotate(-8deg)' }, { transform: 'scale(1)' }],
      { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' }
    );
  };
}
