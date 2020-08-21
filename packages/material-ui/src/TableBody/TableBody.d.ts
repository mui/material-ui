import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface TableBodyTypeMap<P = {}, D extends React.ElementType = 'tbody'> {
  props: P & {
    /**
     * The content of the component, normally `TableRow`.
     */
    children?: React.ReactNode;
    /**
     * See [CSS API](#css) below for more details.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
    };
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableBody API](https://material-ui.com/api/table-body/)
 */
declare const TableBody: OverridableComponent<TableBodyTypeMap>;

export type TableBodyClassKey = 'root';

export type TableBodyProps<
  D extends React.ElementType = TableBodyTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableBodyTypeMap<P, D>, D>;

export default TableBody;
