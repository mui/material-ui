import { createEmotionCache as createCache } from '@mui/material-nextjs/v15-pagesRouter';
import { prefixer } from 'stylis';
import globalSelector from './modules/utils/globalSelector';

export default function createEmotionCache() {
  // TODO remove prepend: true once JSS is out
  return createCache({
    key: 'css',
    prepend: true,
    enableCssLayer: true,
    stylisPlugins: [prefixer, globalSelector],
  });
}
