import * as React from 'react';
// import AppSearch from 'docs/src/modules/components/AppSearch';
import Home from '.';

export default function Search() {
  // const AppSearch = await import('docs/src/modules/components/AppSearch');

  // const AppSearch = React.lazy(() => import('docs/src/modules/components/AppSearch'));
  // const [mounted, setMounted] = React.useState(false);
  // React.useEffect(() => {
  //   setMounted(true);
  // }, []);
  const AppSearch = React.lazy(() => import('docs/src/modules/components/AppSearch'));
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <React.Fragment>
      <Home />
      {/* <DeferredAppSearch /> */}
      {/* <AppSearch initialQuery={'asdf'} isOpen /> */}
      <React.Fragment>
        {/* Suspense isn't supported for SSR yet */}
        {mounted ? (
          <React.Suspense fallback={null}>
            <AppSearch initialQuery={'asdf'} isOpen />
            {/* <AppSearch /> */}
          </React.Suspense>
        ) : null}
      </React.Fragment>
    </React.Fragment>
  );
}
