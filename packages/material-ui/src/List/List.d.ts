import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * If `true`, compact vertical padding designed for keyboard and mouse input will be used for
     * the list and list items.
     * The prop is available to descendant components as the `dense` context.
     */
    dense?: boolean;
    /**
     * If `true`, vertical padding will be removed from the list.
     */
    disablePadding?: boolean;
    /**
     * The content of the subheader, normally `ListSubheader`.
     */
    subheader?: React.ReactNode;
  };
  defaultComponent: D;
  classKey: ListClassKey;
}

/**
 *
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [List API](https://material-ui.com/api/list/)
 */
declare const List: OverridableComponent<ListTypeMap>;

export type ListClassKey = 'root' | 'padding' | 'dense' | 'subheader';

export type ListProps<
  D extends React.ElementType = ListTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ListTypeMap<P, D>, D>;

export default List;
