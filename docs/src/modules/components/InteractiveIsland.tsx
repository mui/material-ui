import * as React from 'react';

/**
 * We assume that this component is inside a suspense boundary whose fallback isn't triggered on the server.
 * On the server, we render with the inline styles from props.
 * On the client, we adjust the inline styles via ref callback (don't want to schedule any React work)
 * @param props
 * @returns
 */
function VisibleHydrationProgress({ children }: { children?: React.ReactNode }) {
  return (
    <div
      ref={(instance) => {
        if (instance !== null) {
          instance.style.filter = '';
          instance.style.outline = '';
        }
      }}
      style={{ filter: 'blur(5px)', outline: '3px solid red' }}
    >
      {children}
    </div>
  );
}

const HydrationProgress =
  // @ts-ignore
  process.env.STAGING === true ? VisibleHydrationProgress : React.Fragment;

export default function InteractiveIsland({ children }: { children?: React.ReactNode }) {
  return (
    <React.Suspense fallback={null}>
      <HydrationProgress>{children}</HydrationProgress>
    </React.Suspense>
  );
}
