import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import {
  Sorting,
  Grouping,
  Column,
  DataTypeProviderProps,
  PagingState,
  SortingState,
  SelectionState,
  IntegratedSelection,
  GroupingState,
  IntegratedGrouping,
  IntegratedPaging,
  IntegratedSorting,
  FilteringState,
  SearchState,
  DataTypeProvider,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableSelection,
  GroupingPanel,
  Toolbar,
  DragDropProvider,
  TableGroupRow,
  SearchPanel,
  TableFilterRow,
  TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';
import LinearProgress from '@material-ui/core/LinearProgress';

const URL = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders?requireTotalCount=true';

const LoadingIndicator: React.ComponentType = () => <LinearProgress style={{ position: 'absolute', width: '100%' }} />;

interface Sale {
  product: string;
  region: string;
  amount: string;
  saleDate: string;
  customer: string;
}

type CurrencyFormatterProps = DataTypeProvider.ValueFormatterProps & WithStyles<typeof styles>;

const getColor = (amount: number) => {
  if (amount < 3000) {
    return '#F44336';
  } if (amount < 5000) {
    return '#FF5722';
  } if (amount < 8000) {
    return '#FFC107';
  } return '#009688';
};

const styles = ({ typography }: Theme) => createStyles({
  currency: {
    fontWeight: typography.fontWeightMedium,
  },
  numericInput: {
    fontSize: '14px',
    width: '100%',
  },
});

const CurrencyFormatter = withStyles(styles)(
  ({ value, classes }: CurrencyFormatterProps) => (
    <i className={classes.currency} style={{ color: getColor(value) }}>
      {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
    </i>
  ),
);

const CurrencyTypeProvider: React.ComponentType<DataTypeProviderProps> = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    {...props}
  />
);

const columns: Column[] = [
  { name: 'OrderNumber', title: 'Order #' },
  { name: 'OrderDate', title: 'Order Date' },
  { name: 'StoreCity', title: 'Store City' },
  { name: 'Employee', title: 'Employee' },
  { name: 'SaleAmount', title: 'Sale Amount' },
];
const currencyColumns = ['SaleAmount'];
const pageSizes: number[] = [5, 10];
const defaultPageSize = 5;
const defaultSorting: Sorting[] = [
  { columnName: 'StoreCity', direction: 'desc' },
  { columnName: 'OrderDate', direction: 'asc' },
];
const defaultGrouping: Grouping[] = [{ columnName: 'StoreCity' }];
const defaultExpandedGroups: string[] = ['Spokane'];

export default () => {
  const [rows, setRows] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = () => {
    const queryString = `${URL}&take=${1000}&skip=0`;

    setLoading(true);
    fetch(queryString)
      .then(response => response.json())
      .then(({ data }) => {
        setRows(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => loadData(), []);

  return (
    <Paper style={{ position: 'relative' }}>
      {loading && <LoadingIndicator />}
      <Grid
        rows={rows}
        columns={columns}
      >
        <CurrencyTypeProvider for={currencyColumns} />
        <FilteringState />
        <SearchState />
        <SelectionState />
        <SortingState defaultSorting={defaultSorting} />
        <GroupingState
          defaultGrouping={defaultGrouping}
          defaultExpandedGroups={defaultExpandedGroups}
        />
        <PagingState defaultPageSize={defaultPageSize} />
        <IntegratedSorting />
        <IntegratedGrouping />
        <IntegratedFiltering />
        <IntegratedPaging />
        <IntegratedSelection />

        <DragDropProvider />

        <Table />
        <TableColumnReordering />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
        <TableSelection showSelectAll />
        <TableGroupRow />

        <Toolbar />
        <GroupingPanel showSortingControls />
        <SearchPanel />
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
    </Paper>
  );
};
