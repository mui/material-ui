import type * as React from 'react';
import { type OverridableComponent, type OverrideProps } from '@mui/types';
import { type Theme as SystemTheme } from '../createTheme';
import {
  type SxProps,
  type AllSystemCSSProperties,
  type ResponsiveStyleValue,
  type OverwriteCSSProperties,
  type AliasesCSSProperties,
} from '../styleFunctionSx';
import { type PropsFor } from '../style';
import { type ComposedStyleFunction } from '../compose';
import type borders from '../borders';
import type display from '../display';
import type flexbox from '../flexbox';
import type grid from '../cssGrid';
import type palette from '../palette';
import type positions from '../positions';
import type shadows from '../shadows';
import type sizing from '../sizing';
import type spacing from '../spacing';
import type typography from '../typography';

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

export interface BoxOwnProps<Theme extends object = SystemTheme> {
  children?: React.ReactNode;
  ref?: React.Ref<unknown> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
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
 * - [Box (Material UI)](https://mui.com/material-ui/react-box/)
 * - [Menubar (Material UI)](https://mui.com/material-ui/react-menubar/)
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
  component?: React.ElementType | undefined;
};

export default Box;
