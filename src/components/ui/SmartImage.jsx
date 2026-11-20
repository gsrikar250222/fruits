import { forwardRef, useEffect, useRef, useState } from 'react';
import { webpOf } from '../../lib/images';

/**
 * <picture> with a WebP source, PNG fallback, shimmer skeleton while loading
 * and a soft fade/scale reveal once decoded. Explicit width/height avoid CLS.
 */
const SmartImage = forwardRef(function SmartImage(
  { src, alt, className = '', imgClassName, width, height, priority = false, sizes, srcSetWebp, ...rest },
  forwardedRef
) {
  const innerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const webp = srcSetWebp || webpOf(src);

  const setRefs = (node) => {
    innerRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  useEffect(() => {
    const img = innerRef.current;
    if (img && img.complete && img.naturalWidth) setLoaded(true);
  }, [src]);

  return (
    <span className={`smart-img ${loaded ? 'is-loaded' : ''} ${className}`}>
      <picture>
        {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
        <img
          ref={setRefs}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imgClassName}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : undefined}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          {...rest}
        />
      </picture>
    </span>
  );
});

export default SmartImage;
