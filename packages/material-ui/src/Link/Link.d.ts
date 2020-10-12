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
       */
      classes?: {
        root?: string;
        underlineNone?: string;
        underlineHover?: string;
        underlineAlways?: string;
        button?: string;
        focusVisible?: string;
      };
      /**
       * The color of the link.
       * @default 'primary'
       */
      color?: TypographyProps['color'];
      /**
       * `classes` prop applied to the [`Typography`](/api/typography/) element.
       */
      TypographyClasses?: TypographyProps['classes'];
      /**
       * Controls when the link should have an underline.
       * @default 'hover'
       */
      underline?: 'none' | 'hover' | 'always';
      /**
       * Applies the theme typography styles.
       * @default 'inherit'
       */
      variant?: TypographyProps['variant'];
    };
  defaultComponent: D;
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

export type LinkClassKey = keyof NonNullable<LinkTypeMap['props']['classes']>;

export type LinkBaseProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> &
  Omit<TypographyProps, 'children' | 'component' | 'color' | 'variant'>;

export type LinkProps<
  D extends React.ElementType = LinkTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<LinkTypeMap<P, D>, D>;

export default Link;
