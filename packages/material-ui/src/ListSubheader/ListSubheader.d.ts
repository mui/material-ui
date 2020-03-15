import * as React from 'react';
import { StandardProps } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ListSubheaderTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    color?: 'default' | 'primary' | 'inherit';
    disableGutters?: boolean;
    disableSticky?: boolean;
    inset?: boolean;
  };
  defaultComponent: D;
  classKey: ListSubheaderClassKey;
}

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/grid-list/ Grid List}
 * - {@link https://material-ui.com/components/lists/ Lists}
 *
 * API:
 * - {@link https://material-ui.com/api/ListSubheader ListSubheader API}
 *
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
