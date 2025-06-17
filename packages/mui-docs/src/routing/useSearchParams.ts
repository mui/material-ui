import { useRouter as useCompatRouter } from 'next/compat/router';
import { useSearchParams as useSearchParamsNext } from 'next/navigation';

/**
 * Search params that works in both the pages & app folders
 */
export function useSearchParams() {
  const compatRouter = useCompatRouter();
  const searchParams = useSearchParamsNext();

  return {
    getSearchParam: (name: string) => {
      if (compatRouter) {
        const result = compatRouter.query[name];
        return Array.isArray(result) ? result[0] : result;
      }

      return searchParams.get(name);
    },
  };
}
