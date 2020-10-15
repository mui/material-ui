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
} from '@material-ui/system';
import { CSSObject } from '../styles/experimentalStyled';
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
type SxProps = Omit<CSSObject, keyof SystemProps> & SystemProps;

export interface BoxProps extends ElementProps, SystemProps {
  // styled API
  component?: React.ElementType;
  clone?: boolean;
  ref?: React.Ref<unknown>;
  // workaround for https://github.com/mui-org/material-ui/pull/15611
  css?: SystemProps;
  sx?: SxProps;
}

declare const Box: React.ComponentType<BoxProps>;

export default Box;
