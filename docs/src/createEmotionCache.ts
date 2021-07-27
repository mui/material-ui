import createCache from '@emotion/cache';

export default function createEmotionCache() {
  // TODO remove prepend: true
  return createCache({ key: 'css', prepend: true });
}
