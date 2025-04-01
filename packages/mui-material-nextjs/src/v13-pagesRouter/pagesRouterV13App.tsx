import * as React from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from './createCache';
import { useRouter as usePagesRouter } from '../nextCompatRouter.cjs';

export interface EmotionCacheProviderProps {
  emotionCache?: EmotionCache;
}

const defaultEmotionCache = createEmotionCache();

export function AppCacheProvider({
  emotionCache = defaultEmotionCache,
  children,
}: React.PropsWithChildren<EmotionCacheProviderProps>) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = usePagesRouter();
    if (!router) {
      console.error(
        [
          'The pages router CacheProvider is not compatible with the pages router.',
          'Please use the app router CacheProvider from `@mui/material-ui-nextjs/vx-pagesRouter` instead.',
        ].join('n'),
      );
    }
  }
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}
