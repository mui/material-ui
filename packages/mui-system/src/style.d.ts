import { StyleFunction } from './Box';
import { CSSObject } from './createStyled';

export interface StyleOptions<PropKey> {
  cssProperty?: PropKey | keyof React.CSSProperties | false;
  prop: PropKey;
  /**
   * dot access in `Theme`
   */
  themeKey?: string;
  transform?: (cssValue: unknown) => number | string | React.CSSProperties | CSSObject;
}
export function style<PropKey extends string, Theme extends object>(
  options: StyleOptions<PropKey>,
): StyleFunction<{ [K in PropKey]?: unknown } & { theme: Theme }>;
