import * as React from 'react';
import { DistributiveOmit } from '@mui/types';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { TypographyOwnProps } from '../Typography';
import { LinkClasses } from './linkClasses';

export interface LinkTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'a',
> {
  props: AdditionalProps &
    LinkBaseProps & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<LinkClasses>;
      /**
       * The color of the link.
       * @default 'primary'
       */
      color?: TypographyOwnProps['color'];
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
      /**
       * `classes` prop applied to the [`Typography`](/material-ui/api/typography/) element.
       */
      TypographyClasses?: TypographyOwnProps['classes'];
      /**
       * Controls when the link should have an underline.
       * @default 'always'
       */
      underline?: 'none' | 'hover' | 'always';
      /**
       * Applies the theme typography styles.
       * @default 'inherit'
       */
      variant?: TypographyOwnProps['variant'];
    };
  defaultComponent: DefaultComponent;
}

/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://mui.com/material-ui/react-breadcrumbs/)
 * - [Links](https://mui.com/material-ui/react-link/)
 *
 * API:
 *
 * - [Link API](https://mui.com/material-ui/api/link/)
 * - inherits [Typography API](https://mui.com/material-ui/api/typography/)
 */
declare const Link: OverridableComponent<LinkTypeMap>;

export type LinkBaseProps = DistributiveOmit<
  TypographyOwnProps,
  'children' | 'color' | 'variant' | 'classes'
>;

export type LinkProps<
  RootComponent extends React.ElementType = LinkTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<LinkTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Link;
