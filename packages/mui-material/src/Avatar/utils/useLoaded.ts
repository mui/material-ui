'use client';
import * as React from 'react';

type LoadedState = 'idle' | 'loading' | 'successful' | 'error';

function useLoaded(
  src: string | undefined,
  srcSet: string | undefined,
  crossOrigin: string | undefined,
  referrerPolicy: string | undefined,
) {
  const [loaded, setLoaded] = React.useState<LoadedState>('idle');

  React.useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }

    setLoaded('loading');

    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded('successful');
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded('error');
    };
    if (crossOrigin !== undefined) {
      image.crossOrigin = crossOrigin;
    }
    if (referrerPolicy !== undefined) {
      image.referrerPolicy = referrerPolicy;
    }
    if (src !== undefined) {
      image.src = src;
    }
    if (srcSet !== undefined) {
      image.srcset = srcSet;
    }

    return () => {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);

  return loaded;
}

export default useLoaded;
