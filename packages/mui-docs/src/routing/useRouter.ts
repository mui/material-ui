import { useRouter as useCompatRouter } from 'next/compat/router';
import { PrefetchOptions } from 'next/dist/shared/lib/router/router';
import { useRouter as useNavRouter, usePathname, useSearchParams } from 'next/navigation';

interface TransitionOptions {
  locale?: string | false;
  scroll?: boolean;
  shallow?: boolean;
  unstable_skipClientCache?: boolean;
}

/**
 * Router that works in both the pages & app folders
 */
export function useRouter() {
  const compatRouter = useCompatRouter();
  const navRouter = useNavRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return {
    getSearchParam: (name: string) => {
      if (compatRouter) {
        const result = compatRouter.query[name];
        return Array.isArray(result) ? result[0] : result;
      }

      return searchParams.get(name);
    },
    pathname: compatRouter?.asPath ?? pathname!,
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
