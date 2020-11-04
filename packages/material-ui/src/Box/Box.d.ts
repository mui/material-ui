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

export type SystemProps = PropsFor<BoxStyleFunction>;
type ElementProps = Omit<React.HTMLAttributes<HTMLElement>, keyof SystemProps>;
type CSSPropsValue = Omit<CSSObject, keyof SystemProps>;

export type SxProps =
  | JSX.IntrinsicAttributes['css']
  | ({
      [SystemName in keyof SystemProps]?:
        | SystemProps[SystemName]
        | ((theme: Theme) => CSSObject | SystemProps[SystemName])
        | SxProps;
    } &
      {
        [CSSName in keyof CSSPropsValue]?:
          | CSSPropsValue[CSSName]
          | ((theme: Theme) => CSSObject | CSSPropsValue[CSSName])
          | SxProps;
      });

export interface BoxProps extends ElementProps, SystemProps {
  children?: React.ReactNode | ((props: ElementProps) => React.ReactNode);
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
