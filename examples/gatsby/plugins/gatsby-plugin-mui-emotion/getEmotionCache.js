import createCache from '@emotion/cache';

export default function getEmotionCache() {
  return createCache({ key: 'css' });
}
