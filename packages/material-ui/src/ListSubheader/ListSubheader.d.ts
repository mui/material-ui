import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ListSubheaderTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `color="primary"`. */
      colorPrimary?: string;
      /** Styles applied to the root element if `color="inherit"`. */
      colorInherit?: string;
      /** Styles applied to the inner `component` element if `disableGutters={false}`. */
      gutters?: string;
      /** Styles applied to the root element if `inset={true}`. */
      inset?: string;
      /** Styles applied to the root element if `disableSticky={false}`. */
      sticky?: string;
    };
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
     * If `true`, the List Subheader will be indented.
     * @default false
     */
    inset?: boolean;
  };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Image List](https://material-ui.com/components/image-list/)
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListSubheader API](https://material-ui.com/api/list-subheader/)
 */
declare const ListSubheader: OverridableComponent<ListSubheaderTypeMap>;

export type ListSubheaderClassKey = keyof NonNullable<ListSubheaderTypeMap['props']['classes']>;

export type ListSubheaderProps<
  D extends React.ElementType = ListSubheaderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ListSubheaderTypeMap<P, D>, D>;

export default ListSubheader;
