import { CSSProperties } from '@material-ui/styles';
import * as CSS from 'csstype';

// disable automatic export
export {};

type ThemeOf<Props> = Props extends WithTheme<infer Theme> ? Theme : never;
type WithThemeOfProps<Props> = WithTheme<ThemeOf<Props>>;
interface WithTheme<Theme extends object> {
  theme?: Theme;
}
export type PropsFor<SomeStyleFunction> = SomeStyleFunction extends StyleFunction<infer Props>
  ? Props
  : never;
export type StyleFunction<Props> = (props: Props) => any;
type SimpleStyleFunction<PropKey extends keyof any> = StyleFunction<Partial<Record<PropKey, any>>>;

// borders.js
export const border: SimpleStyleFunction<'border'>;
export const borderTop: SimpleStyleFunction<'borderTop'>;
export const borderRight: SimpleStyleFunction<'borderRight'>;
export const borderBottom: SimpleStyleFunction<'borderBottom'>;
export const borderLeft: SimpleStyleFunction<'borderLeft'>;
export const borderColor: SimpleStyleFunction<'borderColor'>;
export const borderRadius: SimpleStyleFunction<'borderRadius'>;
export const borders: SimpleStyleFunction<
  | 'border'
  | 'borderTop'
  | 'borderRight'
  | 'borderBottom'
  | 'borderLeft'
  | 'borderColor'
  | 'borderRadius'
>;
export type BordersProps = PropsFor<typeof borders>;

// breakpoints.js
/**
 *
 * @returns An enhanced stylefunction that considers breakpoints
 */
export function breakpoints<Props extends { theme: { breakpoints?: unknown } }>(
  styleFunction: StyleFunction<Props>,
): StyleFunction<Props>;

// compose.js
/**
 * given a list of StyleFunction return the intersection of the props each individual
 * StyleFunction requires.
 *
 * If `firstFn` requires { color: string } and `secondFn` requires { spacing: number }
 * their composed function requires { color: string, spacing: number }
 */
type ComposedArg<T> = T extends Array<(arg: infer P) => any> ? P : never;
type ComposedStyleProps<T> = ComposedArg<T>;
type Composed<T extends Array<StyleFunction<any>>> = StyleFunction<ComposedStyleProps<T>>;
export function compose<T extends Array<StyleFunction<any>>>(...args: T): Composed<T>;

// css.js
export function css<Props>(
  styleFunction: StyleFunction<Props>,
): StyleFunction<Props | { css: Omit<Props, 'theme'> }>;

// default display.js TODO

// * flexbox.js TODO

// palette.js
export const color: SimpleStyleFunction<'color'>;
export const bgcolor: SimpleStyleFunction<'bgcolor'>;
export const palette: SimpleStyleFunction<'bgcolor' | 'color'>;
export type PaletteProps = PropsFor<typeof palette>;

// * positions.js TODO

// default shadows.js TODO

// * sizing.js TODO
export const width: SimpleStyleFunction<'width'>;
export const maxWidth: SimpleStyleFunction<'maxWidth'>;
export const minWidth: SimpleStyleFunction<'minWidth'>;
export const height: SimpleStyleFunction<'height'>;
export const maxHeight: SimpleStyleFunction<'maxHeight'>;
export const minHeight: SimpleStyleFunction<'minHeight'>;
export const sizeWidth: SimpleStyleFunction<'sizeWidth'>;
export const sizeHeight: SimpleStyleFunction<'sizeHeight'>;
export const sizing: SimpleStyleFunction<
  | 'width'
  | 'maxWidth'
  | 'minWidth'
  | 'height'
  | 'maxHeight'
  | 'minHeight'
  | 'sizeWidth'
  | 'sizeHeight'
>;
export type SizingProps = PropsFor<typeof sizing>;

// spacing.js
export const spacing: SimpleStyleFunction<
  | 'm'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'mx'
  | 'my'
  | 'p'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'px'
  | 'py'
  | 'margin'
  | 'marginLeft'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'padding'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
>;
export type SpacingProps = PropsFor<typeof spacing>;

// style.js
export interface StyleOptions<PropKey, Theme extends object> {
  cssProperty?: PropKey | keyof CSS.Properties | false;
  prop: PropKey;
  /**
   * dot access in `Theme`
   */
  themeKey?: string;
  transform?: (cssValue: unknown) => number | string;
}
export function style<PropKey extends string, Theme extends object>(
  options: StyleOptions<PropKey, Theme>,
): StyleFunction<{ [K in PropKey]: unknown } & { theme: Theme }>;

// typography.js
export const fontFamily: SimpleStyleFunction<'fontFamily'>;
export const fontSize: SimpleStyleFunction<'fontSize'>;
export const fontWeight: SimpleStyleFunction<'fontWeight'>;
export const textAlign: SimpleStyleFunction<'textAlign'>;
export const typography: SimpleStyleFunction<
  'fontFamily' | 'fontSize' | 'fontWeight' | 'textAlign'
>;
export type TypographyProps = PropsFor<typeof typography>;

// utils
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
