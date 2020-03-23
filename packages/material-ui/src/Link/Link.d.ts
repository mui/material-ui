import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Omit } from '@material-ui/types';
import { TypographyProps } from '../Typography';

export interface LinkTypeMap<P = {}, D extends React.ElementType = 'a'> {
  props: P &
    LinkBaseProps & {
      TypographyClasses?: TypographyProps['classes'];
      underline?: 'none' | 'hover' | 'always';
    };
  defaultComponent: D;
  classKey: LinkClassKey;
}

/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://material-ui.com/components/breadcrumbs/)
 * - [Links](https://material-ui.com/components/links/)
 *
 * API:
 *
 * - [Link API](https://material-ui.com/api/link/)
 * - inherits [Typography API](https://material-ui.com/api/typography/)
 */
declare const Link: OverridableComponent<LinkTypeMap>;

export type LinkClassKey =
  | 'root'
  | 'underlineNone'
  | 'underlineHover'
  | 'underlineAlways'
  | 'button'
  | 'focusVisible';

export type LinkBaseProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  Omit<TypographyProps, 'component'>;

export type LinkProps<
  D extends React.ElementType = LinkTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<LinkTypeMap<P, D>, D>;

export default Link;
