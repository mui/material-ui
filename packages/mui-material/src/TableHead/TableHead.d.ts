import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TableHeadClasses } from './tableHeadClasses';

export interface TableHeadTypeMap<P = {}, D extends React.ElementType = 'thead'> {
  props: P & {
    /**
     * The content of the component, normally `TableRow`.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<TableHeadClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableHead API](https://mui.com/material-ui/api/table-head/)
 */
declare const TableHead: OverridableComponent<TableHeadTypeMap>;

export type TableHeadProps<
  D extends React.ElementType = TableHeadTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TableHeadTypeMap<P, D>, D>;

export default TableHead;
