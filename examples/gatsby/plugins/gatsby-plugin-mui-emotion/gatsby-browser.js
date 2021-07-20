/* eslint-disable import/prefer-default-export */
import React from 'react';
import { CacheProvider } from '@emotion/react';
import getEmotionCache from './getEmotionCache';

const cache = getEmotionCache();

export const wrapRootElement = ({ element }) => {
  return <CacheProvider value={cache}>{element}</CacheProvider>;
};
