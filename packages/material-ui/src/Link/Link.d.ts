import * as React from 'react';
import { Omit } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TypographyProps } from '../Typography';

export interface LinkTypeMap<P = {}, D extends React.ElementType = 'a'> {
  props: P &
    LinkBaseProps & {
      /**
       * The content of the link.
       */
      children?: React.ReactNode;
      /**
       * The color of the link.
       */
      color?: TypographyProps['color'];
      /**
       * `classes` prop applied to the [`Typography`](/api/typography/) element.
       */
      TypographyClasses?: TypographyProps['classes'];
      /**
       * Controls when the link should have an underline.
       */
      underline?: 'none' | 'hover' | 'always';
      /**
       * Applies the theme typography styles.
       */
      variant?: TypographyProps['variant'];
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
  Omit<TypographyProps, 'children' | 'component' | 'color' | 'variant'>;

export type LinkProps<
  D extends React.ElementType = LinkTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<LinkTypeMap<P, D>, D>;

export default Link;
