import {
  AnyStyledComponent,
  StyledConfig,
  StyledComponentPropsWithRef,
  StyledComponentInnerComponent,
  StyledComponentInnerOtherProps,
  StyledComponentInnerAttrs,
  ThemedStyledFunction,
} from 'styled-components';
export * from 'styled-components';
export {
  default,
  Interpolation,
  SimpleInterpolation as CSSInterpolation,
  CSSObject,
} from 'styled-components';

export { default as StyledEngineProvider } from './StyledEngineProvider';

export { ThemeContext, keyframes, css } from 'styled-components';

export { default as GlobalStyles } from './GlobalStyles';
export * from './GlobalStyles';

type AnyIfEmpty<T extends object> = keyof T extends never ? any : T;

type ThemedStyledComponentFactories<T extends object> = {
  [TTag in keyof JSX.IntrinsicElements]: ThemedStyledFunction<TTag, T>;
};

export interface ThemedBaseStyledInterface<MUIStyledCommonProps, MuiStyledOptions, T extends object>
  extends ThemedStyledComponentFactories<T> {
  <C extends AnyStyledComponent>(
    component: C,
    options: StyledConfig<StyledComponentPropsWithRef<C> & MUIStyledCommonProps> & MuiStyledOptions,
  ): ThemedStyledFunction<
    StyledComponentInnerComponent<C>,
    T,
    StyledComponentInnerOtherProps<C>,
    StyledComponentInnerAttrs<C>
  >;
  <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
    // unfortunately using a conditional type to validate that it can receive a `theme?: Theme`
    // causes tests to fail in TS 3.1
    component: C,
    options: StyledConfig<StyledComponentPropsWithRef<C> & MUIStyledCommonProps> & MuiStyledOptions,
  ): ThemedStyledFunction<C, T>;
}

export type CreateMUIStyled<
  MUIStyledCommonProps,
  MuiStyledOptions,
  T extends object = {},
> = ThemedBaseStyledInterface<MUIStyledCommonProps, MuiStyledOptions, AnyIfEmpty<T>>;
