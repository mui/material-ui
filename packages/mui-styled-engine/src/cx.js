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

      scope: {
        const arg = args[0];

        if (!matchCSSObject(arg)) {
          break scope;
        }

        increaseSpecificityToTakePrecedenceOverMediaQueries.saveClassNameCSSObjectMapping(
          cache,
          className,
          arg,
        );
      }

      return className;
    };

    const cx = (...args) => {
      const className = classnames(args);

      const feat27FixedClassnames =
        increaseSpecificityToTakePrecedenceOverMediaQueries.fixClassName(cache, className, css);

      return merge(cache.registered, css, feat27FixedClassnames);
    };

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

  return { cx };
}

// https://github.com/garronej/tss-react/issues/27
const increaseSpecificityToTakePrecedenceOverMediaQueries = (() => {
  const cssObjectMapByCache = new WeakMap();

  return {
    saveClassNameCSSObjectMapping: (cache, className, cssObject) => {
      let cssObjectMap = cssObjectMapByCache.get(cache);

      if (cssObjectMap === undefined) {
        cssObjectMap = new Map();
        cssObjectMapByCache.set(cache, cssObjectMap);
      }

      cssObjectMap.set(className, cssObject);
    },
    fixClassName: (() => {
      function fix(classNameCSSObjects) {
        let isThereAnyMediaQueriesInPreviousClasses = false;

        return classNameCSSObjects.map(([className, cssObject]) => {
          if (cssObject === undefined) {
            return className;
          }

          let out;

          if (!isThereAnyMediaQueriesInPreviousClasses) {
            out = className;

            for (const key in cssObject) {
              if (key.startsWith('@media')) {
                isThereAnyMediaQueriesInPreviousClasses = true;
                break;
              }
            }
          } else {
            out = {
              '&&': cssObject,
            };
          }

          return out;
        });
      }

      return (cache, className, css) => {
        const cssObjectMap = cssObjectMapByCache.get(cache);

        return classnames(
          fix(
            className.split(' ').map((className) => [className, cssObjectMap?.get(className)]),
          ).map((classNameOrCSSObject) =>
            typeof classNameOrCSSObject === 'string'
              ? classNameOrCSSObject
              : css(classNameOrCSSObject),
          ),
        );
      };
    })(),
  };
})();

function matchCSSObject(arg) {
  return (
    arg instanceof Object &&
    !('styles' in arg) &&
    !('length' in arg) &&
    !('__emotion_styles' in arg)
  );
}
