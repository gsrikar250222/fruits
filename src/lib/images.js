// Optimised WebP twins of /public/images/*.png live in /public/images/opt/.
export const webpOf = (src) =>
  typeof src === 'string' && src.startsWith('/images/') && src.endsWith('.png')
    ? src.replace('/images/', '/images/opt/').replace(/\.png$/, '.webp')
    : null;

// Soft, fruit-inspired backdrop tints used behind product photography.
export const fruitTints = {
  Apple: '#fbe9e6',
  Banana: '#fdf3d3',
  Orange: '#fdebd6',
  Grapes: '#eef0e0',
  Mango: '#fdf0d2',
  Pomegranate: '#f9e4e4',
  Berries: '#e9ebf6',
  'Seasonal Specials': '#e8f2e2',
};
export const tintFor = (category) => fruitTints[category] || '#f1f5ec';
