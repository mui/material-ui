export { default as StyledEngineProvider } from './StyledEngineProvider';

export { default as GlobalStyles } from './GlobalStyles';
export * from './GlobalStyles';

export declare const ThemeContext: React.Context<null>;
export function keyframes(arg:any): string;
export function css(arg:any): string;

/**
 * For internal usage in `@mui/system` package
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_mutateStyles(
  tag: React.ElementType,
  processor: (styles: any) => any,
): void;

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_serializeStyles<P>(styles: any): object;

export interface SerializedStyles {
  name: string;
  styles: string;
  map?: string;
  next?: SerializedStyles;
}

export type Keyframes = {
  name: string;
  styles: string;
  anim: number;
  toString: () => string;
} & string;

export function shouldForwardProp(propName: PropertyKey): boolean;

/** Same as StyledOptions but shouldForwardProp must be a type guard */
export interface FilteringStyledOptions<Props, ForwardedProps extends keyof Props = keyof Props> {
  label?: string;
  shouldForwardProp?(propName: PropertyKey): propName is ForwardedProps;
  target?: string;
}

export interface CSSObject {}

export type Interpolation = any;

export interface CreateMUIStyled<A extends any, B extends any, C extends any> {
  <
  C extends any,
  ForwardedProps extends any,
>(
  component: C,
  options: object,
): React.ComponentType<ForwardedProps & A & B & C>;
}
