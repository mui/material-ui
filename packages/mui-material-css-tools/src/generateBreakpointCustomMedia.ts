import type { Theme } from '@mui/material/styles';

export interface GenerateBreakpointCustomMediaOptions {
  /**
   * Prefix used for the generated custom media names.
   * @default '--mui-breakpoint'
   */
  prefix?: string | undefined;
}

export interface BreakpointCustomMediaDefinition {
  name: string;
  query: string;
}

function stripMediaPrefix(mediaQuery: string) {
  return mediaQuery.replace(/^@media\s*/, '').replace(/:\s*/g, ': ');
}

/** Returns the aliases consumed by Material UI component CSS Modules. */
export function getBreakpointCustomMediaDefinitions(
  theme: Pick<Theme, 'breakpoints'>,
  options: GenerateBreakpointCustomMediaOptions = {},
): BreakpointCustomMediaDefinition[] {
  const { prefix = '--mui-breakpoint' } = options;

  return theme.breakpoints.keys.flatMap((key) => [
    { name: `${prefix}-up-${key}`, query: stripMediaPrefix(theme.breakpoints.up(key)) },
    { name: `${prefix}-down-${key}`, query: stripMediaPrefix(theme.breakpoints.down(key)) },
  ]);
}

/** Generates custom-media declarations for PostCSS or Lightning CSS. */
export default function generateBreakpointCustomMedia(
  theme: Pick<Theme, 'breakpoints'>,
  options: GenerateBreakpointCustomMediaOptions = {},
) {
  return getBreakpointCustomMediaDefinitions(theme, options)
    .map(({ name, query }) => `@custom-media ${name} ${query};`)
    .join('\n');
}
