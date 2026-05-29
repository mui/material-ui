// Runtime re-export of the docs branding theme. See `brandingThemeShim.d.ts`
// for the rationale — this file is excluded from `test/tsconfig.json` so TS
// uses the declaration; Vite resolves the import here at bundle time.
// eslint-disable-next-line import/no-relative-packages
import { brandingLightTheme } from '../../packages-internal/core-docs/src/branding/brandingTheme';

export default brandingLightTheme;
