import * as React from 'react';
import { useRouter } from 'next/router';

const isBrowser = typeof window !== 'undefined';

export default function useScopedDemo() {
  const router = useRouter();

  return React.useMemo(() => {
    const queryParam = router.query.scopedDemo;

    let scopedDemo = Array.isArray(queryParam) ? undefined : queryParam;

    if (scopedDemo === undefined && isBrowser) {
      // In production, the next router query params are `undefined` on the first render
      // Fall back to window.location to get query params ASAP
      scopedDemo = new URLSearchParams(window.location.search).get('scopedDemo') ?? undefined;
    }

    return scopedDemo;
  }, [router.query.scopedDemo]);
}
