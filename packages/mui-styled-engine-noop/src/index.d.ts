export { default as StyledEngineProvider } from './StyledEngineProvider';

export { default as GlobalStyles } from './GlobalStyles';
export * from './GlobalStyles';

export declare const ThemeContext: React.Context<null>;
export function keyframes(arg: any): string;
export function css(arg: any): string;

/**
 * For internal usage in `@mui/system` package
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_mutateStyles(
  tag: React.ElementType,
  processor: (styles: any) => any,
): void;

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_serializeStyles(styles: any): object;

export interface SerializedStyles {
  name: string;
  styles: string;
  map?: string | undefined;
  next?: SerializedStyles | undefined;
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
  label?: string | undefined;
  shouldForwardProp?(propName: PropertyKey): propName is ForwardedProps;
  target?: string | undefined;
}

export interface CSSObject {}

export type Interpolation = any;

export interface CreateMUIStyled<A, B, C> {
  <ComponentType, ForwardedProps>(
    component: ComponentType,
    options: object,
  ): React.ComponentType<ForwardedProps & A & B & C>;
}
