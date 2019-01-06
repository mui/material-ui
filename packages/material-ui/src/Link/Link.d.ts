import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { TypographyProps } from '../Typography';

export interface LinkProps
  extends StandardProps<
    React.HTMLAttributes<HTMLAnchorElement> & TypographyProps,
    LinkClassKey,
    'component'
  > {
  block?: boolean;
  color?: PropTypes.Color;
  component?: React.ReactType<LinkProps>;
  TypographyClasses?: TypographyProps['classes'];
  underline?: 'none' | 'hover' | 'always';
}

export type LinkClassKey =
  | 'root'
  | 'underlineNone'
  | 'underlineHover'
  | 'underlineAlways'
  | 'button';

declare const Link: React.ComponentType<LinkProps>;

export default Link;
