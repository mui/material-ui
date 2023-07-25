import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TableFooterClasses } from './tableFooterClasses';

export interface TableFooterTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'tfoot',
> {
  props: AdditionalProps & {
    /**
     * The content of the component, normally `TableRow`.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<TableFooterClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: DefaultComponent;
}
/**
 *
 * Demos:
 *
 * - [Table](https://mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableFooter API](https://mui.com/material-ui/api/table-footer/)
 */
declare const TableFooter: OverridableComponent<TableFooterTypeMap>;

export type TableFooterProps<
  D extends React.ElementType = TableFooterTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TableFooterTypeMap<P, D>, D>;

export default TableFooter;
