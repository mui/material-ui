import * as React from 'react';
import { SxProps } from '@mui/system';
import { CreateThemeComponent, Theme } from '../stylesOptimized';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TableFooterClasses, TableFooterClassKey } from './tableFooterClasses';

export interface TableFooterOwnProps {
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
}

export interface TableFooterTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'tfoot',
> {
  props: AdditionalProps & TableFooterOwnProps;
  defaultComponent: RootComponent;
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
  RootComponent extends React.ElementType = TableFooterTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableFooterTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export type TableFooterTheme = {
  MuiTableFooter?: CreateThemeComponent<TableFooterClassKey, TableFooterProps>;
};

export default TableFooter;
