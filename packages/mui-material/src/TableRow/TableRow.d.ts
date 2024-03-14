import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TableRowClasses } from './tableRowClasses';

export interface TableRowOwnProps {
  /**
   * Should be valid `<tr>` children such as `TableCell`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableRowClasses>;
  /**
   * If `true`, the table row will shade on hover.
   * @default false
   */
  hover?: boolean;
  /**
   * If `true`, the table row will have the selected shading.
   * @default false
   */
  selected?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface TableRowTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'tr',
> {
  props: AdditionalProps & TableRowOwnProps;
  defaultComponent: RootComponent;
}
/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 *
 * Demos:
 *
 * - [Table](https://mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableRow API](https://mui.com/material-ui/api/table-row/)
 */
declare const TableRow: OverridableComponent<TableRowTypeMap>;

export type TableRowProps<
  RootComponent extends React.ElementType = TableRowTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableRowTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default TableRow;
