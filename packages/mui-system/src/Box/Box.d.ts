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
import { PropsFor } from '../style';
import { ComposedStyleFunction } from '../compose';
import borders from '../borders';
import display from '../display';
import flexbox from '../flexbox';
import grid from '../cssGrid';
import palette from '../palette';
import positions from '../positions';
import shadows from '../shadows';
import sizing from '../sizing';
import spacing from '../spacing';
import typography from '../typography';

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

export interface BoxOwnProps<Theme extends object = SystemTheme> extends SystemProps<Theme> {
  children?: React.ReactNode;
  ref?: React.Ref<unknown>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface BoxTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
  Theme extends object = SystemTheme,
> {
  props: AdditionalProps & BoxOwnProps<Theme>;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Box (Joy UI)](https://mui.com/joy-ui/react-box/)
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
