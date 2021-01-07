import * as React from 'react';
import * as CSS from 'csstype';
import { SxProps } from '@material-ui/system';
import { Theme as DefaultTheme } from './createMuiTheme';

export interface SerializedStyles {
  name: string;
  styles: string;
  map?: string;
  next?: SerializedStyles;
}

export type CSSProperties = CSS.PropertiesFallback<number | string>;
export type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]: CSSProperties[K] | Array<Extract<CSSProperties[K], string>>;
};
export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject };

export interface CSSOthersObject {
  [propertiesName: string]: CSSInterpolation;
}
export type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject };

export interface ArrayCSSInterpolation extends Array<CSSInterpolation> {}

export interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation;
}

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

export interface ArrayInterpolation<Props> extends Array<Interpolation<Props>> {}

export type Interpolation<Props> =
  | InterpolationPrimitive
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>;

/**
 * @desc Utility type for getting props type of React component.
 * It takes `defaultProps` into an account - making props with defaults optional.
 */
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>;

export type Omit<T, U> = T extends any ? Pick<T, Exclude<keyof T, U>> : never;
export type Overwrapped<T, U> = Pick<T, Extract<keyof T, keyof U>>;

type JSXInEl = JSX.IntrinsicElements;

export interface StyledComponent<InnerProps, StyleProps, Theme extends object>
  extends React.FunctionComponent<InnerProps & StyleProps & { theme?: Theme }>,
    ComponentSelector {
  /**
   * @desc this method is type-unsafe
   */
  withComponent<NewTag extends keyof JSXInEl>(
    tag: NewTag
  ): StyledComponent<JSXInEl[NewTag], StyleProps, Theme>;
  withComponent<Tag extends React.ComponentType<any>>(
    tag: Tag
  ): StyledComponent<PropsOf<Tag>, StyleProps, Theme>;
}

export interface StyledOptions {
  label?: string;
  shouldForwardProp?(propName: PropertyKey): boolean;
  target?: string;
}

interface MuiStyledOptions {
  name?: string;
  slot?: string;
  overridesResolver?: (props: any, styles: string | object) => string | object;
  skipVariantsResolver?: boolean;
  skipSx?: boolean;
}

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
  JSXProps extends {} = {}
> {
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {} = {}>(
    ...styles: Array<
      Interpolation<
        ComponentProps & SpecificComponentProps & AdditionalProps & { theme: DefaultTheme }
      >
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;

  (
    template: TemplateStringsArray,
    ...styles: Array<
      Interpolation<ComponentProps & SpecificComponentProps & { theme: DefaultTheme }>
    >
  ): StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {}>(
    template: TemplateStringsArray,
    ...styles: Array<
      Interpolation<
        ComponentProps & SpecificComponentProps & AdditionalProps & { theme: DefaultTheme }
      >
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;
}

export interface CreateMUIStyled<Theme extends object = DefaultTheme> {
  <
    C extends React.ComponentClass<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>,
    muiOptions?: MuiStyledOptions
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & {
      theme?: Theme;
      as?: React.ElementType;
      sx?: SxProps<Theme>;
    },
    {},
    {
      ref?: React.Ref<InstanceType<C>>;
    }
  >;

  <C extends React.ComponentClass<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions,
    muiOptions?: MuiStyledOptions
  ): CreateStyledComponent<
    PropsOf<C> & {
      theme?: Theme;
      as?: React.ElementType;
      sx?: SxProps<Theme>;
    },
    {},
    {
      ref?: React.Ref<InstanceType<C>>;
    }
  >;

  <
    C extends React.ComponentType<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>,
    muiOptions?: MuiStyledOptions
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & {
      theme?: Theme;
      as?: React.ElementType;
      sx?: SxProps<Theme>;
    }
  >;

  <C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions,
    muiOptions?: MuiStyledOptions
  ): CreateStyledComponent<
    PropsOf<C> & {
      theme?: Theme;
      as?: React.ElementType;
      sx?: SxProps<Theme>;
    }
  >;

  <
    Tag extends keyof JSX.IntrinsicElements,
    ForwardedProps extends keyof JSX.IntrinsicElements[Tag] = keyof JSX.IntrinsicElements[Tag]
  >(
    tag: Tag,
    options: FilteringStyledOptions<JSX.IntrinsicElements[Tag], ForwardedProps>,
    muiOptions?: MuiStyledOptions
  ): CreateStyledComponent<
    { theme?: Theme; as?: React.ElementType; sx?: SxProps<Theme> },
    Pick<JSX.IntrinsicElements[Tag], ForwardedProps>
  >;

  <Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
    options?: StyledOptions,
    muiOptions?: MuiStyledOptions
  ): CreateStyledComponent<
    { theme?: Theme; as?: React.ElementType; sx?: SxProps<Theme> },
    JSX.IntrinsicElements[Tag]
  >;
}

/**
 * Custom styled utility that has a default MUI theme.
 *
 * @param tag HTML tag or component that should serve as base.
 * @param options Styled options for the created component.
 * @param muiOptions Material-UI specific style options.
 * @returns React component that has styles attached to it.
 */
declare const experimentalStyled: CreateMUIStyled;

export default experimentalStyled;
