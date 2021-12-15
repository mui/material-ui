import createCache from '@emotion/cache';

export default function createEmotionCache() {
  // If using css-modules, to correct the injection order
  // add prepend: true to the createCache options
  // https://mui.com/guides/interoperability/#css-injection-order-3
  return createCache({ key: 'css' });
}
