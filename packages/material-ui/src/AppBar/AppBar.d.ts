import * as React from 'react';
import { PropTypes, StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface AppBarProps<C> extends StandardProps<PaperProps<C>, AppBarClassKey> {
  color?: PropTypes.Color;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static';
}

export type AppBarClassKey =
  | 'root'
  | 'positionFixed'
  | 'positionAbsolute'
  | 'positionSticky'
  | 'positionStatic'
  | 'colorDefault'
  | 'colorPrimary'
  | 'colorSecondary';

declare class AppBar<C> extends React.Component<C & AppBarProps<C>> {}

export default AppBar;
