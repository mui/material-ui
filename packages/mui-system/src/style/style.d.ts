import { CSSObject } from '@mui/styled-engine';

export type PropsFor<SomeStyleFunction> =
  SomeStyleFunction extends StyleFunction<infer Props> ? Props : never;

export type StyleFunction<Props> = (props: Props) => any;

export type SimpleStyleFunction<PropKey extends keyof any> = StyleFunction<
  Partial<Record<PropKey, any>>
> & { filterProps: string[] };

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

export function getPath<T>(obj: T, path: string | undefined, checkVars?: boolean): null | unknown;
export function getStyleValue(
  themeMapping: object | ((arg: any) => any),
  transform: TransformFunction | null,
  propValueFinal: unknown,
  userValue?: unknown,
): any;

export default function style<PropKey extends string, Theme extends object>(
  options: StyleOptions<PropKey>,
): StyleFunction<{ [K in PropKey]?: unknown } & { theme?: Theme }> & { filterProps: string[] };
