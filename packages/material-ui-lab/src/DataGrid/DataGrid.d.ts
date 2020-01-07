import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface ColumnOptionType {
  resizable?: boolean;
  sortable?: boolean;
  sortingComparator?: (rowA: any, rowB: any, sort: 'asc' | 'desc') => number;
  sortingOrder?: Array<'asc' | 'desc' | null>;
}

export interface ColumnsType extends ColumnOptionType {
  field: string;
  label?: string;
  children?: ColumnsType[];
}

export type SortingType = Array<{
  sort: 'asc' | 'desc';
  field: string;
}>;

export interface DataProviderGetListParams {
  sorting: SortingType;
  pagination: {
    start: number;
    end: number;
  };
}

export interface DataProviderType {
  getList: (params: DataProviderGetListParams) => Promise<any[]>;
}

export interface DataGridProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DataGridClassKey> {
  /**
   * Manage the communication with the data store.
   */
  dataProvider?: DataProviderType;
  /**
   * The default options that get applied to each column.
   */
  defaultColumnOptions?: ColumnOptionType;
  /**
   * The columns configuration.
   */
  columns?: ColumnsType[];
  /**
   * The default sorting state. (Uncontrolled)
   */
  defaultSorting?: SortingType;
  /**
   * If `true`, the loading state is displayed.
   * If `false` the component shows the loading state, while it waits for new data being loaded.
   */
  loading?: boolean;
  /**
   * Sorting state. (Controlled)
   */
  sorting?: SortingType;
  /**
   * The localization strings.
   */
  text?: any;
  /**
   * If `true`, the pagination is enabled.
   */
  pagination?: boolean;
  /**
   * The initial page to be displayed.
   */
  defaultPage?: number;
  /**
   * The initial rows per page size. Must be one of the paginationPageSize options.
   */
  defaultRowsPerPage?: 10 | 25 | 50 | 100 | 250 | 500 | number;
  /**
   * The possible pagination size options to be selected by the user.
   */
  paginationRowsPerPageOptions?: Array<number | { value: number; label: string }>;
  /**
   * Callback fired when the user change the column sort.
   *
   * @param {object} event The event source of the callback.
   * @param {SortingType} value The new sorting value.
   */
  onSortingChange?: (event: React.ChangeEvent<{}>, value: SortingType) => void;
  /**
   * The data record array to be rendered.
   */
  rowsData?: any[];
}

export type DataGridClassKey = 'root';

export default function DataGrid(props: DataGridProps): JSX.Element;
