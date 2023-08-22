import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@mui/types';
import { Theme as SystemTheme } from '../createTheme';
import {
  SxProps,
  AllSystemCSSProperties,
  ResponsiveStyleValue,
  OverwriteCSSProperties,
  AliasesCSSProperties,
} from '../styleFunctionSx';

export type PropsFor<SomeStyleFunction> = SomeStyleFunction extends StyleFunction<infer Props>
  ? Props
  : never;
export type StyleFunction<Props> = (props: Props) => any;
export type SimpleStyleFunction<PropKey extends keyof any> = StyleFunction<
  Partial<Record<PropKey, any>>
> & { filterProps: string[] };

// borders.js
export declare const borders: SimpleStyleFunction<
  | 'border'
  | 'borderTop'
  | 'borderRight'
  | 'borderBottom'
  | 'borderLeft'
  | 'borderColor'
  | 'borderRadius'
>;

export declare const display: SimpleStyleFunction<
  'display' | 'displayPrint' | 'overflow' | 'textOverflow' | 'visibility' | 'whiteSpace'
>;

export declare const flexbox: SimpleStyleFunction<
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

export declare const grid: SimpleStyleFunction<
  | 'gap'
  | 'columnGap'
  | 'rowGap'
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

export declare const palette: SimpleStyleFunction<'bgcolor' | 'color'>;

export declare const positions: SimpleStyleFunction<
  'zIndex' | 'position' | 'top' | 'right' | 'bottom' | 'left'
>;

export declare const shadows: SimpleStyleFunction<'boxShadow'>;

export declare const sizing: SimpleStyleFunction<
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

export declare const spacing: SimpleStyleFunction<
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

export declare const typography: SimpleStyleFunction<
  | 'typography'
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'fontWeight'
  | 'letterSpacing'
  | 'lineHeight'
  | 'textAlign'
  | 'textTransform'
>;

// compose.js
/**
 * given a list of StyleFunction return the intersection of the props each individual
 * StyleFunction requires.
 *
 * If `firstFn` requires { color: string } and `secondFn` requires { spacing: number }
 * their composed function requires { color: string, spacing: number }
 */
type ComposedArg<T> = T extends Array<(arg: infer P) => any> ? P : never;
type ComposedOwnerState<T> = ComposedArg<T>;

export type ComposedStyleFunction<T extends Array<StyleFunction<any>>> = StyleFunction<
  ComposedOwnerState<T>
> & { filterProps: string[] };

export interface CustomSystemProps extends AliasesCSSProperties, OverwriteCSSProperties {}

export type SimpleSystemKeys = keyof PropsFor<
  ComposedStyleFunction<
    [
      typeof borders,
      typeof display,
      typeof flexbox,
      typeof grid,
      typeof palette,
      typeof positions,
      typeof shadows,
      typeof sizing,
      typeof spacing,
      typeof typography,
    ]
  >
>;

// The SimpleSystemKeys are subset of the AllSystemCSSProperties, so this should be ok
// This is needed as these are used as keys inside AllSystemCSSProperties
type StandardSystemKeys = Extract<SimpleSystemKeys, keyof AllSystemCSSProperties>;

export type SystemProps<Theme extends object = {}> = {
  [K in StandardSystemKeys]?:
    | ResponsiveStyleValue<AllSystemCSSProperties[K]>
    | ((theme: Theme) => ResponsiveStyleValue<AllSystemCSSProperties[K]>);
};

export interface BoxTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
  Theme extends object = SystemTheme,
> {
  props: AdditionalProps &
    SystemProps<Theme> & {
      children?: React.ReactNode;
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component?: React.ElementType;
      ref?: React.Ref<unknown>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Box (Material UI)](https://mui.com/material-ui/react-box/)
 * - [Box (MUI System)](https://mui.com/system/react-box/)
 *
 * API:
 *
 * - [Box API](https://mui.com/system/api/box/)
 */
declare const Box: OverridableComponent<BoxTypeMap>;

export type BoxProps<
  RootComponent extends React.ElementType = BoxTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BoxTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Box;
