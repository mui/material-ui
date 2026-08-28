/**
 * Exact WCAG 2.x contrast math for the accessibility conformance guards.
 *
 * The conformance reports (`src/<Component>/accessibility.md`) document which
 * theme color pairs fail 1.4.3 Contrast (Minimum). These helpers let tests
 * recompute those facts from `createTheme()` so a palette change cannot leave
 * a report stale.
 *
 * Deliberately not `getContrastRatio` from `@mui/system`: `getLuminance`
 * truncates luminance at three digits, which can flip a classification right
 * at the 4.5:1 boundary (`success` on the filled surface sits at 4.4966:1).
 */
import { decomposeColor, hslToRgb } from '@mui/system/colorManipulator';

interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

function parseColor(color: string): Rgba {
  let parsed = decomposeColor(color);
  if (parsed.type === 'hsl' || parsed.type === 'hsla') {
    parsed = decomposeColor(hslToRgb(color));
  }
  if (parsed.type !== 'rgb' && parsed.type !== 'rgba') {
    throw new Error(
      `Unsupported color format: "${color}". The exact WCAG math covers sRGB colors only.`,
    );
  }
  const [r, g, b, a = 1] = parsed.values;
  return { r, g, b, a };
}

function toHex({ r, g, b }: Rgba): string {
  return `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Composites `foreground` at `alpha` (multiplied with the color's own alpha)
 * over an opaque `background`. Use it for surfaces the browser composes at
 * paint time: a placeholder rendered at `opacity`, a selected-state tint of
 * `alpha(main, selectedOpacity)`, the filled input surface.
 */
export function blend(foreground: string, alpha: number, background: string): string {
  const fg = parseColor(foreground);
  const bg = parseColor(background);
  if (bg.a !== 1) {
    throw new Error(`blend() needs an opaque background, got "${background}". Resolve it first.`);
  }
  const effectiveAlpha = alpha * fg.a;
  return toHex({
    r: fg.r * effectiveAlpha + bg.r * (1 - effectiveAlpha),
    g: fg.g * effectiveAlpha + bg.g * (1 - effectiveAlpha),
    b: fg.b * effectiveAlpha + bg.b * (1 - effectiveAlpha),
    a: 1,
  });
}

/** WCAG 2.x relative luminance of an opaque color. */
export function wcagLuminance(color: string): number {
  const { r, g, b, a } = parseColor(color);
  if (a !== 1) {
    throw new Error(`wcagLuminance() needs an opaque color, got "${color}". Blend it first.`);
  }
  const [lr, lg, lb] = [r, g, b]
    .map((channel) => channel / 255)
    .map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/**
 * WCAG 2.x contrast ratio. A translucent foreground (an rgba text color, for
 * example `text.secondary`) is composited onto the background first, matching
 * what the browser paints.
 */
export function contrastRatio(foreground: string, background: string): number {
  const resolvedForeground = blend(foreground, 1, background);
  const [hi, lo] = [wcagLuminance(resolvedForeground), wcagLuminance(background)].sort(
    (a, b) => b - a,
  );
  return (hi + 0.05) / (lo + 0.05);
}

/** `contrastRatio` rounded to two decimals, the precision the reports use. */
export function roundedContrastRatio(foreground: string, background: string): number {
  return Math.round(contrastRatio(foreground, background) * 100) / 100;
}

export interface TypographyStyleLike {
  fontSize?: string | number;
  fontWeight?: string | number;
}

/**
 * The 1.4.3 threshold a text style must meet: 3:1 for WCAG "large text"
 * (at least 24px, or at least 18.66px at weight 700+), 4.5:1 otherwise.
 * Pass a theme typography variant (`theme.typography.button`) so the
 * threshold derives from the same tokens the component renders with.
 */
export function requiredRatio(style: TypographyStyleLike, htmlFontSize = 16): 4.5 | 3 {
  if (style.fontSize == null) {
    throw new Error('requiredRatio() needs a style with a fontSize to derive the threshold.');
  }
  let px: number;
  if (typeof style.fontSize === 'number') {
    px = style.fontSize;
  } else if (style.fontSize.endsWith('rem')) {
    px = parseFloat(style.fontSize) * htmlFontSize;
  } else {
    px = parseFloat(style.fontSize);
  }
  const weight = Number(style.fontWeight ?? 400);
  const isLargeText = px >= 24 || (px >= 18.66 && weight >= 700);
  return isLargeText ? 3 : 4.5;
}
