import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ListSubheaderClasses } from './listSubheaderClasses';

export interface ListSubheaderOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListSubheaderClasses>;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color?: 'default' | 'primary' | 'inherit';
  /**
   * If `true`, the List Subheader will not have gutters.
   * @default false
   */
  disableGutters?: boolean;
  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   * @default false
   */
  disableSticky?: boolean;
  /**
   * If `true`, the List Subheader is indented.
   * @default false
   */
  inset?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface ListSubheaderTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'li',
> {
  props: AdditionalProps & ListSubheaderOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Lists](https://v6.mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [ListSubheader API](https://v6.mui.com/material-ui/api/list-subheader/)
 */
declare const ListSubheader: OverridableComponent<ListSubheaderTypeMap>;

export type ListSubheaderProps<
  RootComponent extends React.ElementType = ListSubheaderTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ListSubheaderTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default ListSubheader;
