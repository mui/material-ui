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
   * The keys be used as a starting point for getting `themeKey`
   *
   * This is an experimental field for using in `@mui/joy`.
   */
  internal_designTokensKey?: string;
}
export function style<PropKey extends string, Theme extends object>(
  options: StyleOptions<PropKey>,
): StyleFunction<{ [K in PropKey]?: unknown } & { theme?: Theme }> & { filterProps: string[] };
