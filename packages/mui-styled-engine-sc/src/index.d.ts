import * as React from 'react';
import * as CSS from 'csstype';
import {
  AnyStyledComponent,
  StyledConfig,
  StyledComponent,
  StyledComponentPropsWithRef,
  StyledComponentInnerComponent,
  StyledComponentInnerOtherProps,
  StyledComponentInnerAttrs,
  ThemedStyledProps,
  StyledComponentBase,
  Keyframes,
} from 'styled-components';

export * from 'styled-components';
export { default } from 'styled-components';

export { default as StyledEngineProvider } from './StyledEngineProvider';

export { default as GlobalStyles } from './GlobalStyles';
export * from './GlobalStyles';

// These are the same as the ones in @mui/styled-engine
// CSS.PropertiesFallback are necessary so that we support spreading of the mixins. For example:
// '@font-face'?: Fontface | Fontface[]
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

export type FalseyValue = undefined | null | false;
export type Interpolation<P> =
  | InterpolationValue
  | InterpolationFunction<P>
  | FlattenInterpolation<P>;
// cannot be made a self-referential interface, breaks WithPropNested
// see https://github.com/microsoft/TypeScript/issues/34796
export type FlattenInterpolation<P> = ReadonlyArray<Interpolation<P>>;
export type InterpolationValue =
  | string
  | number
  | FalseyValue
  | Keyframes
  | StyledComponentInterpolation
  | CSSObject;
export type SimpleInterpolation = InterpolationValue | FlattenSimpleInterpolation;
// adapter for compatibility with @mui/styled-engine
export type CSSInterpolation = SimpleInterpolation;
export type FlattenSimpleInterpolation = ReadonlyArray<SimpleInterpolation>;

export type InterpolationFunction<P> = (props: P) => Interpolation<P>;

// remove the call signature from StyledComponent so Interpolation can still infer InterpolationFunction
type StyledComponentInterpolation =
  | Pick<StyledComponentBase<any, any, any, any>, keyof StyledComponentBase<any, any>>
  | Pick<StyledComponentBase<any, any, any>, keyof StyledComponentBase<any, any>>;

// These are typings coming from styled-components
// They are adjusted to accept the extended options coming from mui
type AnyIfEmpty<T extends object> = keyof T extends never ? any : T;

type ThemedStyledComponentFactories<T extends object> = {
  [TTag in keyof JSX.IntrinsicElements]: ThemedStyledFunctionBase<TTag, T>;
};

// Same as in styled-components, but copied here so that it would use the Interpolation & CSS typings from above
export interface ThemedStyledFunctionBase<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never,
> {
  (first: TemplateStringsArray): StyledComponent<C, T, O, A>;
  (
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<ThemedStyledProps<StyledComponentPropsWithRef<C> & O, T>>,
    ...rest: Array<Interpolation<ThemedStyledProps<StyledComponentPropsWithRef<C> & O, T>>>
  ): StyledComponent<C, T, O, A>;
  <U extends object>(
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<ThemedStyledProps<StyledComponentPropsWithRef<C> & O & U, T>>,
    ...rest: Array<Interpolation<ThemedStyledProps<StyledComponentPropsWithRef<C> & O & U, T>>>
  ): StyledComponent<C, T, O & U, A>;
}

// same as ThemedStyledFunction in styled-components, but without attrs, and withConfig
export interface ThemedStyledFunction<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never,
> extends ThemedStyledFunctionBase<C, T, O, A> {}

// same as ThemedBaseStyledInterface in styled-components, but with added options & common props for MUI components
export interface ThemedBaseStyledInterface<
  MUIStyledCommonProps extends object,
  MuiStyledOptions extends object,
  T extends object,
> extends ThemedStyledComponentFactories<T> {
  <C extends AnyStyledComponent>(
    component: C,
    options?: StyledConfig<any> & MuiStyledOptions,
  ): ThemedStyledFunction<
    StyledComponentInnerComponent<C>,
    T,
    StyledComponentInnerOtherProps<C> & MUIStyledCommonProps,
    StyledComponentInnerAttrs<C>
  >;
  <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
    // unfortunately using a conditional type to validate that it can receive a `theme?: Theme`
    // causes tests to fail in TS 3.1
    component: C,
    options?: StyledConfig<any> & MuiStyledOptions,
  ): ThemedStyledFunction<C, T, MUIStyledCommonProps>;
}

export type CreateMUIStyled<
  MUIStyledCommonProps extends object = {},
  MuiStyledOptions extends object = {},
  T extends object = {},
> = ThemedBaseStyledInterface<MUIStyledCommonProps, MuiStyledOptions, AnyIfEmpty<T>>;
