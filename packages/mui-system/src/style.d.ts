import { CSSObject } from '@mui/styled-engine';
import { StyleFunction } from './Box';

export interface StyleOptions<PropKey> {
  cssProperty?: PropKey | keyof React.CSSProperties | false;
  prop: PropKey;
  /**
   * dot access in `Theme`
   */
  themeKey?: string;
  transform?: (cssValue: unknown) => number | string | React.CSSProperties | CSSObject;
  /**
   * If `true`, `theme.vars` will be used as a starting point for getting `themeKey`
   * fallback to provided theme if `!theme.vars`.
   *
   * This is an experimental flag for using in `@mui/joy`.
   */
  enableThemeVars?: boolean;
}
export function style<PropKey extends string, Theme extends object>(
  options: StyleOptions<PropKey>,
): StyleFunction<{ [K in PropKey]?: unknown } & { theme?: Theme }> & { filterProps: string[] };
