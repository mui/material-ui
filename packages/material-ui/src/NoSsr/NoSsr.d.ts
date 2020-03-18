import * as React from 'react';

export interface NoSsrProps {
  children?: React.ReactNode;
  defer?: boolean;
  fallback?: React.ReactNode;
}

/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 *
 * This component can be useful in a variety of situations:
 *
 * -   Escape hatch for broken dependencies not supporting SSR.
 * -   Improve the time-to-first paint on the client by only rendering above the fold.
 * -   Reduce the rendering time on the server.
 * -   Under too heavy server load, you can turn on service degradation.
 * Demos:
 *
 * - [No Ssr](https://material-ui.com/components/no-ssr/)
 *
 * API:
 *
 * - [NoSsr API](https://material-ui.com/api/no-ssr/)
 */
declare const NoSsr: React.ComponentType<NoSsrProps>;

export default NoSsr;
