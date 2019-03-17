import * as React from 'react';
import { StandardProps } from '..';
import { TypographyProps } from '../Typography';

export interface LinkProps
  extends StandardProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement> & TypographyProps,
    LinkClassKey,
    'component'
  > {
  component?: React.ElementType<LinkProps>;
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
