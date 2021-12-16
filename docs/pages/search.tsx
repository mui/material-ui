import * as React from 'react';
import { useRouter } from 'next/router';
import Home from '.';

export default function Search() {
  // TODO: Use DeferredAppSearch directly.
  const AppSearch = React.lazy(() => import('docs/src/modules/components/AppSearch'));
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  // TODO(END): Use DeferredAppSearch directly.
  const router = useRouter();
  let query: string;
  if (typeof router.query.q !== 'string') {
    query = router.query.q?.join(' ') ?? '';
  } else if (typeof router.query.q === 'string') {
    query = router.query.q;
  } else {
    throw new Error('Invalid query');
  }

  return (
    <React.Fragment>
      <Home />
      <React.Fragment>
        {/* Suspense isn't supported for SSR yet */}
        {mounted ? (
          <React.Suspense fallback={null}>
            <AppSearch initialQuery={query ?? 'how to search'} isOpen />
          </React.Suspense>
        ) : null}
      </React.Fragment>
    </React.Fragment>
  );
}
