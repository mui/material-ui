import { CSSObject } from '@mui/styled-engine';
import { StyleFunction } from './Box';

export type TransformFunction = (
  cssValue: unknown,
  userValue: unknown,
) => number | string | React.CSSProperties | CSSObject;

export interface StyleOptions<PropKey> {
  cssProperty?: PropKey | keyof React.CSSProperties | false;
  prop: PropKey;
  /**
   * dot access in `Theme`
   */
  themeKey?: string;
  transform?: TransformFunction;
}
export function style<PropKey extends string, Theme extends object>(
  options: StyleOptions<PropKey>,
): StyleFunction<{ [K in PropKey]?: unknown } & { theme?: Theme }> & { filterProps: string[] };
export function getPath<T>(obj: T, path: string | undefined, checkVars?: boolean): null | unknown;
export function getStyleValue(
  themeMapping: object | ((arg: any) => any),
  transform: TransformFunction | null,
  propValueFinal: unknown,
  userValue?: unknown,
): any;
