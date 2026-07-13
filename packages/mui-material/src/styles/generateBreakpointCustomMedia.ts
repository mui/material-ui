import type { Theme } from './createTheme';

export interface GenerateBreakpointCustomMediaOptions {
  /**
   * Prefix used by Material UI component CSS custom media aliases.
   * @default '--mui-breakpoint'
   */
  prefix?: string | undefined;
}

function stripMediaPrefix(mediaQuery: string) {
  return mediaQuery.replace(/^@media\s*/, '').replace(/:\s*/g, ': ');
}

/**
 * Generates the @custom-media aliases used by Material UI component CSS.
 *
 * Use this when importing `@mui/material/components-source.css`; the app's
 * PostCSS or Lightning CSS pipeline lowers the aliases to real media queries.
 */
export default function generateBreakpointCustomMedia(
  theme: Pick<Theme, 'breakpoints'>,
  options: GenerateBreakpointCustomMediaOptions = {},
) {
  const { prefix = '--mui-breakpoint' } = options;

  return theme.breakpoints.keys
    .flatMap((key) => [
      `@custom-media ${prefix}-up-${key} ${stripMediaPrefix(theme.breakpoints.up(key))};`,
      `@custom-media ${prefix}-down-${key} ${stripMediaPrefix(theme.breakpoints.down(key))};`,
    ])
    .join('\n');
}
