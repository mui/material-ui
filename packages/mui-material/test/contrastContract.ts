import type { Theme } from '@mui/material/styles';
import { contrastRatio } from './contrast';

/**
 * The palette contrast contract: the pinned WCAG 1.4.3 facts of the default
 * light theme, shared by every component's accessibility conformance suite.
 *
 * These are the documented public claim, not a convenience snapshot: the
 * per-component `accessibility.md` reports and the committed axe results
 * (`*.a11y.json`) state these values, so a palette change must fail the
 * enforcement test (`src/styles/paletteContrast.test.ts`) instead of
 * silently re-blessing itself.
 *
 * Nothing is hand-invented. `main` is the palette constant
 * (`createPalette.js`: primary = blue[700], secondary = purple[500],
 * error = red[700], info = lightBlue[700], success = green[800], warning
 * hand-picked next to orange[800]); the ratios are the WCAG 2.x formula over
 * those hex values. Verify any row with a contrast checker, for example
 * https://webaim.org/resources/contrastchecker/ — `contrastText` and
 * `background.paper` are both `#fff`, which is why the directions agree.
 *
 * The pinned ratios use two decimals on purpose. That is the precision the
 * reports and public checkers display, so a human can verify each row against
 * an independent implementation. More digits would remove that property and
 * add no drift protection: the exact tripwire is the pinned `main` hex.
 * Exactness matters only when a ratio meets a WCAG threshold — for that,
 * `measurePaletteContrast` returns exact ratios.
 *
 * Component suites consume this contract instead of restating numbers:
 *
 * ```ts
 * import { FAILING_PALETTE_COLORS, PALETTE_CONTRAST } from '../../test/contrastContract';
 * // Button: contained = contrastText on main, text/outlined = main on paper,
 * // so its failing color set is exactly FAILING_PALETTE_COLORS.
 * ```
 */
export const PALETTE_CONTRAST_COLORS = [
  'primary',
  'secondary',
  'error',
  'info',
  'success',
  'warning',
] as const;

export type PaletteContrastColor = (typeof PALETTE_CONTRAST_COLORS)[number];

export interface PaletteContrastEntry {
  color: PaletteContrastColor;
  /** The palette constant behind the ratios, pinned so hex drift is loud. */
  main: string;
  /** `contrastText` on `main` — filled surfaces (contained Button). */
  onMain: number;
  /** `main` on `background.paper` — colored text (text/outlined labels). */
  onPaper: number;
}

export const PALETTE_CONTRAST: readonly PaletteContrastEntry[] = [
  { color: 'primary', main: '#1976d2', onMain: 4.6, onPaper: 4.6 },
  { color: 'secondary', main: '#9c27b0', onMain: 6.3, onPaper: 6.3 },
  { color: 'error', main: '#d32f2f', onMain: 4.98, onPaper: 4.98 },
  { color: 'info', main: '#0288d1', onMain: 3.86, onPaper: 3.86 },
  { color: 'success', main: '#2e7d32', onMain: 5.13, onPaper: 5.13 },
  { color: 'warning', main: '#ed6c02', onMain: 3.11, onPaper: 3.11 },
];

/**
 * The colors below WCAG 4.5:1 in at least one direction — the set every
 * report's Known gaps entry names.
 */
export const FAILING_PALETTE_COLORS: readonly PaletteContrastColor[] = ['info', 'warning'];

/**
 * Recomputes the contract's facts from a theme, in `PALETTE_CONTRAST` shape.
 * The ratios are exact: classify against WCAG thresholds directly on them.
 * Round with `roundRatio` from `./contrast` only to compare against the
 * pinned two-decimal claim or to display a value.
 */
export function measurePaletteContrast(theme: Theme): PaletteContrastEntry[] {
  return PALETTE_CONTRAST_COLORS.map((color) => ({
    color,
    main: theme.palette[color].main,
    onMain: contrastRatio(theme.palette[color].contrastText, theme.palette[color].main),
    onPaper: contrastRatio(theme.palette[color].main, theme.palette.background.paper),
  }));
}
