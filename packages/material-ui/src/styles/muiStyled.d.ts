import * as React from 'react';
import * as CSS from 'csstype';

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
/**
 * @desc Following type exists for autocompletion of key.
 */
export type CSSPseudos<MP> = { [K in CSS.Pseudos]?: ObjectInterpolation<MP> };
export interface CSSOthersObject<MP> {
  [propertiesName: string]: Interpolation<MP>;
}

export type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject };

export interface ArrayCSSInterpolation extends Array<CSSInterpolation> {}

export type CSSInterpolation =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject
  | ArrayCSSInterpolation;

export interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation;
}

export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudosForCSSObject,
    CSSOthersObjectForCSSObject {}

export interface ComponentSelector {
  __emotion_styles: any;
}

export type Keyframes = {
  name: string;
  styles: string;
  anim: number;
  toString: () => string;
} & string;

export interface ArrayInterpolation<MP> extends Array<Interpolation<MP>> {}
export interface ObjectInterpolation<MP>
  extends CSSPropertiesWithMultiValues,
    CSSPseudos<MP>,
    CSSOthersObject<MP> {}
export type FunctionInterpolation<MP> = (mergedProps: MP) => Interpolation<MP>;

export type Equal<A, B, T, F> = A extends B ? (B extends A ? T : F) : F;

export type Interpolation<MP = undefined> =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | ArrayInterpolation<MP>
  | ObjectInterpolation<MP>
  | Equal<MP, undefined, never, FunctionInterpolation<MP>>;

/**
 * @desc Utility type for getting props type of React component.
 */
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;

export type Omit<T, U> = T extends any ? Pick<T, Exclude<keyof T, U>> : never;
export type Overwrapped<T, U> = Pick<T, Extract<keyof T, keyof U>>;

type JSXInEl = JSX.IntrinsicElements;
type ReactClassPropKeys = keyof React.ClassAttributes<any>;

export type WithTheme<P, T> = P extends { theme: infer Theme }
  ? P & { theme: Exclude<Theme, undefined> }
  : P & { theme: T };

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

interface CreateStyledComponentBaseThemed<
  InnerProps,
  ExtraProps,
  StyledInstanceTheme extends object
> {
  <
    StyleProps extends Omit<Overwrapped<InnerProps, StyleProps>, ReactClassPropKeys> = Omit<
      InnerProps & ExtraProps,
      ReactClassPropKeys
    >
  >(
    ...styles: Array<Interpolation<WithTheme<StyleProps, StyledInstanceTheme>>>
  ): StyledComponent<InnerProps, StyleProps, StyledInstanceTheme>;
  <
    StyleProps extends Omit<Overwrapped<InnerProps, StyleProps>, ReactClassPropKeys> = Omit<
      InnerProps & ExtraProps,
      ReactClassPropKeys
    >
  >(
    template: TemplateStringsArray,
    ...styles: Array<Interpolation<WithTheme<StyleProps, StyledInstanceTheme>>>
  ): StyledComponent<InnerProps, StyleProps, StyledInstanceTheme>;
}

interface CreateStyledComponentBaseThemeless<InnerProps, ExtraProps> {
  <
    StyleProps extends Omit<Overwrapped<InnerProps, StyleProps>, ReactClassPropKeys> = Omit<
      InnerProps & ExtraProps,
      ReactClassPropKeys
    >,
    Theme extends object = object
  >(
    ...styles: Array<Interpolation<WithTheme<StyleProps, Theme>>>
  ): StyledComponent<InnerProps, StyleProps, Theme>;
  <
    StyleProps extends Omit<Overwrapped<InnerProps, StyleProps>, ReactClassPropKeys> = Omit<
      InnerProps & ExtraProps,
      ReactClassPropKeys
    >,
    Theme extends object = object
  >(
    template: TemplateStringsArray,
    ...styles: Array<Interpolation<WithTheme<StyleProps, Theme>>>
  ): StyledComponent<InnerProps, StyleProps, Theme>;
}

export type CreateStyledComponentBase<InnerProps, ExtraProps, StyledInstanceTheme extends object> =
  // this "reversed" condition checks if StyledInstanceTheme was already parametrized when using CreateStyled
  object extends StyledInstanceTheme
    ? CreateStyledComponentBaseThemeless<InnerProps, ExtraProps>
    : CreateStyledComponentBaseThemed<InnerProps, ExtraProps, StyledInstanceTheme>;

export type CreateStyledComponentIntrinsic<
  Tag extends keyof JSXInEl,
  ExtraProps,
  Theme extends object
> = CreateStyledComponentBase<JSXInEl[Tag], ExtraProps, Theme>;
export type CreateStyledComponentExtrinsic<
  Tag extends React.ComponentType<any>,
  ExtraProps,
  Theme extends object
> = CreateStyledComponentBase<PropsOf<Tag>, ExtraProps, Theme>;

export interface StyledOptions {
  label?: string;
  shouldForwardProp?(propName: string): boolean;
  target?: string;
}

interface MuiStyledOptions<Theme extends object = any> {
  muiName: string;
  overridesResolver?: (props: any, styles: string | object, name: string) => string | object;
}

export interface CreateStyled<Theme extends object = any> {
  <Tag extends React.ComponentType<any>, ExtraProps = {}>(
    tag: Tag,
    options?: StyledOptions,
    muiOptions?: MuiStyledOptions<Theme>
  ): CreateStyledComponentExtrinsic<Tag, ExtraProps, Theme>;

  <Tag extends keyof JSXInEl, ExtraProps = {}>(
    tag: Tag,
    options?: StyledOptions,
    muiOptions?: MuiStyledOptions<Theme>
  ): CreateStyledComponentIntrinsic<Tag, ExtraProps, Theme>;
}

/**
 * Cutom styled functionality that support mui specific config.
 *
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @returns A complete, ready to use theme object.
 */
declare const muiStyled: CreateStyled;

export default muiStyled;
