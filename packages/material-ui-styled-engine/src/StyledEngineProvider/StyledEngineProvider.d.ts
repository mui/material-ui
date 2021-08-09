import * as React from 'react';
import type { EmotionCache } from '@emotion/cache';

export interface StyledEngineProviderProps {
  children?: React.ReactNode;
  injectFirst?: boolean;
}

export const cache: EmotionCache;

export default function StyledEngineProvider(props: StyledEngineProviderProps): JSX.Element;
