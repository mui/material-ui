import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { DividerClasses } from './dividerClasses';

export interface DividerPropsVariantOverrides {}

export interface DividerOwnProps {
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute?: boolean;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DividerClasses>;
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem?: boolean;
  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   */
  light?: boolean;
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign?: 'center' | 'right' | 'left';
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant?: OverridableStringUnion<'fullWidth' | 'inset' | 'middle', DividerPropsVariantOverrides>;
}

export interface DividerTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'hr',
> {
  props: AdditionalProps & DividerOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Divider](https://mui.com/material-ui/react-divider/)
 * - [Lists](https://mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [Divider API](https://mui.com/material-ui/api/divider/)
 */
declare const Divider: OverridableComponent<DividerTypeMap>;

export type DividerProps<
  RootComponent extends React.ElementType = DividerTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<DividerTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Divider;
