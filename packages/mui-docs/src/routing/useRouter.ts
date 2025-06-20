import { useRouter as useCompatRouter } from 'next/compat/router';
import { PrefetchOptions } from 'next/dist/shared/lib/router/router';
import { useRouter as useNavRouter, usePathname } from 'next/navigation';

interface TransitionOptions {
  locale?: string | false;
  scroll?: boolean;
  shallow?: boolean;
  unstable_skipClientCache?: boolean;
}

export interface Router {
  pathname: string;
  prefetch: (url: string, asPath?: string, options?: PrefetchOptions) => void;
  push: (url: string, asPath?: string, options?: TransitionOptions) => void;
  replace: (url: string, asPath?: string, options?: TransitionOptions) => void;
}

/**
 * Router that works in both the pages & app folders
 */
export function useRouter(): Router {
  const compatRouter = useCompatRouter();
  const navRouter = useNavRouter();
  const pathname = usePathname();

  return {
    pathname: (compatRouter?.asPath ?? pathname!).replace(/\/$/, ''),
    prefetch: (url: string, asPath?: string, options?: PrefetchOptions) => {
      if (compatRouter) {
        compatRouter.prefetch(url, asPath, options);
      } else {
        navRouter.prefetch(url);
      }
    },
    push: (url: string, asPath?: string, options?: TransitionOptions) => {
      if (compatRouter) {
        compatRouter.push(url, asPath, options);
      } else {
        navRouter.push(url);
      }
    },
    replace: (url: string, asPath?: string, options?: TransitionOptions) => {
      if (compatRouter) {
        compatRouter.replace(url, asPath, options);
      } else {
        navRouter.replace(url);
      }
    },
  };
}
