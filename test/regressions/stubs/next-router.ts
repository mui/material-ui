// Stub for `next/router` so docs composites that import `useRouter`
// (directly or transitively via `@mui/internal-core-docs/Link`) render
// without a Next.js host. Returns safe defaults; nothing in the regression
// bundle actually needs to navigate.

const router = {
  pathname: '/',
  asPath: '/',
  route: '/',
  query: {},
  basePath: '',
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
  isFallback: false,
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  prefetch: () => Promise.resolve(),
  back: () => {},
  forward: () => {},
  reload: () => {},
  beforePopState: () => {},
  events: { on: () => {}, off: () => {}, emit: () => {} },
};

export function useRouter() {
  return router;
}

export default { useRouter };
