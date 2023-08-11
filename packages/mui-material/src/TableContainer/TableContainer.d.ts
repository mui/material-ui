import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TableContainerClasses } from './tableContainerClasses';

export interface TableContainerTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & {
    /**
     * The content of the component, normally `Table`.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<TableContainerClasses>;
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
 * - [TableContainer API](https://mui.com/material-ui/api/table-container/)
 */
declare const TableContainer: OverridableComponent<TableContainerTypeMap>;

export type TableContainerProps<
  RootComponent extends React.ElementType = TableContainerTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableContainerTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default TableContainer;
