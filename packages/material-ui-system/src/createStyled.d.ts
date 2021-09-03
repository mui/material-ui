import * as React from 'react';
import * as CSS from 'csstype';
import { SxProps } from './styleFunctionSx';
import { Theme as DefaultTheme } from './createTheme';

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
export type CSSPseudos = { [K in CSS.Pseudos]?: unknown | CSSObject };

export interface CSSOthersObject {
  [propertiesName: string]: unknown | CSSInterpolation;
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
export type PropsOf<C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
  JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>;

export type Overwrapped<T, U> = Pick<T, Extract<keyof T, keyof U>>;

export interface StyledComponent<InnerProps, OwnerState, Theme extends object>
  extends React.FunctionComponent<InnerProps & OwnerState & { theme?: Theme }>,
    ComponentSelector {}

export interface StyledOptions {
  label?: string;
  shouldForwardProp?(propName: PropertyKey): boolean;
  target?: string;
}

export interface MuiStyledOptions<Props extends {}, ClassKey extends string> {
  name?: string;
  slot?: string;
  overridesResolver?: (
    props: Props,
    styles: Record<ClassKey, CSSInterpolation>,
  ) => CSSInterpolation;
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
  JSXProps extends {} = {},
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
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
    ComponentProps extends {} = any,
    ClassKey extends string = any,
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> &
      MuiStyledOptions<ComponentProps, ClassKey>,
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & {
      theme?: Theme;
      as?: React.ElementType;
      sx?: SxProps<Theme>;
    },
    ComponentProps,
    {
      ref?: React.Ref<InstanceType<C>>;
    }
  >;

  <
    C extends React.ComponentClass<React.ComponentProps<C>>,
    ComponentProps extends {} = any,
    ClassKey extends string = any,
  >(
    component: C,
    options?: StyledOptions & MuiStyledOptions<ComponentProps, ClassKey>,
  ): CreateStyledComponent<
    PropsOf<C> & {
      theme?: Theme;
      as?: React.ElementType;
      sx?: SxProps<Theme>;
    },
    ComponentProps,
    {
      ref?: React.Ref<InstanceType<C>>;
    }
  >;

  <
    C extends React.JSXElementConstructor<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>,
    ComponentProps extends {} = any,
    ClassKey extends string = any,
  >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps> &
      MuiStyledOptions<ComponentProps, ClassKey>,
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & {
      theme?: Theme;
      as?: React.ElementType;
      sx?: SxProps<Theme>;
    }
  >;

  <
    C extends React.JSXElementConstructor<React.ComponentProps<C>>,
    ComponentProps extends {} = any,
    ClassKey extends string = any,
  >(
    component: C,
    options?: StyledOptions & MuiStyledOptions<ComponentProps, ClassKey>,
  ): CreateStyledComponent<
    PropsOf<C> & {
      theme?: Theme;
      as?: React.ElementType;
      sx?: SxProps<Theme>;
    }
  >;

  <
    Tag extends keyof JSX.IntrinsicElements,
    ForwardedProps extends keyof JSX.IntrinsicElements[Tag] = keyof JSX.IntrinsicElements[Tag],
    ComponentProps extends {} = any,
    ClassKey extends string = any,
  >(
    tag: Tag,
    options: FilteringStyledOptions<JSX.IntrinsicElements[Tag], ForwardedProps> &
      MuiStyledOptions<ComponentProps, ClassKey>,
  ): CreateStyledComponent<
    {
      theme?: Theme;
      as?: React.ElementType;
      sx?: SxProps<Theme>;
    },
    Pick<JSX.IntrinsicElements[Tag], ForwardedProps>
  >;

  <
    Tag extends keyof JSX.IntrinsicElements,
    ComponentProps extends {} = any,
    ClassKey extends string = any,
  >(
    tag: Tag,
    options?: StyledOptions & MuiStyledOptions<ComponentProps, ClassKey>,
  ): CreateStyledComponent<
    {
      theme?: Theme;
      as?: React.ElementType;
      sx?: SxProps<Theme>;
    },
    JSX.IntrinsicElements[Tag]
  >;
}

export function shouldForwardProp(propName: PropertyKey): boolean;

export default function createStyled<T extends object = DefaultTheme>(options?: {
  defaultTheme?: T;
  rootShouldForwardProp?: (prop: PropertyKey) => boolean;
  slotShouldForwardProp?: (prop: PropertyKey) => boolean;
}): CreateMUIStyled<T>;
