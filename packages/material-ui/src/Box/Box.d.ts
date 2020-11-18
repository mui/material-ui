import * as React from 'react';
import {
  borders,
  ComposedStyleFunction,
  display,
  flexbox,
  grid,
  palette,
  positions,
  shadows,
  sizing,
  spacing,
  typography,
  PropsFor,
  SxProps,
} from '@material-ui/system';
import { Theme } from '../styles/createMuiTheme';
import { Omit } from '..';

export type BoxStyleFunction = ComposedStyleFunction<
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
    typeof typography
  ]
>;

type SystemProps = PropsFor<BoxStyleFunction>;
type ElementProps = Omit<React.HTMLAttributes<HTMLElement>, keyof SystemProps>;

export interface BoxProps extends ElementProps, SystemProps {
  children?: React.ReactNode | ((props: ElementProps) => React.ReactNode);
  // styled API
  component?: React.ElementType;
  clone?: boolean;
  ref?: React.Ref<unknown>;
  sx?: SxProps<Theme>;
}

declare const Box: React.ComponentType<BoxProps>;

export default Box;
