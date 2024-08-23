import {
  Interpolation,
  internal_serializeStyles as serializeStyles,
} from '@mui/styled-engine';

type StyleFunction<P> = (props: P) => Interpolation<P>;

/**
 * Memoize style function on theme.
 * Intended to be used in styled() calls that only need access to the theme.
 */
export default function memoProps<P>(styleFn: StyleFunction<P>) {
  let lastValue: Interpolation<P>;
  let lastAccessedProps = {} as Record<string, any>;

  function didChange(newProps: P) {
    for (const key in lastAccessedProps) {
      // @ts-ignore Index newProps with key
      if (newProps[key] !== lastAccessedProps[key]) {
        return true;
      }
    }
    return false;
  }

  function createProxy(props: P) {
    const proxy = {}
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        if (key === 'ownerState') {
          Object.defineProperty(proxy, key, {
            // @ts-ignore
            value: createProxy(props[key]),
            writable: false,
            enumerable: true,
          })
        } else {
          Object.defineProperty(proxy, key, {
            get: () => {
              const value = props[key];
              lastAccessedProps[key] = value;
              return value;
            },
            enumerable: true,
          })
        }
      }
    }
    return proxy;
  }

  return (props: P) => {
    if (lastValue === undefined || didChange(props)) {
      lastAccessedProps = {}

      // @ts-ignore
      const proxy = createProxy(props)

      // @ts-ignore
      const style = styleFn(proxy);

      lastValue = style;
    }
    return lastValue;
  };
}
