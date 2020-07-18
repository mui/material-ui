import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ListSubheaderTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: 'default' | 'primary' | 'inherit';
    /**
     * If `true`, the List Subheader will not have gutters.
     */
    disableGutters?: boolean;
    /**
     * If `true`, the List Subheader will not stick to the top during scroll.
     */
    disableSticky?: boolean;
    /**
     * If `true`, the List Subheader will be indented.
     */
    inset?: boolean;
  };
  defaultComponent: D;
  classKey: ListSubheaderClassKey;
}

/**
 *
 * Demos:
 *
 * - [Grid List](https://material-ui.com/components/grid-list/)
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListSubheader API](https://material-ui.com/api/list-subheader/)
 */
declare const ListSubheader: OverridableComponent<ListSubheaderTypeMap>;

export type ListSubheaderClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorInherit'
  | 'inset'
  | 'sticky'
  | 'gutters';

export type ListSubheaderProps<
  D extends React.ElementType = ListSubheaderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ListSubheaderTypeMap<P, D>, D>;

export default ListSubheader;
