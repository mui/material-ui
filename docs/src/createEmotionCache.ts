import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import globalSelector from './modules/utils/globalSelector';

export default function createEmotionCache() {
  // TODO remove prepend: true once JSS is out
  return createCache({ key: 'css', prepend: true, stylisPlugins: [prefixer, globalSelector] });
}
