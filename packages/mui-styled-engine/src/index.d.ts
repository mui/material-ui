import * as CSS from 'csstype';
import { StyledComponent, StyledOptions } from '@emotion/styled';
import { PropsOf } from '@emotion/react';

export * from '@emotion/styled';
export { default } from '@emotion/styled';
export { ThemeContext, keyframes, css } from '@emotion/react';

export { default as StyledEngineProvider } from './StyledEngineProvider';

export { default as GlobalStyles } from './GlobalStyles';
export * from './GlobalStyles';

export type MUIStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
> = StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

/**
 * For internal usage in `@mui/system` package
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_mutateStyles(
  tag: React.ElementType,
  processor: (styles: any) => any,
): void;

// eslint-disable-next-line @typescript-eslint/naming-convention
export function internal_serializeStyles<P>(styles: Interpolation<P>): object;

export interface SerializedStyles {
  name: string;
  styles: string;
  map?: string;
  next?: SerializedStyles;
}

export type CSSProperties = CSS.PropertiesFallback<number | string>;
export type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K] | ReadonlyArray<Extract<CSSProperties[K], string>>;
};

// TODO v6 - check if we can drop the unknown, as it breaks the autocomplete
// For more info on why it was added, see https://github.com/mui/material-ui/pull/26228
export type CSSPseudos = { [K in CSS.Pseudos]?: unknown | CSSObject };

// TODO v6 - check if we can drop the unknown, as it breaks the autocomplete
// For more info on why it was added, see https://github.com/mui/material-ui/pull/26228
export interface CSSOthersObject {
  [propertiesName: string]: unknown | CSSInterpolation;
}
export type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject };

export interface ArrayCSSInterpolation extends ReadonlyArray<CSSInterpolation> {}

export interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation;
}

// Omit variants as a key, because we have a special handling for it
export interface CSSObject extends CSSPropertiesWithMultiValues, CSSPseudos, CSSOthersObject {}

export interface ComponentSelector {
  __emotion_styles: any;
}

export type Keyframes = {
  name: string;
  styles: string;
  anim: number;
  toString: () => string;
} & string;

export type Equal<A, B, T, F> = A extends B ? (B extends A ? T : F) : F;

export type InterpolationPrimitive =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject;

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation;

export interface FunctionInterpolation<Props> {
  (props: Props): Interpolation<Props>;
}

export interface ArrayInterpolation<Props> extends ReadonlyArray<Interpolation<Props>> {}

export type Interpolation<Props> =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSPropertiesWithMultiValues
  | (CSSObject & {
      variants?: Array<{
        props:
          | (Props extends { ownerState: infer O }
              ? Partial<Omit<Props, 'ownerState'> & O>
              : Partial<Props>)
          | ((
              props: Props extends { ownerState: infer O } ? Props & O & { ownerState: O } : Props,
            ) => boolean);
        style:
          | CSSObject
          | ((args: Props extends { theme: any } ? { theme: Props['theme'] } : any) => CSSObject);
      }>;
    })
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>;

export function shouldForwardProp(propName: PropertyKey): boolean;

/** Same as StyledOptions but shouldForwardProp must be a type guard */
export interface FilteringStyledOptions<Props, ForwardedProps extends keyof Props = keyof Props> {
  label?: string;
  shouldForwardProp?(propName: PropertyKey): propName is ForwardedProps;
  target?: string;
}

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export interface CreateStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
  T extends object = {},
> {
  (
    ...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & { theme: T }>>
  ): StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {}>(
    ...styles: Array<
      Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: T }>
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;

  (
    template: TemplateStringsArray,
    ...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & { theme: T }>>
  ): StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {}>(
    template: TemplateStringsArray,
    ...styles: Array<
      Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: T }>
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;
}

export interface CreateMUIStyled<
  MUIStyledCommonProps extends {},
  MuiStyledOptions,
  Theme extends object,
> {
  <
    C extends React.ComponentClass<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> & MuiStyledOptions,
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & MUIStyledCommonProps,
    {},
    {
      ref?: React.Ref<InstanceType<C>>;
    },
    Theme
  >;

  <C extends React.ComponentClass<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<PropsOf<C> & MUIStyledCommonProps> & MuiStyledOptions,
  ): CreateStyledComponent<
    PropsOf<C> & MUIStyledCommonProps,
    {},
    {
      ref?: React.Ref<InstanceType<C>>;
    },
    Theme
  >;

  <
    C extends React.JSXElementConstructor<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> & MuiStyledOptions,
  ): CreateStyledComponent<Pick<PropsOf<C>, ForwardedProps> & MUIStyledCommonProps, {}, {}, Theme>;

  <C extends React.JSXElementConstructor<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<PropsOf<C> & MUIStyledCommonProps> & MuiStyledOptions,
  ): CreateStyledComponent<PropsOf<C> & MUIStyledCommonProps, {}, {}, Theme>;

  <
    Tag extends keyof React.JSX.IntrinsicElements,
    ForwardedProps extends
      keyof React.JSX.IntrinsicElements[Tag] = keyof React.JSX.IntrinsicElements[Tag],
  >(
    tag: Tag,
    options: FilteringStyledOptions<React.JSX.IntrinsicElements[Tag], ForwardedProps> &
      MuiStyledOptions,
  ): CreateStyledComponent<
    MUIStyledCommonProps,
    Pick<React.JSX.IntrinsicElements[Tag], ForwardedProps>,
    {},
    Theme
  >;

  <Tag extends keyof React.JSX.IntrinsicElements>(
    tag: Tag,
    options?: StyledOptions<MUIStyledCommonProps> & MuiStyledOptions,
  ): CreateStyledComponent<MUIStyledCommonProps, React.JSX.IntrinsicElements[Tag], {}, Theme>;
}
