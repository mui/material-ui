import * as CSS from 'csstype';

// disable automatic export
export {};

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
type DefaultBreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/**
 *
 * @returns An enhanced stylefunction that considers breakpoints
 */
export function breakpoints<Props, Breakpoints extends string = DefaultBreakPoints>(
  styleFunction: StyleFunction<Props>
): StyleFunction<Partial<Record<Breakpoints, Props>> & Props>;

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
export type ComposedStyleFunction<T extends Array<StyleFunction<any>>> = StyleFunction<
  ComposedStyleProps<T>
>;
export function compose<T extends Array<StyleFunction<any>>>(...args: T): ComposedStyleFunction<T>;

// styleFunctionSx.js

/**
 * @deprecated
 * The css style function is deprecated. Use the styleFunctionSx instead.
 */
export function css<Props>(
  styleFunction: StyleFunction<Props>
): StyleFunction<Props & { css?: Omit<Props, 'theme'>; sx?: Omit<Props, 'theme'> }>;

export function styleFunctionSx<Props>(
  styleFunction: StyleFunction<Props>
): StyleFunction<Props & { sx?: Omit<Props, 'theme'>; css?: Omit<Props, 'theme'> }>;

export const display: SimpleStyleFunction<
  'display' | 'displayPrint' | 'overflow' | 'textOverflow' | 'visibility' | 'whiteSpace'
>;

export type DisplayProps = PropsFor<typeof display>;

// flexbox.js
export const flexbox: SimpleStyleFunction<
  | 'flexBasis'
  | 'flexDirection'
  | 'flexWrap'
  | 'justifyContent'
  | 'alignItems'
  | 'alignContent'
  | 'order'
  | 'flex'
  | 'flexGrow'
  | 'flexShrink'
  | 'alignSelf'
  | 'justifyItems'
  | 'justifySelf'
>;
export type FlexboxProps = PropsFor<typeof flexbox>;

// grid.js
export const grid: SimpleStyleFunction<
  | 'gridGap'
  | 'gridColumnGap'
  | 'gridRowGap'
  | 'gridColumn'
  | 'gridRow'
  | 'gridAutoFlow'
  | 'gridAutoColumns'
  | 'gridAutoRows'
  | 'gridTemplateColumns'
  | 'gridTemplateRows'
  | 'gridTemplateAreas'
  | 'gridArea'
>;
export type GridProps = PropsFor<typeof grid>;

// palette.js
export const color: SimpleStyleFunction<'color'>;
export const bgcolor: SimpleStyleFunction<'bgcolor'>;
export const palette: SimpleStyleFunction<'bgcolor' | 'color'>;
export type PaletteProps = PropsFor<typeof palette>;

export const positions: SimpleStyleFunction<
  'zIndex' | 'position' | 'top' | 'right' | 'bottom' | 'left'
>;
export type PositionsProps = PropsFor<typeof positions>;

export const shadows: SimpleStyleFunction<'boxShadow'>;
export type ShadowsProps = PropsFor<typeof shadows>;

// * sizing.js TODO
export const width: SimpleStyleFunction<'width'>;
export const maxWidth: SimpleStyleFunction<'maxWidth'>;
export const minWidth: SimpleStyleFunction<'minWidth'>;
export const height: SimpleStyleFunction<'height'>;
export const maxHeight: SimpleStyleFunction<'maxHeight'>;
export const minHeight: SimpleStyleFunction<'minHeight'>;
export const sizeWidth: SimpleStyleFunction<'sizeWidth'>;
export const sizeHeight: SimpleStyleFunction<'sizeHeight'>;
export const boxSizing: SimpleStyleFunction<'boxSizing'>;
export const sizing: SimpleStyleFunction<
  | 'width'
  | 'maxWidth'
  | 'minWidth'
  | 'height'
  | 'maxHeight'
  | 'minHeight'
  | 'sizeWidth'
  | 'sizeHeight'
  | 'boxSizing'
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
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginX'
  | 'marginY'
  | 'padding'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingX'
  | 'paddingY'
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
  transform?: (cssValue: unknown) => number | string | React.CSSProperties;
}
export function style<PropKey extends string, Theme extends object>(
  options: StyleOptions<PropKey, Theme>
): StyleFunction<{ [K in PropKey]?: unknown } & { theme: Theme }>;

// typography.js
export const fontFamily: SimpleStyleFunction<'fontFamily'>;
export const fontSize: SimpleStyleFunction<'fontSize'>;
export const fontStyle: SimpleStyleFunction<'fontStyle'>;
export const fontWeight: SimpleStyleFunction<'fontWeight'>;
export const letterSpacing: SimpleStyleFunction<'letterSpacing'>;
export const lineHeight: SimpleStyleFunction<'lineHeight'>;
export const textAlign: SimpleStyleFunction<'textAlign'>;
export const typography: SimpleStyleFunction<
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'fontWeight'
  | 'letterSpacing'
  | 'lineHeight'
  | 'textAlign'
>;
export type TypographyProps = PropsFor<typeof typography>;

// utils
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
