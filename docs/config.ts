// Re-export from the canonical location in @mui/internal-core-docs.
// next.config.ts cannot use tsconfig path aliases (Next.js's SWC transpiler
// resolves them relative to docs/ instead of the repo root), so this thin
// re-export bridges the gap with a direct relative path.
export {
  LANGUAGES,
  LANGUAGES_SSR,
  LANGUAGES_IN_PROGRESS,
  LANGUAGES_IGNORE_PAGES,
  // eslint-disable-next-line import/no-relative-packages
} from '../packages-internal/core-docs/src/constants/constants';
