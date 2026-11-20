# Fruteria – Freshness Delivered

Premium fruit-shop storefront built with **React 18 + Vite**.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build && npm run preview
```

## UI / UX upgrade

Business logic is unchanged (`src/context/AppContext.jsx` and `src/data/products.js`). The cart, wishlist, search, category filter, checkout validation and order placement all behave exactly as before. Only presentation, animation and navigation polish changed.

### Libraries

| Library | Used for |
| --- | --- |
| [Motion](https://github.com/motiondivision/motion) (`motion/react`) | Page transitions, scroll reveals, staggered grids, layout animations for filters and the cart, the cart drawer, toasts and micro-interactions |
| [Lenis](https://github.com/darkroomengineering/lenis) | Smooth wheel scrolling on desktop. Off on touch devices and for reduced-motion users |
| Fontsource (Fraunces + Plus Jakarta Sans) | Self-hosted variable fonts, so there is no Google Fonts request |

GSAP was not added because it would duplicate Motion. Swiper was not added because CSS scroll-snap covers the mobile carousels.

Patterns from [React Bits](https://github.com/DavidHDev/react-bits) (SplitText), [Magic UI](https://github.com/magicuidesign/magicui) (BlurFade, Marquee) and [Aceternity UI](https://github.com/aceternity/aceternity-ui) (Spotlight) were rewritten as small plain-CSS + Motion components in `src/components/ui/`. Those kits are Tailwind-based, so their components were not copied in.

### Structure

- `src/index.css` holds the design tokens (colors, type, radius, shadows, motion) and shared button and image styles.
- `src/lib/` holds the motion presets, the Lenis hook, the scroll helpers, the fly-to-cart effect and the image helpers.
- `src/components/ui/` holds `Reveal`, `SplitText`, `SmartImage` (WebP + skeleton + fade-in) and `RollingNumber`.
- `public/images/opt/` holds WebP copies of every PNG. They total 0.9 MB, down from 9.2 MB, and the PNGs stay as a fallback.

### Accessibility and performance

- `prefers-reduced-motion` is respected through `MotionConfig reducedMotion="user"`, a CSS override, and by not starting Lenis.
- Hover-only effects are gated behind `@media (hover: hover)`.
- Images have explicit dimensions to prevent layout shift, are lazy-loaded below the fold, and the hero image is preloaded.
- Visible focus rings, ARIA labels on icon buttons, Escape closes menus and the cart, and `/` focuses search.
