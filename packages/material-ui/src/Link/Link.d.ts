import * as React from 'react';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';
import { Omit } from '@material-ui/types';
import { TypographyProps } from '../Typography';

declare const Link: OverridableComponent<{
  props: LinkBaseProps & {
    TypographyClasses?: TypographyProps['classes'];
    underline?: 'none' | 'hover' | 'always';
  };
  defaultComponent: 'a';
  classKey: LinkClassKey;
}>;

export type LinkClassKey =
  | 'root'
  | 'underlineNone'
  | 'underlineHover'
  | 'underlineAlways'
  | 'button'
  | 'focusVisible';

export type LinkBaseProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  Omit<TypographyProps, 'component'>;

export type LinkProps = SimplifiedPropsOf<typeof Link>;

export default Link;
