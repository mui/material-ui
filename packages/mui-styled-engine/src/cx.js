/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-shadow */
import { useMemo } from 'react';
import { serializeStyles } from '@emotion/serialize';
import { insertStyles, getRegisteredStyles } from '@emotion/utils';
import { __unsafe_useEmotionCache as useEmotionCache } from '@emotion/react';
import createCache from '@emotion/cache';
import { classnames } from './tools/classnames';

const { createCx } = (() => {
  function merge(registered, css, className) {
    const registeredStyles = [];

    const rawClassName = getRegisteredStyles(registered, registeredStyles, className);

    if (registeredStyles.length < 2) {
      return className;
    }

    return rawClassName + css(registeredStyles);
  }

  function createCx(params) {
    const { cache } = params;

    const css = (...args) => {
      const serialized = serializeStyles(args, cache.registered);
      insertStyles(cache, serialized, false);
      const className = `${cache.key}-${serialized.name}`;

      return className;
    };

    const cx = (...args) => 
       merge(cache.registered, css, classnames(args));

    return { cx };
  }

  return { createCx };
})();

/** Will pickup the contextual cache if any */
export function useCx() {
  const cache = useEmotionCache();

  const { cx } = useMemo(
    () => createCx({ cache: cache ?? createCache({ key: 'never' }) }),
    [cache],
  );

  return cx;
}
