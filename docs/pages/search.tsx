import * as React from 'react';
import Home from '.';

export default function Search() {
  // TODO: Use DeferredAppSearch directly.
  const AppSearch = React.lazy(() => import('docs/src/modules/components/AppSearch'));
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  // TODO(END): Use DeferredAppSearch directly.

  return (
    <React.Fragment>
      <Home />
      <React.Fragment>
        {/* Suspense isn't supported for SSR yet */}
        {mounted ? (
          <React.Suspense fallback={null}>
            <AppSearch initialQuery={'asdf'} isOpen />
          </React.Suspense>
        ) : null}
      </React.Fragment>
    </React.Fragment>
  );
}
