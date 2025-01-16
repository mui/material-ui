import * as React from 'react';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createCache';

export interface EmotionCacheProviderProps {
  emotionCache?: EmotionCache;
}

const defaultEmotionCache = createEmotionCache();

export function AppCacheProvider({
  emotionCache = defaultEmotionCache,
  children,
}: React.PropsWithChildren<EmotionCacheProviderProps>) {
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}
