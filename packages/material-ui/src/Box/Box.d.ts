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
import { Theme } from '../styles/createMuiTheme';
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
type SxPropsValue = Omit<CSSObject, keyof SystemProps> & SystemProps;

export type SxProps = {
  [Name in keyof SxPropsValue]?:
    | SxPropsValue[Name]
    | ((theme: Theme) => CSSObject | SxPropsValue[Name])
    | SxProps;
};

export interface BoxProps extends ElementProps, SystemProps {
  children?: React.ReactNode | ((props: ElementProps) => React.ReactNode);
  // styled API
  component?: React.ElementType;
  clone?: boolean;
  ref?: React.Ref<unknown>;
  sx?: SxProps;
}

declare const Box: React.ComponentType<BoxProps>;

export default Box;
